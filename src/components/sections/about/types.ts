import { sharedComponentsTypes } from "@/components/shared/types";

export interface Feature {
    icon: string;
    title: string;
    description: string;
}

export interface AboutContent {
    subtitle: string;
    headline: sharedComponentsTypes["headline"];
    image: {
        src: string;
        alt: string;
    };
    paragraphs: string[];
    formation: string[];
    features: Feature[];
}
