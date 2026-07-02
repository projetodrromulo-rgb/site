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

    // Busca todos os documentos publicados (exclui rascunhos e tipos de sistema)
    console.log("📥 Lendo documentos do dataset development...");
    const allDocs = await devClient.fetch<any[]>(
        `*[!(_id in path("drafts.**")) && !(_type in $skipTypes)]`,
        { skipTypes: SKIP_TYPES }
    );

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

    // Separa assets de conteúdo — assets devem ser inseridos PRIMEIRO
    // para que as referências sejam válidas ao inserir os demais documentos
    const assetDocs = allDocs.filter((d) =>
        d._type === "sanity.imageAsset" || d._type === "sanity.fileAsset"
    );
    const contentDocs = allDocs.filter((d) =>
        d._type !== "sanity.imageAsset" && d._type !== "sanity.fileAsset"
    );

    const orderedDocs = [...assetDocs, ...contentDocs];

    // Migração em lotes
    console.log(`\n🚀 Enviando para production em lotes de ${BATCH_SIZE}...\n`);
    console.log(`   📎 ${assetDocs.length} assets  →  primeiro`);
    console.log(`   📄 ${contentDocs.length} conteúdo →  depois\n`);

    let processed = 0;
    let errors = 0;

    for (let i = 0; i < orderedDocs.length; i += BATCH_SIZE) {
        const batch = orderedDocs.slice(i, i + BATCH_SIZE);
        const transaction = prodWriteClient.transaction();

        for (const doc of batch) {
            transaction.createOrReplace(doc);
        }

        try {
            await transaction.commit();
            processed += batch.length;
            const percent = Math.round((processed / orderedDocs.length) * 100);
            const bar = "█".repeat(Math.floor(percent / 5)).padEnd(20);
            process.stdout.write(`\r   [${bar}] ${percent}% (${processed}/${orderedDocs.length})`);
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
