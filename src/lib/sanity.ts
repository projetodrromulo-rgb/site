import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-05-25";

export const client = createClient({
    projectId: projectId || "placeholder",
    dataset,
    apiVersion,
    useCdn: process.env.NODE_ENV === "production", // Enable CDN caching in production
});

// Image asset URL builder helper
const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
    if (!projectId || projectId === "placeholder") {
        return {
            url: () => source || ""
        } as any;
    }
    return builder.image(source);
}
