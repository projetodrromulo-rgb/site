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
}

export const citiesData: Record<string, CityData> = {
  betim: {
    slug: "betim",
    name: "Betim",
    title: "Médico Ortopedista Especialista em Coluna em Betim | Dr. Rômulo Oliveira",
    metaDescription: "Procurando médico ortopedista especialista em coluna em Betim? O Dr. Rômulo Oliveira realiza cirurgia minimamente invasiva de coluna e tratamento de hérnia de disco. Atendimento no Mater Dei Betim e Clínica Centra.",
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
      ctaText: "Agendar Consulta",
      backgroundVideo: {
        src: "/video/video-hero.webm"
      }
    }
  }
};
