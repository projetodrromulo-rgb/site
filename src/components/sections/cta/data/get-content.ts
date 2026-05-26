import { CTAContent } from "../types";
import React from "react";
import * as Icons from "lucide-react";
import { client, projectId } from "../../../../lib/sanity";

const localCTAContent: CTAContent = {
    id: "contato",
    headline: "Agende sua Avaliação",
    description: "E descubra como as técnicas minimamente invasivas podem restaurar sua qualidade de vida com segurança e rapidez.",
    whatsappUrl: "https://wa.me/5531996689572?text=Olá! Vim do site do Dr. Romulo. Gostaria de mais informações sobre o atendimento",
    whatsappButtonText: "Chamar no WhatsApp",
    whatsappMessage: "Olá! Vim do site do Dr. Romulo. Gostaria de mais informações sobre o atendimento",
    trustSignals: [
        {
            icon: React.createElement(Icons.ShieldCheck, { className: "w-8 h-8 md:w-10 md:h-10 text-[#0db9f2]" }),
            title: "Atendimento Especializado",
            description: "Cuidado focado em patologias complexas da coluna."
        },
        {
            icon: React.createElement(Icons.Cpu, { className: "w-8 h-8 md:w-10 md:h-10 text-[#0db9f2]" }),
            title: "Tecnologia de Ponta",
            description: "Cirurgias guiadas por vídeo e ferramentas robóticas."
        },
        {
            icon: React.createElement(Icons.Zap, { className: "w-8 h-8 md:w-10 md:h-10 text-[#0db9f2]" }),
            title: "Recuperação Rápida",
            description: "Procedimentos ambulatoriais e retorno precoce às atividades."
        }
    ],
    typingPhrases: [
        "Especialista em Coluna",
        "Ortopedia e Cirurgia de Coluna",
        "Cirurgia Minimamente Invasiva",
        "Recuperação Rápida e Segura"
    ],
};

export async function getCTAContent(): Promise<CTAContent> {
    if (!projectId || projectId === "placeholder") {
        return localCTAContent;
    }

    try {
        const query = `*[_type == "secao-cto"][0] {
            id,
            headline,
            description,
            whatsappUrl,
            whatsappButtonText,
            whatsappMessage,
            typingPhrases,
            trustSignals[] {
                icon,
                title,
                description
            }
        }`;

        const data = await client.fetch<any>(query);

        if (data) {
            return {
                id: data.id || localCTAContent.id,
                headline: data.headline || localCTAContent.headline,
                description: data.description || localCTAContent.description,
                whatsappUrl: data.whatsappUrl || localCTAContent.whatsappUrl,
                whatsappButtonText: data.whatsappButtonText || localCTAContent.whatsappButtonText,
                whatsappMessage: data.whatsappMessage || localCTAContent.whatsappMessage,
                typingPhrases: data.typingPhrases && data.typingPhrases.length > 0 ? data.typingPhrases : localCTAContent.typingPhrases,
                trustSignals: data.trustSignals && data.trustSignals.length > 0 
                    ? data.trustSignals.map((sig: any) => {
                        const IconComponent = (Icons as any)[sig.icon] || Icons.HelpCircle;
                        return {
                            icon: React.createElement(IconComponent, { className: "w-8 h-8 md:w-10 md:h-10 text-[#0db9f2]" }),
                            title: sig.title,
                            description: sig.description
                        };
                    })
                    : localCTAContent.trustSignals
            };
        }
    } catch (error) {
        console.error("Error fetching CTA content from Sanity, falling back to local data:", error);
    }

    return localCTAContent;
}
