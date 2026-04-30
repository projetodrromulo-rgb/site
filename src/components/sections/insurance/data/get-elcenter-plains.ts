import { getplains } from "./get-plans";


export function getElcenterPlains() {
    const plans = getplains()

    const elcenterTextPlans = [
        "Abertta",
        "ABSPMC (CAIXINHA)",
        "Amagis",
        "Aurora Saude",
        "Bradesco",
        "Cassi",
        "Casu",
        "Cemig",
        "Copasa",
        "Stellantis",
        "Fundafemg",
        "fundação Libertas",
        "Fusex",
        "Geap",
        "Mediservice",
        "Postal Saúde",
        "Saude Caixa",
        "Sulamerica",
        "Vale",

    ];
    return plans.filter((plan) => elcenterTextPlans.includes(plan.name));


}