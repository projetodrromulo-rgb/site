import { HeroContent } from "../types";

export async function getHeroContent(): Promise<HeroContent> {
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
        description: "Cirurgias de coluna minimamente invasiva, de alta precisão com foco em rápida recuperação.",
        cta: {
            text: "Descubra como podemos ajudar",
            whatsappUrl: "https://wa.me/5511999999999?text=Olá, vim do site Dr. Romulo. Gostaria de agendar uma consulta."
        },

        logoImage: {
            src: "/images/logo.svg",
            alt: "Dr. Rômulo Oliveira Logo"
        },
        backgroundVideo: {
            src: "/video/video-hero.webm",
            poster: "/images/bg-hero-poster.jpg"
        }


    };
};
