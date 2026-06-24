import { post as dorLombarPost } from "./posts/dor-lombar-quando-a-dor-nas-costas-deixa-de-ser-algo-normal";
import { post as herniaPrecisaCirurgiaPost } from "./posts/hernia-de-disco-precisa-de-cirurgia-mitos-e-verdades";

export interface Post {
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    date: string;
    category: string;
    readTime: string;
    image: string;
    author: string;
    authorRole: string;
    ctaTitle?: string;
    ctaDescription?: string;
}

export const allPosts: Post[] = [
    dorLombarPost,
    herniaPrecisaCirurgiaPost
];

