export interface Feature {
    icon: string;
    title: string;
    description: string;
}

export interface AboutContent {
    subtitle: string;
    headline: {
        normal: string;
        highlight: string;
    };
    image: {
        src: string;
        alt: string;
    };
    paragraphs: string[];
    formation: string[];
    features: Feature[];
}
