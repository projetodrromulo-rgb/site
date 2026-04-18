import { getplains } from "./get-plans";


export function getMaterDeiBetimPlains() {
    const plans = getplains()

    const materDeiBetimTextPlans = ["Amil",
        "Abertta",
        "Allianz",
        "Alice",
        "Amagis",
        "Ammp",
        "ASSEFAZ",
        "Assembleia Legislativa",
        "Assis Card",
        "Bacen",
        "Blue Med Saúde",
        "Bradesco",
        "Brasil Assistência",
        "Cabesp",
        "Camed Saúde",
        "Care Plus",
        "Cassi",
        "Saude Caixa",
        "Cemig",
        "Cenibra",
        "Centauro",
        "Care Plus",
        "Copasa",
        "Correios",
        "Desban",
        "Euro Center",
        "fundação Fiat",
        "FSFX",
        "Itau",
        "Fundafemg",
        "Gama Saúde",
        "Mapfre",
        "Mater Dei",
        "Mondial",
        "Omint",
        "Plan Assiste",
        "Porto Seguro",
        "Prestige Internacional",
        "Pró Social",
        "Proasa",
        "Petrobras",
        "Saude Caixa",
        "Select Operadora",
        "Sindifisco",
        "Sistema Paulista",
        "SOS Assistance",
        "Sulamerica",
        "SOS Assistance",
        "Unafisco MG",
        "Unimed Seguros",
        "Usisaude",
        "Vale"
    ];
    return plans.filter((plan) => materDeiBetimTextPlans.includes(plan.name));


}