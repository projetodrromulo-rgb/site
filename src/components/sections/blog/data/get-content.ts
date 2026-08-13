import { BlogSectionContent } from "../types";
import { client, projectId } from "../../../../lib/sanity";

const localBlogContent: BlogSectionContent = {
    badge: "Educação e Saúde",
    headline: {
        textTop: "Blog da Saúde",
        textHighlight: "Vertebral",
        textBottom: "",
        styles: {
            textColorTitle: "var(--color-title-fixed-dark)",
            textColorHighlightFrom: "var(--color-title-fixed-dark-highlight-from)",
            textColorHighlightTo: "var(--color-title-fixed-dark-highlight-to)",
            textColorBottom: "var(--color-title-fixed-dark)"
        }
    },
    description: "Informações especializadas sobre tratamentos, prevenção e as últimas tecnologias em cirurgia de coluna.",
    viewAllCta: "Ver Todos os Artigos",
    posts: [
        {
            title: "Dor Lombar: Quando a dor nas costas deixa de ser algo normal?",
            slug: "dor-lombar-quando-a-dor-nas-costas-deixa-de-ser-algo-normal",
            date: "24 Jun, 2026",
            readTime: "6 min",
            category: "Saúde da Coluna",
            excerpt: "A dor lombar é uma das queixas mais comuns. Entenda quando ela deixa de ser normal, as principais causas, quando fazer exames de imagem e tratamentos.",
            image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=1200"
        },
        {
            title: "Hérnia de disco precisa de cirurgia? Mitos e Verdades.",
            slug: "hernia-de-disco-precisa-de-cirurgia-mitos-e-verdades",
            date: "24 Jun, 2026",
            readTime: "5 min",
            category: "Saúde da Coluna",
            excerpt: "Receber o diagnóstico de uma hérnia de disco costuma vir acompanhado de uma dúvida imediata: será que eu vou precisar operar? Entenda os mitos e as verdades.",
            image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=1200"
        }
    ]
};

export async function getBlogContent(): Promise<BlogSectionContent> {
    if (!projectId || projectId === "placeholder") {
        return localBlogContent;
    }

    try {
        const query = `*[_type == "blog-section"][0] {
            badge,
            headline {
                textTop,
                textHighlight,
                textBottom
            },
            description,
            viewAllCta,
            posts[]-> {
                title,
                "slug": slug.current,
                date,
                readTime,
                category,
                excerpt,
                "image": coalesce(image.asset->url, "")
            }
        }`;

        const data = await client.fetch<any>(query);

        if (data) {
            return {
                badge: data.badge || localBlogContent.badge,
                headline: {
                    textTop: data.headline?.textTop || localBlogContent.headline.textTop,
                    textHighlight: data.headline?.textHighlight || localBlogContent.headline.textHighlight,
                    textBottom: data.headline?.textBottom || localBlogContent.headline.textBottom || "",
                    styles: localBlogContent.headline.styles
                },
                description: data.description || localBlogContent.description,
                viewAllCta: data.viewAllCta || localBlogContent.viewAllCta,
                posts: data.posts && data.posts.length > 0
                    ? data.posts.map((post: any) => ({
                        title: post.title,
                        slug: post.slug,
                        date: post.date,
                        readTime: post.readTime,
                        category: post.category,
                        excerpt: post.excerpt,
                        image: post.image,
                    }))
                    : []
            };
        }
    } catch (error) {
        console.error("Error fetching blog content from Sanity, falling back to local data:", error);
    }

    return localBlogContent;
}

