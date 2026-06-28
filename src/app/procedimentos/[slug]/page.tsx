import { getProceduresContent } from "@/components/sections/procedures/data/get-content";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getFooterContent } from "@/components/sections/footer/data/get-content";
import ProcedurePageClient from "./ProcedurePageClient";

export const revalidate = 0;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const { items } = await getProceduresContent();
    const procedure = items.find((p) => p.slug === slug);

    if (!procedure) return {};

    return {
        title: procedure.metaTitle || `${procedure.title} | Dr. Romulo`,
        description: procedure.metaDescription || procedure.description,
        alternates: {
            canonical: `/procedimentos/${slug}`,
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
    const procedure = items.find((p) => p.slug === slug);

    if (!procedure) {
        notFound();
    }

    const footerContent = await getFooterContent();

    return <ProcedurePageClient procedure={procedure} footerContent={footerContent} />;
}
