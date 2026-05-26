import { TestimonialsSectionContent } from "../types";
import { allTestimonials } from "./testimonials";
import { client, projectId } from "../../../../lib/sanity";

const localTestimonialsContent: TestimonialsSectionContent = {
    badge: "Experiências Reais",
    title: "O que dizem nossos Pacientes",
    testimonials: allTestimonials
};

export async function getTestimonialsContent(): Promise<TestimonialsSectionContent> {
    if (!projectId || projectId === "placeholder") {
        return localTestimonialsContent;
    }

    try {
        const query = `*[_type == "testimonials-section"][0] {
            badge,
            title,
            testimonials[]-> {
                id,
                name,
                text,
                rating,
                location
            }
        }`;

        const data = await client.fetch<any>(query);

        if (data) {
            return {
                badge: data.badge || localTestimonialsContent.badge,
                title: data.title || localTestimonialsContent.title,
                testimonials: (data.testimonials || []).map((t: any, idx: number) => {
                    const fallbackT = localTestimonialsContent.testimonials[idx] || {};
                    return {
                        id: typeof t.id === "number" ? t.id : idx + 1,
                        name: t.name,
                        text: t.text,
                        rating: t.rating || fallbackT.rating || 5,
                        location: t.location
                    };
                })
            };
        }
    } catch (error) {
        console.error("Error fetching testimonials content from Sanity, falling back to local data:", error);
    }

    return localTestimonialsContent;
}
