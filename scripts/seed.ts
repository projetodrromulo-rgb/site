import { loadEnvConfig } from "@next/env";
loadEnvConfig(process.cwd());

import { createClient } from "next-sanity";
import fs from "fs";
import path from "path";
import { allProcedures } from "../src/components/sections/procedures/data/procedures";
import { allTestimonials } from "../src/components/sections/testimonials/data/testimonials";
import { allPosts } from "./data/posts";
import { citiesData } from "../src/app/ortopedista-especialista-em-coluna/data/locations";

async function htmlToPortableText(html: string, writeClient?: any): Promise<any[]> {
    const blocks: any[] = [];

    // Split by block tags and img tags but keep the tags to identify them
    const matches = html.split(/(<\/?(?:p|h2|h3|ul|ol|li|blockquote|strong|img)[^>]*>)/gi);

    let currentStyle = "normal";
    let currentChildren: any[] = [];
    let isList = false;
    let listType = "bullet";

    // Very simple stateful parser for standard formatting
    for (let i = 0; i < matches.length; i++) {
        const token = matches[i];
        if (!token) continue;

        const lowerToken = token.toLowerCase();
        if (lowerToken.startsWith("<h2")) {
            currentStyle = "h2";
        } else if (lowerToken.startsWith("<h3")) {
            currentStyle = "h3";
        } else if (lowerToken.startsWith("<p")) {
            currentStyle = "normal";
        } else if (lowerToken.startsWith("<blockquote")) {
            currentStyle = "blockquote";
        } else if (lowerToken.startsWith("<ul")) {
            isList = true;
            listType = "bullet";
        } else if (lowerToken.startsWith("<ol")) {
            isList = true;
            listType = "number";
        } else if (lowerToken.startsWith("</ul") || lowerToken.startsWith("</ol")) {
            isList = false;
        } else if (lowerToken.startsWith("<li")) {
            currentStyle = "normal";
        } else if (lowerToken.startsWith("<img")) {
            // If we have some buffered text, flush it first
            if (currentChildren.length > 0) {
                const block: any = {
                    _type: "block",
                    _key: `block-${blocks.length}-${Math.random().toString(36).substr(2, 9)}`,
                    style: currentStyle,
                    children: currentChildren
                };
                if (isList) {
                    block.listItem = listType;
                    block.level = 1;
                }
                blocks.push(block);
                currentChildren = [];
            }

            // Now handle the image
            if (writeClient) {
                try {
                    const srcMatch = token.match(/src="([^"]+)"/i);
                    if (srcMatch) {
                        const src = srcMatch[1];
                        const altMatch = token.match(/alt="([^"]+)"/i);
                        const alt = altMatch ? altMatch[1] : "Imagem do artigo";

                        let buffer: Buffer | null = null;
                        const filename = path.basename(src);
                        if (src.startsWith("/") || src.startsWith("images/")) {
                            const fullPath = path.join(process.cwd(), "public", src);
                            if (fs.existsSync(fullPath)) {
                                buffer = fs.readFileSync(fullPath);
                            }
                        }

                        if (buffer) {
                            console.log(`📤 Fazendo upload de imagem inline: ${filename}...`);
                            const asset = await writeClient.assets.upload("image", buffer, { filename });
                            blocks.push({
                                _type: "image",
                                _key: `image-${blocks.length}-${Math.random().toString(36).substr(2, 9)}`,
                                asset: {
                                    _type: "reference",
                                    _ref: asset._id
                                },
                                alt
                            });
                            console.log(`✅ Imagem inline enviada: ${asset._id}`);
                        }
                    }
                } catch (err) {
                    console.warn("⚠️ Falha ao fazer upload de imagem inline:", err);
                }
            }
        } else if (lowerToken.startsWith("</h2") || lowerToken.startsWith("</h3") || lowerToken.startsWith("</p") || lowerToken.startsWith("</li") || lowerToken.startsWith("</blockquote")) {
            // End of block: push to blocks
            if (currentChildren.length > 0) {
                const block: any = {
                    _type: "block",
                    _key: `block-${blocks.length}-${Math.random().toString(36).substr(2, 9)}`,
                    style: currentStyle,
                    children: currentChildren
                };
                if (isList) {
                    block.listItem = listType;
                    block.level = 1;
                }
                blocks.push(block);
                currentChildren = [];
            }
            currentStyle = "normal";
        } else if (lowerToken.startsWith("<strong")) {
            // Handle bold text next
            i++;
            const textContent = matches[i] ? matches[i].replace(/<[^>]*>/g, "") : "";
            if (textContent) {
                currentChildren.push({
                    _type: "span",
                    _key: `span-${currentChildren.length}-${Math.random().toString(36).substr(2, 9)}`,
                    text: textContent,
                    marks: ["strong"]
                });
            }
            // Skip the next token if it is the closing </strong>
            if (matches[i + 1] && matches[i + 1].toLowerCase().startsWith("</strong")) {
                i++;
            }
        } else if (!token.startsWith("<")) {
            // Plain text
            const textContent = token.trim();
            if (textContent) {
                currentChildren.push({
                    _type: "span",
                    _key: `span-${currentChildren.length}-${Math.random().toString(36).substr(2, 9)}`,
                    text: textContent,
                    marks: []
                });
            }
        }
    }

    // Fallback if no blocks were parsed
    if (blocks.length === 0) {
        blocks.push({
            _type: "block",
            style: "normal",
            children: [{ _type: "span", text: html.replace(/<[^>]*>/g, ""), marks: [] }]
        });
    }

    return blocks;
}

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

        // 1b. Read and upload the local logo image from the public folder
        const localLogoPath = path.join(process.cwd(), "public", "images", "logo.svg");
        let logoAssetId = "";

        if (fs.existsSync(localLogoPath)) {
            console.log("📂 Lendo logo local: logo.svg...");
            const logoBuffer = fs.readFileSync(localLogoPath);

            console.log("📤 Fazendo upload da logo para os assets do Sanity...");
            const logoAsset = await writeClient.assets.upload("image", logoBuffer, {
                filename: "logo.svg",
            });
            logoAssetId = logoAsset._id;
            console.log(`✅ Upload da logo concluído! Asset ID: ${logoAssetId}`);
        } else {
            console.warn("⚠️ Logo local não encontrada em:", localLogoPath);
        }

        // 1c. Helper to upload location images and upload each clinic image
        const uploadLocationImage = async (imgName: string, fallbackPath: string) => {
            const fullPath = path.join(process.cwd(), "public", fallbackPath);
            if (fs.existsSync(fullPath)) {
                console.log(`📂 Lendo imagem de unidade: ${imgName}...`);
                const buffer = fs.readFileSync(fullPath);
                const asset = await writeClient.assets.upload("image", buffer, { filename: imgName });
                return asset._id;
            }
            console.warn(`⚠️ Imagem de unidade não encontrada: ${fullPath}`);
            return "";
        };

        const imgBetim = await uploadLocationImage("hospital-03.webp", "images/location/hospital-03.webp");
        const imgCentra = await uploadLocationImage("clinica-02.webp", "images/location/clinica-02.webp");
        const imgBarreiro = await uploadLocationImage("clinica-01.webp", "images/location/clinica-01.webp");
        const imgNumai = await uploadLocationImage("clinica-02-numai.webp", "images/location/clinica-02.webp");
        const imgCeofe = await uploadLocationImage("clinica-03.webp", "images/location/clinica-03.webp");
        const imgBiocor = await uploadLocationImage("hospital-02.webp", "images/location/hospital-02.webp");

        // 1d. Read and upload the local background video from the public folder
        const localVideoPath = path.join(process.cwd(), "public", "video", "video-hero.webm");
        let videoAssetId = "";

        if (fs.existsSync(localVideoPath)) {
            console.log("📂 Lendo vídeo local: video-hero.webm...");
            const videoBuffer = fs.readFileSync(localVideoPath);

            console.log("📤 Fazendo upload do vídeo para os assets do Sanity (isso pode levar alguns segundos)...");
            const videoAsset = await writeClient.assets.upload("file", videoBuffer, {
                filename: "video-hero.webm",
            });
            videoAssetId = videoAsset._id;
            console.log(`✅ Upload do vídeo concluído! Asset ID: ${videoAssetId}`);
        } else {
            console.warn("⚠️ Vídeo local não encontrado em:", localVideoPath);
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
                { _key: "soc-2", platform: "instagram", href: "https://www.instagram.com/drromulooliveiracoluna/" }
            ]
        } as any;

        if (logoAssetId) {
            footerDoc.logo = {
                _type: "image",
                asset: {
                    _type: "reference",
                    _ref: logoAssetId
                },
                alt: "Dr. Rômulo Oliveira Logo"
            };
        }

        console.log("📤 Enviando documento 'footer' para o Sanity...");
        const footerResult = await writeClient.createOrReplace(footerDoc);
        console.log(`\n🎉 Sucesso! Documento 'footer-content' integrado/sobrescrito no Sanity. ID: ${footerResult._id}\n`);

        // 5. Prepare the Locations Document structure
        const locationsDoc = {
            _type: "locations",
            _id: "locations-content",
            subtitle: "Onde Atendemos",
            headline: {
                _type: "object",
                textTop: "Nossas Unidades de",
                textHighlight: "Atendimento",
            },
            description: [
                {
                    _type: "block",
                    _key: "loc-desc-block-1",
                    style: "normal",
                    markDefs: [],
                    children: [
                        {
                            _type: "span",
                            _key: "span-1",
                            text: "Escolha a unidade mais próxima de você para um atendimento especializado.",
                            marks: []
                        }
                    ]
                }
            ],
            units: [
                {
                    _key: "unit-1",
                    id: "materdei-betim",
                    title: "Mater Dei Betim",
                    subtitle: "Duque de Caxias - Betim - MG",
                    address: "Via Expressa de Betim, 15500 - Duque de Caxias - Betim - MG",
                    phone: "(31) 3339-9000",
                    mapUrl: "https://www.google.com/maps/place/Hospital+Mater+Dei+Betim-Contagem/@-19.9408634,-44.1501398,17z/data=!3m1!4b1!4m6!3m5!1s0xa6c1cabee6c259:0x7d294aaad7d86fd6!8m2!3d-19.9408634!4d-44.1475649!16s%2Fg%2F11gh86_kn_?entry=ttu&g_ep=EgoyMDI2MDMzMS4wIKXMDSoASAFQAw%3D%3D",
                    websiteUrl: "https://www.materdei.com.br/unidades/mater-dei-betim-contagem",
                    image: imgBetim ? { _type: "image", asset: { _type: "reference", _ref: imgBetim }, alt: "Mater Dei Betim" } : undefined
                },
                {
                    _key: "unit-2",
                    id: "clinica-centra",
                    title: "Clínica Centra",
                    subtitle: "Centro - Betim",
                    address: "Rua Inconfidência, 488, 3º Andar, Centro - Betim-MG",
                    phone: "(31) 2571-0321",
                    mapUrl: "https://www.google.com/maps/place/Cl%C3%ADnica+Centra/@-19.9670843,-44.2010491,17z/data=!3m1!4b1!4m6!3m5!1s0xa6c3849b4451ab:0xba4aefe70f87d6fb!8m2!3d-19.9670894!4d-44.1984742!16s%2Fg%2F11b77qmtys?entry=ttu&g_ep=EgoyMDI2MDQxMy4wIKXMDSoASAFQAw%3D%3D",
                    websiteUrl: "https://clinicacentra.com.br/",
                    image: imgCentra ? { _type: "image", asset: { _type: "reference", _ref: imgCentra }, alt: "Clínica Centra" } : undefined
                },
                {
                    _key: "unit-3",
                    id: "clinica-elcenter-barreiro",
                    title: "Clínica Elcenter Barreiro",
                    subtitle: "Barreiro - BH",
                    address: "Rua Alcindo Vieira, 305, Barreiro - Belo Horizonte-MG",
                    phone: "(31) 3370-3600",
                    mapUrl: "https://www.google.com/maps/place/Elcenter+-+Unidade+Barreiro/@-19.975833,-44.0189758,17z/data=!3m1!4b1!4m6!3m5!1s0xa6bd000bf9bcdf:0x8b2d96cc1acd26fd!8m2!3d-19.9758365!4d-44.0171812!16s%2Fg%2F11lzmn4t0j?entry=ttu&g_ep=EgoyMDI2MDQxMy4wIKXMDSoASAFQAw%3D%3D",
                    websiteUrl: "https://elcenter.com.br/",
                    image: imgBarreiro ? { _type: "image", asset: { _type: "reference", _ref: imgBarreiro }, alt: "Clínica Elcenter Barreiro" } : undefined
                },
                {
                    _key: "unit-4",
                    id: "clinica-numai",
                    title: "Clínica NUMAI",
                    subtitle: "Pampulha - BH",
                    address: "Avenida Coronel José Dias Bicalho 928, bairro São Luiz/Pampulha - Belo Horizonte-MG",
                    phone: "(31) 3504-0045",
                    mapUrl: "https://www.google.com/maps/place/Numai+-+Cl%C3%ADnica+M%C3%A9dica/@-19.8588292,-43.9648755,3a,75y/data=!3m8!1e2!3m6!1sCIHM0ogKEICAgIDJ6Zm8mwE!2e10!3e12!6shttps:%2F%2Flh3.googleusercontent.com%2Fgps-cs-s%2FAPNQkAH6LA718cta0HKpJXlv2HLGSAoi35XnMKVF8r1cl83cszASIiXAc7Quek-2yb46SVzDyQ9L4o0u1yAjWryvQ1qiHz_CCs2-Vs6_MOCXb0QuDcFF2ZptiOonONoZR4ohY6V2sA3qyA%3Dw203-h270-k-no!7i3472!8i4624!4m11!1m2!2m1!1sclinica-numai+pampulha!3m7!1s0xa69188a6e9fea7:0x1096e412d1d5d7a3!8m2!3d-19.8586885!4d-43.9648975!10e5!15sChZjbGluaWNhLW51bWFpIHBhbXB1bGhhkgESc3BlY2lhbGl6ZWRfY2xpbmlj4AEA!16s%2Fg%2F11gk_lthxt?entry=ttu&g_ep=EgoyMDI2MDQxMy4wIKXMDSoASAFQAw%3D%3D",
                    websiteUrl: "https://www.clinicanumai.com.br/",
                    image: imgNumai ? { _type: "image", asset: { _type: "reference", _ref: imgNumai }, alt: "Clínica NUMAI" } : undefined
                },
                {
                    _key: "unit-5",
                    id: "ceofe-contagem",
                    title: "CEOFE - Contagem",
                    subtitle: "Eldorado - Contagem",
                    address: "Av. José faria da Rocha, 4458, Eldorado, Contagem-MG",
                    phone: "(31) 99967-5665",
                    mapUrl: "https://www.google.com/maps/place/CEOFE+-+Centro+de+Ortopedia+e+Fraturas+Eldorado/@-19.9419087,-44.0429171,17z/data=!3m1!4b1!4m6!3m5!1s0xa695939ce9da67:0x746b0c553162b614!8m2!3d-19.9419138!4d-44.0403422!16s%2Fg%2F1tj2ppwk?entry=ttu&g_ep=EgoyMDI2MDQxMy4wIKXMDSoASAFQAw%3D%3D",
                    websiteUrl: "http://www.ceofe.com.br/",
                    image: imgCeofe ? { _type: "image", asset: { _type: "reference", _ref: imgCeofe }, alt: "CEOFE" } : undefined
                },
                {
                    _key: "unit-6",
                    id: "hospital-biocor",
                    title: "Hospital Biocor - Rede D'Or",
                    subtitle: "Nova Lima - MG",
                    address: "R. Da Paisagem, 290 - Vila Da Serra - Nova Lima",
                    phone: "(31) 3289-5000",
                    mapUrl: "https://www.google.com/maps/place/Biocor+Rede+D'Or:+Pronto+Atendimento,+Emerg%C3%AAncia,+Pronto+Socorro/@-19.9814621,-43.9496673,17z/data=!3m1!4b1!4m6!3m5!1s0xa697ffa847f729:0xf2f6fd5e5f10c2a4!8m2!3d-19.9814672!4d-43.9447964!16s%2Fg%2F1v16rjtm?entry=ttu&g_ep=EgoyMDI2MDQxMy4wIKXMDSoASAFQAw%3D%3D",
                    websiteUrl: "https://www.biocor.com.br",
                    image: imgBiocor ? { _type: "image", asset: { _type: "reference", _ref: imgBiocor }, alt: "Hospital Biocor" } : undefined
                }
            ]
        };

        console.log("📤 Enviando documento 'locations' para o Sanity...");
        const locResult = await writeClient.createOrReplace(locationsDoc);
        console.log(`\n🎉 Sucesso! Documento 'locations-content' integrado/sobrescrito no Sanity. ID: ${locResult._id}\n`);

        // 6. Prepare the Hero Document structure
        const heroDoc = {
            _type: "hero",
            _id: "hero-content",
            typingPhrases: [
                "Ortopedia e Cirurgia de Coluna",
                "Cirurgia Minimamente Invasiva",
                "Recuperação Rápida e Segura"
            ],
            headline: {
                _type: "object",
                textTop: "Sua jornada para uma",
                textHighlight: "vida sem dor",
                textBottom: "começa aqui",
            },
            description: [
                {
                    _type: "block",
                    _key: "hero-desc-block-1",
                    style: "normal",
                    markDefs: [
                        {
                            _key: "link-bh",
                            _type: "link",
                            href: "/ortopedista-especialista-em-coluna/belo-horizonte"
                        },
                        {
                            _key: "link-contagem",
                            _type: "link",
                            href: "/ortopedista-especialista-em-coluna/contagem"
                        },
                        {
                            _key: "link-nova-lima",
                            _type: "link",
                            href: "/ortopedista-especialista-em-coluna/nova-lima"
                        },
                        {
                            _key: "link-betim",
                            _type: "link",
                            href: "/ortopedista-especialista-em-coluna/betim"
                        }
                    ],
                    children: [
                        {
                            _type: "span",
                            _key: "span-1",
                            text: "Cirurgias de coluna minimamente invasiva, de alta precisão com foco em rápida recuperação. Atendimento em ",
                            marks: []
                        },
                        {
                            _type: "span",
                            _key: "span-2",
                            text: "Belo Horizonte",
                            marks: ["link-bh"]
                        },
                        {
                            _type: "span",
                            _key: "span-3",
                            text: ", ",
                            marks: []
                        },
                        {
                            _type: "span",
                            _key: "span-4",
                            text: "Contagem",
                            marks: ["link-contagem"]
                        },
                        {
                            _type: "span",
                            _key: "span-5",
                            text: ", ",
                            marks: []
                        },
                        {
                            _type: "span",
                            _key: "span-6",
                            text: "Nova Lima",
                            marks: ["link-nova-lima"]
                        },
                        {
                            _type: "span",
                            _key: "span-7",
                            text: " e ",
                            marks: []
                        },
                        {
                            _type: "span",
                            _key: "span-8",
                            text: "Betim",
                            marks: ["link-betim"]
                        },
                        {
                            _type: "span",
                            _key: "span-9",
                            text: ".",
                            marks: []
                        }
                    ]
                }
            ],
            ctaText: "Descubra como podemos ajudar",
        } as any;


        if (videoAssetId) {
            heroDoc.backgroundVideo = {
                _type: "file",
                asset: {
                    _type: "reference",
                    _ref: videoAssetId
                }
            };
        }

        console.log("📤 Enviando documento 'hero' para o Sanity...");
        const heroResult = await writeClient.createOrReplace(heroDoc);
        console.log(`\n🎉 Sucesso! Documento 'hero-content' integrado/sobrescrito no Sanity. ID: ${heroResult._id}\n`);

        // 7. Seeding plans (convênios)
        console.log("\n📦 Iniciando seeding dos planos de saúde...");
        const planList = [
            { name: "Abertta", filename: "abertta.webp" },
            { name: "ABSPMC (CAIXINHA)", filename: "abspmc-caixinha.webp" },
            { name: "Alice", filename: "alice.webp" },
            { name: "Allianz", filename: "allianz.webp" },
            { name: "Amagis", filename: "amagis.webp" },
            { name: "Amil", filename: "amil.webp" },
            { name: "Ammp", filename: "ammp.webp" },
            { name: "ASSEFAZ", filename: "assefaz.webp" },
            { name: "Assembleia Legislativa", filename: "assembleia-legislativa.webp" },
            { name: "Assist Card", filename: "assist-card.webp" },
            { name: "Aurora Saude", filename: "aurora-saude.webp" },
            { name: "Bacen", filename: "bacen.webp" },
            { name: "Banco Central", filename: "banco-central.webp" },
            { name: "Blue Med Saúde", filename: "blue-med-saude.webp" },
            { name: "Bradesco", filename: "bradesco.webp" },
            { name: "Brasil Assistência", filename: "brasil-assistencia.webp" },
            { name: "Cabesp", filename: "cabesp.webp" },
            { name: "Camed Saúde", filename: "camed-saude.webp" },
            { name: "Care Plus", filename: "care-plus.webp" },
            { name: "Cassi", filename: "cassi.webp" },
            { name: "Casu", filename: "casu.webp" },
            { name: "Cemig", filename: "cemig.webp" },
            { name: "Cenibra", filename: "cenibra.webp" },
            { name: "Centauro", filename: "centauro.webp" },
            { name: "Copasa", filename: "copasa.webp" },
            { name: "Correios", filename: "correios.webp" },
            { name: "Desban", filename: "desban.webp" },
            { name: "Esaude Assist", filename: "esaude-assist.webp" },
            { name: "Esaude Card", filename: "esaude-card.webp" },
            { name: "Euro Center", filename: "euro-center.webp" },
            { name: "FSFX", filename: "fsfx.webp" },
            { name: "Fundafemg", filename: "fundafemg.webp" },
            { name: "fundação Fiat", filename: "fundacao-fiat.webp" },
            { name: "fundação Libertas", filename: "fundacao-libertas.webp" },
            { name: "Fusex", filename: "fuxex.webp" },
            { name: "Gama Saúde", filename: "gama-saude.webp" },
            { name: "Geap", filename: "geap.webp" },
            { name: "Hasten", filename: "hasten.webp" },
            { name: "Itau", filename: "itau.webp" },
            { name: "Mapfre", filename: "mapfre.webp" },
            { name: "Mater Dei", filename: "mater-dei.webp" },
            { name: "Mediservice", filename: "Medservice.webp" },
            { name: "MedPrev", filename: "medprev.webp" },
            { name: "MedSenior", filename: "medsenior.webp" },
            { name: "Medgold saúde", filename: "medgold-saude.webp" },
            { name: "Mondial", filename: "mondial.webp" },
            { name: "Omint", filename: "omint.webp" },
            { name: "PLAN CNEN", filename: "plan-cnen.webp" },
            { name: "Petrobras", filename: "petrobras.webp" },
            { name: "Plan Assiste", filename: "plan-assiste.webp" },
            { name: "Porto Seguro", filename: "porto-seguro.webp" },
            { name: "Postal Saúde", filename: "postal-saude.webp" },
            { name: "Prestige Internacional", filename: "prestige-internacional.webp" },
            { name: "Pró Social", filename: "pro-social.webp" },
            { name: "Proasa", filename: "proasa.webp" },
            { name: "Saude Caixa", filename: "saude-caixa.webp" },
            { name: "Seias", filename: "seias.webp" },
            { name: "Select Operadora", filename: "select-operadora.webp" },
            { name: "Sindifisco", filename: "sindifisco.webp" },
            { name: "Sistema Paulista", filename: "sistema-paulista.webp" },
            { name: "Stellantis", filename: "stellantis.webp" },
            { name: "SOS Assistance", filename: "sos-assistance.webp" },
            { name: "Sulamerica", filename: "sulamerica.webp" },
            { name: "TRF1", filename: "trf1.webp" },
            { name: "Unafisco MG", filename: "unafisco-mg.webp" },
            { name: "Unimed", filename: "unimed.webp" },
            { name: "Unimed Seguros", filename: "unimed-seguros.webp" },
            { name: "Usisaude", filename: "usisaude.webp" },
            { name: "Vale", filename: "vale.webp" }
        ];

        const planMap: Record<string, string> = {};

        for (const plan of planList) {
            const planDocId = `plan-${plan.name.toLowerCase().replace(/[^a-z0-9]/g, "-")}`;
            planMap[plan.name] = planDocId;

            const existing = await writeClient.fetch(`*[_type == "plan" && _id == $id][0]`, { id: planDocId });
            if (existing) {
                continue;
            }

            const imgPath = path.join(process.cwd(), "public", "images", "health-plans", plan.filename);
            if (fs.existsSync(imgPath)) {
                console.log(`📂 Carregando logo do plano: ${plan.name}...`);
                const buffer = fs.readFileSync(imgPath);
                const asset = await writeClient.assets.upload("image", buffer, { filename: plan.filename });

                await writeClient.createOrReplace({
                    _type: "plan",
                    _id: planDocId,
                    name: plan.name,
                    image: {
                        _type: "image",
                        asset: {
                            _type: "reference",
                            _ref: asset._id
                        },
                        alt: `Logo ${plan.name}`
                    }
                });
                console.log(`✅ Plano '${plan.name}' criado.`);
            }
        }

        // 8. Seeding the Insurance document
        const ceofTextPlans = ["Amil", "Abertta", "Bradesco", "Saude Caixa", "Cemig", "Copasa", "Fundafemg", "Itau", "Mediservice", "Petrobras", "Sulamerica", "Usisaude", "Vale", "Unimed"];
        const materDeiBetimPlains = [
            "Amil", "Abertta", "Allianz", "Alice", "Amagis", "Ammp", "ASSEFAZ", "Assembleia Legislativa", "Assis Card", "Bacen",
            "Blue Med Saúde", "Bradesco", "Brasil Assistência", "Cabesp", "Camed Saúde", "Care Plus", "Cassi", "Saude Caixa",
            "Cemig", "Cenibra", "Centauro", "Copasa", "Correios", "Desban", "Euro Center", "fundação Fiat", "FSFX", "Itau",
            "Fundafemg", "Gama Saúde", "Mapfre", "Mater Dei", "Mondial", "Omint", "Plan Assiste", "Porto Seguro", "Prestige Internacional",
            "Pró Social", "Proasa", "Petrobras", "Select Operadora", "Sindifisco", "Sistema Paulista", "SOS Assistance", "Sulamerica",
            "Unafisco MG", "Unimed Seguros", "Usisaude", "Vale"
        ];
        const numaiTextPlans = ["Amil", "Abertta", "Cassi", "Cemig", "Copasa", "fundação Fiat", "Fundação Libertas", "PLAN CNEN", "Unimed Seguros", "Sulamerica", "Usisaude", "Vale"];
        const centraTextPlans = ["Amil", "Abertta", "Bradesco", "Cassi", "Cemig", "Copasa", "Esaude Assist", "Esaude Card", "fundação Fiat", "Gama Saúde", "Geap", "Medgold saúde", "MedPrev", "MedSenior", "Medi Service", "Saude Caixa", "Stellantis", "Sulamerica", "Usisaude", "Vale"];
        const elcenterTextPlans = ["Abertta", "ABSPMC (CAIXINHA)", "Amagis", "Aurora Saude", "Bradesco", "Cassi", "Casu", "Cemig", "Copasa", "Stellantis", "Fundafemg", "fundação Libertas", "Fusex", "Geap", "Mediservice", "Postal Saúde", "Saude Caixa", "Sulamerica", "Vale"];

        const makePlanRefs = (planNames: string[]) => {
            return planNames
                .map(name => {
                    const id = planMap[name];
                    if (!id) return null;
                    return {
                        _type: "reference",
                        _ref: id,
                        _key: `ref-${id}`
                    };
                })
                .filter(Boolean);
        };

        const insuranceDoc = {
            _type: "insurance",
            _id: "insurance-content",
            id: "insurance-section",
            badge: "Planos de Saúde e Convênio",
            headline: {
                _type: "object",
                textTop: "Convênios",
                textHighlight: "Aceitos",
                textBottom: "",
            },
            description: "Trabalhamos com as principais operadoras do mercado para garantir agilidade, conforto e excelência no seu atendimento especializado em patologias da coluna.",
            hospitals: [
                {
                    _key: "hosp-1",
                    name: "CEOFE - Contagem",
                    speed: 10,
                    plans: makePlanRefs(ceofTextPlans)
                },
                {
                    _key: "hosp-2",
                    name: "Mater Dei Betim",
                    speed: 30,
                    plans: makePlanRefs(materDeiBetimPlains)
                },
                {
                    _key: "hosp-3",
                    name: "Clinica Numai",
                    speed: 10,
                    plans: makePlanRefs(numaiTextPlans)
                },
                {
                    _key: "hosp-4",
                    name: "Clinica Centra",
                    speed: 10,
                    plans: makePlanRefs(centraTextPlans)
                },
                {
                    _key: "hosp-5",
                    name: "Clinica Elcenter",
                    speed: 10,
                    plans: makePlanRefs(elcenterTextPlans)
                }
            ]
        };

        console.log("📤 Enviando documento 'insurance' para o Sanity...");
        const insResult = await writeClient.createOrReplace(insuranceDoc);
        console.log(`\n🎉 Sucesso! Documento 'insurance-content' integrado/sobrescrito no Sanity. ID: ${insResult._id}\n`);

        // 9. Seeding the Parallax document
        const localParallaxPath = path.join(process.cwd(), "public", "images", "parallax.webp");
        let parallaxAssetId = "";

        if (fs.existsSync(localParallaxPath)) {
            console.log("📂 Lendo imagem de fundo local: parallax.webp...");
            const parallaxBuffer = fs.readFileSync(localParallaxPath);
            console.log("📤 Fazendo upload da imagem do parallax para o Sanity...");
            const parallaxAsset = await writeClient.assets.upload("image", parallaxBuffer, {
                filename: "parallax.webp",
            });
            parallaxAssetId = parallaxAsset._id;
            console.log(`✅ Upload do parallax concluído! Asset ID: ${parallaxAssetId}`);
        } else {
            console.warn("⚠️ Imagem do parallax local não encontrada em:", localParallaxPath);
        }

        const parallaxDoc = {
            _type: "parallax",
            _id: "parallax-content",
            title: "Tecnologia & Precisão",
            backgroundImage: parallaxAssetId ? {
                _type: "image",
                asset: {
                    _type: "reference",
                    _ref: parallaxAssetId
                },
                alt: "Arthrodesis Parallax Background"
            } : undefined
        };

        console.log("📤 Enviando documento 'parallax' para o Sanity...");
        const pxResult = await writeClient.createOrReplace(parallaxDoc);
        console.log(`\n🎉 Sucesso! Documento 'parallax-content' integrado/sobrescrito no Sanity. ID: ${pxResult._id}\n`);

        // 10. Seeding the Procedures documents
        console.log("\n📦 Iniciando seeding dos tratamentos/procedimentos...");
        const procedureRefs: any[] = [];

        for (const proc of allProcedures) {
            const procDocId = `procedure-${proc.slug}`;

            const existing = await writeClient.fetch(`*[_type == "procedure" && _id == $id][0]`, { id: procDocId });
            let procImgAssetId = "";

            if (!existing && proc.imageUrl) {
                const imgPath = path.join(process.cwd(), "public", proc.imageUrl);
                if (fs.existsSync(imgPath)) {
                    console.log(`📂 Carregando imagem do procedimento: ${proc.title}...`);
                    const buffer = fs.readFileSync(imgPath);
                    const asset = await writeClient.assets.upload("image", buffer, { filename: `${proc.slug}.webp` });
                    procImgAssetId = asset._id;
                }
            } else if (existing && existing.image?.asset?._ref) {
                procImgAssetId = existing.image.asset._ref;
            }

            const procDoc = {
                _type: "procedure",
                _id: procDocId,
                title: proc.title,
                description: proc.description,
                icon: proc.icon,
                slug: {
                    _type: "slug",
                    current: proc.slug
                },
                content: await htmlToPortableText(proc.content as string, writeClient),
                metaTitle: proc.metaTitle || `${proc.title} | Dr. Romulo`,
                metaDescription: proc.metaDescription || proc.description,
                image: procImgAssetId ? {
                    _type: "image",
                    asset: {
                        _type: "reference",
                        _ref: procImgAssetId
                    },
                    alt: `Imagem do procedimento ${proc.title}`
                } : undefined
            };

            await writeClient.createOrReplace(procDoc);
            console.log(`✅ Procedimento '${proc.title}' cadastrado/sincronizado.`);

            procedureRefs.push({
                _type: "reference",
                _ref: procDocId,
                _key: `ref-${procDocId}`
            });
        }

        // Seeding the Procedures Section
        const proceduresSectionDoc = {
            _type: "procedures-section",
            _id: "procedures-section-content",
            badge: "Nossas Especialidades",
            title: "Tratamentos Especializados",
            description: "Oferecemos tratamentos personalizados para diversas patologias da coluna, utilizando as técnicas mais modernas da medicina.",
            items: procedureRefs
        };

        console.log("📤 Enviando documento 'procedures-section' para o Sanity...");
        const procSecResult = await writeClient.createOrReplace(proceduresSectionDoc);
        console.log(`\n🎉 Sucesso! Documento 'procedures-section-content' integrado/sobrescrito no Sanity. ID: ${procSecResult._id}\n`);

        // 11. Seeding the Testimonials documents
        console.log("\n📦 Iniciando seeding dos depoimentos (testimonials)...");
        const testimonialRefs: any[] = [];

        for (const t of allTestimonials) {
            const testimonialDocId = `testimonial-${t.id}`;

            const testimonialDoc = {
                _type: "testimonial",
                _id: testimonialDocId,
                id: t.id,
                name: t.name,
                text: t.text,
                rating: t.rating,
                location: t.location
            };

            await writeClient.createOrReplace(testimonialDoc);
            console.log(`✅ Depoimento de '${t.name}' cadastrado/sincronizado.`);

            testimonialRefs.push({
                _type: "reference",
                _ref: testimonialDocId,
                _key: `ref-${testimonialDocId}`
            });
        }

        // Seeding the Testimonials Section
        const testimonialsSectionDoc = {
            _type: "testimonials-section",
            _id: "testimonials-section-content",
            badge: "Experiências Reais",
            title: "O que dizem nossos Pacientes",
            testimonials: testimonialRefs
        };

        console.log("📤 Enviando documento 'testimonials-section' para o Sanity...");
        const testSecResult = await writeClient.createOrReplace(testimonialsSectionDoc);
        console.log(`\n🎉 Sucesso! Documento 'testimonials-section-content' integrado/sobrescrito no Sanity. ID: ${testSecResult._id}\n`);

        // 12. Seeding the Blog documents
        if (process.env.SKIP_POSTS === "true") {
            console.log("\n⏩ SKIP_POSTS=true detectado: Mantendo os artigos do blog existentes no Sanity intactos.");
        } else {
            console.log("\n📦 Iniciando seeding dos artigos do blog (posts)...");

            console.log("🧹 Removendo referências de artigos do blog-section...");
            try {
                await writeClient.patch("blog-section-content").set({ posts: [] }).commit();
                console.log("✅ Referências de posts limpas.");
            } catch (err: any) {
                console.warn("⚠️ Não foi possível limpar as referências (pode não existir ainda):", err.message || err);
            }

            console.log("🧹 Deletando todos os artigos do blog do Sanity...");
            await writeClient.delete({ query: '*[_type == "post"]' });
            console.log("✅ Limpeza de artigos concluída.");

            const postRefs: any[] = [];

            for (const p of allPosts) {
                const postDocId = `post-${p.slug}`;

                // Check if we need to upload the image
                let postImgAssetId = "";
                const existing = await writeClient.fetch(`*[_type == "post" && _id == $id][0]`, { id: postDocId });

                if (!existing && p.image) {
                    try {
                        console.log(`📥 Fazendo upload da imagem do artigo: ${p.title} (${p.image})...`);
                        let buffer: Buffer | null = null;
                        let filename = `${p.slug}.jpg`;
                        if (p.image.startsWith("/") || p.image.startsWith("images/")) {
                            const fullPath = path.join(process.cwd(), "public", p.image);
                            if (fs.existsSync(fullPath)) {
                                buffer = fs.readFileSync(fullPath);
                                filename = path.basename(p.image);
                            }
                        } else if (p.image.startsWith("http")) {
                            const res = await fetch(p.image);
                            if (res.ok) {
                                buffer = Buffer.from(await res.arrayBuffer());
                            }
                        }

                        if (buffer) {
                            const asset = await writeClient.assets.upload("image", buffer, { filename });
                            postImgAssetId = asset._id;
                            console.log(`✅ Upload da imagem do artigo concluído: ${postImgAssetId}`);
                        }
                    } catch (imgError) {
                        console.warn(`⚠️ Não foi possível fazer upload da imagem para o artigo ${p.title}:`, imgError);
                    }
                } else if (existing && existing.image?.asset?._ref) {
                    postImgAssetId = existing.image.asset._ref;
                }

                const postDoc = {
                    _type: "post",
                    _id: postDocId,
                    title: p.title,
                    slug: {
                        _type: "slug",
                        current: p.slug
                    },
                    date: p.date,
                    readTime: p.readTime,
                    category: p.category,
                    excerpt: p.excerpt,
                    content: await htmlToPortableText(p.content, writeClient),
                    image: postImgAssetId ? {
                        _type: "image",
                        asset: {
                            _type: "reference",
                            _ref: postImgAssetId
                        },
                        alt: `Imagem do artigo ${p.title}`
                    } : undefined,
                    ctaTitle: p.ctaTitle,
                    ctaDescription: p.ctaDescription
                };

                await writeClient.createOrReplace(postDoc);
                console.log(`✅ Artigo '${p.title}' cadastrado/sincronizado.`);

                postRefs.push({
                    _type: "reference",
                    _ref: postDocId,
                    _key: `ref-${postDocId}`
                });
            }

            // Seeding the Blog Section
            const blogSectionDoc = {
                _type: "blog-section",
                _id: "blog-section-content",
                badge: "Educação e Saúde",
                headline: {
                    _type: "object",
                    textTop: "Blog da Saúde",
                    textHighlight: "Vertebral",
                    textBottom: ""
                },
                description: "Informações especializadas sobre tratamentos, prevenção e as últimas tecnologias em cirurgia de coluna.",
                viewAllCta: "Ver Todos os Artigos",
                posts: postRefs
            };

            console.log("📤 Enviando documento 'blog-section' para o Sanity...");
            const blogSecResult = await writeClient.createOrReplace(blogSectionDoc);
            console.log(`\n🎉 Sucesso! Documento 'blog-section-content' integrado/sobrescrito no Sanity. ID: ${blogSecResult._id}\n`);
        }

        // 12b. Seeding the Location Settings (Templates)
        console.log("\n📦 Iniciando seeding das Configurações Globais de Localidades...");
        const locationSettingsDoc = {
            _type: "locationSettings",
            _id: "locationSettings",
            aboutParagraphsTemplate: [
                "Sou o Dr. Rômulo Oliveira, Médico Ortopedista Especialista em Coluna {{locationPrefix}}. Minha missão é tratar condições como hérnia de disco e ciatalgia, devolvendo sua mobilidade e bem-estar através de medicina baseada em evidências.",
                "Minha Trajetória e Abordagem:",
                "✅ Formação Sólida: Especialista pela SBOT com fellowship em Cirurgia da Coluna (Hospital da Baleia).",
                "✅ Tratamento Moderno: Foco em abordagens conservadoras e cirurgias minimamente invasivas para uma recuperação segura.",
                "✅ Local de Atendimento: {{clinicName}}."
            ],
            ctaTitleTemplate: "Precisa de uma avaliação médica especializada?",
            ctaDescriptionTemplate: "Agende sua consulta com um especialista em coluna {{locationPrefix}} e dê o primeiro passo para o seu tratamento adequado.",
            heroDescriptionTemplate: "Médico Ortopedista Especialista em Coluna {{locationPrefix}}. Especialista em cirurgia de coluna minimamente invasiva com foco em rápida recuperação, alívio da dor e atendimento humanizado. Avaliações disponíveis {{clinicName}}.",
            heroCtaTextTemplate: "Agendar Consulta {{locationPrefix}}"
        };
        await writeClient.createOrReplace(locationSettingsDoc);
        console.log("✅ Configurações Globais (locationSettings) cadastradas/sincronizadas.");

        // 13. Seeding the Location Pages (SEO)
        console.log("\n📦 Iniciando seeding das páginas de localidades (SEO)...");
        for (const [key, city] of Object.entries(citiesData)) {
            const locPageId = `location-page-${city.slug}`;

            const bgImageRefs: any[] = [];
            if (city.bgImages) {
                for (const imgPath of city.bgImages) {
                    const fullPath = path.join(process.cwd(), "public", imgPath);
                    if (fs.existsSync(fullPath)) {
                        console.log(`📥 Fazendo upload da imagem de fundo para a localidade ${city.name}: ${imgPath}`);
                        const buffer = fs.readFileSync(fullPath);
                        const asset = await writeClient.assets.upload("image", buffer, { filename: path.basename(imgPath) });
                        bgImageRefs.push({
                            _type: "image",
                            asset: {
                                _type: "reference",
                                _ref: asset._id
                            },
                            alt: `Imagem de fundo de ${city.name}`
                        });
                    } else {
                        console.warn(`⚠️ Imagem de fundo não encontrada para ${city.name}: ${fullPath}`);
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
                },
                bgImages: bgImageRefs.length > 0 ? bgImageRefs : undefined,
                aboutOverride: city.aboutOverride,
                ctaOverride: city.ctaOverride,
                address: city.address,
                geo: city.geo,
                locations: city.locations
            };

            await writeClient.createOrReplace(locPageDoc);
            console.log(`✅ Página de localidade '${city.name}' cadastrada/sincronizada.`);
        }

    } catch (error: any) {
        console.error("\n❌ Erro durante a exportação:", error.message || error);
        process.exit(1);
    }
}

main();
