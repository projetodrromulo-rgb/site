import { defineField, defineType } from "sanity";

export const ctaType = defineType({
    name: "secao-cto",
    title: "Seção CTO",
    type: "document",
    fields: [
        defineField({
            name: "id",
            title: "ID da Seção (Âncora HTML)",
            type: "string",
            description: "Ex: 'contato' para criar a âncora #contato.",
            validation: (Rule: any) => Rule.required(),
        }),
        defineField({
            name: "headline",
            title: "Título Principal",
            type: "string",
            validation: (Rule: any) => Rule.required(),
        }),
        defineField({
            name: "description",
            title: "Descrição",
            type: "text",
            rows: 3,
            validation: (Rule: any) => Rule.required(),
        }),
        defineField({
            name: "whatsappUrl",
            title: "Link do WhatsApp",
            type: "url",
            validation: (Rule: any) => Rule.required(),
        }),
        defineField({
            name: "whatsappButtonText",
            title: "Texto do Botão do WhatsApp",
            type: "string",
            description: "Ex: 'Chamar no WhatsApp' ou 'Agendar Consulta'.",
            validation: (Rule: any) => Rule.required(),
        }),
        defineField({
            name: "whatsappMessage",
            title: "Mensagem Prefiltrada do WhatsApp",
            type: "text",
            rows: 3,
            description: "A mensagem padrão que o paciente enviará ao clicar.",
            validation: (Rule: any) => Rule.required(),
        }),
        defineField({
            name: "typingPhrases",
            title: "Frases de Efeito (Efeito Digitação)",
            type: "array",
            of: [{ type: "string" }],
            validation: (Rule: any) => Rule.required(),
        }),
        defineField({
            name: "trustSignals",
            title: "Sinais de Confiança",
            type: "array",
            of: [
                {
                    type: "object",
                    title: "Sinal de Confiança",
                    fields: [
                        defineField({
                            name: "icon",
                            title: "Ícone (ShieldCheck, Cpu, Zap, etc. do Lucide)",
                            type: "string",
                            validation: (Rule: any) => Rule.required(),
                        }),
                        defineField({
                            name: "title",
                            title: "Título",
                            type: "string",
                            validation: (Rule: any) => Rule.required(),
                        }),
                        defineField({
                            name: "description",
                            title: "Descrição / Detalhe",
                            type: "string",
                            validation: (Rule: any) => Rule.required(),
                        }),
                    ],
                },
            ],
        }),
    ],
});
