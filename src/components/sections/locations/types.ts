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
    mobileImage?: string;
}

export interface LocationsContent {
    subtitle: string;
    headline: SharedComponentsTypes["headline"];
    description: string | any[];
    units: LocationUnit[];
}
