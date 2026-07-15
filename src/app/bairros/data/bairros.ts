import { HeroContent } from "@/components/sections/hero/types";

export interface BairroData {
  slug: string;
  name: string;
  title: string;
  metaDescription: string;
  keywords: string[];
  heroContent: Omit<HeroContent, "cta" | "backgroundVideo"> & {
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
  aboutOverride?: {
    subtitle?: string;
    paragraphs?: string[];
  };
  ctaOverride?: {
    title?: string;
    description?: string;
  };
}

export const bairrosData: Record<string, BairroData> = {
  "vila-da-serra": {
    slug: "vila-da-serra",
    name: "Vila da Serra",
    title: "Médico Ortopedista Especialista em Coluna no Vila da Serra | Dr. Rômulo Oliveira",
    metaDescription: "Especialista em coluna no Vila da Serra. Dr. Rômulo Oliveira realiza cirurgia minimamente invasiva de coluna e tratamento de hérnia de disco.",
    keywords: [
      "medico ortopedista especialista em coluna no vila da serra",
      "ortopedista especialista em coluna no vila da serra",
      "especialista em coluna no vila da serra",
      "cirurgia de coluna no vila da serra",
      "clinica de coluna no vila da serra",
      "tratamento de hernia de disco no vila da serra",
      "dor nas costas vila da serra",
      "ortopedista no vila da serra",
      "cirurgiao de coluna vila da serra",
      "hospital biocor vila da serra"
    ],
    heroContent: {
      typingPhrases: [
        "Especialista em Coluna no Vila da Serra",
        "Consultas no Hospital Biocor",
        "Cirurgia de Coluna no Vila da Serra"
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
      description: "Médico Ortopedista Especialista em Coluna no Vila da Serra. Especialista em cirurgia de coluna minimamente invasiva, endoscopia e tratamento de hérnia de disco no Hospital Biocor - Rede D'Or.",
      ctaText: "Agendar Consulta"
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
    bgImage: "/images/vila-da-serra-hero.png",
    aboutOverride: {
      subtitle: "Especialista em Coluna no Vila da Serra",
      paragraphs: [
        "O Dr. Rômulo Oliveira é médico ortopedista especialista em coluna no Vila da Serra, Nova Lima, com foco na excelência do cuidado às doenças da coluna vertebral. Com atendimento no Hospital Biocor (Rede D'Or), disponibiliza aos moradores da região opções seguras e inovadoras em cirurgia de coluna minimamente invasiva.",
        "Experiente especialista em coluna no Vila da Serra, o Dr. Rômulo domina técnicas modernas para o tratamento de hérnia de disco, estenose do canal lombar, escoliose e dores na coluna. Seu foco em métodos endoscópicos garante aos pacientes menos dor pós-operatória e um retorno mais rápido à qualidade de vida."
      ]
    },
    ctaOverride: {
      description: "Precisando de um ortopedista especialista em coluna no Vila da Serra que seja experiente e atualizado? O Dr. Rômulo Oliveira atende no Hospital Biocor e está pronto para avaliar a melhor abordagem para o seu caso."
    }
  }
};
