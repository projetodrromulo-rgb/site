import { defineField, defineType } from "sanity";

export const insuranceType = defineType({
    name: "insurance",
    title: "Planos de Saúde e Convênios (Insurance)",
    type: "document",
    fields: [
        defineField({
            name: "id",
            title: "ID da Seção (Âncora HTML)",
            type: "string",
            validation: (Rule: any) => Rule.required(),
        }),
        defineField({
            name: "badge",
            title: "Selo (Badge)",
            type: "string",
            validation: (Rule: any) => Rule.required(),
        }),
        defineField({
            name: "headline",
            title: "Título Principal (Headline)",
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
                defineField({
                    name: "textBottom",
                    title: "Texto Inferior",
                    type: "string",
                }),
            ],
        }),
        defineField({
            name: "description",
            title: "Descrição",
            type: "text",
            rows: 3,
            validation: (Rule: any) => Rule.required(),
        }),
        defineField({
            name: "hospitals",
            title: "Hospitais / Clínicas",
            type: "array",
            of: [
                {
                    type: "object",
                    title: "Hospital / Clínica",
                    fields: [
                        defineField({
                            name: "name",
                            title: "Nome do Hospital ou Clínica",
                            type: "string",
                            validation: (Rule: any) => Rule.required(),
                        }),
                        defineField({
                            name: "speed",
                            title: "Velocidade do Carrossel (Marquee)",
                            type: "number",
                            description: "Segundos para completar uma rotação (padrão: 10).",
                            initialValue: 10,
                        }),
                        defineField({
                            name: "plans",
                            title: "Convênios Aceitos",
                            type: "array",
                            of: [
                                {
                                    type: "reference",
                                    to: [{ type: "plan" }],
                                },
                            ],
                            validation: (Rule: any) => Rule.required(),
                        }),
                    ],
                },
            ],
        }),
    ],
});
