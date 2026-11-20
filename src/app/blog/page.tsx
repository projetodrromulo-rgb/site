import { Metadata } from "next";
import { client, projectId } from "@/lib/sanity";
import BlogPageClient from "./BlogPageClient";
import { getEndOfTodayBrazil, isPostPublished } from "@/lib/blog-utils";
import { AUTHOR_GROQ_FIELDS, getDefaultAuthor, DEFAULT_AUTHOR, resolveAuthorProfile } from "@/lib/author";
import { CATEGORY_GROQ_FIELD, DEFAULT_BLOG_CATEGORIES, getBlogCategories } from "@/lib/category";

// ISR: página regenerada em background a cada 1 hora (3600s).
// ⚠️ Next.js EXIGE literal estático aqui. Nenhuma expressão dinâmica funciona:
// process.env, funções, imports — tudo falha no static analysis do SWC.
// Para alterar o tempo, edite este número diretamente.
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Blog | Dr. Rômulo Oliveira",
  description: "Informações especializadas sobre tratamentos, prevenção e as últimas tecnologias em cirurgia de coluna.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Blog | Dr. Rômulo Oliveira",
    description: "Informações especializadas sobre tratamentos, prevenção e as últimas tecnologias em cirurgia de coluna.",
    url: "https://www.drromulocoluna.com.br/blog",
  },
};

export default async function BlogPage() {
  let posts: any[] = [];
  let author = DEFAULT_AUTHOR;
  let categories = DEFAULT_BLOG_CATEGORIES;

  if (projectId && projectId !== "placeholder") {
    try {
      const query = `*[_type == "post"] | order(coalesce(publishedAt, _createdAt) desc) {
        title,
        "slug": slug.current,
        publishedAt,
        _createdAt,
        "date": coalesce(publishedAt, _createdAt),
        readTime,
        ${CATEGORY_GROQ_FIELD},
        "excerpt": coalesce(pt::text(excerpt), excerpt),
        "image": coalesce(image.asset->url, ""),
        "authorRef": author-> ${AUTHOR_GROQ_FIELDS}
      }`;
      const [rawPosts, fetchedAuthor, fetchedCategories] = await Promise.all([
        client.fetch<any[]>(query),
        getDefaultAuthor(),
        getBlogCategories(),
      ]);
      author = fetchedAuthor;
      categories = fetchedCategories;
      const endOfToday = getEndOfTodayBrazil();
      posts = (rawPosts || [])
        .filter((post: any) =>
          isPostPublished(post.date || post.publishedAt || post._createdAt, endOfToday)
        )
        .map((post: any) => ({
          ...post,
          author: post.authorRef ? resolveAuthorProfile(post.authorRef) : fetchedAuthor,
        }));
    } catch (err) {
      console.error("Error fetching posts from Sanity:", err);
    }
  }

  return <BlogPageClient initialPosts={posts} author={author} categories={categories} />;
}
