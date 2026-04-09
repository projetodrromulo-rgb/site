import { allPosts } from "@/data/posts";
import { BlogSectionContent } from "../types";

export async function getBlogContent(): Promise<BlogSectionContent> {
    // In a real scenario, this could be a call to a CMS
    return {
        badge: "Educação e Saúde",
        headline: {
            textTop: "Blog da Saúde",
            textHighlight: "Vertebral",
            textBottom: "",
            styles: {
                textColorTitle: "var(--color-title-secondary)",
                textColorHighlightFrom: "var(--color-title-secondary-highlight-from)",
                textColorHighlightTo: "var(--color-title-secondary-highlight-to)",
                textColorBottom: "var(--color-title-secondary)"
            }
        },

        description: "Informações especializadas sobre tratamentos, prevenção e as últimas tecnologias em cirurgia de coluna.",
        viewAllCta: "Ver Todos os Artigos",
        posts: allPosts.slice(0, 6).map(post => ({
            title: post.title,
            slug: post.slug,
            date: post.date,
            readTime: post.readTime,
            category: post.category,
            excerpt: post.excerpt,
            image: post.image,
        }))
    };
}
