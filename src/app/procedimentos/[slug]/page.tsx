import { getProceduresContent } from "@/components/sections/procedures/data/get-content";
import { ArrowLeft, MessageCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getFooterContent } from "@/components/sections/footer/data/get-content";
import { CtaWhatsApp } from "@/components/shared/cta-whatsapp";
import { Logo } from "@/components/sections/hero/_components/logo";
import { PortableText } from "@portabletext/react";
import { urlFor } from "@/lib/sanity";

const ptComponents = {
    types: {
        image: ({ value }: any) => {
            if (!value?.asset) return null;
            const imageUrl = urlFor(value).url();
            return (
                <div className="relative w-full aspect-video overflow-hidden rounded-3xl my-12 shadow-xl border border-slate-100 dark:border-neutral-800">
                    <img
                        src={imageUrl}
                        alt={value.alt || 'Imagem do Procedimento'}
                        className="object-cover w-full h-full"
                    />
                </div>
            );
        }
    }
};

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

    const logoData = {
        src: "/images/logo.svg",
        alt: "Dr. Rômulo Oliveira Logo"
    };

    return (
        <div className="min-h-screen bg-[#f5f8f8] dark:bg-[#0A192F] text-slate-900 dark:text-white flex flex-col">
            <header className="fixed top-0 left-0 right-0 z-50 bg-[#f5f8f8]/95 dark:bg-[#0A192F]/95 backdrop-blur-md border-b border-slate-200/50 dark:border-white/5">
                <div className="flex items-center p-4 justify-between max-w-5xl mx-auto w-full gap-4">
                    <Link href="/#procedimentos" className="text-[#0db9f2] flex items-center gap-2 px-4 py-2 hover:bg-white/10 rounded-xl transition-all active:scale-95 group">
                        <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="text-sm font-bold uppercase tracking-wider hidden md:block">Voltar</span>
                    </Link>

                    <Link href="/" className="flex-1 flex justify-center">
                        <Logo
                            logoImage={logoData}
                            scrolled={true}
                            className="scale-75 md:scale-90"
                        />
                    </Link>

                    <div className="flex w-24 items-center justify-end">
                    </div>
                </div>
            </header>

            <main className="flex-1 container mx-auto px-6 pt-32 pb-24 md:pt-48 max-w-6xl">
                <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
                    {/* Background Image for Mobile */}
                    <div className="lg:hidden absolute inset-0 -mx-6 -my-12 overflow-hidden pointer-events-none max-h-screen">
                        {procedure.imageUrl && (
                            <>
                                <Image
                                    src={procedure.imageUrl}
                                    alt=""
                                    fill
                                    className="object-cover opacity-20"
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-b from-[#0A192F] via-transparent to-[#0A192F]" />
                            </>
                        )}
                    </div>

                    <div className="relative z-10 space-y-8">
                        <div className="space-y-4">
                            <h1 className="text-4xl md:text-6xl font-black leading-tight bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                                {procedure.title}
                            </h1>
                            <div className="h-1.5 w-24 bg-[#0db9f2] rounded-full shadow-[0_0_15px_rgba(13,185,242,0.5)]" />
                        </div>

                        <p className="text-xl md:text-2xl text-white/80 leading-relaxed font-light">
                            {procedure.description}
                        </p>

                        <div
                            className="prose prose-slate dark:prose-invert max-w-none 
                        prose-headings:font-display prose-headings:font-black prose-headings:tracking-tight prose-headings:text-white
                        prose-p:text-white/90 prose-p:leading-relaxed prose-p:text-lg prose-p:my-8
                        prose-strong:text-[#FFFF] prose-strong:font-black
                        prose-h2:text-3xl md:text-4xl prose-h2:mt-16 prose-h2:mb-8 prose-h2:leading-tight
                        prose-blockquote:border-l-4 prose-blockquote:border-[#FFF] prose-blockquote:bg-[#FFF]/5 
                        prose-blockquote:py-4 prose-blockquote:px-8 prose-blockquote:rounded-r-2xl prose-blockquote:italic
                        prose-blockquote:text-xl prose-blockquote:font-medium prose-blockquote:text-white/80
                        prose-ul:list-none prose-ul:pl-0
                        prose-li:text-white/90 prose-li:text-lg prose-li:relative prose-li:pl-8
                        prose-li:before:content-[''] prose-li:before:absolute prose-li:before:left-0 prose-li:before:top-[0.6em]
                        prose-li:before:size-2 prose-li:before:rounded-full prose-li:before:bg-[#FFF]
                        prose-img:rounded-3xl"
                        >
                            {Array.isArray(procedure.content) ? (
                                <PortableText value={procedure.content} components={ptComponents} />
                            ) : (
                                <div dangerouslySetInnerHTML={{ __html: procedure.content }} />
                            )}
                        </div>
                    </div>

                    {/* Image Sidebar for Desktop */}
                    <div className="hidden lg:block relative sticky top-24 h-fit">
                        <div className="absolute -inset-4 bg-[#0db9f2]/20 blur-3xl rounded-full opacity-50 transition-opacity" />
                        <div className="relative aspect-[4/5] max-h-[75vh] w-full rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl">
                            {procedure.imageUrl ? (
                                <Image
                                    src={procedure.imageUrl}
                                    alt={procedure.title}
                                    fill
                                    className="object-cover hover:scale-105 transition-transform duration-700"
                                    priority
                                />
                            ) : (
                                <div className="w-full h-full bg-white/5 flex items-center justify-center">
                                    <span className="text-white/20">Imagem indisponível</span>
                                </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] via-transparent to-transparent opacity-40" />
                        </div>

                        {/* Decorative element */}
                        <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-[#0db9f2]/10 rounded-full blur-2xl -z-10" />
                        <div className="absolute -top-8 -left-8 w-48 h-48 bg-[#0db9f2]/5 rounded-full blur-3xl -z-10" />
                    </div>
                </div>

                {/* WhatsApp CTA Section - Now below the grid */}
                <div className="mt-16 md:mt-24 pt-12 border-t border-white/10">
                    <div className="bg-white/5 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-16 border border-white/10 flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
                        {/* Subtle Background Glow */}
                        <div className="absolute -top-24 -left-24 w-64 h-64 bg-[#0db9f2]/10 rounded-full blur-[100px]" />
                        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-[#25D366]/5 rounded-full blur-[100px]" />

                        <div className="space-y-4 relative z-10">
                            <h3 className="text-3xl md:text-5xl font-black">Agende sua avaliação</h3>
                            <p className="text-white/60 text-lg md:text-xl max-w-2xl">
                                Entre em contato conosco para tirar suas dúvidas e agendar uma consulta presencial com o Dr. Romulo.
                            </p>

                            <CtaWhatsApp cta={{ text: "Agendar minha consulta", whatsAppNumber: "+5531996689572" }} className="mx-auto" />
                        </div>
                    </div>
                </div>
            </main>

            {/* Structured Data (JSON-LD) for SEO */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "MedicalProcedure",
                        "name": procedure.title,
                        "description": procedure.description,
                        "image": procedure.imageUrl ? `https://drromulo.com.br${procedure.imageUrl}` : undefined,
                        "procedureType": "SurgicalProcedure",
                        "medicalSpecialty": "OrthofunctionalSurgery"
                    })
                }}
            />

        </div>
    );
}
