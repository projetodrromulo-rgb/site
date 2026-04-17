import { HeroContent } from "../types";
import { env } from "@/env";

export async function getHeroContent(): Promise<HeroContent> {
    return {
        typingPhrases: [
            "Ortopedia e Cirurgia de Coluna",
            "Cirurgia Minimamente Invasiva",
            "Recuperação Rápida e Segura"
        ],
        headline: {
            textTop: "Sua jornada para uma",
            textHighlight: "vida sem dor",
            textBottom: "começa aqui",
            styles: {
                textColorTitle: "var(--color-title-primary)",
                textColorHighlightFrom: "var(--color-title-primary-highlight-from)",
                textColorHighlightTo: "var(--color-title-primary-highlight-to)",
                textColorBottom: "var(--color-title-primary)"
            }
        },
        description: "Cirurgias de coluna minimamente invasiva, de alta precisão com foco em rápida recuperação.",
        cta: {
            text: "Descubra como podemos ajudar",
            whatsAppNumber: env().whatsAppNumber
        },

        logoImage: {
            src: "/images/logo.svg",
            alt: "Dr. Rômulo Oliveira Logo"
        },
        backgroundVideo: {
            src: "/video/video-hero.webm",
            poster: "/images/bg-hero-poster.png"
        }


    };
};
