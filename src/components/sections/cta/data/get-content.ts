import { CTAContent } from "../types";
import React from "react";
import { ShieldCheck, Cpu, Zap } from "lucide-react";

export async function getCTAContent(): Promise<CTAContent> {
    return {
        id: "contato",
        headline: "Agende sua Avaliação",
        description: "E descubra como as técnicas minimamente invasivas podem restaurar sua qualidade de vida com segurança e rapidez.",
        whatsappUrl: "https://wa.me/5511999999999?text=Olá, Vim do site doDr. Romulo. Gostaria de agendar uma consulta especializada.",
        trustSignals: [
            {
                icon: React.createElement(ShieldCheck, { className: "w-8 h-8 md:w-10 md:h-10 text-[#0db9f2]" }),
                title: "Atendimento Especializado",
                description: "Cuidado focado em patologias complexas da coluna."
            },
            {
                icon: React.createElement(Cpu, { className: "w-8 h-8 md:w-10 md:h-10 text-[#0db9f2]" }),
                title: "Tecnologia de Ponta",
                description: "Cirurgias guiadas por vídeo e ferramentas robóticas."
            },
            {
                icon: React.createElement(Zap, { className: "w-8 h-8 md:w-10 md:h-10 text-[#0db9f2]" }),
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
}
