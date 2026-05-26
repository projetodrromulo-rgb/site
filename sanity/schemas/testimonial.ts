import { defineField, defineType } from "sanity";

export const testimonialType = defineType({
    name: "testimonial",
    title: "Depoimento (Testimonial)",
    type: "document",
    fields: [
        defineField({
            name: "id",
            title: "ID Numérico",
            type: "number",
            validation: (Rule: any) => Rule.required(),
        }),
        defineField({
            name: "name",
            title: "Nome do Paciente",
            type: "string",
            validation: (Rule: any) => Rule.required(),
        }),
        defineField({
            name: "text",
            title: "Texto do Depoimento",
            type: "text",
            rows: 4,
            validation: (Rule: any) => Rule.required(),
        }),
        defineField({
            name: "rating",
            title: "Avaliação (Estrelas)",
            type: "number",
            description: "De 1 a 5.",
            initialValue: 5,
            validation: (Rule: any) => Rule.required().min(1).max(5),
        }),
        defineField({
            name: "location",
            title: "Cidade / Localização",
            type: "string",
            validation: (Rule: any) => Rule.required(),
        }),
    ],
});
