import { LocationsContent } from "../types";

export async function getLocationsContent(): Promise<LocationsContent> {
    return {
        subtitle: "Onde Atendemos",
        headline: {
            textTop: "Nossas Unidades de",
            textHighlight: "Atendimento",
            styles: {
                textColorTitle: "var(--color-title-secondary)",
                textColorHighlightFrom: "var(--color-title-secondary-highlight-from)",
                textColorHighlightTo: "var(--color-title-secondary-highlight-to)",
                textColorBottom: "var(--color-title-secondary)"
            }
        },
        description: "Escolha a unidade mais próxima de você para um atendimento especializado.",
        units: [
            {
                id: "materdei-betim",
                title: "Mater Dei Betim",
                subtitle: "Duque de Caxias - Betim/MG",
                address: "Via Expressa de Betim, 15500 - Duque de Caxias - Betim",
                phone: "(31) 3339-9000",
                mapUrl: "https://www.google.com/maps/place/Hospital+Mater+Dei+Betim-Contagem/@-19.9408634,-44.1501398,17z/data=!3m1!4b1!4m6!3m5!1s0xa6c1cabee6c259:0x7d294aaad7d86fd6!8m2!3d-19.9408634!4d-44.1475649!16s%2Fg%2F11gh86_kn_?entry=ttu&g_ep=EgoyMDI2MDMzMS4wIKXMDSoASAFQAw%3D%3D",
                websiteUrl: "https://www.materdei.com.br/unidades/mater-dei-betim-contagem",
                image: "/images/location/mater-dei-betim.webp"
            },
            {
                id: "clinica-centra",
                title: "Clínica Centra",
                subtitle: "Centro - Betim",
                address: "Rua Inconfidência, 488, 3º Andar, Centro - Betim-MG",
                phone: "(31) 2571-0321",
                mapUrl: "https://www.google.com/maps/place/Cl%C3%ADnica+Centra/@-19.9670843,-44.2010491,17z/data=!3m1!4b1!4m6!3m5!1s0xa6c3849b4451ab:0xba4aefe70f87d6fb!8m2!3d-19.9670894!4d-44.1984742!16s%2Fg%2F11b77qmtys?entry=ttu&g_ep=EgoyMDI2MDQxMy4wIKXMDSoASAFQAw%3D%3D",
                websiteUrl: "https://clinicacentra.com.br/",
                image: "/images/location/clinica-centra.webp"
            },
            {
                id: "clinica-elcenter-barreiro",
                title: "Clínica Elcenter Barreiro",
                subtitle: "Barreiro - BH",
                address: "Rua Alcindo Vieira, 305, Barreiro - Belo Horizonte-MG",
                phone: "(31) 3370-3600",
                mapUrl: "https://www.google.com/maps/place/Elcenter+-+Unidade+Barreiro/@-19.975833,-44.0189758,17z/data=!3m1!4b1!4m6!3m5!1s0xa6bd000bf9bcdf:0x8b2d96cc1acd26fd!8m2!3d-19.9758365!4d-44.0171812!16s%2Fg%2F11lzmn4t0j?entry=ttu&g_ep=EgoyMDI2MDQxMy4wIKXMDSoASAFQAw%3D%3D",
                websiteUrl: "https://elcenter.com.br/",
                image: "/images/location/clinica-elcenter-barreiro.webp"
            },
            {
                id: "clinica-numai",
                title: "Clínica NUMAI",
                subtitle: "Pampulha - BH",
                address: "Avenida Coronel José Dias Bicalho 928, bairro São Luiz/Pampulha - Belo Horizonte-MG",
                phone: "(31) 3504-0045",
                mapUrl: "https://www.google.com/maps/place/Numai+-+Cl%C3%ADnica+M%C3%A9dica/@-19.8588292,-43.9648755,3a,75y/data=!3m8!1e2!3m6!1sCIHM0ogKEICAgIDJ6Zm8mwE!2e10!3e12!6shttps:%2F%2Flh3.googleusercontent.com%2Fgps-cs-s%2FAPNQkAH6LA718cta0HKpJXlv2HLGSAoi35XnMKVF8r1cl83cszASIiXAc7Quek-2yb46SVzDyQ9L4o0u1yAjWryvQ1qiHz_CCs2-Vs6_MOCXb0QuDcFF2ZptiOonONoZR4ohY6V2sA3qyA%3Dw203-h270-k-no!7i3472!8i4624!4m11!1m2!2m1!1sclinica-numai+pampulha!3m7!1s0xa69188a6e9fea7:0x1096e412d1d5d7a3!8m2!3d-19.8586885!4d-43.9648975!10e5!15sChZjbGluaWNhLW51bWFpIHBhbXB1bGhhkgESc3BlY2lhbGl6ZWRfY2xpbmlj4AEA!16s%2Fg%2F11gk_lthxt?entry=ttu&g_ep=EgoyMDI2MDQxMy4wIKXMDSoASAFQAw%3D%3D",
                websiteUrl: "https://www.clinicanumai.com.br/",
                image: "/images/location/clinica-numai.webp"
            },
            {
                id: "ceofe-contagem",
                title: "CEOFE - Contagem",
                subtitle: "Eldorado - Contagem",
                address: "Av. José faria da Rocha, 4458, Eldorado, Contagem-MG",
                phone: "(31) 99967-5665",
                mapUrl: "https://www.google.com/maps/place/CEOFE+-+Centro+de+Ortopedia+e+Fraturas+Eldorado/@-19.9419087,-44.0429171,17z/data=!3m1!4b1!4m6!3m5!1s0xa695939ce9da67:0x746b0c553162b614!8m2!3d-19.9419138!4d-44.0403422!16s%2Fg%2F1tj2ppwk?entry=ttu&g_ep=EgoyMDI2MDQxMy4wIKXMDSoASAFQAw%3D%3D",
                websiteUrl: "http://www.ceofe.com.br/",
                image: "/images/location/ceofe-contagem.webp"
            },
            {
                id: "hospital-biocor",
                title: "Hospital Biocor - Rede D'Or",
                subtitle: "Nova Lima - MG",
                address: "R. Da Paisagem, 290 - Vila Da Serra - Nova Lima",
                phone: "(31) 3289-5000",
                mapUrl: "https://www.google.com/maps/place/Biocor+Rede+D'Or:+Pronto+Atendimento,+Emerg%C3%AAncia,+Pronto+Socorro/@-19.9814621,-43.9496673,17z/data=!3m1!4b1!4m6!3m5!1s0xa697ffa847f729:0xf2f6fd5e5f10c2a4!8m2!3d-19.9814672!4d-43.9447964!16s%2Fg%2F1v16rjtm?entry=ttu&g_ep=EgoyMDI2MDQxMy4wIKXMDSoASAFQAw%3D%3D",
                websiteUrl: "https://www.biocor.com.br",
                image: "/images/location/hospital-biocor.webp"
            }

        ]
    };
};
