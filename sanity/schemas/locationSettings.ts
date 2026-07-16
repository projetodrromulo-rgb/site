import { defineField, defineType } from "sanity";

export const locationSettingsType = defineType({
    name: "locationSettings",
    title: "Configurações Globais de Localidades",
    type: "document",
    fields: [
        defineField({
            name: "aboutParagraphsTemplate",
            title: "Template - Sobre o Médico (Parágrafos)",
            type: "array",
            of: [{ type: "text", rows: 3 }],
            description: "Use {{locationPrefix}} (ex: 'em Belo Horizonte') e {{clinicName}} (ex: 'na Clínica NUMAI') nas frases."
        }),
        defineField({
            name: "ctaTitleTemplate",
            title: "Template - Título do CTA",
            type: "string",
            description: "Use as variáveis se desejar, ex: 'Precisa de uma avaliação médica especializada?'"
        }),
        defineField({
            name: "ctaDescriptionTemplate",
            title: "Template - Descrição do CTA",
            type: "text",
            rows: 2,
            description: "Use {{locationPrefix}} (ex: 'em Belo Horizonte') nas frases."
        }),
        defineField({
            name: "heroDescriptionTemplate",
            title: "Template - Descrição do Hero",
            type: "text",
            rows: 2,
            description: "Use {{locationPrefix}} e {{clinicName}}."
        }),
        defineField({
            name: "heroCtaTextTemplate",
            title: "Template - Botão do Hero",
            type: "string",
            description: "Use {{locationPrefix}} (ex: 'Agendar Consulta {{locationPrefix}}')."
        })
    ]
});
