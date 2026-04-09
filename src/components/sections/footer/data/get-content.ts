import { FooterContent } from "../types";
import { navLinks, clinics, socialLinks } from "./footer";

export async function getFooterContent(): Promise<FooterContent> {
    return {
        brandDescription: "Excelência e precisão em cirurgia de coluna. Focado em devolver a qualidade de vida e mobilidade aos nossos pacientes através de técnicas modernas e humanizadas.",
        navLinks,
        clinics,
        socialLinks,
        crm: "52.00000-0"
    };
}
