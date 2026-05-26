import { defineField, defineType } from "sanity";

export const aboutType = defineType({
    name: "about",
    title: "Sobre o Especialista",
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
                defineField({
                    name: "textBottom",
                    title: "Texto Inferior",
                    type: "string",
                }),
            ],
        }),
        defineField({
            name: "image",
            title: "Imagem do Especialista",
            type: "image",
            options: {
                hotspot: true,
            },
            fields: [
                defineField({
                    name: "alt",
                    title: "Descrição da Imagem (Acessibilidade/SEO)",
                    type: "string",
                    validation: (Rule: any) => Rule.required(),
                }),
            ],
            validation: (Rule: any) => Rule.required(),
        }),
        defineField({
            name: "paragraphs",
            title: "Parágrafos de Introdução",
            type: "array",
            of: [{ type: "string" }],
            description: "Adicione ou edite os parágrafos de biografia do especialista.",
        }),
        defineField({
            name: "formation",
            title: "Formação Acadêmica e Membro de Sociedades",
            type: "array",
            of: [{ type: "string" }],
            description: "Adicione os tópicos de especialização, residência e associações.",
        }),
        defineField({
            name: "features",
            title: "Destaques Rápidos (Features)",
            type: "array",
            of: [
                {
                    type: "object",
                    title: "Destaque",
                    fields: [
                        defineField({
                            name: "icon",
                            title: "Ícone (Award, Zap, Activity, ShieldCheck)",
                            type: "string",
                            validation: (Rule: any) => Rule.required(),
                        }),
                        defineField({
                            name: "title",
                            title: "Título do Destaque",
                            type: "string",
                            validation: (Rule: any) => Rule.required(),
                        }),
                        defineField({
                            name: "description",
                            title: "Subtítulo / Registro",
                            type: "string",
                            validation: (Rule: any) => Rule.required(),
                        }),
                    ],
                },
            ],
        }),
    ],
});
