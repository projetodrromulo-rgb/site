export interface HeroContent {
    typingPhrases: string[];
    headline: {
        top: string;
        highlight: string;
        bottom: string;
    };
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
