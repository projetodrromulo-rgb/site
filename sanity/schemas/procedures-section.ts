import { defineField, defineType } from "sanity";

export const proceduresSectionType = defineType({
    name: "procedures-section",
    title: "Seção de Tratamentos (Procedures)",
    type: "document",
    fields: [
        defineField({
            name: "badge",
            title: "Selo (Badge)",
            type: "string",
            validation: (Rule: any) => Rule.required(),
        }),
        defineField({
            name: "title",
            title: "Título Principal",
            type: "string",
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
            name: "items",
            title: "Procedimentos em Destaque",
            type: "array",
            of: [
                {
                    type: "reference",
                    to: [{ type: "procedure" }],
                },
            ],
            validation: (Rule: any) => Rule.required(),
        }),
    ],
});
