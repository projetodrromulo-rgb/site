import { defineField, defineType } from "sanity";

export const testimonialsSectionType = defineType({
    name: "testimonials-section",
    title: "Seção de Depoimentos (Testimonials)",
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
            name: "testimonials",
            title: "Depoimentos em Destaque",
            type: "array",
            of: [
                {
                    type: "reference",
                    to: [{ type: "testimonial" }],
                },
            ],
            validation: (Rule: any) => Rule.required(),
        }),
    ],
});
