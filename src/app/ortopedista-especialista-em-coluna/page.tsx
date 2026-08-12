import { Metadata } from "next";
import Link from "next/link";
import { MapPin, ArrowRight, ShieldCheck } from "lucide-react";
import JsonLdHead from "@/components/seo/JsonLdHead";
import { citiesData } from "./data/locations";
import { getFooterContent } from "@/components/sections/footer/data/get-content";
import Footer from "@/components/sections/footer";
import { Breadcrumb } from "@/components/shared/breadcrumb";

export const metadata: Metadata = {
    title: "Ortopedista Especialista em Coluna nas Cidades | Dr. Rômulo Oliveira",
    description: "Atendimento especializado em cirurgia minimamente invasiva de coluna nas cidades de Belo Horizonte, Contagem, Betim, Nova Lima, Vila da Serra e Pampulha.",
    alternates: {
        canonical: "/ortopedista-especialista-em-coluna",
    },
    openGraph: {
        title: "Ortopedista Especialista em Coluna | Dr. Rômulo Oliveira",
        description: "Atendimento especializado em cirurgia minimamente invasiva e tratamento de hérnia de disco nas principais cidades da Região Metropolitana de BH.",
        url: "https://www.drromulocoluna.com.br/ortopedista-especialista-em-coluna",
        type: "website",
        images: [
            {
                url: "/images/og-profile.webp",
                width: 1200,
                height: 630,
                alt: "Dr. Rômulo Oliveira - Especialista em Coluna",
            },
        ],
    },
};

export default async function LocationHubPage() {
    const footerContent = await getFooterContent();
    const citiesList = Object.values(citiesData);

    const breadcrumbJsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Início",
                "item": "https://www.drromulocoluna.com.br"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Ortopedista Especialista em Coluna",
                "item": "https://www.drromulocoluna.com.br/ortopedista-especialista-em-coluna"
            }
        ]
    };

    return (
        <main className="min-h-screen bg-primary-dark text-neutral-light relative flex flex-col justify-between">
            <JsonLdHead id="breadcrumb-jsonld-hub" schema={breadcrumbJsonLd} />
            
            <div className="pt-24 pb-16 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto w-full">
                <Breadcrumb
                    items={[
                        { label: "Início", href: "/" },
                        { label: "Ortopedista Especialista em Coluna" }
                    ]}
                />

                <header className="mt-8 mb-12 text-left max-w-3xl">
                    <div className="inline-flex items-center gap-2 bg-accent/15 border border-accent/30 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
                        <ShieldCheck size={14} className="text-accent shrink-0" />
                        <span className="text-accent text-xs font-bold uppercase tracking-widest">
                            Unidades de Atendimento
                        </span>
                    </div>
                    <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-light leading-tight mb-4">
                        Médico Ortopedista Especialista em Coluna na sua Região
                    </h1>
                    <p className="text-neutral-light/70 text-base md:text-lg leading-relaxed">
                        Selecione a localidade mais conveniente para agendar sua consulta com o Dr. Rômulo Oliveira. Atendimento humanizado e focado em cirurgia minimamente invasiva.
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-10">
                    {citiesList.map((city) => (
                        <Link
                            key={city.slug}
                            href={`/ortopedista-especialista-em-coluna/${city.slug}`}
                            className="group relative flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-accent/50 hover:bg-white/10 transition-all duration-300 shadow-xl"
                        >
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-10 h-10 rounded-2xl bg-accent/15 border border-accent/30 flex items-center justify-center text-accent">
                                        <MapPin size={20} />
                                    </div>
                                    <span className="text-xs text-accent font-semibold uppercase tracking-wider">
                                        {city.clinicName}
                                    </span>
                                </div>
                                <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 group-hover:text-accent transition-colors">
                                    {city.name}
                                </h2>
                                <p className="text-neutral-light/60 text-xs sm:text-sm line-clamp-3 leading-relaxed">
                                    {city.heroContent.description}
                                </p>
                            </div>

                            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-accent group-hover:translate-x-1 transition-transform">
                                <span>Ver Atendimento {city.locationPrefix}</span>
                                <ArrowRight size={16} />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            <Footer content={footerContent} />
        </main>
    );
}
