import { FooterContent, NavLink, SocialLink } from "../types";
import { env } from "@/env";
import { getLocationsContent } from "../../locations/data/get-locations-content";
import { client, projectId } from "../../../../lib/sanity";

const { whatsAppNumber, instagramUrl } = env();

const defaultNavLinks: NavLink[] = [
    { label: "Início", href: "#" },
    { label: "Sobre", href: "#sobre" },
    { label: "Onde Atendemos", href: "#locations" },
    { label: "Convênios", href: "#Insurance" },
    { label: "Especialidades", href: "#procedimentos" },
];

const defaultSocialLinks: SocialLink[] = [
    { platform: "whatsapp", href: `https://wa.me/${whatsAppNumber}?text=Olá! Vim do site do Dr. Romulo. Gostaria de mais informações sobre o atendimento` },
    { platform: "instagram", href: `${instagramUrl || "https://www.instagram.com/dr.romulo.oliveira/"}` },
];

const localFooterContent: FooterContent = {
    brandDescription: "Excelência e precisão em cirurgia de coluna. Focado em devolver a qualidade de vida e mobilidade aos nossos pacientes através de técnicas modernas e humanizadas.",
    navLinks: defaultNavLinks,
    clinics: [],
    socialLinks: defaultSocialLinks,
    crm: "CRM 73889 | RQE 59057 | TEOT 19406"
};

export async function getFooterContent(): Promise<FooterContent> {
    const locations = await getLocationsContent();
    const derivedClinics = locations.units.map((unit) => ({
        name: unit.title,
        address: unit.address,
        phone: unit.phone,
    }));

    if (!projectId || projectId === "placeholder") {
        return {
            ...localFooterContent,
            clinics: derivedClinics
        };
    }

    try {
        const query = `*[_type == "footer"][0] {
            brandDescription,
            crm,
            navLinks[] {
                label,
                href
            },
            socialLinks[] {
                platform,
                href
            }
        }`;

        const data = await client.fetch<any>(query);

        if (data) {
            return {
                brandDescription: data.brandDescription || localFooterContent.brandDescription,
                crm: data.crm || localFooterContent.crm,
                navLinks: data.navLinks && data.navLinks.length > 0 ? data.navLinks : localFooterContent.navLinks,
                socialLinks: data.socialLinks && data.socialLinks.length > 0 ? data.socialLinks : localFooterContent.socialLinks,
                clinics: derivedClinics
            };
        }
    } catch (error) {
        console.error("Error fetching footer content from Sanity, falling back to local data:", error);
    }

    return {
        ...localFooterContent,
        clinics: derivedClinics
    };
}
