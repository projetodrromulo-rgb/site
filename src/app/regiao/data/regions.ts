import { HeroContent } from "@/components/sections/hero/types";

export interface RegionData {
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
  bgImage?: string;
}

export const regionsData: Record<string, RegionData> = {
  pampulha: {
    slug: "pampulha",
    name: "Pampulha",
    title: "Médico Ortopedista Especialista em Coluna na Pampulha | Dr. Rômulo Oliveira",
    metaDescription: "Especialista em coluna na Pampulha. Dr. Rômulo Oliveira realiza cirurgia de coluna minimamente invasiva e tratamento de hérnia de disco.",
    keywords: [
      "medico ortopedista especialista em coluna na pampulha",
      "ortopedista especialista em coluna na pampulha",
      "especialista em coluna na pampulha",
      "cirurgia de coluna na pampulha",
      "clinica de coluna na pampulha",
      "tratamento de hernia de disco na pampulha",
      "dor nas costas pampulha",
      "ortopedista na pampulha",
      "cirurgiao de coluna pampulha",
      "clinica numai pampulha"
    ],
    heroContent: {
      typingPhrases: [
        "Especialista em Coluna na Pampulha",
        "Consultas na Clínica NUMAI",
        "Cirurgia de Coluna na Pampulha"
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
      description: "Médico Ortopedista Especialista em Coluna na Pampulha. Especialista em cirurgia de coluna minimamente invasiva, endoscopia e tratamento de hérnia de disco. Atendimento na Clínica NUMAI.",
      ctaText: "Agendar Consulta na Pampulha",
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
      }
    ],
    bgImage: "/images/mri_room_spine.png"
  }
};
