import { ParallaxContent } from "../types";
import { client, projectId } from "../../../../lib/sanity";

const localParallaxContent: ParallaxContent = {
    backgroundImage: {
        src: "/images/parallax.webp",
        alt: "Arthrodesis Parallax Background"
    },
    title: "Tecnologia & Precisão"
};

export async function getParallaxContent(): Promise<ParallaxContent> {
    if (!projectId || projectId === "placeholder") {
        return localParallaxContent;
    }

    try {
        const query = `*[_type == "parallax"][0] {
            "backgroundImage": {
                "src": coalesce(backgroundImage.asset->url, ""),
                "alt": coalesce(backgroundImage.alt, "")
            },
            title
        }`;

        const data = await client.fetch<any>(query);

        if (data) {
            return {
                backgroundImage: {
                    src: data.backgroundImage?.src || localParallaxContent.backgroundImage.src,
                    alt: data.backgroundImage?.alt || localParallaxContent.backgroundImage.alt
                },
                title: data.title || localParallaxContent.title
            };
        }
    } catch (error) {
        console.error("Error fetching parallax content from Sanity, falling back to local data:", error);
    }

    return localParallaxContent;
}
