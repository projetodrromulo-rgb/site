import { FooterContent } from "../types";
import { navLinks, socialLinks } from "./footer";
import { getLocationsContent } from "../../locations/data/get-locations-content";

export async function getFooterContent(): Promise<FooterContent> {
    const locations = await getLocationsContent();
    
    return {
        brandDescription: "Excelência e precisão em cirurgia de coluna. Focado em devolver a qualidade de vida e mobilidade aos nossos pacientes através de técnicas modernas e humanizadas.",
        navLinks,
        clinics: locations.units.map((unit) => ({
            name: unit.title,
            address: unit.address,
            phone: unit.phone,
        })),
        socialLinks,
        crm: "52.00000-0"
    };
}
