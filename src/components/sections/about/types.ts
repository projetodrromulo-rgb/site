import { SharedComponentsTypes } from "@/components/shared/types";

export interface Feature {
    icon: string;
    title: string;
    description: string;
}

export interface AboutContent {
    subtitle: string;
    headline: SharedComponentsTypes["headline"];
    image: {
        src: string;
        alt: string;
    };
    paragraphs: string[];
    formation: string[];
    features: Feature[];
}
