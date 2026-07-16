import { CityData } from "./types";
import { getAboutParagraphs, getCtaOverride, getHeroDescription, getHeroCtaText } from "./helpers";

export const vilaDaSerraData: CityData = {
  slug: "vila-da-serra",
  name: "Vila da Serra",
  title: "Médico Ortopedista Especialista em Coluna no Vila da Serra | Dr. Rômulo Oliveira",
  metaDescription: "Especialista em coluna no Vila da Serra (Nova Lima). Dr. Rômulo Oliveira realiza cirurgia de coluna minimamente invasiva e tratamento de hérnia de disco.",
  keywords: [
    "medico ortopedista especialista em coluna no vila da serra",
    "ortopedista especialista em coluna em vila da serra",
    "especialista em coluna no vila da serra",
    "cirurgia de coluna no vila da serra",
    "clinica de coluna no vila da serra",
    "tratamento de hernia de disco no vila da serra",
    "dor nas costas vila da serra",
    "ortopedista no vila da serra",
    "cirurgiao de coluna vila da serra"
  ],
  heroContent: {
    typingPhrases: [
      "Especialista em Coluna no Vila da Serra",
      "Cirurgia Minimamente Invasiva",
      "Tratamento de Hérnia de Disco"
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
    description: getHeroDescription("no Vila da Serra", "no Biocor Vila da Serra"),
    ctaText: getHeroCtaText("no Biocor Vila da Serra")
  },
  bgImages: [
    "/images/dr_romulo_surgery_02.jpg",
    "/images/dr_romulo_surgery_03.jpg",
    "/images/dr_romulo_surgery_04.jpg",
    "/images/dr_romulo_surgery_05.jpg",
    "/images/dr_romulo_surgery_01.jpg"
  ],
  aboutOverride: {
    subtitle: "Especialista em Coluna no Vila da Serra",
    paragraphs: getAboutParagraphs("no bairro Vila da Serra", "Bairro Vila da Serra")
  },
  ctaOverride: getCtaOverride("no bairro Vila da Serra")
};
