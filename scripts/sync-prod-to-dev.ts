/**
 * sync-prod-to-dev.ts
 *
 * Sincroniza o dataset "production" para "development".
 * Copia todos os documentos (conteúdo + assets) usando createOrReplace,
 * garantindo idempotência e preservando os documentos de produção.
 */

import { createClient } from "next-sanity";
import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

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

async function main() {
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("  🔄  Sync: production → development");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

    console.log("📥 Lendo documentos do dataset production...");
    const allDocs = await prodClient.fetch<any[]>(
        `*[!(_id in path("drafts.**")) && !(_type in $skipTypes)]`,
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

    const orderedDocs = [...assetDocs, ...itemDocs, ...sectionDocs];

    console.log(`\n🚀 Enviando para development em lotes de ${BATCH_SIZE}...\n`);
    console.log(`   📎 ${assetDocs.length} assets  →  primeiro`);
    console.log(`   📄 ${itemDocs.length + sectionDocs.length} conteúdo →  depois\n`);

    let processed = 0;
    let errors = 0;

    for (let i = 0; i < orderedDocs.length; i += BATCH_SIZE) {
        const batch = orderedDocs.slice(i, i + BATCH_SIZE);
        const transaction = devWriteClient.transaction();

        for (const doc of batch) {
            transaction.createOrReplace(doc);
        }

        try {
            await transaction.commit();
            processed += batch.length;
            const percent = Math.round((processed / orderedDocs.length) * 100);
            const bar = "█".repeat(Math.floor(percent / 5)).padEnd(20);
            console.log(`   [${bar}] ${percent}% (${processed}/${orderedDocs.length})`);
        } catch (err: any) {
            errors++;
            console.error(`\n   ⚠️  Erro no lote ${Math.floor(i / BATCH_SIZE) + 1}: ${err.message}`);
        }
    }

    console.log("\n");

    if (errors === 0) {
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        console.log("  ✅  Sincronização concluída com sucesso!");
        console.log(`      ${processed} documentos copiado(s) de production para development.`);
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    } else {
        console.log(`⚠️  Concluído com ${errors} erro(s). Verifique os logs acima.`);
    }
}

main().catch((err) => {
    console.error("\n❌ Erro fatal:", err.message);
    process.exit(1);
});
