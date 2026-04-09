import { TestimonialsSectionContent } from "../types";
import { allTestimonials } from "./testimonials";

export async function getTestimonialsContent(): Promise<TestimonialsSectionContent> {
    return {
        badge: "Experiências Reais",
        title: "O que dizem nossos Pacientes",
        testimonials: allTestimonials
    };
}
