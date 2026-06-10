import { Metadata } from "next";
import BlogPageClient from "./BlogPageClient";

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

export default function BlogPage() {
  return <BlogPageClient />;
}
