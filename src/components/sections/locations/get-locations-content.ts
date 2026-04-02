import { LocationsContent } from "./types";

export async function getLocationsContent(): Promise<LocationsContent> {
    return {
        sectionSubtitle: "Onde Atendemos",
        sectionTitle: "Nossas Unidades de Atendimento",
        sectionDescription: "Escolha a unidade mais próxima de você para um atendimento especializado em coluna.",
        units: [
            {
                id: "materdei-betim",
                title: "Materdei Betim",
                subtitle: "Betim - MG",
                address: "Via expressa, 15500",
                phone: "(31) 3339-9800",
                mapUrl: "https://www.google.com/maps/place/Hospital+Mater+Dei+Betim-Contagem/@-19.9408634,-44.1475649,17z/data=!3m1!4b1!4m6!3m5!1s0xa6c1cabee6c259:0x7d294aaad7d86fd6!8m2!3d-19.9408634!4d-44.1475649!16s%2Fg%2F11gh86_kn_?entry=ttu&g_ep=EgoyMDI2MDEyOC4wIKXMDSoASAFQAw%3D%3D",
                websiteUrl: "https://www.materdei.com.br/unidades/materdei-betim-contagem"
            },
            {
                id: "clinica-centra",
                title: "Clínica Centra",
                subtitle: "Centro - Betim",
                address: "Rua Inconfidência, 488, 3º Andar, Centro - Betim/MG",
                phone: "(31) 2571-0321",
                mapUrl: "https://www.google.com/maps/place/R.+Inconfid%C3%AAncia,+488+-+Centro,+Betim+-+MG,+32600-100/@-19.9670894,-44.2010491,17z/data=!3m1!4b1!4m6!3m5!1s0xa6c390dc3982b9:0x1fc8a1f6ebb60807!8m2!3d-19.9670894!4d-44.1984742!16s%2Fg%2F11c1_9zgxb?entry=ttu&g_ep=EgoyMDI2MDMxMS4wIKXMDSoASAFQAw%3D%3D",
                websiteUrl: "https://clinicacentra.com.br/"
            },
            {
                id: "clinica-elcenter-barreiro",
                title: "Clínica Elcenter Barreiro",
                subtitle: "Barreiro - BH",
                address: "Rua Alcindo Vieira, 305, Barreiro - Belo Horizonte/MG",
                phone: "(31) 3370-3600",
                mapUrl: "https://www.google.com/maps/place/R.+Alcindo+Vi%C3%AAira,+305+-+Barreiro,+Belo+Horizonte+-+MG,+30640-100/@-19.9758365,-44.0197561,17z/data=!3m1!4b1!4m6!3m5!1s0xa6bde17c0dd34f:0xe128e08cf351b779!8m2!3d-19.9758365!4d-44.0171812!16s%2Fg%2F11crx8kyy4?entry=ttu&g_ep=EgoyMDI2MDMxMS4wIKXMDSoASAFQAw%3D%3D",
                websiteUrl: "https://elcenter.com.br/"
            },
            {
                id: "clinica-numai",
                title: "Clínica NUMAI",
                subtitle: "Pampulha - BH",
                address: "Avenida Coronel José Dias Bicalho 928, bairro São Luiz/Pampulha - Belo Horizonte/MG",
                phone: "(31) 3504-0045",
                mapUrl: "https://www.google.com/maps/place/Av.+Cel.+Jos%C3%A9+Dias+Bicalho,+928+-+S%C3%A3o+Luiz,+Belo+Horizonte+-+MG,+31275-050/@-19.8595823,-43.9705691,17z/data=!3m1!4b1!4m6!3m5!1s0xa69059511e4e07:0x68b302172d190e96!8m2!3d-19.8595823!4d-43.9679942!16s%2Fg%2F11cpb86mx2?entry=ttu&g_ep=EgoyMDI2MDMxMS4wIKXMDSoASAFQAw%3D%3D",
                websiteUrl: "https://www.clinicanumai.com.br/"
            },
            {
                id: "ceofe-contagem",
                title: "CEOFE - Contagem",
                subtitle: "Eldorado - Contagem",
                address: "Av. José faria da Rocha, 4458, Eldorado, Contagem/MG",
                phone: "(31) 99967-5665",
                mapUrl: "https://www.google.com/maps/place/Av.+Jos%C3%A9+Faria+da+Rocha,+4458+-+Eldorado,+Contagem+-+MG,+32310-210/@-19.94192,-44.0429492,17z/data=!3m1!4b1!4m6!3m5!1s0xa6959317903a77:0x9d69c6598db90749!8m2!3d-19.94192!4d-44.0403743!16s%2Fg%2F11cslh588l?entry=ttu&g_ep=EgoyMDI2MDMxMS4wIKXMDSoASAFQAw%3D%3D",
                websiteUrl: "http://www.ceofe.com.br/"
            },
            {
                id: "hospital-biocor",
                title: "Hospital Biocor - Rede D'Or",
                subtitle: "Vila da Serra - Nova Lima",
                address: "Alameda Oscar Niemeyer (antiga Alameda da Serra), 217, Vila da Serra, Nova Lima/MG",
                phone: "(31) 3289-5040",
                mapUrl: "https://www.google.com/maps?client=safari&rls=en&oe=UTF-8&um=1&ie=UTF-8&fb=1&gl=br&sa=X&geocode=KSn3R6j_l6YAMaTCEF9e_fby&daddr=Alameda+Oscar+Niemeyer,+217+-+Vila+da+Serra,+Nova+Lima+-+MG,+34006-056",
                websiteUrl: "https://www.rededorsaoluiz.com.br/hospital/biocor"
            }
        ]
    };
};
