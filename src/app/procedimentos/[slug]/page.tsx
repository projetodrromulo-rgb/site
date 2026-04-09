import { getProceduresContent } from "@/components/sections/procedures/data/get-content";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, MessageCircle } from "lucide-react";
import { Metadata } from "next";
import Footer from "@/components/sections/footer";
import { getFooterContent } from "@/components/sections/footer/data/get-content";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const { items } = await getProceduresContent();
    const procedure = items.find((p) => p.slug === slug);

    if (!procedure) return {};

    return {
        title: procedure.metaTitle || `${procedure.title} | Dr. Romulo`,
        description: procedure.metaDescription || procedure.description,
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

    return (
        <div className="min-h-screen bg-[#0A192F] text-white flex flex-col">
            <main className="flex-1 container mx-auto px-6 py-12 md:py-24 max-w-6xl">
                <Link
                    href="/#procedimentos"
                    className="inline-flex items-center gap-2 text-[#0db9f2] mb-12 hover:translate-x-1 transition-all font-medium group"
                >
                    <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    Voltar para procedimentos
                </Link>

                <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
                    {/* Background Image for Mobile */}
                    <div className="lg:hidden absolute inset-0 -mx-6 -my-12 overflow-hidden pointer-events-none">
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

                        <div className="space-y-6 pt-8">
                            <h2 className="text-2xl font-bold text-[#0db9f2]">Sobre este tratamento</h2>
                            {procedure.content.map((paragraph, index) => (
                                <p key={index} className="text-white/60 leading-relaxed text-lg italic">
                                    {paragraph}
                                </p>
                            ))}
                        </div>
                    </div>

                    {/* Image Sidebar for Desktop */}
                    <div className="hidden lg:block relative sticky top-24">
                        <div className="absolute -inset-4 bg-[#0db9f2]/20 blur-3xl rounded-full opacity-50 transition-opacity" />
                        <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl">
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
                        </div>

                        <a
                            href={`https://wa.me/5511999999999?text=Olá, vim do site e gostaria de agendar uma avaliação para o procedimento: ${procedure.title}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative inline-flex items-center gap-4 bg-[#25D366] text-white px-12 py-6 rounded-full font-black text-xl hover:scale-105 transition-all shadow-[0_20px_50px_rgba(37,211,102,0.3)] hover:shadow-[0_30px_60px_rgba(37,211,102,0.5)] relative z-10"
                        >
                            <MessageCircle size={28} className="group-hover:rotate-12 transition-transform" />
                            Agendar via WhatsApp
                        </a>
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

            <Footer content={footerContent} />
        </div>
    );
}
