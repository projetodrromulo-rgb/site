import { forwardRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Phone, Globe, Navigation, ExternalLink, Plus } from "lucide-react";
import { LocationUnit } from "../types";
import { Hospital } from "@/components/sections/insurance/types";
import { InsuranceModal } from "@/components/sections/insurance/_components";
import { getplains } from "@/components/sections/insurance/data/get-plans";

interface LocationCardProps {
    unit: LocationUnit;
    index: number;
    hospitals?: Hospital[];
}

const getPlansForUnit = (unitTitle: string, hospitals: Hospital[] = []) => {
    const normalize = (str: string) =>
        str.toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9]/g, "");

    const normalizedTitle = normalize(unitTitle);

    // Encontra correspondência na lista de hospitais
    const match = hospitals.find(h => {
        const normalizedHospName = normalize(h.name);
        return normalizedTitle.includes(normalizedHospName) || normalizedHospName.includes(normalizedTitle);
    });

    if (match) {
        return { name: match.name, plans: match.plans };
    }

    // Fallback para Biocor ou outros hospitais não encontrados
    if (normalizedTitle.includes("biocor")) {
        const majorPlanNames = [
            "Amil", "Bradesco", "Cassu", "Copasa",
            "Saude Caixa", "Sulamerica", "Vale"];
        const allPlans = getplains();
        const filtered = allPlans.filter(p => majorPlanNames.includes(p.name));
        return { name: "Hospital Biocor - Rede D'Or", plans: filtered };
    }

    // Fallback geral com todos os planos caso nada seja encontrado
    return { name: unitTitle, plans: getplains() };
};

export const LocationCard = forwardRef<HTMLDivElement, LocationCardProps>(
    ({ unit, index, hospitals = [] }, ref) => {
        const [isModalOpen, setIsModalOpen] = useState(false);
        const matchedPlans = getPlansForUnit(unit.title, hospitals);
        return (
            <>
                <motion.div
                    ref={ref}
                    className="group relative flex flex-col h-full w-full rounded-[2rem] overflow-hidden cursor-pointer shadow-2xl border border-white/5 will-change-transform"
                    style={{
                        transformStyle: "preserve-3d",
                        WebkitTransformStyle: "preserve-3d",
                        perspective: "2000px",
                        WebkitPerspective: "2000px"
                    }}
                    whileHover={{
                        scale: 1.02,
                        zIndex: 10,
                        transition: { duration: 0.1, ease: [0.33, 1, 0.68, 1] }
                    }}
                >
                    {/* 1. Imagem de Fundo Imersiva */}
                    <div className="absolute inset-0 z-0">
                        {unit.mobileImage ? (
                            <>
                                {/* Versão Otimizada para Mobile */}
                                <div className="block sm:hidden absolute inset-0 w-full h-full">
                                    <Image
                                        src={unit.mobileImage}
                                        alt={unit.title}
                                        width={800}
                                        height={600}
                                        className="w-full h-full object-cover absolute inset-0"
                                        sizes="100vw"
                                        priority={index < 3}
                                        quality={80}
                                    />
                                </div>
                                {/* Versão Original para Desktop */}
                                <div className="hidden sm:block absolute inset-0 w-full h-full">
                                    <Image
                                        src={unit.image}
                                        alt={unit.title}
                                        width={800}
                                        height={600}
                                        className="w-full h-full object-cover absolute inset-0 transition-transform duration-1000 ease-out group-hover:scale-110"
                                        sizes="(max-width: 1024px) 50vw, 400px"
                                        priority={index < 3}
                                        quality={80}
                                    />
                                </div>
                            </>
                        ) : (
                            <Image
                                src={unit.image}
                                alt={unit.title}
                                width={800}
                                height={600}
                                className="w-full h-full object-cover absolute inset-0 transition-transform duration-1000 ease-out group-hover:scale-110"
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                                priority={index < 3}
                                quality={80}
                            />
                        )}
                        {/* Overlay de Gradiente Suavizado (Melhor Visibilidade) */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent" />
                    </div>

                    {/* 2. Conteúdo Flutuante */}
                    <div className="relative z-10 flex flex-col h-full p-4 md:p-6 justify-end [transform-style:preserve-3d] backdrop-blur-[0.5px]">

                        {/* Elementos Superiores - GPS PULSANTE */}
                        <div className="absolute top-5 right-5 md:top-6 md:right-6 [transform:translateZ(60px)] z-30 group/gps">


                            <a
                                href={unit.mapUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="relative w-10 md:w-auto md:px-4 h-10 rounded-xl bg-primary-dark flex items-center justify-center gap-2 text-white border border-white/20 shadow-[0_8px_20px_rgba(212,175,55,0.4)] hover:bg-white hover:text-accent transition-all duration-500 active:scale-90"
                                title="Abrir no Google Maps"
                            >
                                <Navigation size={18} className="group-hover/gps:rotate-12 transition-transform" />
                                <span className="text-[11px] uppercase tracking-wider hidden md:inline">Como Chegar</span>
                            </a>
                        </div>

                        {/* Informações Principais (Fixo) */}
                        <div className="space-y-4 [transform:translateZ(50px)]">
                            <header className="space-y-1">
                                <motion.span
                                    className="block text-[12px] text-white italic mb-2 drop-shadow-md"
                                    initial={{ opacity: 1 }}
                                >
                                    {unit.subtitle}
                                </motion.span>
                                <h3 className="text-lg md:text-xl font-normal text-white leading-[0.9] uppercase tracking-tighter drop-shadow-[0_4px_12px_rgba(0,0,0,1)]">
                                    {unit.title}
                                </h3>
                            </header>

                            {/* Detalhes Extra (Melhoria de Legibilidade) */}
                            <div className="transition-all duration-700 ease-in-out">
                                <address className="not-italic space-y-3 md:space-y-4 pt-2 md:pt-4 pb-2 md:pb-3">
                                    <p className="text-white font-normal text-[10px] md:text-xs leading-relaxed flex items-start gap-2 md:gap-3 drop-shadow-md">
                                        <MapPin size={24} color="#d1e6f5ff" className="text-accent shrink-0 mt-0.5" />
                                        {unit.address}
                                    </p>
                                    <div className="flex items-center gap-2 md:gap-3 text-[10px] md:text-xs">
                                        <Phone size={24} color="#d1e6f5ff" className="text-accent shrink-0" />
                                        <span className="text-white font-normal transition-colors drop-shadow-md">
                                            {unit.phone}
                                        </span>
                                    </div>
                                </address>

                                <footer className="pt-2 md:pt-4 flex flex-col gap-3">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setIsModalOpen(true);
                                        }}
                                        className="group/btn relative inline-flex items-center gap-2 md:gap-3 px-6 md:px-8 h-10 md:h-12 overflow-hidden bg-white/10 backdrop-blur-md border border-accent/40 rounded-2xl text-white text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-500 hover:bg-accent hover:border-accent hover:scale-[1.02] active:scale-95 shadow-2xl w-fit cursor-pointer"
                                        title="Ver Convênios Aceitos"
                                    >
                                        {/* Efeito de Brilho Interno (Shimmer) */}
                                        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-700" />

                                        {/* Efeito de Borda Conic (Ponto Azul circulando) */}
                                        <div className="absolute inset-0 z-0 pointer-events-none rounded-2xl overflow-hidden">
                                            <div className="absolute inset-[-200%] bg-[conic-gradient(from_0deg,transparent_0%,transparent_10%,#0db9f2_15%,transparent_20%,transparent_100%)] animate-[spin_4s_linear_infinite]" />
                                        </div>
                                        <div className="absolute inset-[1px] bg-[#0A192F] group-hover/btn:bg-accent rounded-[15px] z-0 transition-colors duration-500" />

                                        <Plus size={16} className="text-accent group-hover/btn:text-white group-hover/btn:rotate-90 transition-all duration-500" />
                                        <span className="relative z-10">Convênios Aceitos</span>
                                    </button>


                                </footer>
                            </div>
                        </div>
                    </div>

                    {/* Borda de Destaque no Hover */}
                    <div className="absolute inset-0 border border-white/0 group-hover:border-white/20 transition-all duration-500 rounded-[2rem] z-20 pointer-events-none" />
                </motion.div>
                <InsuranceModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    plans={matchedPlans.plans}
                    hospitalName={matchedPlans.name}
                />
            </>
        );
    }
);

LocationCard.displayName = "LocationCard";
