import { defineField, defineType } from "sanity";

export const footerType = defineType({
    name: "footer",
    title: "Rodapé (Footer)",
    type: "document",
    fields: [
        defineField({
            name: "brandDescription",
            title: "Descrição da Marca (Brand Description)",
            type: "text",
            rows: 3,
            validation: (Rule: any) => Rule.required(),
        }),
        defineField({
            name: "crm",
            title: "CRM",
            type: "string",
            validation: (Rule: any) => Rule.required(),
        }),
        defineField({
            name: "navLinks",
            title: "Links de Navegação",
            type: "array",
            of: [
                {
                    type: "object",
                    title: "Link",
                    fields: [
                        defineField({
                            name: "label",
                            title: "Rótulo (Label)",
                            type: "string",
                            validation: (Rule: any) => Rule.required(),
                        }),
                        defineField({
                            name: "href",
                            title: "Destino (Href)",
                            type: "string",
                            validation: (Rule: any) => Rule.required(),
                        }),
                    ],
                },
            ],
        }),
        defineField({
            name: "socialLinks",
            title: "Links de Redes Sociais",
            type: "array",
            of: [
                {
                    type: "object",
                    title: "Link Social",
                    fields: [
                        defineField({
                            name: "platform",
                            title: "Plataforma (ex: whatsapp, instagram)",
                            type: "string",
                            validation: (Rule: any) => Rule.required(),
                        }),
                        defineField({
                            name: "href",
                            title: "Link de Destino",
                            type: "string",
                            validation: (Rule: any) => Rule.required(),
                        }),
                    ],
                },
            ],
        }),
    ],
});
