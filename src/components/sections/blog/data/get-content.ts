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
    posts: []
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
            posts[]-> | order(date desc) {
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

