export type SharedComponentsTypes = {
    typingPhrases: string[];

    headline: {
        textTop: string;
        textHighlight: string;
        textBottom?: string;
        styles?: {
            textColorTitle?: string,
            textColorHighlightTo?: string,
            textColorHighlightFrom?: string,
            textColorBottom?: string,
        }

    };

}
