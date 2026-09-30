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
        "excerptPlain": pt::text(excerpt),
        "image": coalesce(image.asset->url, ""),
        date,
        _createdAt,
        _updatedAt,
        author,
        category,
        seo {
          metaTitle,
          metaDescription,
          canonicalUrl,
          noIndex,
          ogTitle,
          ogDescription,
          "ogImage": coalesce(ogImage.asset->url, ""),
          authorName,
          sectionCategory,
          keywords,
          reviewerName
        }
      }`,
      { slug }
    );
    if (!post) return {};

    const rawTitle = post.seo?.metaTitle || post.title;
    const pageTitle = rawTitle.includes("|") ? rawTitle : `${rawTitle} | Dr. Rômulo Oliveira`;

    // SEO description strictly from Sanity Meta Description
    const metaDesc = post.seo?.metaDescription || "";
    const canonicalUrl = post.seo?.canonicalUrl || `https://www.drromulocoluna.com.br/blog/${slug}`;
    const isNoIndex = post.seo?.noIndex ?? false;

    const ogTitle = post.seo?.ogTitle || pageTitle;
    const ogDesc = post.seo?.ogDescription || metaDesc;
    const ogImageUrl = post.seo?.ogImage || post.image;

    const publishedTime = post.date || post._createdAt;
    const modifiedTime = post._updatedAt || publishedTime;
    const authorName = post.seo?.authorName || post.author || "Dr. Rômulo Oliveira";
    const sectionCategory = post.seo?.sectionCategory || post.category || "Saúde da Coluna";
    const keywordsArray = post.seo?.keywords ? post.seo.keywords.split(',').map((k: string) => k.trim()).filter(Boolean) : [];

    return {
      title: pageTitle,
      description: metaDesc,
      keywords: keywordsArray.length > 0 ? keywordsArray : undefined,
      robots: {
        index: !isNoIndex,
        follow: !isNoIndex,
      },
      alternates: {
        canonical: canonicalUrl,
      },
      other: {
        "citation_author": authorName,
        "citation_title": post.title,
        "citation_publication_date": (publishedTime || "").substring(0, 10).replace(/-/g, "/"),
        "citation_language": "pt-BR",
      },
      openGraph: {
        type: "article",
        title: ogTitle,
        description: ogDesc,
        url: canonicalUrl,
        images: ogImageUrl ? [{ url: ogImageUrl }] : [],
        publishedTime,
        modifiedTime,
        authors: [authorName],
        section: sectionCategory,
      },
      twitter: {
        card: "summary_large_image",
        title: ogTitle,
        description: ogDesc,
        images: ogImageUrl ? [ogImageUrl] : [],
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
      _createdAt,
      _updatedAt,
      readTime,
      category,
      excerpt,
      "excerptPlain": pt::text(excerpt),
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
      seo {
        authorName,
        sectionCategory,
        keywords,
        reviewerName
      },
      "related": *[_type == "post" && slug.current != $slug && category == ^.category] | order(date desc)[0...2] {
        title,
        "slug": slug.current,
        date,
        readTime,
        category,
        "excerpt": coalesce(pt::text(excerpt), excerpt),
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

    const siteUrl = "https://www.drromulocoluna.com.br";
    const postUrl = `${siteUrl}/blog/${slug}`;

    const sectionCat = post.seo?.sectionCategory || post.category || "Saúde da Coluna";
    const categorySlug = sectionCat.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
    const authorNameClean = post.seo?.authorName || post.author || "Dr. Rômulo Oliveira";

    // Schema 1: BreadcrumbList para indexação hierárquica
    const breadcrumbJsonLd = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": siteUrl
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Blog",
          "item": `${siteUrl}/blog`
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": post.title,
          "item": postUrl
        }
      ]
    };

    // Schema 2: MedicalWebPage otimizado para GEO / IA (ChatGPT, Gemini, Perplexity)
    const referencesList = Array.isArray(post.references) ? post.references : [];

    // Audience and About definitions for JSON‑LD
    const audience = {
      "@type": "PeopleAudience",
      "suggestedMinAge": 18
    };

    const about = {
      "@type": "MedicalProcedure",
      "name": "Bloqueio da coluna vertebral",
      "procedureType": "https://schema.org/PercutaneousProcedure"
    };

    const physicianAuthor = {
      "@type": "Physician",
      "name": authorNameClean,
      "jobTitle": "Ortopedista e Cirurgião de Coluna",
      "medicalSpecialty": "Orthopedic",
      "identifier": "CRM 73889 | RQE 59057",
      "sameAs": [siteUrl],
      "url": `${siteUrl}/sobre`,
      "knowsAbout": [
        "Bloqueio da coluna",
        "Rizotomia por radiofrequência",
        "Cirurgia de coluna"
      ]
    };

    const reviewerNameClean = post.seo?.reviewerName || authorNameClean;
    const physicianReviewer = {
      "@type": "Physician",
      "name": reviewerNameClean,
      "jobTitle": "Ortopedista e Cirurgião de Coluna",
      "medicalSpecialty": "Orthopedic",
      "identifier": post.authorRole || "CRM-MG 73.889 | RQE 59.057 | TEOT 19406",
      "sameAs": [siteUrl]
    };

    const finalDescription = post.seo?.metaDescription || "";

    const medicalWebPageJsonLd = {
      "@context": "https://schema.org",
      "@type": ["MedicalWebPage", "Article"],
      "url": postUrl,
      "headline": post.title,
      "description": finalDescription,
      "mainEntityOfPage": postUrl,
      "image": post.image ? [post.image] : [],
      "inLanguage": "pt-BR",
      "author": physicianAuthor,
      "reviewedBy": physicianReviewer,
      "lastReviewed": post._updatedAt ? new Date(post._updatedAt).toISOString() : (post.date ? new Date(post.date).toISOString() : new Date().toISOString()),
      "publisher": {
        "@type": "Organization",
        "name": "Dr. Rômulo Oliveira - Cirurgia de Coluna",
        "url": siteUrl
      },
      "datePublished": post.date ? new Date(post.date).toISOString() : (post._createdAt ? new Date(post._createdAt).toISOString() : new Date().toISOString()),
      "dateModified": post._updatedAt ? new Date(post._updatedAt).toISOString() : (post.date ? new Date(post.date).toISOString() : new Date().toISOString()),
      "speakable": {
        "@type": "SpeakableSpecification",
        "cssSelector": ["h1", "#faq", "#referencias"]
      },
      "citation": referencesList.map((ref: string) => ({
        "@type": "MedicalScholarlyArticle",
        "name": ref
      })),
      "audience": audience,
      "about": about
    };

    // Schema 3: FAQPage para extração direta de Perguntas e Respostas por IAs
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
        <JsonLdHead id="blog-breadcrumb-jsonld" schema={breadcrumbJsonLd} />
        <JsonLdHead id="blog-medicalwebpage-jsonld" schema={medicalWebPageJsonLd} />
        {faqJsonLd && <JsonLdHead id="blog-faq-jsonld" schema={faqJsonLd} />}
        <PostDetailPageClient initialData={processedData} />
      </>
    );
  } catch (error) {
    console.error("Error loading post page data on server:", error);
    notFound();
  }
}
