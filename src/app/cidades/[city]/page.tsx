import { notFound } from "next/navigation";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import { citiesData } from "../data/cities";
import CityHero from "./_components/CityHero";
import { getAboutContent } from "@/components/sections/about/data/get-about-content";
import { getLocationsContent } from "@/components/sections/locations/data/get-locations-content";
import { getCTAContent } from "@/components/sections/cta/data/get-content";
import { getInsuranceContent } from "@/components/sections/insurance/data/get-content";
import { getBlogContent } from "@/components/sections/blog/data/get-content";
import { getProceduresContent } from "@/components/sections/procedures/data/get-content";
import { getFooterContent } from "@/components/sections/footer/data/get-content";
import { getParallaxContent } from "@/components/sections/parallax/data/get-content";
import ParallaxSection from "@/components/sections/parallax";
import { env } from "@/env";

const About = dynamic(() => import("@/components/sections/about"), {
    loading: () => <div className="min-h-[50vh] animate-pulse bg-white/5" />
});

const LocationsGrid = dynamic(() => import("@/components/sections/locations/locations-grid"), {
    loading: () => <div className="min-h-[50vh] animate-pulse bg-white/5" />
});

const CTA = dynamic(() => import("@/components/sections/cta"), {
    loading: () => <div className="min-h-[30vh] animate-pulse bg-white/5" />
});

const Insurance = dynamic(() => import("@/components/sections/insurance").then(m => m.Insurance), {
    loading: () => <div className="min-h-[20vh] animate-pulse bg-white/5" />
});

const Procedures = dynamic(() => import("@/components/sections/procedures").then(m => m.Procedures), {
    loading: () => <div className="min-h-[50vh] animate-pulse bg-white/5" />
});

const BlogSection = dynamic(() => import("@/components/sections/blog"), {
    loading: () => <div className="min-h-[50vh] animate-pulse bg-white/5" />
});

const Footer = dynamic(() => import("@/components/sections/footer"), {
    loading: () => <div className="min-h-[20vh] animate-pulse bg-white/5" />
});

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
    const { city } = await params;
    const data = citiesData[city.toLowerCase()];

    if (!data) return {};

    return {
        title: data.title,
        description: data.metaDescription,
        keywords: data.keywords,
        alternates: {
            canonical: `/cidades/${data.slug}`,
        },
        openGraph: {
            title: data.title,
            description: data.metaDescription,
            url: `https://www.drromulocoluna.com.br/cidades/${data.slug}`,
            images: [
                {
                    url: "/images/og-profile.webp",
                    width: 1200,
                    height: 630,
                    alt: `Dr. Rômulo Oliveira - Especialista em Coluna em ${data.name}`,
                },
            ],
        },
    };
}

export async function generateStaticParams() {
    return Object.keys(citiesData).map((cityKey) => ({
        city: cityKey,
    }));
}

export default async function CityPage({ params }: { params: Promise<{ city: string }> }) {
    const { city } = await params;
    const data = citiesData[city.toLowerCase()];

    if (!data) {
        notFound();
    }

    // Fetch all page section contents in parallel to optimize TTFB
    const [
        aboutContent,
        locationsContent,
        ctaContent,
        insuranceContent,
        proceduresContent,
        blogContent,
        footerContent,
        parallaxContent
    ] = await Promise.all([
        getAboutContent(),
        getLocationsContent(),
        getCTAContent(),
        getInsuranceContent(),
        getProceduresContent(),
        getBlogContent(),
        getFooterContent(),
        getParallaxContent()
    ]);

    // Merge city-specific about override (SEO local) on top of the generic content
    const cityAboutContent = data.aboutOverride
        ? {
            ...aboutContent,
            ...(data.aboutOverride.subtitle && { subtitle: data.aboutOverride.subtitle }),
            ...(data.aboutOverride.paragraphs && { paragraphs: data.aboutOverride.paragraphs }),
          }
        : aboutContent;

    // Merge city-specific cta override
    const cityCtaContent = data.ctaOverride
        ? {
            ...ctaContent,
            ...(data.ctaOverride.title && { title: data.ctaOverride.title }),
            ...(data.ctaOverride.description && { description: data.ctaOverride.description }),
        }
        : ctaContent;

    const whatsAppNumber = env().whatsAppNumber;

    // Dynamic physician and local business JSON-LD schema
    const physicianJsonLd = {
        "@context": "https://schema.org",
        "@type": "Physician",
        "name": "Dr. Rômulo Oliveira",
        "image": "https://www.drromulocoluna.com.br/images/image-profile.webp",
        "description": data.metaDescription,
        "url": `https://www.drromulocoluna.com.br/cidades/${data.slug}`,
        "telephone": "+5531999675665",
        "medicalSpecialty": "OrthopedicSurgery",
        "priceRange": "$$$",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": data.address?.streetAddress || "Avenida Coronel José Dias Bicalho 928, bairro São Luiz/Pampulha",
            "addressLocality": data.name,
            "addressRegion": "MG",
            "postalCode": data.address?.postalCode || "31275-050",
            "addressCountry": "BR"
        },
        "geo": data.geo ? {
            "@type": "GeoCoordinates",
            "latitude": data.geo.latitude,
            "longitude": data.geo.longitude
        } : undefined,
        "openingHoursSpecification": [
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                "opens": "08:00",
                "closes": "18:00"
            }
        ],
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Tratamentos de Coluna",
            "itemListElement": [
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Cirurgia de Coluna Minimamente Invasiva" } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Endoscopia de Coluna" } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": `Tratamento de Hérnia de Disco em ${data.name}` } }
            ]
        },
        "location": data.locations ? data.locations.map(loc => ({
            "@type": "MedicalClinic",
            "name": loc.name,
            "address": {
                "@type": "PostalAddress",
                "streetAddress": loc.streetAddress
            },
            "telephone": loc.telephone
        })) : []
    };

    return (
        <main className="min-h-screen bg-primary-dark text-neutral-light relative selection:bg-accent/30 flex flex-col">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(physicianJsonLd) }}
            />
            <CityHero
                cityName={data.name}
                headline={data.heroContent.headline}
                description={data.heroContent.description}
                ctaText={data.heroContent.ctaText.endsWith(" em ") ? `${data.heroContent.ctaText}${data.name}` : data.heroContent.ctaText}
                whatsAppNumber={whatsAppNumber}
                bgImages={data.bgImages}
                trustLocations={data.locations}
            />
            <About content={cityAboutContent} />
            <LocationsGrid content={locationsContent} hospitals={insuranceContent.hospitals} />
            <CTA content={cityCtaContent} />
            {/* <Insurance content={insuranceContent} />*/}
            <ParallaxSection content={parallaxContent} />
            <Procedures content={proceduresContent} />
            <BlogSection content={blogContent} />
            <Footer content={footerContent} />
        </main>
    );
}
