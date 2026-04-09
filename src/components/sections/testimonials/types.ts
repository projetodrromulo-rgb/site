export interface Testimonial {
    id: number;
    name: string;
    text: string;
    rating: number;
    location: string;
}

export interface TestimonialsSectionContent {
    badge: string;
    title: string;
    testimonials: Testimonial[];
}
