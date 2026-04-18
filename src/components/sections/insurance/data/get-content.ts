
import { InsuranceContent, Plan } from "../types";
import { getCeofPlains } from "./get-ceof-plains";
import { getMaterDeiBetimPlains } from "./get-mater-dei-betim-plains";
import { getNumaiPlains } from "./get-numai-plains";
import { getplains } from "./get-plans";

export async function getInsuranceContent(): Promise<InsuranceContent> {
    const ceofPlains = getCeofPlains();
    const materDeiBetimPlains = getMaterDeiBetimPlains();
    const numaiPlains = getNumaiPlains();


    return {
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
                plans: ceofPlains,
                speed: 10
            },
            {
                name: "Mater Dei Betim",
                plans: materDeiBetimPlains,
                speed: 30
            },
            {
                name: "NUMAI",
                plans: numaiPlains,
                speed: 10
            }


        ]
    };
}
