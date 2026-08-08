"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Navigation, Plus, ExternalLink, Building2 } from "lucide-react";
import { Title, TypingText } from "@/components/shared";
import { Hospital } from "@/components/sections/insurance/types";
import { InsuranceModal } from "@/components/sections/insurance/_components";
import { getplains } from "@/components/sections/insurance/data/get-plans";

export interface CityLocationDetail {
    name: string;
    streetAddress: string;
    telephone: string;
    mapUrl?: string;
    websiteUrl?: string;
    image?: string;
}

interface CityLocationsProps {
    cityName: string;
    locations: CityLocationDetail[];
    hospitals?: Hospital[];
}

const getPlansForUnit = (unitTitle: string, hospitals: Hospital[] = []) => {
    const normalize = (str: string) =>
        str.toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9]/g, "");

    const normalizedTitle = normalize(unitTitle);

    const match = hospitals.find(h => {
        const normalizedHospName = normalize(h.name);
        return normalizedTitle.includes(normalizedHospName) || normalizedHospName.includes(normalizedTitle);
    });

    if (match) {
        return { name: match.name, plans: match.plans };
    }

    if (normalizedTitle.includes("biocor")) {
        const majorPlanNames = [
            "Amil", "Bradesco", "Cassu", "Copasa",
            "Saude Caixa", "Sulamerica", "Vale"
        ];
        const allPlans = getplains();
        const filtered = allPlans.filter(p => majorPlanNames.includes(p.name));
        return { name: "Hospital Biocor - Rede D'Or", plans: filtered };
    }

    return { name: unitTitle, plans: getplains() };
};

export default function CityLocations({ cityName, locations = [], hospitals = [] }: CityLocationsProps) {
    const [selectedModalUnit, setSelectedModalUnit] = useState<string | null>(null);

    const activeModalLocation = locations.find(loc => loc.name === selectedModalUnit);
    const activePlans = activeModalLocation
        ? getPlansForUnit(activeModalLocation.name, hospitals)
        : { name: "", plans: [] };

    return (
        <section
            id="locations"
            className="relative py-20 bg-neutral-light text-primary-dark overflow-hidden min-h-[70vh] flex flex-col justify-center"
        >
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 w-full mb-12">
                <header className="flex flex-col items-center text-center space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent font-semibold text-xs tracking-wider uppercase">
                        <MapPin size={14} className="shrink-0" />
                        <span>Locais em {cityName}</span>
                    </div>

                    <Title
                        headline={{
                            textTop: "Locais de Atendimento em",
                            textHighlight: cityName,
                            styles: {
                                textColorTitle: "var(--color-title-secondary)",
                                textColorHighlightFrom: "var(--color-title-secondary-highlight-from)",
                                textColorHighlightTo: "var(--color-title-secondary-highlight-to)",
                                textColorBottom: "var(--color-title-secondary)"
                            }
                        }}
                        className="max-w-4xl"
                    />

                    <p className="text-base md:text-lg text-primary-dark/70 max-w-3xl leading-relaxed">
                        Atendimentos especializados em cirurgia e tratamentos de coluna para pacientes de {cityName} e região. Confira o endereço e a localização no mapa.
                    </p>
                </header>
            </div>

            {/* Lista de Unidades da Cidade com Mapa ao Lado */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 w-full space-y-10">
                {locations.map((loc, index) => {
                    const cleanPhone = loc.telephone.replace(/[^+\d]/g, "");
                    const directMapUrl = loc.mapUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loc.name + " " + loc.streetAddress)}`;
                    const embedMapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(loc.name + " " + loc.streetAddress)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

                    return (
                        <motion.article
                            key={loc.name + index}
                            itemScope
                            itemType="https://schema.org/MedicalClinic"
                            className="group relative bg-white/80 border border-primary-dark/10 rounded-3xl p-6 lg:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 backdrop-blur-sm overflow-hidden"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <meta itemProp="name" content={loc.name} />

                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                                {/* Detalhes do Local (Esquerda) */}
                                <div className="lg:col-span-6 space-y-6 flex flex-col justify-between h-full">
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-accent/15 flex items-center justify-center text-accent shrink-0">
                                                <Building2 size={20} />
                                            </div>
                                            <div>
                                                <span className="text-xs font-bold text-accent uppercase tracking-widest block">
                                                    Unidade de Atendimento · {cityName}
                                                </span>
                                                <h3 className="text-2xl md:text-3xl font-serif font-bold text-primary-dark leading-tight">
                                                    {loc.name}
                                                </h3>
                                            </div>
                                        </div>

                                        {/* Endereço com microdata */}
                                        <address
                                            itemProp="address"
                                            itemScope
                                            itemType="https://schema.org/PostalAddress"
                                            className="not-italic bg-primary-dark/5 p-4 rounded-2xl border border-primary-dark/5 space-y-2"
                                        >
                                            <div className="flex items-start gap-3">
                                                <MapPin size={18} className="text-accent shrink-0 mt-0.5" />
                                                <span itemProp="streetAddress" className="text-sm md:text-base text-primary-dark/85 leading-relaxed font-medium">
                                                    {loc.streetAddress}
                                                </span>
                                            </div>
                                            <meta itemProp="addressLocality" content={cityName} />
                                            <meta itemProp="addressRegion" content="MG" />
                                        </address>

                                        {/* Telefone */}
                                        <div className="flex items-center gap-3 px-1">
                                            <Phone size={18} className="text-accent shrink-0" />
                                            <span className="text-sm text-primary-dark/70">Telefone para contato:</span>
                                            <a
                                                itemProp="telephone"
                                                href={`tel:${cleanPhone}`}
                                                className="text-sm md:text-base font-bold text-primary-dark hover:text-accent transition-colors"
                                            >
                                                {loc.telephone}
                                            </a>
                                        </div>
                                    </div>

                                    {/* Botões de Ação */}
                                    <div className="pt-2 flex flex-wrap items-center gap-3">
                                        <a
                                            href={directMapUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-primary-dark text-neutral-light hover:bg-primary-dark/90 text-xs md:text-sm font-bold uppercase tracking-wider transition-all shadow-md hover:scale-[1.02] active:scale-95"
                                        >
                                            <Navigation size={16} className="text-accent" />
                                            <span>Como Chegar</span>
                                            <ExternalLink size={14} className="opacity-60" />
                                        </a>

                                        <button
                                            type="button"
                                            onClick={() => setSelectedModalUnit(loc.name)}
                                            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-primary-dark/20 text-primary-dark hover:bg-primary-dark/5 text-xs md:text-sm font-bold uppercase tracking-wider transition-all"
                                        >
                                            <Plus size={16} className="text-accent" />
                                            <span>Convênios Aceitos</span>
                                        </button>
                                    </div>
                                </div>

                                {/* Mapa Incorporado do Google Maps (Direita) */}
                                <div className="lg:col-span-6 w-full">
                                    <div className="relative w-full h-[280px] sm:h-[320px] lg:h-[360px] rounded-2xl overflow-hidden shadow-lg border border-primary-dark/10 bg-primary-dark/5 group/map">
                                        <iframe
                                            title={`Mapa com localização de ${loc.name} em ${cityName}`}
                                            src={embedMapUrl}
                                            width="100%"
                                            height="100%"
                                            style={{ border: 0 }}
                                            allowFullScreen
                                            loading="lazy"
                                            referrerPolicy="no-referrer-when-downgrade"
                                            className="w-full h-full grayscale-[20%] contrast-[105%] group-hover/map:grayscale-0 transition-all duration-500"
                                        />
                                        <div className="absolute top-3 right-3 bg-primary-dark/90 text-neutral-light text-[11px] font-semibold px-3 py-1.5 rounded-lg border border-white/10 backdrop-blur-md shadow-md pointer-events-none flex items-center gap-1.5">
                                            <MapPin size={12} className="text-accent" />
                                            <span>{loc.name}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.article>
                    );
                })}
            </div>

            {/* Modal de Convênios */}
            <InsuranceModal
                isOpen={!!selectedModalUnit}
                onClose={() => setSelectedModalUnit(null)}
                plans={activePlans.plans}
                hospitalName={activePlans.name}
            />
        </section>
    );
}
