import { client, projectId } from "@/lib/sanity";
import { Metadata } from "next";
import PostDetailPageClient from "./PostDetailPageClient";
import JsonLdHead from "@/components/seo/JsonLdHead";
import { processPostData } from "./utils/process-post";
import { getFooterContent } from "@/components/sections/footer/data/get-content";
import { notFound } from "next/navigation";

// ISR: A página do post é gerada em background e cacheada por 1 hora (3600s).
// Isso fornece tempo de carregamento instantâneo e excelente indexabilidade para SEO.
export const revalidate = 3600;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
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

export default async function PostDetailPage({ params }: PageProps) {
  const { slug } = await params;

  if (!projectId || projectId === "placeholder") {
    notFound();
  }

  try {
    // 1. Definição das queries
    const postQuery = `*[_type == "post" && slug.current == $slug][0] {
      title,
      "slug": slug.current,
      date,
      readTime,
      category,
      excerpt,
      "image": coalesce(image.asset->url, ""),
      content,
      author,
      authorRole,
      ctaTitle,
      ctaDescription,
      faq[] {
        question,
        answer
      },
      references,
      disclaimer,
      "related": *[_type == "post" && slug.current != $slug && category == ^.category] | order(date desc)[0...2] {
        title,
        "slug": slug.current,
        date,
        readTime,
        category,
        excerpt,
        "image": coalesce(image.asset->url, "")
      }
    }`;

    const logoQuery = `*[_type == "footer"][0].logo {
      "src": coalesce(asset->url, ""),
      "alt": coalesce(alt, "")
    }`;

    // 2. Busca paralela de todos os dados necessários no servidor
    const [post, logoData, footerContent] = await Promise.all([
      client.fetch(postQuery, { slug }),
      client.fetch(logoQuery),
      getFooterContent()
    ]);

    if (!post) {
      notFound();
    }

    // 3. Processamento de dados no servidor
    const processedData = processPostData(post, logoData, footerContent);

    const displayFaqs = processedData.faqItems || [];
    const faqJsonLd = displayFaqs.length > 0 ? {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": displayFaqs.map((item: any) => {
        let answerText = item.answerText || "";
        if (item.answerHTML) {
          answerText = item.answerHTML.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
        } else if (item.answerBlocks) {
          answerText = item.answerBlocks.map((b: any) => b.children?.map((c: any) => c.text).join("") || "").join(" ");
        }
        return {
          "@type": "Question",
          "name": item.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": answerText
          }
        };
      })
    } : null;

    return (
      <>
        {faqJsonLd && <JsonLdHead id="blog-faq-jsonld" schema={faqJsonLd} />}
        <PostDetailPageClient initialData={processedData} />
      </>
    );
  } catch (error) {
    console.error("Error loading post page data on server:", error);
    notFound();
  }
}
