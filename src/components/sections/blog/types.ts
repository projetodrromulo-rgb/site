import { SharedComponentsTypes } from "@/components/shared/types";

export interface BlogPost {
    title: string;
    slug: string;
    date: string;
    readTime: string;
    category: string;
    excerpt: string;
    image: string;
}

export interface BlogSectionContent {
    badge: string;
    headline: SharedComponentsTypes["headline"];
    description: string;
    viewAllCta: string;
    posts: BlogPost[];
}
