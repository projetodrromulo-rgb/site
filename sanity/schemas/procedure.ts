import { defineField, defineType } from "sanity";

export const procedureType = defineType({
    name: "procedure",
    title: "Tratamento / Procedimento",
    type: "document",
    fields: [
        defineField({
            name: "title",
            title: "Título do Procedimento",
            type: "string",
            validation: (Rule: any) => Rule.required(),
        }),
        defineField({
            name: "description",
            title: "Breve Descrição",
            type: "text",
            rows: 2,
            validation: (Rule: any) => Rule.required(),
        }),
        defineField({
            name: "icon",
            title: "Ícone (ex: Activity, Brain, Shield, Lucide icons)",
            type: "string",
            validation: (Rule: any) => Rule.required(),
        }),
        defineField({
            name: "slug",
            title: "Slug (URL única)",
            type: "slug",
            options: {
                source: "title",
                maxLength: 96,
            },
            validation: (Rule: any) => Rule.required(),
        }),
        defineField({
            name: "content",
            title: "Conteúdo Detalhado",
            type: "array",
            of: [
                {
                    type: "block",
                    styles: [
                        { title: "Normal", value: "normal" },
                        { title: "H2", value: "h2" },
                        { title: "H3", value: "h3" },
                        { title: "Quote", value: "blockquote" },
                    ],
                    lists: [
                        { title: "Bullet", value: "bullet" },
                        { title: "Numbered", value: "number" },
                    ],
                    marks: {
                        decorators: [
                            { title: "Strong", value: "strong" },
                            { title: "Emphasis", value: "em" },
                            { title: "Underline", value: "underline" },
                        ],
                    },
                },
                {
                    type: "image",
                    options: { hotspot: true },
                    fields: [
                        {
                            name: "alt",
                            title: "Descrição da Imagem (Acessibilidade)",
                            type: "string",
                            validation: (Rule: any) => Rule.required(),
                        },
                    ],
                },
            ],
            validation: (Rule: any) => Rule.required(),
        }),
        defineField({
            name: "image",
            title: "Imagem do Procedimento",
            type: "image",
            options: { hotspot: true },
            fields: [
                defineField({
                    name: "alt",
                    title: "Descrição da Imagem (Acessibilidade)",
                    type: "string",
                    validation: (Rule: any) => Rule.required(),
                }),
            ],
        }),
        defineField({
            name: "metaTitle",
            title: "Meta Título (SEO)",
            type: "string",
        }),
        defineField({
            name: "metaDescription",
            title: "Meta Descrição (SEO)",
            type: "string",
        }),
    ],
});
