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
            title: "Conteúdo Detalhado (HTML / Texto)",
            type: "text",
            rows: 15,
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
