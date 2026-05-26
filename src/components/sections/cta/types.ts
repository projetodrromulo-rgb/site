import { ReactNode } from "react";

export interface TrustSignal {
    icon: ReactNode;
    title: string;
    description: string;
}

export interface CTAContent {
    id: string;
    headline: string;
    description: string;
    whatsappUrl: string;
    whatsappButtonText: string;
    whatsappMessage: string;
    trustSignals: TrustSignal[];
    typingPhrases: string[];

}


