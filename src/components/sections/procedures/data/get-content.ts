import { ProceduresSectionContent } from "../types";
import { allProcedures } from "@/data/procedures";

export async function getProceduresContent(): Promise<ProceduresSectionContent> {
    // In a real scenario, this could be a call to a CMS or an API
    return {
        badge: "Nossas Especialidades",
        title: "Tratamentos Especializados",
        description: "Oferecemos tratamentos personalizados para diversas patologias da coluna, utilizando as técnicas mais modernas da medicina.",
        items: allProcedures
    };
}
