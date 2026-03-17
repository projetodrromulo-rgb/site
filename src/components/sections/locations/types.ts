export interface LocationUnit {
    id: string;
    title: string;
    subtitle: string;
    address: string;
    phone: string;
    mapUrl: string;
    websiteUrl?: string;
}

export interface LocationsContent {
    sectionSubtitle: string;
    sectionTitle: string;
    sectionDescription: string;
    units: LocationUnit[];
}
