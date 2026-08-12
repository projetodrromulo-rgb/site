import { HeroContent } from "@/components/sections/hero/types";

export interface CityData {
  slug: string;
  name: string;
  title: string;
  metaDescription: string;
  keywords: string[];
  heroContent: Omit<HeroContent, "cta" | "backgroundVideo" | "description"> & {
    description?: string;
    ctaText?: string;
  };
  locationPrefix: string;
  clinicName: string;
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
    mapUrl?: string;
    websiteUrl?: string;
    image?: string;
  }>;
  bgImages?: string[];
  ctaOverride?: {
    title?: string;
    description?: string;
  };
  conditionsTitle?: string;
  conditions?: Array<{
    title: string;
    description: string;
  }>;
  faqsTitle?: string;
  faqs?: Array<{
    question: string;
    answer: string;
  }>;
}
