import { client, projectId } from "@/lib/sanity";
import { CityData } from "./types";
import { citiesData } from "./locations";

export async function getAllLocationSlugs(): Promise<string[]> {
    if (!projectId || projectId === "placeholder") {
        return Object.keys(citiesData);
    }

    try {
        const query = `*[_type == "locationPage"] {
            "slug": slug.current
        }`;
        
        const data = await client.fetch<{ slug: string }[]>(query);
        
        if (data && data.length > 0) {
            return data.map(item => item.slug);
        }
    } catch (error) {
        console.error("Error fetching location slugs from Sanity, falling back to local data:", error);
    }

    return Object.keys(citiesData);
}

function replacePlaceholders(text: string, prefix: string, clinic: string): string {
    if (!text) return "";
    return text
        .replace(/\{\{locationPrefix\}\}/g, prefix)
        .replace(/\{\{clinicName\}\}/g, clinic);
}

function resolveParagraphs(paragraphs: string[] | undefined, prefix: string, clinic: string, fallbackTemplate: string[]): string[] {
    if (paragraphs && paragraphs.length > 0) return paragraphs;
    return fallbackTemplate.map(p => replacePlaceholders(p, prefix, clinic));
}

export async function getLocationPageContent(slug: string): Promise<CityData | null> {
    const localData = citiesData[slug.toLowerCase()];

    // Configurações padrão caso o Sanity falhe ou não tenha o Settings
    const defaultSettings = {
        aboutParagraphsTemplate: [
            "Sou o Dr. Rômulo Oliveira, Médico Ortopedista Especialista em Coluna {{locationPrefix}}. Minha missão é tratar condições como hérnia de disco e ciatalgia, devolvendo sua mobilidade e bem-estar através de medicina baseada em evidências.",
            "Minha Trajetória e Abordagem:",
            "✅ Formação Sólida: Especialista pela SBOT com fellowship em Cirurgia da Coluna (Hospital da Baleia).",
            "✅ Tratamento Moderno: Foco em abordagens conservadoras e cirurgias minimamente invasivas para uma recuperação segura.",
            "✅ Local de Atendimento: {{clinicName}}."
        ],
        ctaTitleTemplate: "Precisa de uma avaliação médica especializada?",
        ctaDescriptionTemplate: "Agende sua consulta com um especialista em coluna {{locationPrefix}} e dê o primeiro passo para o seu tratamento adequado.",
        heroDescriptionTemplate: "Médico Ortopedista Especialista em Coluna {{locationPrefix}}. Especialista em cirurgia de coluna minimamente invasiva com foco em rápida recuperação, alívio da dor e atendimento humanizado. Avaliações disponíveis {{clinicName}}.",
        heroCtaTextTemplate: "Agendar Consulta {{locationPrefix}}"
    };

    if (!projectId || projectId === "placeholder") {
        if (localData) {
            // Resolver localmente usando o defaultSettings
            const prefix = localData.locationPrefix || "";
            const clinic = localData.clinicName || "";
            return {
                ...localData,
                heroContent: {
                    ...localData.heroContent,
                    description: localData.heroContent.description || replacePlaceholders(defaultSettings.heroDescriptionTemplate, prefix, clinic),
                    ctaText: localData.heroContent.ctaText || replacePlaceholders(defaultSettings.heroCtaTextTemplate, prefix, clinic)
                },
                aboutOverride: {
                    ...localData.aboutOverride,
                    paragraphs: resolveParagraphs(localData.aboutOverride?.paragraphs, prefix, clinic, defaultSettings.aboutParagraphsTemplate)
                },
                ctaOverride: {
                    ...localData.ctaOverride,
                    title: localData.ctaOverride?.title || defaultSettings.ctaTitleTemplate,
                    description: localData.ctaOverride?.description || replacePlaceholders(defaultSettings.ctaDescriptionTemplate, prefix, clinic)
                }
            } as CityData;
        }
        return null;
    }

    try {
        const query = `{
            "page": *[_type == "locationPage" && slug.current == $slug][0] {
                name,
                "slug": slug.current,
                title,
                metaDescription,
                keywords,
                locationPrefix,
                clinicName,
                heroContent {
                    headline {
                        textTop,
                        textHighlight,
                        textBottom
                    },
                    description,
                    ctaText
                },
                "bgImages": bgImages[].asset->url,
                aboutOverride {
                    subtitle,
                    paragraphs
                },
                ctaOverride {
                    title,
                    description
                },
                address {
                    streetAddress,
                    postalCode
                },
                geo {
                    latitude,
                    longitude
                },
                locations[] {
                    name,
                    streetAddress,
                    telephone
                }
            },
            "settings": *[_type == "locationSettings"][0]
        }`;
        
        const data = await client.fetch<any>(query, { slug: slug.toLowerCase() });
        
        if (data && data.page) {
            const page = data.page;
            const settings = data.settings || defaultSettings;
            const prefix = page.locationPrefix || localData?.locationPrefix || "";
            const clinic = page.clinicName || localData?.clinicName || "";

            return {
                slug: page.slug || localData?.slug,
                name: page.name || localData?.name,
                title: page.title || localData?.title,
                metaDescription: page.metaDescription || localData?.metaDescription,
                keywords: page.keywords || localData?.keywords || [],
                locationPrefix: prefix,
                clinicName: clinic,
                heroContent: {
                    headline: {
                        textTop: page.heroContent?.headline?.textTop || localData?.heroContent.headline.textTop || "",
                        textHighlight: page.heroContent?.headline?.textHighlight || localData?.heroContent.headline.textHighlight || "",
                        textBottom: page.heroContent?.headline?.textBottom || localData?.heroContent.headline.textBottom || "",
                        styles: localData?.heroContent.headline.styles || {}
                    },
                    description: page.heroContent?.description || replacePlaceholders(settings.heroDescriptionTemplate || defaultSettings.heroDescriptionTemplate, prefix, clinic),
                    ctaText: page.heroContent?.ctaText || replacePlaceholders(settings.heroCtaTextTemplate || defaultSettings.heroCtaTextTemplate, prefix, clinic),
                },
                bgImages: page.bgImages && page.bgImages.length > 0 ? page.bgImages : localData?.bgImages,
                aboutOverride: {
                    subtitle: page.aboutOverride?.subtitle || localData?.aboutOverride?.subtitle,
                    paragraphs: resolveParagraphs(page.aboutOverride?.paragraphs, prefix, clinic, settings.aboutParagraphsTemplate || defaultSettings.aboutParagraphsTemplate)
                },
                ctaOverride: {
                    title: page.ctaOverride?.title || settings.ctaTitleTemplate || defaultSettings.ctaTitleTemplate,
                    description: page.ctaOverride?.description || replacePlaceholders(settings.ctaDescriptionTemplate || defaultSettings.ctaDescriptionTemplate, prefix, clinic)
                },
                address: page.address || localData?.address,
                geo: page.geo || localData?.geo,
                locations: page.locations && page.locations.length > 0 ? page.locations : localData?.locations
            } as CityData;
        }
    } catch (error) {
        console.error(`Error fetching location page '${slug}' from Sanity, falling back to local data:`, error);
    }

    return localData || null;
}
