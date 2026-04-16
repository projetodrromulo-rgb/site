import { SharedComponentsTypes } from "@/components/shared/types";
import { WhatsAppButtonType } from "@/components/shared/cta-whatsapp/type";

export type HeroContent = {
    typingPhrases: string[];
    headline: SharedComponentsTypes['headline']

    description: string;
    cta: WhatsAppButtonType

    logoImage: {
        src: string;
        alt: string;
    };

    backgroundVideo: {
        src: string;
        poster?: string;
    };


}
