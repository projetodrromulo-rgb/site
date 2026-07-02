import { Metadata } from "next";
import { client, projectId } from "@/lib/sanity";
import BlogPageClient from "./BlogPageClient";
import { env } from "@/env";

// ISR: página regenerada em background a cada 1 hora (3600s).
// Next.js exige valor ESTÁTICO aqui — não aceita process.env ou expressões dinâmicas.
// Para alterar, edite este número diretamente.
export const revalidate = env().revalidate;

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

  if (projectId && projectId !== "placeholder") {
    try {
      const query = `*[_type == "post"] | order(date desc) {
        title,
        "slug": slug.current,
        date,
        readTime,
        category,
        excerpt,
        "image": coalesce(image.asset->url, "")
      }`;
      posts = await client.fetch<any[]>(query);
    } catch (err) {
      console.error("Error fetching posts from Sanity:", err);
    }
  }

  return <BlogPageClient initialPosts={posts} />;
}
