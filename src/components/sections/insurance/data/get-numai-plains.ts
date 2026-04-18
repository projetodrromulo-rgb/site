import { getplains } from "./get-plans";


export function getNumaiPlains() {
    const plans = getplains()

    const numaiTextPlans = ["Amil",
        "Abertta",
        "Cassi",
        "Cemig",
        "Copasa",
        "fundação Fiat",
        "Fundação Libertas",
        "PLAN CNEN",
        "Unimed Seguros",
        "Sulamerica",
        "Usisaude",
        "Vale"];
    return plans.filter((plan) => numaiTextPlans.includes(plan.name));


}