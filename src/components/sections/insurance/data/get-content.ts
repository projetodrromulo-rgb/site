import { InsuranceContent, Plan } from "../types";

export async function getInsuranceContent(): Promise<InsuranceContent> {

    const BASE_PATH = "/images/Convenios";
    // Definindo as marcas disponíveis
    const unimed = { name: "Unimed", src: `${BASE_PATH}/Unimed.png` };
    const sulamerica = { name: "Sulamérica", src: `${BASE_PATH}/sulamerica.png` };
    const cemig = { name: "CEMIG", src: `${BASE_PATH}/CEMIG.png` };
    const copasa = { name: "Copasa", src: `${BASE_PATH}/Copasa.png` };

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
                name: "Hospital Mater Dei",
                plans: [unimed, sulamerica, cemig, copasa, unimed, sulamerica]
            },
            {
                name: "Hospital Vila da Serra",
                plans: [unimed, sulamerica, copasa, unimed]
            },
            {
                name: "Hospital Lifecenter",
                plans: [unimed, cemig, sulamerica, copasa, cemig]
            },
            {
                name: "Hospital Biocor",
                plans: [unimed, sulamerica, cemig]
            }
        ]
    };
}
