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

export const allPosts: Post[] = [];
