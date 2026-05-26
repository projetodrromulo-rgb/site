import { loadEnvConfig } from "@next/env";
loadEnvConfig(process.cwd());

import { createClient } from "next-sanity";
import fs from "fs";
import path from "path";

async function main() {
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
    const token = process.env.SANITY_API_WRITE_TOKEN;

    if (!projectId || !token) {
        console.error("\n❌ Erro: NEXT_PUBLIC_SANITY_PROJECT_ID e SANITY_API_WRITE_TOKEN devem estar configurados no seu arquivo .env!");
        process.exit(1);
    }

    const writeClient = createClient({
        projectId,
        dataset,
        token,
        apiVersion: "2026-05-25",
        useCdn: false,
    });

    try {
        console.log(`\n🚀 Iniciando exportação de dados para o Sanity CMS (Dataset: ${dataset})...\n`);

        // 1. Read the local webp image from the public folder
        const localImagePath = path.join(process.cwd(), "public", "images", "about-image.webp");
        let imageAssetId = "";

        if (fs.existsSync(localImagePath)) {
            console.log("📂 Lendo imagem local: about-image.webp...");
            const imageBuffer = fs.readFileSync(localImagePath);
            
            console.log("📤 Fazendo upload da imagem para os assets do Sanity...");
            const imageAsset = await writeClient.assets.upload("image", imageBuffer, {
                filename: "about-image.webp",
            });
            imageAssetId = imageAsset._id;
            console.log(`✅ Upload da imagem concluído! Asset ID: ${imageAssetId}`);
        } else {
            console.warn("⚠️ Imagem local não encontrada em:", localImagePath);
        }

        // 2. Prepare the About Document structure
        const doc = {
            _type: "about",
            _id: "about-content", // Fixed ID to prevent duplicates (idempotent)
            subtitle: "Sobre o Especialista",
            headline: {
                _type: "object",
                textTop: "Comprometido com sua",
                textHighlight: "Saúde e bem estar",
                textBottom: ""
            },
            paragraphs: [
                "O Dr. Rômulo Oliveira dedica sua trajetória profissional ao tratamento avançado de patologias da coluna vertebral, unindo tecnologia de ponta e um olhar humano e individualizado.",
                "Especialista reconhecido em cirurgias minimamente invasivas, seu foco principal é reduzir o tempo de recuperação, permitindo que o paciente retorne às suas atividades diárias com o máximo de conforto e segurança.",
                "Sua abordagem prioriza técnicas que preservam a musculatura e estabilidade da coluna, sempre buscando a solução menos agressiva e mais eficaz para cada caso clínico."
            ],
            formation: [
                "Membro da Sociedade Brasileira de Coluna - SBC",
                "Fellowship em cirurgia de coluna - Hospital da Baleia - Belo Horizonte MG",
                "Residência Médica em Ortopedia e Traumatologia pelo Hospital Municipal - Governador Valadares - MG",
                "Médico pela UNEC - Caratinga MG"
            ],
            features: [
                {
                    _key: "feat-1",
                    icon: "Award",
                    title: "Especialista em Coluna",
                    description: "RQE 59057 | TEOT 19406"
                },
                {
                    _key: "feat-2",
                    icon: "Zap",
                    title: "Tecnologia de Ponta",
                    description: "Técnicas Minimamente Invasivas"
                },
                {
                    _key: "feat-3",
                    icon: "Activity",
                    title: "Recuperação Rápida",
                    description: "Foco no retorno às atividades"
                },
                {
                    _key: "feat-4",
                    icon: "ShieldCheck",
                    title: "Segurança e Ética",
                    description: "Procedimentos Certificados"
                }
            ]
        } as any;

        if (imageAssetId) {
            doc.image = {
                _type: "image",
                asset: {
                    _type: "reference",
                    _ref: imageAssetId
                },
                alt: "Dr. Rômulo Oliveira"
            };
        }

        console.log("📤 Enviando documento 'about' para o Sanity...");
        const result = await writeClient.createOrReplace(doc);
        console.log(`\n🎉 Sucesso! Documento 'about-content' integrado/sobrescrito no Sanity. ID: ${result._id}\n`);

        // 3. Prepare the CTA Document structure
        const ctaDoc = {
            _type: "secao-cto",
            _id: "secao-cto-content",
            id: "contato",
            headline: "Agende sua Avaliação",
            description: "E descubra como as técnicas minimamente invasivas podem restaurar sua qualidade de vida com segurança e rapidez.",
            whatsappUrl: "https://wa.me/5531996689572?text=Olá! Vim do site do Dr. Romulo. Gostaria de mais informações sobre o atendimento",
            whatsappButtonText: "Chamar no WhatsApp",
            whatsappMessage: "Olá! Vim do site do Dr. Romulo. Gostaria de mais informações sobre o atendimento",
            typingPhrases: [
                "Especialista em Coluna",
                "Ortopedia e Cirurgia de Coluna",
                "Cirurgia Minimamente Invasiva",
                "Recuperação Rápida e Segura"
            ],
            trustSignals: [
                {
                    _key: "ts-1",
                    icon: "ShieldCheck",
                    title: "Atendimento Especializado",
                    description: "Cuidado focado em patologias complexas da coluna."
                },
                {
                    _key: "ts-2",
                    icon: "Cpu",
                    title: "Tecnologia de Ponta",
                    description: "Cirurgias guiadas por vídeo e ferramentas robóticas."
                },
                {
                    _key: "ts-3",
                    icon: "Zap",
                    title: "Recuperação Rápida",
                    description: "Procedimentos ambulatoriais e retorno precoce às atividades."
                }
            ]
        };

        console.log("📤 Enviando documento 'cta' para o Sanity...");
        const ctaResult = await writeClient.createOrReplace(ctaDoc);
        console.log(`\n🎉 Sucesso! Documento 'secao-cto-content' integrado/sobrescrito no Sanity. ID: ${ctaResult._id}\n`);

        // 4. Prepare the Footer Document structure
        const footerDoc = {
            _type: "footer",
            _id: "footer-content",
            brandDescription: "Excelência e precisão em cirurgia de coluna. Focado em devolver a qualidade de vida e mobilidade aos nossos pacientes através de técnicas modernas e humanizadas.",
            crm: "CRM 73889 | RQE 59057 | TEOT 19406",
            navLinks: [
                { _key: "nav-1", label: "Início", href: "#" },
                { _key: "nav-2", label: "Sobre", href: "#sobre" },
                { _key: "nav-3", label: "Onde Atendemos", href: "#locations" },
                { _key: "nav-4", label: "Convênios", href: "#Insurance" },
                { _key: "nav-5", label: "Especialidades", href: "#procedimentos" }
            ],
            socialLinks: [
                { _key: "soc-1", platform: "whatsapp", href: "https://wa.me/5531996689572?text=Olá! Vim do site do Dr. Romulo. Gostaria de mais informações sobre o atendimento" },
                { _key: "soc-2", platform: "instagram", href: "https://www.instagram.com/dr.romulo.oliveira/" }
            ]
        };

        console.log("📤 Enviando documento 'footer' para o Sanity...");
        const footerResult = await writeClient.createOrReplace(footerDoc);
        console.log(`\n🎉 Sucesso! Documento 'footer-content' integrado/sobrescrito no Sanity. ID: ${footerResult._id}\n`);



    } catch (error: any) {
        console.error("\n❌ Erro durante a exportação:", error.message || error);
        process.exit(1);
    }
}

main();
