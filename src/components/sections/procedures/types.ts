export interface Procedure {
    title: string;
    description: string;
    icon: string;
    slug: string;
    content: string | any[];
    imageUrl?: string;
    metaTitle?: string;
    metaDescription?: string;
    faq?: { question: string; answer: string }[];
    references?: string[];
}

export interface ProceduresSectionContent {
    badge: string;
    title: string;
    description: string;
    items: Procedure[];
}
