import { defineField, defineType } from "sanity";

export const heroType = defineType({
    name: "hero",
    title: "Seção Principal (Hero)",
    type: "document",
    fields: [

        defineField({
            name: "typingPhrases",
            title: "Frases de Efeito (Efeito Digitação)",
            type: "array",
            of: [{ type: "string" }],
            validation: (Rule: any) => Rule.required(),
        }),
        defineField({
            name: "headline",
            title: "Título Principal (Headline)",
            type: "object",
            fields: [
                defineField({
                    name: "textTop",
                    title: "Texto Superior",
                    type: "string",
                }),
                defineField({
                    name: "textHighlight",
                    title: "Texto em Destaque (Azul)",
                    type: "string",
                }),
                defineField({
                    name: "textBottom",
                    title: "Texto Inferior",
                    type: "string",
                }),
            ],
        }),
        defineField({
            name: "description",
            title: "Descrição",
            type: "text",
            rows: 2,
            validation: (Rule: any) => Rule.required(),
        }),
        defineField({
            name: "ctaText",
            title: "Texto do Botão (CTA)",
            type: "string",
            validation: (Rule: any) => Rule.required(),
        }),
        defineField({
            name: "backgroundVideo",
            title: "Vídeo de Fundo (Background Video)",
            type: "file",
            options: {
                accept: "video/*",
            },
            validation: (Rule: any) => Rule.required(),
        }),
    ],
});
