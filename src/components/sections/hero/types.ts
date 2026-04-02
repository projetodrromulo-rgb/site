import { SharedComponentsTypes } from "@/components/shared/types";

export type HeroContent = {
    typingPhrases: string[];
    headline: SharedComponentsTypes['headline']

    description: string;
    cta: {
        text: string;
        whatsappUrl: string;
    };

    logoImage: {
        src: string;
        alt: string;
    };

    backgroundVideo: {
        src: string;
        poster?: string;
    };


}
