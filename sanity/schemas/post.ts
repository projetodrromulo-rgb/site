import { defineField, defineType } from "sanity";

export const postType = defineType({
    name: "post",
    title: "Artigo do Blog",
    type: "document",
    fields: [
        defineField({
            name: "title",
            title: "Título do Artigo",
            type: "string",
            validation: (Rule: any) => Rule.required(),
        }),
        defineField({
            name: "slug",
            title: "Slug (URL)",
            type: "slug",
            options: {
                source: "title",
                maxLength: 96,
            },
            validation: (Rule: any) => Rule.required(),
        }),
        defineField({
            name: "date",
            title: "Data de Publicação (legado)",
            type: "date",
            options: {
                dateFormat: "DD/MM/YYYY",
            },
            description: "Campo mantido para compatibilidade. Prefira usar 'Data de Publicação Oficial' abaixo.",
            validation: (Rule: any) => Rule.required(),
        }),
        defineField({
            name: "publishedAt",
            title: "Data de Publicação Oficial",
            type: "datetime",
            description: "Data e hora de publicação do artigo (com fuso horário). Usada no SEO, sitemap e exibição ao leitor. Se não preenchida, será usada a Data de Publicação acima.",
            options: {
                dateFormat: "DD/MM/YYYY",
                timeFormat: "HH:mm",
                timeStep: 30,
            },
        }),
        defineField({
            name: "medicalReviewedAt",
            title: "Data da Revisão Médica",
            type: "date",
            options: {
                dateFormat: "DD/MM/YYYY",
            },
            description: "⚠️ Preencher SOMENTE quando o Dr. Rômulo revisar o conteúdo clinicamente. NÃO alterar por correções de ortografia ou formatação. Afeta o campo lastReviewed do schema médico (SEO).",
        }),
        defineField({
            name: "readTime",
            title: "Tempo de Leitura (ex: 5 min)",
            type: "string",
            validation: (Rule: any) => Rule.required(),
        }),
        defineField({
            name: "category",
            title: "Categoria (ex: Coluna, Saúde, etc.)",
            type: "string",
            validation: (Rule: any) => Rule.required(),
        }),
        defineField({
            name: "excerpt",
            title: "Resumo (Breve Descrição)",
            type: "array",
            of: [
                {
                    type: "block",
                    styles: [
                        { title: "Normal", value: "normal" },
                        { title: "H2", value: "h2" },
                        { title: "H3", value: "h3" },
                        { title: "Quote", value: "blockquote" },
                    ],
                    lists: [
                        { title: "Bullet", value: "bullet" },
                        { title: "Numbered", value: "number" },
                    ],
                    marks: {
                        decorators: [
                            { title: "Strong", value: "strong" },
                            { title: "Emphasis", value: "em" },
                            { title: "Underline", value: "underline" },
                        ],
                    },
                },
                {
                    type: "image",
                    options: { hotspot: true },
                    fields: [
                        {
                            name: "alt",
                            title: "Descrição da Imagem (Acessibilidade)",
                            type: "string",
                            validation: (Rule: any) => Rule.required(),
                        },
                    ],
                },
            ],
            validation: (Rule: any) => Rule.required(),
        }),
        defineField({
            name: "content",
            title: "Conteúdo do Artigo",
            type: "array",
            of: [
                {
                    type: "block",
                    styles: [
                        { title: "Normal", value: "normal" },
                        { title: "H2", value: "h2" },
                        { title: "H3", value: "h3" },
                        { title: "Quote", value: "blockquote" },
                    ],
                    lists: [
                        { title: "Bullet", value: "bullet" },
                        { title: "Numbered", value: "number" },
                    ],
                    marks: {
                        decorators: [
                            { title: "Strong", value: "strong" },
                            { title: "Emphasis", value: "em" },
                            { title: "Underline", value: "underline" },
                        ],
                    },
                },
                {
                    type: "image",
                    options: { hotspot: true },
                    fields: [
                        {
                            name: "alt",
                            title: "Descrição da Imagem (Acessibilidade)",
                            type: "string",
                            validation: (Rule: any) => Rule.required(),
                        },
                    ],
                },
            ],
            validation: (Rule: any) => Rule.required(),
        }),
        defineField({
            name: "image",
            title: "Imagem de Destaque",
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
            name: "ctaTitle",
            title: "Título do CTA do Post",
            type: "string",
            description: "Título exibido no card de agendamento ao final do post (Ex: Recupere sua qualidade de vida)",
        }),
        defineField({
            name: "ctaDescription",
            title: "Descrição do CTA do Post",
            type: "text",
            rows: 3,
            description: "Descrição exibida no card de agendamento ao final do post",
        }),
        defineField({
            name: "faq",
            title: "Perguntas Frequentes (FAQ)",
            type: "array",
            of: [
                {
                    type: "object",
                    name: "faqItem",
                    title: "Item de FAQ",
                    fields: [
                        {
                            name: "question",
                            title: "Pergunta",
                            type: "string",
                            validation: (Rule: any) => Rule.required(),
                        },
                        {
                            name: "answer",
                            title: "Resposta",
                            type: "array",
                            of: [
                                {
                                    type: "block",
                                    styles: [
                                        { title: "Normal", value: "normal" },
                                        { title: "H3", value: "h3" },
                                        { title: "H4", value: "h4" },
                                        { title: "Quote", value: "blockquote" },
                                    ],
                                    lists: [
                                        { title: "Bullet", value: "bullet" },
                                        { title: "Numbered", value: "number" },
                                    ],
                                    marks: {
                                        decorators: [
                                            { title: "Strong", value: "strong" },
                                            { title: "Emphasis", value: "em" },
                                            { title: "Underline", value: "underline" },
                                        ],
                                    },
                                }
                            ],
                            validation: (Rule: any) => Rule.required(),
                        },
                    ],
                },
            ],
        }),
        defineField({
            name: "references",
            title: "Referências Bibliográficas",
            description: "Adicione as referências do artigo. Use o botão de link para vincular ao artigo original.",
            type: "array",
            of: [
                {
                    type: "block",
                    styles: [{ title: "Normal", value: "normal" }],
                    lists: [
                        { title: "Bullet", value: "bullet" },
                        { title: "Numerada", value: "number" },
                    ],
                    marks: {
                        decorators: [
                            { title: "Negrito", value: "strong" },
                            { title: "Itálico", value: "em" },
                        ],
                        annotations: [
                            {
                                name: "link",
                                type: "object",
                                title: "Link Externo",
                                fields: [
                                    {
                                        name: "href",
                                        type: "url",
                                        title: "URL",
                                        validation: (Rule: any) =>
                                            Rule.uri({
                                                allowRelative: false,
                                                scheme: ["http", "https"],
                                            }),
                                    },
                                    {
                                        name: "blank",
                                        type: "boolean",
                                        title: "Abrir em nova aba",
                                        initialValue: true,
                                    },
                                ],
                            },
                        ],
                    },
                },
            ],
        }),
        defineField({
            name: "disclaimer",
            title: "Aviso / Disclaimer",
            type: "text",
            rows: 3,
            description: "Mensagem de aviso exibida logo abaixo da imagem do post. Deixe em branco para usar o texto padrão.",
            initialValue: "Este conteúdo possui caráter meramente educativo e informativo. Não substitui consulta médica. Agende uma consulta com um médico especialista se notar algum sintoma preocupante.",
        }),
        defineField({
            name: "seo",
            title: "Configurações de SEO e Metatags",
            type: "object",
            description: "Configurações de SEO personalizadas para este post. Se não preenchidos, os valores padrão do post serão utilizados.",
            options: {
                collapsible: true,
                collapsed: false,
            },
            fields: [
                defineField({
                    name: "metaTitle",
                    title: "Meta Title",
                    type: "string",
                    description: "Título exibido na aba do navegador e no Google. Ex: Bloqueio na coluna: quando pode ajudar? | Dr. Rômulo Oliveira",
                }),
                defineField({
                    name: "metaDescription",
                    title: "Meta Description",
                    type: "text",
                    rows: 3,
                    description: "Descrição para motores de busca (Google). Recomendado até 160 caracteres.",
                }),
                defineField({
                    name: "canonicalUrl",
                    title: "URL Canônica Personalizada",
                    type: "url",
                    description: "Deixe em branco para usar o padrão (https://www.drromulocoluna.com.br/blog/[slug]).",
                }),
                defineField({
                    name: "noIndex",
                    title: "Ocultar dos Motores de Busca (noindex)",
                    type: "boolean",
                    description: "Marque apenas se não quiser que este post apareça no Google.",
                    initialValue: false,
                }),
                defineField({
                    name: "ogTitle",
                    title: "Open Graph Title (Redes Sociais)",
                    type: "string",
                    description: "Título para compartilhamento no WhatsApp, Facebook, LinkedIn.",
                }),
                defineField({
                    name: "ogDescription",
                    title: "Open Graph Description (Redes Sociais)",
                    type: "text",
                    rows: 2,
                    description: "Descrição para compartilhamento em redes sociais.",
                }),
                defineField({
                    name: "ogImage",
                    title: "Imagem Open Graph / Social Media",
                    type: "image",
                    options: { hotspot: true },
                    description: "Imagem personalizada para redes sociais. Se não enviada, a imagem principal do post será usada.",
                }),
                defineField({
                    name: "authorName",
                    title: "Autor (Nome)",
                    type: "string",
                    description: "Ex: Dr. Rômulo Oliveira",
                    initialValue: "Dr. Rômulo Oliveira",
                }),
                defineField({
                    name: "sectionCategory",
                    title: "Seção / Categoria SEO",
                    type: "string",
                    description: "Ex: Saúde da Coluna",
                }),
                defineField({
                    name: "keywords",
                    title: "Palavras-chave (Keywords)",
                    type: "string",
                    description: "Palavras-chave separadas por vírgula. Ex: dor na lombar, tratamento de coluna, hérnia de disco",
                }),
                defineField({
                    name: "reviewerName",
                    title: "Revisor Médico (Nome)",
                    type: "string",
                    description: "Ex: Dr. Rômulo Oliveira. Usado no SEO (E-E-A-T) para indicar quem validou o artigo. Se não preenchido, será o autor.",
                }),
            ],
        }),
    ],
});
