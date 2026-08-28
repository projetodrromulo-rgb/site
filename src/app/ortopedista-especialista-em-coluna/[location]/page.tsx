import { notFound } from "next/navigation";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import JsonLdHead from "@/components/seo/JsonLdHead";
import { getAllLocationSlugs, getLocationPageContent } from "../data/get-location-page";
import CityHero from "./_components/CityHero";
import { getAboutContent } from "@/components/sections/about/data/get-about-content";
import { getLocationsContent } from "@/components/sections/locations/data/get-locations-content";
import { getCTAContent } from "@/components/sections/cta/data/get-content";
import { getInsuranceContent } from "@/components/sections/insurance/data/get-content";
import { getBlogContent } from "@/components/sections/blog/data/get-content";
import { getProceduresContent } from "@/components/sections/procedures/data/get-content";
import { getFooterContent } from "@/components/sections/footer/data/get-content";
import { getParallaxContent } from "@/components/sections/parallax/data/get-content";
import { getTestimonialsContent } from "@/components/sections/testimonials/data/get-content";
import ParallaxSection from "@/components/sections/parallax";
import { env } from "@/env";

const About = dynamic(() => import("@/components/sections/about"), {
    loading: () => <div className="min-h-[50vh] animate-pulse bg-white/5" />
});

const CityLocations = dynamic(() => import("@/components/sections/locations/city-locations"), {
    loading: () => <div className="min-h-[50vh] animate-pulse bg-white/5" />
});

const TestimonialsSection = dynamic(() => import("@/components/sections/testimonials"), {
    loading: () => <div className="min-h-[40vh] animate-pulse bg-white/5" />
});

const CTA = dynamic(() => import("@/components/sections/cta"), {
    loading: () => <div className="min-h-[30vh] animate-pulse bg-white/5" />
});

const CityFaqSection = dynamic(() => import("@/components/sections/faq"), {
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

export async function generateMetadata({ params }: { params: Promise<{ location: string }> }): Promise<Metadata> {
    const { location } = await params;
    const data = await getLocationPageContent(location);

    if (!data) return {};

    return {
        title: data.title,
        description: data.metaDescription,
        keywords: data.keywords,
        alternates: {
            canonical: `/ortopedista-especialista-em-coluna/${data.slug}`,
        },
        openGraph: {
            title: data.title,
            description: data.metaDescription,
            url: `https://www.drromulocoluna.com.br/ortopedista-especialista-em-coluna/${data.slug}`,
            type: "website",
            images: [
                {
                    url: "/images/og-profile.webp",
                    width: 1200,
                    height: 630,
                    alt: `Dr. Rômulo Oliveira - Especialista em Coluna em ${data.name}`,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: data.title,
            description: data.metaDescription,
            images: ["/images/og-profile.webp"],
        },
    };
}

export async function generateStaticParams() {
    const slugs = await getAllLocationSlugs();
    return slugs.map((slug) => ({
        location: slug,
    }));
}

export default async function CityPage({ params }: { params: Promise<{ location: string }> }) {
    const { location } = await params;
    const data = await getLocationPageContent(location);

    if (!data) {
        notFound();
    }

    // Fetch all page section contents in parallel to optimize TTFB
    const [
        aboutContent,
        proceduresContent,
        locationsContent,
        ctaContent,
        insuranceContent,
        blogContent,
        testimonialsContent,
        footerContent,
        parallaxContent
    ] = await Promise.all([
        getAboutContent(),
        getProceduresContent(),
        getLocationsContent(),
        getCTAContent(),
        getInsuranceContent(),
        getBlogContent(),
        getTestimonialsContent(),
        getFooterContent(),
        getParallaxContent()
    ]);

    // Merge city-specific cta override
    const cityCtaContent = {
        ...ctaContent,
        headline: data.ctaOverride?.title || `Precisando de um médico especialista em coluna em ${data.name}?`,
        ...(data.ctaOverride?.description && { description: data.ctaOverride.description }),
    };

    const whatsAppNumber = env().whatsAppNumber;

    const primaryTelephone = (data.locations && data.locations.length > 0 && data.locations[0].telephone)
        ? `+55${data.locations[0].telephone.replace(/[^0-9]/g, "")}`
        : "+553135040045";

    const reviewsJsonLd = (testimonialsContent?.testimonials || []).map((t: any) => ({
        "@type": "Review",
        "author": {
            "@type": "Person",
            "name": t.name
        },
        "reviewRating": {
            "@type": "Rating",
            "ratingValue": String(t.rating || 5),
            "bestRating": "5"
        },
        "reviewBody": t.text
    }));

    // Dynamic physician and local business JSON-LD schema
    const physicianJsonLd = {
        "@context": "https://schema.org",
        "@type": "MedicalClinic",
        "@id": `https://www.drromulocoluna.com.br/ortopedista-especialista-em-coluna/${data.slug}#clinic`,
        "name": `Dr. Rômulo Oliveira - Especialista em Coluna em ${data.name}`,
        "image": "https://www.drromulocoluna.com.br/images/image-profile.webp",
        "description": data.metaDescription,
        "url": `https://www.drromulocoluna.com.br/ortopedista-especialista-em-coluna/${data.slug}`,
        "telephone": primaryTelephone,
        "priceRange": "$$$",
        "dateModified": "2026-08-12",
        "medicalSpecialty": ["Orthopedic", "SpineSurgery"],
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "5.0",
            "reviewCount": String(testimonialsContent?.testimonials?.length || 48)
        },
        "review": reviewsJsonLd,
        "areaServed": {
            "@type": "City",
            "name": data.name,
            "containedInPlace": {
                "@type": "AdministrativeArea",
                "name": "Minas Gerais"
            }
        },
        "address": {
            "@type": "PostalAddress",
            "streetAddress": data.address?.streetAddress || "Avenida Coronel José Dias Bicalho 928, bairro São Luiz/Pampulha",
            "addressLocality": data.slug === "pampulha" ? "Belo Horizonte" : data.slug === "vila-da-serra" ? "Nova Lima" : data.name,
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
            "name": `Tratamentos de Coluna em ${data.name}`,
            "itemListElement": [
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Cirurgia de Coluna Minimamente Invasiva" } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Endoscopia de Coluna" } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": `Tratamento de Hérnia de Disco em ${data.name}` } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": `Consulta com Ortopedista de Coluna em ${data.name}` } }
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

    const heroDesc = data.heroContent.description || "";
    const rawCtaText = data.heroContent.ctaText || "";
    const finalCtaText = rawCtaText.endsWith(" em ") ? `${rawCtaText}${data.name}` : rawCtaText;

    const cityLocations = (data.locations && data.locations.length > 0)
        ? data.locations.map((loc) => {
            const matchingUnit = locationsContent.units.find((u) =>
                u.title.toLowerCase().includes(loc.name.toLowerCase()) ||
                loc.name.toLowerCase().includes(u.title.toLowerCase())
            );
            return {
                name: loc.name,
                streetAddress: loc.streetAddress || matchingUnit?.address || "",
                telephone: loc.telephone || matchingUnit?.phone || "(31) 99967-5665",
                mapUrl: loc.mapUrl || matchingUnit?.mapUrl,
                websiteUrl: loc.websiteUrl || matchingUnit?.websiteUrl,
                image: loc.image || matchingUnit?.image
            };
        })
        : locationsContent.units.filter((u) =>
            u.address.toLowerCase().includes(data.name.toLowerCase())
        ).map((u) => ({
            name: u.title,
            streetAddress: u.address,
            telephone: u.phone,
            mapUrl: u.mapUrl,
            websiteUrl: u.websiteUrl,
            image: u.image
        }));

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
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": data.name,
                "item": `https://www.drromulocoluna.com.br/ortopedista-especialista-em-coluna/${data.slug}`
            }
        ]
    };

    const displayFaqs = (data.faqs || []).slice(0, 5);
    const faqJsonLd = displayFaqs.length > 0 ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": displayFaqs.map((faq) => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
            }
        }))
    } : null;

    return (
        <main className="min-h-screen bg-primary-dark text-neutral-light relative selection:bg-accent/30 flex flex-col">
            <JsonLdHead id="physician-jsonld" schema={physicianJsonLd} />
            <JsonLdHead id="breadcrumb-jsonld" schema={breadcrumbJsonLd} />
            {faqJsonLd && <JsonLdHead id="faq-jsonld" schema={faqJsonLd} />}
            <CityHero
                cityName={data.name}
                headline={data.heroContent.headline}
                description={heroDesc}
                ctaText={finalCtaText}
                whatsAppNumber={whatsAppNumber}
                bgImages={data.bgImages}
                bgImageAlts={data.bgImageAlts}
                trustLocations={data.locations}
                onlineBookingUrl={data.onlineBookingUrl}
            />
            <CTA content={cityCtaContent} />
            <CityLocations
                cityName={data.name}
                locations={cityLocations}
                hospitals={insuranceContent.hospitals}
            />
            <ParallaxSection content={parallaxContent} />
            <TestimonialsSection content={testimonialsContent} />
            <CityFaqSection
                content={{
                    title: data.faqsTitle || `Perguntas Frequentes sobre Atendimento em ${data.name}`,
                    faqs: data.faqs || [],
                    cityName: data.name,
                    whatsAppNumber
                }}
            />
            {/* <Procedures content={proceduresContent} />*/}
            {/* <Insurance content={insuranceContent} />*/}
            <Footer content={footerContent} />
        </main>
    );
}
