import { SharedComponentsTypes } from "@/components/shared/types";

export interface Plan {
    name: string;
    src: string;
}

export interface Hospital {
    name: string;
    plans: Plan[];
}

export interface InsuranceContent {
    id: string;
    badge: string;
    headline: SharedComponentsTypes['headline'];
    description: string;
    hospitals: Hospital[];
}
