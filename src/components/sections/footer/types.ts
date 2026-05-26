export interface NavLink {
    label: string;
    href: string;
}

export interface Clinic {
    name: string;
    address: string;
    phone: string;
}

export interface SocialLink {
    platform: string;
    href: string;
}

export interface FooterContent {
    logo: {
        src: string;
        alt: string;
    };
    brandDescription: string;
    navLinks: NavLink[];
    clinics: Clinic[];
    socialLinks: SocialLink[];
    crm: string;
}
