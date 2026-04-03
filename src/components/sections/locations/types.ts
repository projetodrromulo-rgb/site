import { SharedComponentsTypes } from "@/components/shared/types";

export interface LocationUnit {
    id: string;
    title: string;
    subtitle: string;
    address: string;
    phone: string;
    mapUrl: string;
    websiteUrl: string;
    image: string;
}

export interface LocationsContent {
    subtitle: string;
    headline: SharedComponentsTypes["headline"];
    description: string;
    units: LocationUnit[];
}
