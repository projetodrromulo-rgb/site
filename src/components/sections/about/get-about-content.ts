import { AboutContent } from "./types";

export const getAboutContent = (): AboutContent => {
    return {
        subtitle: "Sobre o Especialista",
        headline: {
            normal: "Comprometido com sua",
            highlight: "Saúde e Bem-estar"
        },
        image: {
            src: "/images/foto-about.svg",
            alt: "Dr. Rômulo Oliveira"
        },
        paragraphs: [
            "O Dr. Rômulo Oliveira dedica sua trajetória profissional ao tratamento avançado de patologias da coluna vertebral, unindo tecnologia de ponta e um olhar humano e individualizado.",
            "Especialista reconhecido em cirurgias minimamente invasivas, seu foco principal é reduzir o tempo de recuperação, permitindo que o paciente retorne às suas atividades diárias com o máximo de conforto e segurança.",
            "Sua abordagem prioriza técnicas que preservam a musculatura e estabilidade da coluna, sempre buscando a solução menos agressiva e mais eficaz para cada caso clínico."
        ],
        formation: [
            "Membro da Sociedade Brasileira de Coluna - SBC",
            "Fellowship em cirurgia de coluna - Hospital da Baleia - Belo Horizonte MG",
            "Residência Médica em Ortopedia e Traumatologia pelo Hospital Municipal - Governador Valadares - MG",
            "Médico pela UNEC - Caratinga MG"
        ],
        features: [
            {
                icon: "Award",
                title: "Especialista em Coluna",
                description: "RQE 59057 | TEOT 19406"
            },
            {
                icon: "Zap",
                title: "Tecnologia de Ponta",
                description: "Técnicas Minimamente Invasivas"
            },
            {
                icon: "Activity",
                title: "Recuperação Rápida",
                description: "Foco no retorno às atividades"
            },
            {
                icon: "ShieldCheck",
                title: "Segurança e Ética",
                description: "Procedimentos Certificados"
            }
        ]
    };
};
