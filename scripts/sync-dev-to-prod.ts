/**
 * sync-dev-to-prod.ts
 *
 * Sincroniza o dataset "development" para "production".
 * Copia todos os documentos (conteúdo + assets) usando createOrReplace,
 * garantindo idempotência: executar várias vezes não duplica dados.
 *
 * Uso:
 *   npm run sync:prod
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

// Cliente de leitura — dataset development (público, sem token)
const devClient = createClient({
    projectId,
    dataset: "development",
    apiVersion,
    useCdn: false,
});

// Cliente de escrita — dataset production (requer token)
const prodWriteClient = createClient({
    projectId,
    dataset: "production",
    apiVersion,
    useCdn: false,
    token: writeToken,
});

// Tipos de sistema do Sanity que não devem ser migrados
const SKIP_TYPES = ["system.group", "system.retention"];

const BATCH_SIZE = 50;

async function main() {
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("  🔄  Sync: development → production");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

    // Artigos a serem excluídos da sincronização para produção (vazio para sincronizar todos os artigos do dev)
    const EXCLUDE_PROD_POST_SLUGS: string[] = [];
    const excludedPostIds = EXCLUDE_PROD_POST_SLUGS.map((slug) => `post-${slug}`);

    if (EXCLUDE_PROD_POST_SLUGS.length > 0) {
        console.log("🧹 Atualizando referências e removendo posts não autorizados do dataset de produção...");
        try {
            const prodBlogSection = await prodWriteClient.fetch(`*[_type == "blog-section" && _id == "blog-section-content"][0]`);
            if (prodBlogSection && Array.isArray(prodBlogSection.posts)) {
                const cleanPosts = prodBlogSection.posts.filter((ref: any) => !excludedPostIds.includes(ref._ref));
                await prodWriteClient.patch("blog-section-content").set({ posts: cleanPosts }).commit();
            }
        } catch (err: any) {
            console.warn("⚠️ Não foi possível atualizar referências prévias:", err.message);
        }

        for (const slug of EXCLUDE_PROD_POST_SLUGS) {
            await prodWriteClient.delete({ query: `*[_type == "post" && slug.current == "${slug}"]` });
        }
        console.log("✅ Limpeza em produção concluída.");
    }

    // Busca todos os documentos publicados (exclui rascunhos e tipos de sistema)
    console.log("📥 Lendo documentos do dataset development...");
    let allDocs = await devClient.fetch<any[]>(
        `*[!(_id in path("drafts.**")) && !(_type in $skipTypes)]`,
        { skipTypes: SKIP_TYPES }
    );

    // Filtra posts não aprovados para produção
    allDocs = allDocs.filter((d) => !excludedPostIds.includes(d._id));

    // Ajusta as referências do blog-section para não incluir os posts excluídos
    allDocs = allDocs.map((doc) => {
        if (doc._type === "blog-section" && Array.isArray(doc.posts)) {
            return {
                ...doc,
                posts: doc.posts.filter((ref: any) => !excludedPostIds.includes(ref._ref))
            };
        }
        return doc;
    });

    if (allDocs.length === 0) {
        console.log("⚠️  Nenhum documento encontrado no development. Abortando.");
        return;
    }

    // Relatório por tipo
    const byType = allDocs.reduce<Record<string, number>>((acc, doc) => {
        acc[doc._type] = (acc[doc._type] || 0) + 1;
        return acc;
    }, {});

    console.log(`\n📊 ${allDocs.length} documentos encontrados:\n`);
    Object.entries(byType)
        .sort(([, a], [, b]) => b - a)
        .forEach(([type, count]) => {
            const bar = "█".repeat(Math.min(count, 20));
            console.log(`   ${type.padEnd(30)} ${bar} ${count}`);
        });

    // Separa assets e referências de conteúdo — assets e itens referenciados (posts, procedimentos, planos)
    // devem ser inseridos PRIMEIRO para que as referências sejam válidas nas seções (blog-section, etc.)
    const assetDocs = allDocs.filter((d) =>
        d._type === "sanity.imageAsset" || d._type === "sanity.fileAsset"
    );
    const itemDocs = allDocs.filter((d) =>
        ["post", "procedure", "plan", "testimonial", "locationPage"].includes(d._type)
    );
    const sectionDocs = allDocs.filter((d) =>
        !assetDocs.includes(d) && !itemDocs.includes(d)
    );

    // 1. Upload de mídias/assets (download do dev + upload binário para o prod)
    console.log(`\n🚀 Enviando ${assetDocs.length} assets de mídia para production (upload de arquivos binários)...`);
    let assetCount = 0;
    const ASSET_CONCURRENCY = 5;

    for (let i = 0; i < assetDocs.length; i += ASSET_CONCURRENCY) {
        const chunk = assetDocs.slice(i, i + ASSET_CONCURRENCY);
        await Promise.all(
            chunk.map(async (assetDoc) => {
                if (!assetDoc.url) return;
                try {
                    const res = await fetch(assetDoc.url);
                    if (res.ok) {
                        const arrayBuf = await res.arrayBuffer();
                        const buffer = Buffer.from(arrayBuf);
                        const kind = assetDoc._type === "sanity.fileAsset" ? "file" : "image";
                        await prodWriteClient.assets.upload(kind, buffer, {
                            filename: assetDoc.originalFilename || path.basename(assetDoc.url),
                            contentType: assetDoc.mimeType
                        });
                    }
                } catch (err: any) {
                    console.warn(`\n⚠️  Aviso ao enviar asset ${assetDoc._id}:`, err.message);
                } finally {
                    assetCount++;
                }
            })
        );
        const percent = Math.round((assetCount / assetDocs.length) * 100);
        const bar = "█".repeat(Math.floor(percent / 5)).padEnd(20);
        process.stdout.write(`\r   [${bar}] ${percent}% (${assetCount}/${assetDocs.length}) assets de mídia`);
    }
    console.log("\n✅ Upload de assets de mídia concluído.\n");

    const contentDocs = [...assetDocs, ...itemDocs, ...sectionDocs];

    // 2. Migração dos documentos de conteúdo e metadados de assets em lotes
    console.log(`🚀 Enviando ${contentDocs.length} documentos de conteúdo e metadados para production em lotes de ${BATCH_SIZE}...\n`);

    let processed = 0;
    let errors = 0;

    for (let i = 0; i < contentDocs.length; i += BATCH_SIZE) {
        const batch = contentDocs.slice(i, i + BATCH_SIZE);
        const transaction = prodWriteClient.transaction();

        for (const doc of batch) {
            transaction.createOrReplace(doc);
        }

        try {
            await transaction.commit();
            processed += batch.length;
            const percent = Math.round((processed / contentDocs.length) * 100);
            const bar = "█".repeat(Math.floor(percent / 5)).padEnd(20);
            process.stdout.write(`\r   [${bar}] ${percent}% (${processed}/${contentDocs.length}) documentos`);
        } catch (err: any) {
            errors++;
            console.error(`\n   ⚠️  Erro no lote ${Math.floor(i / BATCH_SIZE) + 1}: ${err.message}`);
        }
    }


    console.log("\n");

    if (errors === 0) {
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        console.log("  ✅  Sincronização concluída com sucesso!");
        console.log(`      ${processed} documentos migrados para production.`);
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    } else {
        console.log(`⚠️  Concluído com ${errors} erro(s). Verifique os logs acima.`);
    }
}

main().catch((err) => {
    console.error("\n❌ Erro fatal:", err.message);
    process.exit(1);
});
