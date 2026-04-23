import { env } from "@/env";
import { NavLink, Clinic, SocialLink } from "../types";


const { whatsAppNumber, instagramUrl } = env()

export const navLinks: NavLink[] = [
    { label: "Início", href: "#" },
    { label: "Sobre", href: "#sobre" },
    { label: "Onde Atendemos", href: "#locations" },
    { label: "Convênios", href: "#Insurance" },
    { label: "Especialidades", href: "#procedimentos" },
    //{ label: "Blog", href: "#blog" },
    //  { label: "Depoimentos", href: "#testimonials" },
];


export const socialLinks: SocialLink[] = [
    { platform: "whatsapp", href: `https://wa.me/${whatsAppNumber}` },
    { platform: "instagram", href: `${instagramUrl}` },
    //  { platform: "linkedin", href: "#" },
];
