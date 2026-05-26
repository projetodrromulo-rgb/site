import { defineField, defineType } from "sanity";

export const parallaxType = defineType({
    name: "parallax",
    title: "Seção Parallax (Parallax)",
    type: "document",
    fields: [
        defineField({
            name: "backgroundImage",
            title: "Imagem de Fundo (Background Image)",
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
            name: "title",
            title: "Texto Central (Title)",
            type: "string",
            validation: (Rule: any) => Rule.required(),
        }),
    ],
});
