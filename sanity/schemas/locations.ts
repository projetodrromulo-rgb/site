import { defineField, defineType } from "sanity";

export const locationsType = defineType({
    name: "locations",
    title: "Onde Atendemos (Locations)",
    type: "document",
    fields: [
        defineField({
            name: "subtitle",
            title: "Subtítulo",
            type: "string",
            validation: (Rule: any) => Rule.required(),
        }),
        defineField({
            name: "headline",
            title: "Título Principal",
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
            ],
        }),
        defineField({
            name: "description",
            title: "Descrição",
            type: "text",
            rows: 2,
            validation: (Rule: any) => Rule.required(),
        }),
        defineField({
            name: "units",
            title: "Unidades de Atendimento",
            type: "array",
            of: [
                {
                    type: "object",
                    title: "Unidade",
                    fields: [
                        defineField({
                            name: "id",
                            title: "ID Único (ex: materdei-betim)",
                            type: "string",
                            validation: (Rule: any) => Rule.required(),
                        }),
                        defineField({
                            name: "title",
                            title: "Nome da Unidade",
                            type: "string",
                            validation: (Rule: any) => Rule.required(),
                        }),
                        defineField({
                            name: "subtitle",
                            title: "Subtítulo / Bairro",
                            type: "string",
                            validation: (Rule: any) => Rule.required(),
                        }),
                        defineField({
                            name: "address",
                            title: "Endereço Completo",
                            type: "string",
                            validation: (Rule: any) => Rule.required(),
                        }),
                        defineField({
                            name: "phone",
                            title: "Telefone de Contato",
                            type: "string",
                            validation: (Rule: any) => Rule.required(),
                        }),
                        defineField({
                            name: "mapUrl",
                            title: "Link do Google Maps",
                            type: "url",
                            validation: (Rule: any) => Rule.required(),
                        }),
                        defineField({
                            name: "websiteUrl",
                            title: "Website / Link Oficial",
                            type: "url",
                            validation: (Rule: any) => Rule.required(),
                        }),
                        defineField({
                            name: "image",
                            title: "Imagem do Hospital / Clínica",
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
                },
            ],
        }),
    ],
});
