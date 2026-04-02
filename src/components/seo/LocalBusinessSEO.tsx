import { getLocationsContent } from "@/components/sections/locations/get-locations-content";

export async function LocalBusinessSEO() {
    const locations = await getLocationsContent();

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Physician",
        "name": "Dr. Rômulo Oliveira",
        "image": "https://www.drromulocoluna.com.br/images/image-profile.png",
        "description": "Especialista em cirurgia de coluna minimamente invasiva, ortopedia e traumatologia. Atendimento humanizado em Belo Horizonte, Betim e Contagem.",
        "url": "http://drromulocoluna.com.br/",
        "telephone": "+5531996689572",
        "medicalSpecialty": "OrthopedicSurgery",
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
        "location": locations.units.map(unit => ({
            "@type": "MedicalOrganization",
            "name": unit.title,
            "address": {
                "@type": "PostalAddress",
                "streetAddress": unit.address
            },
            "telephone": unit.phone
        }))
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}
