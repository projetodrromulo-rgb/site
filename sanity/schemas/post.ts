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
    ],
});
