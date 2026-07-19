import { HeroContent } from "../types";
import { env } from "@/env";
import { client, projectId } from "../../../../lib/sanity";

const localHeroContent: HeroContent = {
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
    cta: {
        text: "Descubra como podemos ajudar",
        whatsAppNumber: env().whatsAppNumber
    },
    backgroundVideo: {
        src: "/video/video-hero.webm"
    }
};

export async function getHeroContent(): Promise<HeroContent> {
    if (!projectId || projectId === "placeholder") {
        return localHeroContent;
    }

    try {
        const query = `*[_type == "hero"][0] {
            typingPhrases,
            headline {
                textTop,
                textHighlight,
                textBottom
            },
            description,
            ctaText,
            backgroundVideo {
                "src": coalesce(asset->url, "")
            }
        }`;

        const data = await client.fetch<any>(query);

        if (data) {
            return {
                typingPhrases: data.typingPhrases && data.typingPhrases.length > 0 ? data.typingPhrases : localHeroContent.typingPhrases,
                headline: {
                    textTop: data.headline?.textTop || localHeroContent.headline.textTop,
                    textHighlight: data.headline?.textHighlight || localHeroContent.headline.textHighlight,
                    textBottom: data.headline?.textBottom || localHeroContent.headline.textBottom || "",
                    styles: localHeroContent.headline.styles
                },
                description: data.description || localHeroContent.description,
                cta: {
                    text: data.ctaText || localHeroContent.cta.text,
                    whatsAppNumber: localHeroContent.cta.whatsAppNumber
                },
                backgroundVideo: {
                    src: data.backgroundVideo?.src || localHeroContent.backgroundVideo.src
                }
            };
        }
    } catch (error) {
        console.error("Error fetching hero content from Sanity, falling back to local data:", error);
    }

    return localHeroContent;
}
