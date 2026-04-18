import { getplains } from "./get-plans";


export function getCeofPlains() {
    const plans = getplains()

    const ceofTextPlans = ["Amil", "Abertta", "Bradesco", "Saude Caixa", "Cemig", "Copasa", "Fundafemg", "Itau", "Mediservice", "Petrobras", "Sulamerica", "Usisaude", "Vale", "Unimed"];
    return plans.filter((plan) => ceofTextPlans.includes(plan.name));


}