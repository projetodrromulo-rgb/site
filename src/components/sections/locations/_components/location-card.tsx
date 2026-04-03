import { forwardRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Phone, Globe, Navigation, ExternalLink } from "lucide-react";
import { LocationUnit } from "../types";

interface LocationCardProps {
    unit: LocationUnit;
    index: number;
}

export const LocationCard = forwardRef<HTMLDivElement, LocationCardProps>(
    ({ unit, index }, ref) => {
        return (
            <motion.div
                ref={ref}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{
                    duration: 0.8,
                    delay: index * 0.1,
                    ease: "easeOut"
                }}
                whileHover={{
                    scale: 1.02,
                    zIndex: 10,
                    transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] }
                }}
                className="group relative flex flex-col h-full w-full rounded-[2rem] overflow-hidden cursor-pointer shadow-2xl [perspective:2000px] border border-white/5"
            >
                {/* 1. Imagem de Fundo Imersiva */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src={unit.image}
                        alt={unit.title}
                        fill
                        className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110 opacity-90"
                        priority={index < 3}
                    />
                    {/* Overlay de Gradiente Reforçado (Contrastado) */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent opacity-95" />
                </div>

                {/* 2. Conteúdo Flutuante */}
                <div className="relative z-10 flex flex-col h-full p-6 md:p-8 justify-end [transform-style:preserve-3d]">

                    {/* Elementos Superiores - GPS PULSANTE */}
                    <div className="absolute top-6 right-6 [transform:translateZ(60px)] z-30 group/gps">
                        {/* Anel de Pulso Animado (Chama Atenção) */}
                        <motion.div
                            className="absolute inset-0 rounded-xl bg-accent opacity-60"
                            animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        />

                        <a
                            href={unit.mapUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative w-10 h-10 rounded-xl bg-accent flex items-center justify-center text-white border border-white/20 shadow-[0_8px_20px_rgba(212,175,55,0.4)] hover:bg-white hover:text-accent transition-all duration-500 active:scale-90"
                            title="Abrir no Google Maps"
                        >
                            <Navigation size={18} className="group-hover/gps:rotate-12 transition-transform" />
                        </a>
                    </div>

                    {/* Informações Principais (Fixo) */}
                    <div className="space-y-4 [transform:translateZ(50px)]">
                        <header className="space-y-1">
                            <motion.span
                                className="block text-[12px] text-white/90 italic font-normal mb-2 drop-shadow-md"
                                initial={{ opacity: 1 }}
                            >
                                {unit.subtitle}
                            </motion.span>
                            <h4 className="text-lg md:text-xl font-black text-white leading-[0.9] uppercase tracking-tighter drop-shadow-[0_4px_12px_rgba(0,0,0,1)]">
                                {unit.title}
                            </h4>
                        </header>

                        {/* Detalhes Extra (Melhoria de Legibilidade) */}
                        <div className="transition-all duration-700 ease-in-out">
                            <address className="not-italic space-y-4 pt-4 pb-3">
                                <p className="text-white/90 font-medium text-[11px] md:text-xs leading-relaxed flex items-start gap-3 drop-shadow-md">
                                    <MapPin size={14} className="text-accent shrink-0 mt-0.5" />
                                    {unit.address}
                                </p>
                                <div className="flex items-center gap-3 text-[11px] md:text-xs">
                                    <Phone size={14} className="text-accent shrink-0" />
                                    <a href={`tel:${unit.phone}`} className="text-white font-black hover:text-accent transition-colors drop-shadow-md">
                                        {unit.phone}
                                    </a>
                                </div>
                            </address>

                            {/* ACESSO AO SITE (Premium Button Design) */}
                            <footer className="pt-4">
                                <a
                                    href={unit.websiteUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group/btn relative inline-flex items-center gap-3 px-8 h-12 overflow-hidden bg-white/10 backdrop-blur-md border border-accent/40 rounded-2xl text-white text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-500 hover:bg-accent hover:border-accent hover:scale-[1.02] active:scale-95 shadow-2xl"
                                    title="Visitar Site Oficial"
                                >
                                    {/* Efeito de Brilho Interno (Shimmer) */}
                                    <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-700" />

                                    <Globe size={16} className="text-accent group-hover/btn:text-white group-hover/btn:rotate-[20deg] transition-all duration-500" />
                                    <span className="relative z-10">Visitar Site</span>
                                </a>
                            </footer>
                        </div>
                    </div>
                </div>

                {/* Borda de Destaque no Hover */}
                <div className="absolute inset-0 border border-white/0 group-hover:border-white/20 transition-all duration-500 rounded-[2rem] z-20 pointer-events-none" />
            </motion.div>
        );
    }
);

LocationCard.displayName = "LocationCard";
