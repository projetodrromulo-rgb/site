import { defineField, defineType } from "sanity";

export const categoryType = defineType({
    name: "category",
    title: "Categoria do Blog",
    type: "document",
    fields: [
        defineField({
            name: "title",
            title: "Nome da Categoria",
            type: "string",
            description: "Ex: Saúde da Coluna, Exames de Imagem, Procedimentos Minimamente Invasivos",
            validation: (Rule: any) => Rule.required(),
        }),
        defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {
                source: "title",
                maxLength: 96,
            },
            validation: (Rule: any) => Rule.required(),
        }),
        defineField({
            name: "description",
            title: "Descrição (Opcional)",
            type: "text",
            rows: 2,
            description: "Breve resumo sobre os temas agrupados nesta categoria.",
        }),
    ],
    preview: {
        select: {
            title: "title",
            subtitle: "description",
        },
    },
});

