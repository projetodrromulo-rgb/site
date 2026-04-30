import { getplains } from "./get-plans";


export function getCentraPlains() {
    const plans = getplains()

    const centraTextPlans = ["Amil",
        "Abertta",
        "Amil",
        "Bradesco",
        "Cassi",
        "Cemig",
        "Copasa",
        "Esaude Assist",
        "Esaude Card",
        "fundação Fiat",
        "Gama Saúde",
        "Geap",
        "Medgold saúde",
        "MedPrev",
        "MedSenior",
        "Medi Service",
        "Saude Caixa",
        "Stellantis",
        "Sulamerica",
        "Usisaude",
        "Vale"


    ];
    return plans.filter((plan) => centraTextPlans.includes(plan.name));


}