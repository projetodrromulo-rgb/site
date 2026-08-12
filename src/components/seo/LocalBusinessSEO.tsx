import { getLocationsContent } from "@/components/sections/locations/data/get-locations-content";
import JsonLdHead from "@/components/seo/JsonLdHead";
import { env } from "@/env";

export async function LocalBusinessSEO() {
    const locations = await getLocationsContent();

    const physicianJsonLd = {
        "@context": "https://schema.org",
        "@type": "Physician",
        "name": "Dr. Romulo Oliveira",
        "image": "https://www.drromulocoluna.com.br/images/image-profile.webp",
        "description": "Especialista em cirurgia de coluna minimamente invasiva em Belo Horizonte, Betim e Contagem. Tratamento de hérnia de disco, dor nas costas e deformidades.",
        "url": "https://www.drromulocoluna.com.br/",
        "telephone": "+5531900000000",
        "medicalSpecialty": "OrthopedicSurgery",
        "priceRange": "$$$",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Via Expressa de Betim, 15500 - Duque de Caxias",
            "addressLocality": "Betim",
            "addressRegion": "MG",
            "postalCode": "32673-472",
            "addressCountry": "BR"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": -19.94085182661938,
            "longitude": -44.147566703589625
        },
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
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Cirurgia Minimamente Invasiva" } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Endoscopia de Coluna" } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Tratamento de Hérnia de Disco" } }
            ]
        },
        "location": locations.units.map(unit => ({
            "@type": "MedicalClinic",
            "name": unit.title,
            "address": {
                "@type": "PostalAddress",
                "streetAddress": unit.address
            },
            "telephone": unit.phone
        }))
    };

    const websiteJsonLd = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Dr. Romulo Oliveira",
        "alternateName": ["Dr. Rômulo de Oliveira", "Dr. Rômulo Coluna"],
        "url": "https://www.drromulocoluna.com.br/"
    };

    return (
        <>
            <JsonLdHead id="local-physician-jsonld" schema={physicianJsonLd} />
            <JsonLdHead id="local-website-jsonld" schema={websiteJsonLd} />
        </>
    );
}
