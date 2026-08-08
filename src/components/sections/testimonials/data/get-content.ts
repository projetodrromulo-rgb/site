import { TestimonialsSectionContent } from "../types";
import { allTestimonials } from "./testimonials";
import { client, projectId } from "../../../../lib/sanity";

const localTestimonialsContent: TestimonialsSectionContent = {
    badge: "Avaliações no Google",
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
            const hasFakeTestimonials = (data.testimonials || []).some((t: any) =>
                t.name?.includes("Clara") ||
                t.name?.includes("Ricardo") ||
                t.text?.includes("Dra. Ana") ||
                t.text?.includes("hipnose") ||
                t.text?.includes("Pathwork")
            );

            const testimonialsList = (data.testimonials && data.testimonials.length > 0 && !hasFakeTestimonials)
                ? data.testimonials.map((t: any, idx: number) => {
                    const fallbackT = localTestimonialsContent.testimonials[idx] || {};
                    return {
                        id: typeof t.id === "number" ? t.id : idx + 1,
                        name: t.name || fallbackT.name,
                        text: t.text || fallbackT.text,
                        rating: t.rating || fallbackT.rating || 5,
                        location: t.location || fallbackT.location || "Google Reviews"
                    };
                })
                : localTestimonialsContent.testimonials;

            return {
                badge: data.badge || localTestimonialsContent.badge,
                title: data.title || localTestimonialsContent.title,
                testimonials: testimonialsList
            };
        }
    } catch (error) {
        console.error("Error fetching testimonials content from Sanity, falling back to local data:", error);
    }

    return localTestimonialsContent;
}
