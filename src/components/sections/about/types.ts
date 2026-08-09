import { SharedComponentsTypes } from "@/components/shared/types";

export interface Feature {
    icon: string;
    title: string;
    description: string;
}

export interface AboutContent {
    subtitle: string;
    headline: SharedComponentsTypes["headline"];
    customH2Title?: string;
    image: {
        src: string;
        alt: string;
    };
    paragraphs: string[];
    neighborhoods?: string[];
    formation: string[];
    features: Feature[];
}
