import { allPosts } from "@/components/sections/blog/data/posts";
import { Metadata } from "next";
import PostDetailPageClient from "./PostDetailPageClient";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = allPosts.find((p) => p.slug === slug);
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
}

export default function PostDetailPage() {
  return <PostDetailPageClient />;
}
