import { defineField, defineType } from "sanity";

export const postType = defineType({
    name: "post",
    title: "Artigo do Blog",
    type: "document",
    fields: [
        defineField({
            name: "title",
            title: "Título do Artigo",
            type: "string",
            validation: (Rule: any) => Rule.required(),
        }),
        defineField({
            name: "slug",
            title: "Slug (URL)",
            type: "slug",
            options: {
                source: "title",
                maxLength: 96,
            },
            validation: (Rule: any) => Rule.required(),
        }),
        defineField({
            name: "date",
            title: "Data de Publicação",
            type: "string",
            validation: (Rule: any) => Rule.required(),
        }),
        defineField({
            name: "readTime",
            title: "Tempo de Leitura (ex: 5 min)",
            type: "string",
            validation: (Rule: any) => Rule.required(),
        }),
        defineField({
            name: "category",
            title: "Categoria (ex: Coluna, Saúde, etc.)",
            type: "string",
            validation: (Rule: any) => Rule.required(),
        }),
        defineField({
            name: "excerpt",
            title: "Resumo (Breve Descrição)",
            type: "text",
            rows: 2,
            validation: (Rule: any) => Rule.required(),
        }),
        defineField({
            name: "content",
            title: "Conteúdo do Artigo",
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
            title: "Imagem de Destaque",
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
            validation: (Rule: any) => Rule.required(),
        }),
        defineField({
            name: "ctaTitle",
            title: "Título do CTA do Post",
            type: "string",
            description: "Título exibido no card de agendamento ao final do post (Ex: Recupere sua qualidade de vida)",
        }),
        defineField({
            name: "ctaDescription",
            title: "Descrição do CTA do Post",
            type: "text",
            rows: 3,
            description: "Descrição exibida no card de agendamento ao final do post",
        }),
    ],
});
