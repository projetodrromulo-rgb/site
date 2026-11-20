import { defineField, defineType } from "sanity";

export const authorType = defineType({
    name: "author",
    title: "Autor / Perfil do Médico",
    type: "document",
    fields: [
        defineField({
            name: "name",
            title: "Nome do Médico / Autor",
            type: "string",
            description: "Ex: Dr. Rômulo Oliveira",
            initialValue: "Dr. Rômulo Oliveira",
            validation: (Rule: any) => Rule.required(),
        }),
        defineField({
            name: "role",
            title: "Função / Especialidade",
            type: "string",
            description: "Ex: Ortopedista e Cirurgião de Coluna",
            initialValue: "Ortopedista e Cirurgião de Coluna",
            validation: (Rule: any) => Rule.required(),
        }),
        defineField({
            name: "credentials",
            title: "Registros Profissionais (CRM / RQE / TEOT)",
            type: "string",
            description: "Ex: CRM-MG 73.889 | RQE 59.057 | TEOT 19.406",
            initialValue: "CRM-MG 73.889 | RQE 59.057 | TEOT 19.406",
            validation: (Rule: any) => Rule.required(),
        }),
        defineField({
            name: "avatar",
            title: "Foto do Autor",
            type: "image",
            options: { hotspot: true },
            fields: [
                defineField({
                    name: "alt",
                    title: "Texto Alternativo (Acessibilidade)",
                    type: "string",
                    initialValue: "Dr. Rômulo Oliveira",
                }),
            ],
            description: "Foto exibida no cabeçalho do artigo, no card 'Escrito por' e nos cards do blog.",
        }),
        defineField({
            name: "bio",
            title: "Mini Biografia (Card 'Escrito por')",
            type: "text",
            rows: 4,
            description: "Descrição exibida no card de autor ao final dos artigos do blog.",
            initialValue:
                "Médico ortopedista formado pela UNEC, especialista em Ortopedia e Traumatologia pela SBOT e com fellowship em Cirurgia da Coluna pelo Hospital da Baleia, em Belo Horizonte.",
        }),
    ],
    preview: {
        select: {
            title: "name",
            subtitle: "role",
            media: "avatar",
        },
    },
});

