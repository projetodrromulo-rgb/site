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
  }>;
  bgImages?: string[];
  aboutOverride?: {
    subtitle?: string;
    paragraphs?: string[];
  };
  ctaOverride?: {
    title?: string;
    description?: string;
  };
}
