import { SharedComponentsTypes } from "@/components/shared/types";
import { AuthorProfile } from "@/lib/author";

export interface BlogPost {
    title: string;
    slug: string;
    date: string;
    readTime: string;
    category: string;
    excerpt: string;
    image: string;
    author?: AuthorProfile;
}

export interface BlogSectionContent {
    badge: string;
    headline: SharedComponentsTypes["headline"];
    description: string;
    viewAllCta: string;
    posts: BlogPost[];
    author?: AuthorProfile;
}
