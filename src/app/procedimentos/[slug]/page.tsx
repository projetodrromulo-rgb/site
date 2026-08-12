import { getProceduresContent } from "@/components/sections/procedures/data/get-content";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getFooterContent } from "@/components/sections/footer/data/get-content";
import ProcedurePageClient from "./ProcedurePageClient";
import JsonLdHead from "@/components/seo/JsonLdHead";

export const revalidate = 0;

function findProcedure(items: any[], slug: string) {
    const cleanSlug = slug.toLowerCase();
    return items.find((p) => {
        const itemSlug = p.slug ? p.slug.toLowerCase() : "";
        if (itemSlug === cleanSlug) return true;

        // Check canonical variations (with/without -de-coluna, -da-coluna, -de-)
        const normalize = (s: string) => s.replace(/-d[ao]-coluna$/, "").replace(/-d[eao]-/g, "-");
        return normalize(itemSlug) === normalize(cleanSlug);
    });
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const { items } = await getProceduresContent();
    const procedure = findProcedure(items, slug);

    if (!procedure) return {};

    return {
        title: procedure.metaTitle || `${procedure.title} | Dr. Romulo`,
        description: procedure.metaDescription || procedure.description,
        alternates: {
            canonical: `/procedimentos/${procedure.slug}`,
        },
        openGraph: {
            title: procedure.metaTitle || procedure.title,
            description: procedure.metaDescription || procedure.description,
            images: procedure.imageUrl ? [{ url: procedure.imageUrl }] : [],
        },
    };
}

export async function generateStaticParams() {
    const { items } = await getProceduresContent();
    return items.map((procedure) => ({
        slug: procedure.slug,
    }));
}

export default async function ProcedurePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const { items } = await getProceduresContent();
    const procedure = findProcedure(items, slug);

    if (!procedure) {
        notFound();
    }

    const footerContent = await getFooterContent();

    const displayFaqs = procedure.faq || [];
    const faqJsonLd = displayFaqs.length > 0 ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": displayFaqs.map((faq: any) => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
            }
        }))
    } : null;

    return (
        <>
            {faqJsonLd && <JsonLdHead id="procedure-faq-jsonld" schema={faqJsonLd} />}
            <ProcedurePageClient procedure={procedure} footerContent={footerContent} />
        </>
    );
}
