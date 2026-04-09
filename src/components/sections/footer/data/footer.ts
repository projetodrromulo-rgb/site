import { NavLink, Clinic, SocialLink } from "../types";

export const navLinks: NavLink[] = [
    { label: "Início", href: "#" },
    { label: "Especialidades", href: "#procedimentos" },
    { label: "Sobre", href: "#sobre" },
    { label: "Onde Atendemos", href: "#locations" },
    { label: "Convênios", href: "#differentials" },
    { label: "Blog", href: "#blog" },
    { label: "Depoimentos", href: "#testimonials" },
];

export const clinics: Clinic[] = [
    {
        name: "Unidade Barra",
        address: "Av. das Américas, 4666 - Sala 302, Barra da Tijuca",
        phone: "(21) 3385-0000",
    },
    {
        name: "Unidade Centro",
        address: "Rua México, 119 - Sala 1205, Centro",
        phone: "(21) 2240-1111",
    },
    {
        name: "Unidade Barra2",
        address: "Av. das Américas, 4666 - Sala 302, Barra da Tijuca",
        phone: "(21) 3385-0000",
    },
    {
        name: "Unidade Centro2",
        address: "Rua México, 119 - Sala 1205, Centro",
        phone: "(21) 2240-1111",
    }
];

export const socialLinks: SocialLink[] = [
    { platform: "whatsapp", href: "https://wa.me/5511999999999" },
    { platform: "instagram", href: "#" },
    { platform: "linkedin", href: "#" },
];
