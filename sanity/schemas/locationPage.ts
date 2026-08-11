import { defineField, defineType } from "sanity";

export const locationPageType = defineType({
    name: "locationPage",
    title: "Páginas de Locais (SEO)",
    type: "document",
    fields: [
        defineField({ 
            name: "name", 
            title: "Nome do Local", 
            type: "string",
            validation: (Rule) => Rule.required()
        }),
        defineField({ 
            name: "slug", 
            title: "Slug da URL", 
            type: "slug", 
            options: { source: "name", maxLength: 96 },
            validation: (Rule) => Rule.required()
        }),
        defineField({
            name: "locationPrefix",
            title: "Prefixo do Local (ex: 'em Belo Horizonte', 'no Barreiro')",
            type: "string",
            validation: (Rule) => Rule.required()
        }),
        defineField({
            name: "clinicName",
            title: "Nome da Clínica Base (ex: 'na Clínica NUMAI e Clínica Elcenter Barreiro')",
            type: "string",
            validation: (Rule) => Rule.required()
        }),
        defineField({ 
            name: "title", 
            title: "Meta Title (SEO)", 
            type: "string",
            validation: (Rule) => Rule.required()
        }),
        defineField({ 
            name: "metaDescription", 
            title: "Meta Description (SEO)", 
            type: "text",
            rows: 2,
            validation: (Rule) => Rule.required()
        }),
        defineField({ 
            name: "keywords", 
            title: "Keywords (SEO)", 
            type: "array", 
            of: [{ type: "string" }] 
        }),
        defineField({
            name: "heroContent",
            title: "Conteúdo do Hero",
            type: "object",
            fields: [
                defineField({
                    name: "headline",
                    title: "Headline",
                    type: "object",
                    fields: [
                        defineField({ name: "textTop", title: "Texto Superior", type: "string" }),
                        defineField({ name: "textHighlight", title: "Texto Destaque", type: "string" }),
                        defineField({ name: "textBottom", title: "Texto Inferior", type: "string" }),
                    ]
                }),
                defineField({ name: "description", title: "Descrição", type: "text", rows: 2 }),
                defineField({ name: "ctaText", title: "Texto do Botão", type: "string" })
            ]
        }),
        defineField({
            name: "bgImages",
            title: "Imagens de Fundo",
            type: "array",
            of: [
                {
                    type: "image",
                    options: { hotspot: true },
                    fields: [
                        defineField({
                            name: "alt",
                            title: "Texto Alternativo",
                            type: "string"
                        })
                    ]
                }
            ]
        }),
        defineField({
            name: "aboutOverride",
            title: "Sobre (Sobrescrita Específica)",
            type: "object",
            fields: [
                defineField({ name: "subtitle", title: "Subtítulo", type: "string" }),
                defineField({ name: "h2Title", title: "Título H2 do Sobre", type: "string" }),
                defineField({ name: "paragraphs", title: "Parágrafos", type: "array", of: [{ type: "text", rows: 3 }] }),
                defineField({ name: "neighborhoods", title: "Bairros Atendidos", type: "array", of: [{ type: "string" }] })
            ]
        }),
        defineField({
            name: "conditionsTitle",
            title: "Título de Condições/Tratamentos",
            type: "string"
        }),
        defineField({
            name: "conditions",
            title: "Condições e Tratamentos Locais",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        defineField({ name: "title", title: "Título da Condição", type: "string", validation: (Rule) => Rule.required() }),
                        defineField({ name: "description", title: "Descrição", type: "text", rows: 3, validation: (Rule) => Rule.required() })
                    ]
                }
            ]
        }),
        defineField({
            name: "ctaOverride",
            title: "Call to Action (Sobrescrita Específica)",
            type: "object",
            fields: [
                defineField({ name: "title", title: "Título Principal", type: "string" }),
                defineField({ name: "description", title: "Descrição", type: "text", rows: 2 })
            ]
        }),
        defineField({
            name: "address",
            title: "Endereço Base (Schema LocalBusiness)",
            type: "object",
            fields: [
                defineField({ name: "streetAddress", title: "Logradouro", type: "string" }),
                defineField({ name: "postalCode", title: "CEP", type: "string" })
            ]
        }),
        defineField({
            name: "geo",
            title: "Geolocalização (Schema LocalBusiness)",
            type: "object",
            fields: [
                defineField({ name: "latitude", title: "Latitude", type: "number" }),
                defineField({ name: "longitude", title: "Longitude", type: "number" })
            ]
        }),
        defineField({
            name: "locations",
            title: "Unidades Associadas (Schema LocalBusiness)",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        defineField({ name: "name", title: "Nome da Clínica/Hospital", type: "string" }),
                        defineField({ name: "streetAddress", title: "Endereço", type: "string" }),
                        defineField({ name: "telephone", title: "Telefone", type: "string" })
                    ]
                }
            ]
        }),
        defineField({
            name: "faqsTitle",
            title: "Título das Perguntas Frequentes (FAQ)",
            type: "string"
        }),
        defineField({
            name: "faqs",
            title: "Perguntas Frequentes (FAQ)",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        defineField({ name: "question", title: "Pergunta", type: "string", validation: (Rule) => Rule.required() }),
                        defineField({ name: "answer", title: "Resposta", type: "text", rows: 3, validation: (Rule) => Rule.required() })
                    ]
                }
            ]
        })
    ]
});
