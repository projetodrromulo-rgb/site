import { defineField, defineType } from "sanity";

export const planType = defineType({
    name: "plan",
    title: "Plano de Saúde (Plan)",
    type: "document",
    fields: [
        defineField({
            name: "name",
            title: "Nome do Plano",
            type: "string",
            validation: (Rule: any) => Rule.required(),
        }),
        defineField({
            name: "image",
            title: "Logotipo do Plano",
            type: "image",
            options: { hotspot: true },
            fields: [
                defineField({
                    name: "alt",
                    title: "Descrição do Logo (Acessibilidade)",
                    type: "string",
                    validation: (Rule: any) => Rule.required(),
                }),
            ],
            validation: (Rule: any) => Rule.required(),
        }),
    ],
});
