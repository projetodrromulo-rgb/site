import { ProceduresSectionContent } from "../types";
import { allProcedures } from "./procedures";
import { client, projectId } from "../../../../lib/sanity";

const localProceduresContent: ProceduresSectionContent = {
    badge: "Nossas Especialidades",
    title: "Tratamentos Especializados",
    description: "Oferecemos tratamentos personalizados para diversas patologias da coluna, utilizando as técnicas mais modernas da medicina.",
    items: allProcedures
};

export async function getProceduresContent(): Promise<ProceduresSectionContent> {
    if (!projectId || projectId === "placeholder") {
        return localProceduresContent;
    }

    try {
        const query = `*[_type == "procedures-section"][0] {
            badge,
            title,
            description,
            items[]-> {
                title,
                description,
                icon,
                "slug": slug.current,
                content,
                "imageUrl": coalesce(image.asset->url, ""),
                metaTitle,
                metaDescription,
                faq[] {
                    question,
                    answer
                },
                references
            }
        }`;

        const data = await client.fetch<any>(query);

        if (data) {
            return {
                badge: data.badge || localProceduresContent.badge,
                title: data.title || localProceduresContent.title,
                description: data.description || localProceduresContent.description,
                items: (data.items || []).map((item: any, idx: number) => {
                    const fallbackItem = localProceduresContent.items[idx] || {};
                    return {
                        title: item.title,
                        description: item.description,
                        icon: item.icon,
                        slug: item.slug,
                        content: item.content,
                        imageUrl: item.imageUrl || fallbackItem.imageUrl || "",
                        metaTitle: item.metaTitle || fallbackItem.metaTitle || "",
                        metaDescription: item.metaDescription || fallbackItem.metaDescription || "",
                        faq: item.faq || [],
                        references: item.references || []
                    };
                })
            };
        }
    } catch (error) {
        console.error("Error fetching procedures content from Sanity, falling back to local data:", error);
    }

    return localProceduresContent;
}
