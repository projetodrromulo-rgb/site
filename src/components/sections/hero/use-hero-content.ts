import { HeroContent } from "./types";

export const getHeroContent = (): HeroContent => {
    // No futuro, aqui você poderia fazer um fetch para um CMS
    return {
        typingPhrases: [
            "Ortopedia e Cirurgia de Coluna",
            "Cirurgia Minimamente Invasiva",
            "Recuperação Rápida e Segura"
        ],
        headline: {
            top: "Sua jornada para uma",
            highlight: "vida sem dor",
            bottom: "começa aqui"
        },
        description: "Cirurgias de coluna de alta precisão com foco em rápida recuperação. Atendimento especializado com o Dr. Rômulo Oliveira.",
        cta: {
            text: "Descubra como podemos ajudar",
            whatsappUrl: "https://wa.me/5511999999999?text=Olá, Dr. Romulo. Gostaria de agendar uma consulta."
        }
    };
};
