/**
 * sync-prod-to-dev.ts
 *
 * Sincroniza o dataset "production" para "development".
 * Faz upload dos assets de mídia ausentes em development e copia todos os
 * documentos de conteúdo publicados usando createOrReplace (idempotente),
 * preservando o dataset de produção intacto.
 */

import { loadEnvConfig } from "@next/env";
loadEnvConfig(process.cwd());

import { createClient } from "next-sanity";
import * as path from "path";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-05-25";
const writeToken = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !writeToken) {
    console.error("❌ Variáveis de ambiente ausentes: NEXT_PUBLIC_SANITY_PROJECT_ID ou SANITY_API_WRITE_TOKEN");
    process.exit(1);
}

// Cliente de leitura de Produção
const prodClient = createClient({
    projectId,
    dataset: "production",
    apiVersion,
    useCdn: false,
    token: writeToken,
});

// Cliente de escrita em Desenvolvimento
const devWriteClient = createClient({
    projectId,
    dataset: "development",
    apiVersion,
    useCdn: false,
    token: writeToken,
});

const SKIP_TYPES = ["system.group", "system.retention"];
const BATCH_SIZE = 50;
const ASSET_CONCURRENCY = 5;

function stripSystemMeta(doc: Record<string, any>) {
    const { _rev, _system, ...rest } = doc;
    void _rev;
    void _system;
    return rest;
}

function remapRefs(value: any, refMap: Map<string, string>): any {
    if (Array.isArray(value)) {
        return value.map((item) => remapRefs(item, refMap));
    }
    if (value && typeof value === "object") {
        const out: Record<string, any> = {};
        for (const [k, v] of Object.entries(value)) {
            if (k === "_ref" && typeof v === "string" && refMap.has(v)) {
                out[k] = refMap.get(v);
            } else {
                out[k] = remapRefs(v, refMap);
            }
        }
        return out;
    }
    return value;
}

async function main() {
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("  🔄  Sync: production → development");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

    console.log("📥 Lendo documentos do dataset production...");
    const allDocs = await prodClient.fetch<any[]>(
        `*[!(_id in path("drafts.**")) && !(_id in path("_.**")) && !(_type in $skipTypes)]`,
        { skipTypes: SKIP_TYPES }
    );

    if (allDocs.length === 0) {
        console.log("⚠️  Nenhum documento encontrado em production. Abortando.");
        return;
    }

    const byType = allDocs.reduce<Record<string, number>>((acc, doc) => {
        acc[doc._type] = (acc[doc._type] || 0) + 1;
        return acc;
    }, {});

    console.log(`\n📊 ${allDocs.length} documentos encontrados em production:\n`);
    Object.entries(byType)
        .sort(([, a], [, b]) => b - a)
        .forEach(([type, count]) => {
            const bar = "█".repeat(Math.min(count, 20));
            console.log(`   ${type.padEnd(30)} ${bar} ${count}`);
        });

    const assetDocs = allDocs.filter((d) =>
        d._type === "sanity.imageAsset" || d._type === "sanity.fileAsset"
    );
    const itemDocs = allDocs.filter((d) =>
        ["post", "procedure", "plan", "testimonial", "locationPage"].includes(d._type)
    );
    const sectionDocs = allDocs.filter((d) =>
        !assetDocs.includes(d) && !itemDocs.includes(d)
    );

    // 1. Verificar assets já existentes em development e subir apenas os ausentes
    const existingDevAssetIds = new Set(
        await devWriteClient.fetch<string[]>(
            `*[_type in ["sanity.imageAsset", "sanity.fileAsset"]]._id`
        )
    );
    const missingAssets = assetDocs.filter((a) => !existingDevAssetIds.has(a._id));
    const refMap = new Map<string, string>();

    if (missingAssets.length > 0) {
        console.log(`\n📎 Enviando ${missingAssets.length} asset(s) de mídia ausente(s) para development...`);
        let uploaded = 0;

        for (let i = 0; i < missingAssets.length; i += ASSET_CONCURRENCY) {
            const chunk = missingAssets.slice(i, i + ASSET_CONCURRENCY);
            await Promise.all(
                chunk.map(async (assetDoc) => {
                    if (!assetDoc.url) return;
                    const res = await fetch(assetDoc.url);
                    if (!res.ok) {
                        throw new Error(`Falha ao baixar asset ${assetDoc._id} (HTTP ${res.status})`);
                    }
                    const buffer = Buffer.from(await res.arrayBuffer());
                    const kind = assetDoc._type === "sanity.fileAsset" ? "file" : "image";
                    const uploadedAsset = await devWriteClient.assets.upload(kind, buffer, {
                        filename: assetDoc.originalFilename || path.basename(assetDoc.url),
                        contentType: assetDoc.mimeType,
                    });
                    if (uploadedAsset._id !== assetDoc._id) {
                        refMap.set(assetDoc._id, uploadedAsset._id);
                    }
                    uploaded++;
                })
            );
            const percent = Math.round((uploaded / missingAssets.length) * 100);
            const bar = "█".repeat(Math.floor(percent / 5)).padEnd(20);
            console.log(`   [${bar}] ${percent}% (${uploaded}/${missingAssets.length} assets)`);
        }
        console.log("✅ Upload de assets concluído.\n");
    } else {
        console.log("\n✅ Todos os assets de mídia já existem em development.\n");
    }

    // 2. Migrar documentos de conteúdo (itens primeiro, seções depois)
    const contentDocs = [...itemDocs, ...sectionDocs].map((doc) => {
        const clean = stripSystemMeta(doc);
        return refMap.size > 0 ? remapRefs(clean, refMap) : clean;
    });

    console.log(`🚀 Enviando ${contentDocs.length} documentos de conteúdo para development em lotes de ${BATCH_SIZE}...\n`);

    let processed = 0;
    let errors = 0;

    for (let i = 0; i < contentDocs.length; i += BATCH_SIZE) {
        const batch = contentDocs.slice(i, i + BATCH_SIZE);
        const transaction = devWriteClient.transaction();

        for (const doc of batch) {
            transaction.createOrReplace(doc);
        }

        try {
            await transaction.commit();
            processed += batch.length;
            const percent = Math.round((processed / contentDocs.length) * 100);
            const bar = "█".repeat(Math.floor(percent / 5)).padEnd(20);
            console.log(`   [${bar}] ${percent}% (${processed}/${contentDocs.length})`);
        } catch (err: any) {
            errors++;
            console.error(`\n   ⚠️  Erro no lote ${Math.floor(i / BATCH_SIZE) + 1}: ${err.message}`);
        }
    }

    console.log("\n");

    if (errors === 0) {
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        console.log("  ✅  Sincronização concluída com sucesso!");
        console.log(`      ${missingAssets.length} asset(s) enviado(s) + ${processed} documento(s) sincronizado(s) de production para development.`);
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    } else {
        console.log(`⚠️  Concluído com ${errors} erro(s). Verifique os logs acima.`);
        process.exit(1);
    }
}

main().catch((err) => {
    console.error("\n❌ Erro fatal:", err.message);
    process.exit(1);
});
