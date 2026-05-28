export interface Procedure {
    title: string;
    description: string;
    icon: string;
    slug: string;
    content: string | any[];
    imageUrl?: string;
    metaTitle?: string;
    metaDescription?: string;
}

export interface ProceduresSectionContent {
    badge: string;
    title: string;
    description: string;
    items: Procedure[];
}
