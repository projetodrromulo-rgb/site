import { loadEnvConfig } from "@next/env";
loadEnvConfig(process.cwd());

import { createClient } from "next-sanity";
import fs from "fs";
import path from "path";
import { citiesData } from "../src/app/ortopedista-especialista-em-coluna/data/locations";

// Slugs a atualizar — passe como argumento: npx ts-node scripts/seed-location.ts nova-lima vila-da-serra
const targetSlugs = process.argv.slice(2);

async function main() {
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "development";
    const token = process.env.SANITY_API_WRITE_TOKEN;

    if (!projectId || !token) {
        console.error("\n❌ Erro: NEXT_PUBLIC_SANITY_PROJECT_ID e SANITY_API_WRITE_TOKEN devem estar configurados no .env!");
        process.exit(1);
    }

    const writeClient = createClient({
        projectId,
        dataset,
        token,
        apiVersion: "2026-05-25",
        useCdn: false,
    });

    const citiesToUpdate = targetSlugs.length > 0
        ? Object.entries(citiesData).filter(([key]) => targetSlugs.includes(key))
        : Object.entries(citiesData);

    if (citiesToUpdate.length === 0) {
        console.error(`\n❌ Nenhuma cidade encontrada para os slugs: ${targetSlugs.join(", ")}`);
        console.log("Slugs disponíveis:", Object.keys(citiesData).join(", "));
        process.exit(1);
    }

    console.log(`\n🚀 Atualizando ${citiesToUpdate.length} página(s) de localidade no dataset '${dataset}'...\n`);

    for (const [, city] of citiesToUpdate) {
        const locPageId = `location-page-${city.slug}`;

        // Upload de imagens de fundo
        const bgImageRefs: any[] = [];
        if (city.bgImages) {
            for (let i = 0; i < city.bgImages.length; i++) {
                const imgPath = city.bgImages[i];
                const altText = city.bgImageAlts?.[i] || `Dr. Rômulo Oliveira em procedimento de cirurgia de coluna em ${city.name}`;
                const fullPath = path.join(process.cwd(), "public", imgPath);
                if (fs.existsSync(fullPath)) {
                    console.log(`📥 Upload da imagem de fundo ${i + 1}/${city.bgImages.length} para ${city.name}...`);
                    const buffer = fs.readFileSync(fullPath);
                    const asset = await writeClient.assets.upload("image", buffer, { filename: path.basename(imgPath) });
                    bgImageRefs.push({
                        _type: "image",
                        asset: { _type: "reference", _ref: asset._id },
                        alt: altText
                    });
                } else {
                    console.warn(`⚠️ Imagem não encontrada: ${fullPath}`);
                }
            }
        }

        const locPageDoc = {
            _type: "locationPage",
            _id: locPageId,
            name: city.name,
            slug: { _type: "slug", current: city.slug },
            title: city.title,
            metaDescription: city.metaDescription,
            keywords: city.keywords,
            locationPrefix: city.locationPrefix,
            clinicName: city.clinicName,
            heroContent: {
                headline: city.heroContent.headline,
                description: city.heroContent.description,
                ctaText: city.heroContent.ctaText,
            },
            bgImages: bgImageRefs.length > 0 ? bgImageRefs : undefined,
            ctaOverride: city.ctaOverride,
            address: city.address,
            geo: city.geo,
            locations: city.locations?.map((loc: any, i: number) => ({
                _key: loc._key || `loc-${i + 1}`,
                ...loc
            })),
            conditionsTitle: city.conditionsTitle,
            conditions: city.conditions?.map((cond: any, i: number) => ({
                _key: cond._key || `cond-${i + 1}`,
                ...cond
            })),
            faqsTitle: city.faqsTitle,
            faqs: city.faqs?.map((faq: any, i: number) => ({
                _key: faq._key || `faq-${i + 1}`,
                ...faq
            }))
        };

        console.log(`📤 Enviando '${city.name}' para o Sanity (dataset: ${dataset})...`);
        await writeClient.createOrReplace(locPageDoc);
        // Atualiza também o draft para refletir no Studio
        await writeClient.createOrReplace({
            ...locPageDoc,
            _id: `drafts.${locPageId}`
        });
        console.log(`✅ '${city.name}' atualizado com sucesso! (ctaText: "${city.heroContent.ctaText}")\n`);
    }

    console.log("🎉 Concluído!");
}

main().catch((err) => {
    console.error("❌ Erro:", err.message || err);
    process.exit(1);
});
