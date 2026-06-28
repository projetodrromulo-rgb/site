import { client } from "@/lib/sanity";
import { Metadata } from "next";
import PostDetailPageClient from "./PostDetailPageClient";

export const revalidate = 0;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = await client.fetch(
      `*[_type == "post" && slug.current == $slug][0] {
        title,
        excerpt,
        "image": coalesce(image.asset->url, "")
      }`,
      { slug }
    );
    if (!post) return {};

    return {
      title: `${post.title} | Dr. Rômulo Oliveira`,
      description: post.excerpt,
      alternates: {
        canonical: `/blog/${slug}`,
      },
      openGraph: {
        title: post.title,
        description: post.excerpt,
        images: post.image ? [{ url: post.image }] : [],
      },
    };
  } catch (error) {
    console.error("Error generating metadata for post from Sanity:", error);
    return {};
  }
}

export default function PostDetailPage() {
  return <PostDetailPageClient />;
}
