import { defineField, defineType } from "sanity";

export const blogSectionType = defineType({
    name: "blog-section",
    title: "Seção do Blog",
    type: "document",
    fields: [
        defineField({
            name: "badge",
            title: "Selo (Badge)",
            type: "string",
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
            validation: (Rule: any) => Rule.required(),
        }),
        defineField({
            name: "description",
            title: "Descrição",
            type: "text",
            rows: 2,
            validation: (Rule: any) => Rule.required(),
        }),
        defineField({
            name: "viewAllCta",
            title: "Texto do Botão 'Ver Todos'",
            type: "string",
            validation: (Rule: any) => Rule.required(),
        }),
        defineField({
            name: "posts",
            title: "Artigos em Destaque",
            type: "array",
            of: [
                {
                    type: "reference",
                    to: [{ type: "post" }],
                },
            ],
            validation: (Rule: any) => Rule.required(),
        }),
    ],
});
