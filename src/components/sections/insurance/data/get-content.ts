import { InsuranceContent } from "../types";
import { getCentraPlains } from "./get-centra-plains";
import { getCeofPlains } from "./get-ceof-plains";
import { getElcenterPlains } from "./get-elcenter-plains";
import { getMaterDeiBetimPlains } from "./get-mater-dei-betim-plains";
import { getNumaiPlains } from "./get-numai-plains";
import { client, projectId } from "../../../../lib/sanity";

const localInsuranceContent: InsuranceContent = {
    id: "insurance-section",
    badge: "Planos de Saúde e Convênio",
    headline: {
        textTop: "Convênios",
        textHighlight: "Aceitos",
        textBottom: "",
        styles: {
            textColorTitle: "var(--color-title-secondary)",
            textColorHighlightFrom: "var(--color-title-secondary-highlight-from)",
            textColorHighlightTo: "var(--color-title-secondary-highlight-to)",
            textColorBottom: "var(--color-title-secondary)"
        }
    },
    description: "Trabalhamos com as principais operadoras do mercado para garantir agilidade, conforto e excelência no seu atendimento especializado em patologias da coluna.",
    hospitals: [
        {
            name: "CEOFE - Contagem",
            plans: getCeofPlains(),
            speed: 10
        },
        {
            name: "Mater Dei Betim",
            plans: getMaterDeiBetimPlains(),
            speed: 30
        },
        {
            name: "Clinica Numai",
            plans: getNumaiPlains(),
            speed: 10
        },
        {
            name: "Clinica Centra",
            plans: getCentraPlains(),
            speed: 10
        },
        {
            name: "Clinica Elcenter",
            plans: getElcenterPlains(),
            speed: 10
        }
    ]
};

export async function getInsuranceContent(): Promise<InsuranceContent> {
    if (!projectId || projectId === "placeholder") {
        return localInsuranceContent;
    }

    try {
        const query = `*[_type == "insurance"][0] {
            id,
            badge,
            headline {
                textTop,
                textHighlight,
                textBottom
            },
            description,
            hospitals[] {
                name,
                speed,
                plans[]-> {
                    name,
                    "src": coalesce(image.asset->url, "")
                }
            }
        }`;

        const data = await client.fetch<any>(query);

        if (data) {
            return {
                id: data.id || localInsuranceContent.id,
                badge: data.badge || localInsuranceContent.badge,
                headline: {
                    textTop: data.headline?.textTop || localInsuranceContent.headline.textTop,
                    textHighlight: data.headline?.textHighlight || localInsuranceContent.headline.textHighlight,
                    textBottom: data.headline?.textBottom || localInsuranceContent.headline.textBottom || "",
                    styles: localInsuranceContent.headline.styles
                },
                description: data.description || localInsuranceContent.description,
                hospitals: (data.hospitals || []).map((hosp: any, idx: number) => {
                    const fallbackHosp = localInsuranceContent.hospitals[idx] || { speed: 10 };
                    return {
                        name: hosp.name,
                        speed: hosp.speed || fallbackHosp.speed || 10,
                        plans: (hosp.plans || []).map((p: any) => ({
                            name: p.name,
                            src: p.src || ""
                        }))
                    };
                })
            };
        }
    } catch (error) {
        console.error("Error fetching insurance content from Sanity, falling back to local data:", error);
    }

    return localInsuranceContent;
}
