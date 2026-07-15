import { HeroContent } from "@/components/sections/hero/types";

export interface CityData {
  slug: string;
  name: string;
  title: string;
  metaDescription: string;
  keywords: string[];
  heroContent: Omit<HeroContent, "cta"> & {
    ctaText: string;
  };
  address?: {
    streetAddress: string;
    postalCode: string;
  };
  geo?: {
    latitude: number;
    longitude: number;
  };
  locations?: Array<{
    name: string;
    streetAddress: string;
    telephone: string;
  }>;
  bgImages?: string[];
  aboutOverride?: {
    subtitle?: string;
    paragraphs?: string[];
  };
  ctaOverride?: {
    description?: string;
  };
}

export const citiesData: Record<string, CityData> = {
  betim: {
    slug: "betim",
    name: "Betim",
    title: "Médico Ortopedista Especialista em Coluna em Betim | Dr. Rômulo Oliveira",
    metaDescription: "Especialista em coluna em Betim. Dr. Rômulo Oliveira realiza cirurgia minimamente invasiva e tratamento de hérnia de disco no Mater Dei Betim.",
    keywords: [
      "medico ortopedista especialista em coluna em betim",
      "ortopedista especialista em coluna em betim",
      "especialista em coluna em betim",
      "cirurgia de coluna em betim",
      "clinica de coluna em betim",
      "tratamento de hernia de disco em betim",
      "dor nas costas betim",
      "ortopedista em betim",
      "cirurgiao de coluna betim",
      "mater dei betim coluna",
      "clinica centra betim"
    ],
    heroContent: {
      typingPhrases: [
        "Especialista em Coluna em Betim",
        "Atendimento no Mater Dei Betim",
        "Consultas na Clínica Centra"
      ],
      headline: {
        textTop: "",
        textHighlight: "Dr. Rômulo Oliveira",
        textBottom: "",
        styles: {
          textColorTitle: "var(--color-title-primary)",
          textColorHighlightFrom: "var(--color-title-primary-highlight-from)",
          textColorHighlightTo: "var(--color-title-primary-highlight-to)",
          textColorBottom: "var(--color-title-primary)"
        }
      },
      description: "Médico Ortopedista Especialista em Coluna em Betim. Especialista em cirurgia de coluna minimamente invasiva, endoscopia e tratamento de hérnia de disco com foco em rápida recuperação e alívio da dor. Atendimento no Hospital Mater Dei Betim e Clínica Centra.",
      ctaText: "Agendar Consulta em Betim",
      backgroundVideo: {
        src: "/video/video-hero.webm"
      }
    },
    address: {
      streetAddress: "Via Expressa de Betim, 15500 - Duque de Caxias",
      postalCode: "32673-472"
    },
    geo: {
      latitude: -19.94085182661938,
      longitude: -44.147566703589625
    },
    locations: [
      {
        name: "Mater Dei Betim",
        streetAddress: "Via Expressa de Betim, 15500 - Duque de Caxias - Betim - MG",
        telephone: "(31) 3339-9000"
      },
      {
        name: "Clínica Centra",
        streetAddress: "Rua Inconfidência, 488, 3º Andar, Centro - Betim-MG",
        telephone: "(31) 2571-0321"
      }
    ],
    bgImages: [
      "/images/dr_romulo_surgery_01.jpg",
      "/images/dr_romulo_surgery_02.jpg",
      "/images/dr_romulo_surgery_03.jpg",
      "/images/dr_romulo_surgery_04.jpg",
      "/images/dr_romulo_surgery_05.jpg"
    ],
    aboutOverride: {
      subtitle: "Especialista em Coluna em Betim",
      paragraphs: [
        "O Dr. Rômulo Oliveira é médico ortopedista especialista em coluna em Betim, referência no tratamento de doenças da coluna vertebral na região. Com atendimento no Hospital Mater Dei Betim e na Clínica Centra, oferece às pessoas de Betim e cidades vizinhas acesso a cirurgia de coluna minimamente invasiva de alto nível, sem precisar se deslocar para grandes centros.",
        "Como especialista em coluna em Betim, o Dr. Rômulo é experiente no diagnóstico e tratamento de hérnia de disco, estenose do canal lombar, escoliose, espondilolistese e dor crônica nas costas — condições que impactam diretamente a qualidade de vida dos pacientes. Suas técnicas endoscópicas e de acesso mínimo proporcionam recuperação rápida e menos riscos cirúrgicos."
      ]
    },
    ctaOverride: {
      description: "Se você busca um ortopedista especialista em coluna em Betim com formação sólida, tecnologia de ponta e atendimento humanizado, o Dr. Rômulo Oliveira está disponível para avaliação presencial no Mater Dei Betim e na Clínica Centra."
    }
  },
  "belo-horizonte": {
    slug: "belo-horizonte",
    name: "Belo Horizonte",
    title: "Médico Ortopedista Especialista em Coluna em BH | Dr. Rômulo Oliveira",
    metaDescription: "Especialista em coluna em Belo Horizonte. Dr. Rômulo Oliveira realiza cirurgia de coluna minimamente invasiva e tratamento de hérnia de disco em BH.",
    keywords: [
      "medico ortopedista especialista em coluna em bh",
      "ortopedista especialista em coluna em belo horizonte",
      "especialista em coluna em bh",
      "cirurgia de coluna em belo horizonte",
      "clinica de coluna em bh",
      "tratamento de hernia de disco em bh",
      "dor nas costas belo horizonte",
      "ortopedista em bh",
      "cirurgiao de coluna bh",
      "clinica numai bh",
      "clinica elcenter barreiro bh"
    ],
    heroContent: {
      typingPhrases: [
        "Especialista em Coluna em BH",
        "Consultas na Clínica NUMAI",
        "Consultas na Elcenter Barreiro"
      ],
      headline: {
        textTop: "",
        textHighlight: "Dr. Rômulo Oliveira",
        textBottom: "",
        styles: {
          textColorTitle: "var(--color-title-primary)",
          textColorHighlightFrom: "var(--color-title-primary-highlight-from)",
          textColorHighlightTo: "var(--color-title-primary-highlight-to)",
          textColorBottom: "var(--color-title-primary)"
        }
      },
      description: "Médico Ortopedista Especialista em Coluna em Belo Horizonte. Especialista em cirurgia de coluna minimamente invasiva, endoscopia e tratamento de hérnia de disco. Atendimento nas Clínicas NUMAI (Pampulha) e Elcenter (Barreiro).",
      ctaText: "Agendar Consulta em BH",
      backgroundVideo: {
        src: "/video/video-hero.webm"
      }
    },
    address: {
      streetAddress: "Avenida Coronel José Dias Bicalho 928, bairro São Luiz/Pampulha",
      postalCode: "31275-050"
    },
    geo: {
      latitude: -19.8586885,
      longitude: -43.9648975
    },
    locations: [
      {
        name: "Clínica NUMAI",
        streetAddress: "Avenida Coronel José Dias Bicalho 928, bairro São Luiz/Pampulha - Belo Horizonte-MG",
        telephone: "(31) 3504-0045"
      },
      {
        name: "Clínica Elcenter Barreiro",
        streetAddress: "Rua Alcindo Vieira, 305, Barreiro - Belo Horizonte-MG",
        telephone: "(31) 3370-3600"
      }
    ],
    bgImages: [
      "/images/dr_romulo_surgery_02.jpg",
      "/images/dr_romulo_surgery_03.jpg",
      "/images/dr_romulo_surgery_04.jpg",
      "/images/dr_romulo_surgery_05.jpg",
      "/images/dr_romulo_surgery_01.jpg"
    ],
    aboutOverride: {
      subtitle: "Especialista em Coluna em Belo Horizonte",
      paragraphs: [
        "O Dr. Rômulo Oliveira é médico ortopedista especialista em coluna em Belo Horizonte, referência no tratamento de doenças da coluna vertebral. Com atendimento na Clínica NUMAI (Pampulha) e Clínica Elcenter (Barreiro), oferece aos moradores de Belo Horizonte e região acesso a cirurgia de coluna minimamente invasiva de excelência.",
        "Como especialista em coluna em Belo Horizonte, o Dr. Rômulo possui ampla experiência no diagnóstico e tratamento de hérnia de disco, estenose do canal lombar, escoliose, espondilolistese e dor crônica nas costas — condições que limitam a qualidade de vida. Suas abordagens endoscópicas proporcionam uma recuperação mais ágil e segura."
      ]
    },
    ctaOverride: {
      description: "Se você busca um ortopedista especialista em coluna em Belo Horizonte focado em procedimentos modernos e atendimento atencioso, o Dr. Rômulo Oliveira está disponível para consultas presenciais na Clínica NUMAI e Elcenter Barreiro."
    }
  },
  contagem: {
    slug: "contagem",
    name: "Contagem",
    title: "Médico Ortopedista Especialista em Coluna em Contagem | Dr. Rômulo Oliveira",
    metaDescription: "Ortopedista especialista em coluna em Contagem. Dr. Rômulo Oliveira realiza cirurgia minimamente invasiva e tratamento de hérnia de disco.",
    keywords: [
      "medico ortopedista especialista em coluna em contagem",
      "ortopedista especialista em coluna em contagem",
      "especialista em coluna em contagem",
      "cirurgia de coluna em contagem",
      "clinica de coluna em contagem",
      "tratamento de hernia de disco em contagem",
      "dor nas costas contagem",
      "ortopedista em contagem",
      "cirurgiao de coluna contagem",
      "ceofe contagem"
    ],
    heroContent: {
      typingPhrases: [
        "Especialista em Coluna em Contagem",
        "Atendimento no CEOFE Contagem",
        "Cirurgia de Coluna em Contagem"
      ],
      headline: {
        textTop: "",
        textHighlight: "Dr. Rômulo Oliveira",
        textBottom: "",
        styles: {
          textColorTitle: "var(--color-title-primary)",
          textColorHighlightFrom: "var(--color-title-primary-highlight-from)",
          textColorHighlightTo: "var(--color-title-primary-highlight-to)",
          textColorBottom: "var(--color-title-primary)"
        }
      },
      description: "Médico Ortopedista Especialista em Coluna em Contagem. Especialista em cirurgia de coluna minimamente invasiva, endoscopia e tratamento de hérnia de disco. Atendimento no CEOFE Contagem.",
      ctaText: "Agendar Consulta em Contagem",
      backgroundVideo: {
        src: "/video/video-hero.webm"
      }
    },
    address: {
      streetAddress: "Av. José faria da Rocha, 4458, Eldorado",
      postalCode: "32310-210"
    },
    geo: {
      latitude: -19.9419138,
      longitude: -44.0403422
    },
    locations: [
      {
        name: "CEOFE - Contagem",
        streetAddress: "Av. José faria da Rocha, 4458, Eldorado, Contagem-MG",
        telephone: "(31) 99967-5665"
      }
    ],
    bgImages: [
      "/images/dr_romulo_surgery_03.jpg",
      "/images/dr_romulo_surgery_04.jpg",
      "/images/dr_romulo_surgery_05.jpg",
      "/images/dr_romulo_surgery_01.jpg",
      "/images/dr_romulo_surgery_02.jpg"
    ],
    aboutOverride: {
      subtitle: "Especialista em Coluna em Contagem",
      paragraphs: [
        "O Dr. Rômulo Oliveira é médico ortopedista especialista em coluna em Contagem, dedicado ao tratamento moderno e resolutivo das patologias da coluna vertebral. Com atendimento no CEOFE Contagem, a população local tem acesso facilitado a cirurgia de coluna minimamente invasiva sem precisar se deslocar para a capital.",
        "Reconhecido como especialista em coluna em Contagem, o Dr. Rômulo conduz tratamentos eficazes para hérnia de disco, estenose do canal lombar, escoliose e dores crônicas, priorizando o bem-estar e o rápido retorno do paciente à sua rotina através de técnicas avançadas de endoscopia da coluna."
      ]
    },
    ctaOverride: {
      description: "Se você procura por um ortopedista especialista em coluna em Contagem que alia tecnologia e humanização, o Dr. Rômulo Oliveira está à disposição para avaliar seu caso presencialmente no CEOFE, região do Eldorado."
    }
  },
  "nova-lima": {
    slug: "nova-lima",
    name: "Nova Lima",
    title: "Médico Ortopedista Especialista em Coluna em Nova Lima | Dr. Rômulo Oliveira",
    metaDescription: "Ortopedista especialista em coluna em Nova Lima. Dr. Rômulo Oliveira realiza cirurgia minimamente invasiva e tratamento de hérnia de disco.",
    keywords: [
      "medico ortopedista especialista em coluna em nova lima",
      "ortopedista especialista em coluna em nova lima",
      "especialista em coluna em nova lima",
      "cirurgia de coluna em nova lima",
      "clinica de coluna em nova lima",
      "tratamento de hernia de disco em nova lima",
      "dor nas costas nova lima",
      "ortopedista em nova lima",
      "cirurgiao de coluna nova lima",
      "biocor nova lima"
    ],
    heroContent: {
      typingPhrases: [
        "Especialista em Coluna em Nova Lima",
        "Consultas no Hospital Biocor",
        "Cirurgia de Coluna em Nova Lima"
      ],
      headline: {
        textTop: "",
        textHighlight: "Dr. Rômulo Oliveira",
        textBottom: "",
        styles: {
          textColorTitle: "var(--color-title-primary)",
          textColorHighlightFrom: "var(--color-title-primary-highlight-from)",
          textColorHighlightTo: "var(--color-title-primary-highlight-to)",
          textColorBottom: "var(--color-title-primary)"
        }
      },
      description: "Médico Ortopedista Especialista em Coluna em Nova Lima. Especialista em cirurgia de coluna minimamente invasiva, endoscopia e tratamento de hérnia de disco. Consultas e procedimentos no Hospital Biocor - Rede D'Or.",
      ctaText: "Agendar Consulta em Nova Lima",
      backgroundVideo: {
        src: "/video/video-hero.webm"
      }
    },
    address: {
      streetAddress: "R. Da Paisagem, 290 - Vila Da Serra",
      postalCode: "34006-056"
    },
    geo: {
      latitude: -19.9814672,
      longitude: -43.9447964
    },
    locations: [
      {
        name: "Hospital Biocor - Rede D'Or",
        streetAddress: "R. Da Paisagem, 290 - Vila Da Serra - Nova Lima - MG",
        telephone: "(31) 3289-5000"
      }
    ],
    bgImages: [
      "/images/dr_romulo_surgery_04.jpg",
      "/images/dr_romulo_surgery_05.jpg",
      "/images/dr_romulo_surgery_01.jpg",
      "/images/dr_romulo_surgery_02.jpg",
      "/images/dr_romulo_surgery_03.jpg"
    ],
    aboutOverride: {
      subtitle: "Especialista em Coluna em Nova Lima",
      paragraphs: [
        "O Dr. Rômulo Oliveira é médico ortopedista especialista em coluna em Nova Lima, sendo referência em tratamentos cirúrgicos e conservadores de alta complexidade. Com atendimento especializado no renomado Hospital Biocor (Rede D'Or), proporciona o que há de mais moderno em cirurgia de coluna minimamente invasiva.",
        "Atuando como especialista em coluna em Nova Lima, o Dr. Rômulo é altamente experiente no manejo de condições desafiadoras como hérnia de disco, estenose do canal lombar, escoliose e dor nas costas. A aplicação de técnicas endoscópicas visa preservar a musculatura e garantir aos pacientes uma recuperação com muito mais conforto."
      ]
    },
    ctaOverride: {
      description: "Se você necessita de um ortopedista especialista em coluna em Nova Lima, agende sua avaliação com o Dr. Rômulo Oliveira no Hospital Biocor. Obtenha o diagnóstico preciso e as melhores opções de tratamento para o seu caso."
    }
  }
};
