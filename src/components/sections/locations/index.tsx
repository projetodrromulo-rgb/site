"use client"

import { useState, useMemo, useEffect } from "react";
import { Title, TypingText } from "@/components/shared";
import { LocationCard } from "./_components";
import { LocationsContent } from "./types";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface LocationsProps {
    content: LocationsContent;
}

export default function Locations({ content }: LocationsProps) {
    const { subtitle, headline, description, units } = content;
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    
    // Configurações do Carrossel 3D (Equilíbrio de 400px)
    const cardWidth = 400; 
    const angleStep = 360 / units.length;
    // Raio otimizado para a largura de 400px com respiro generoso
    const radius = Math.round((cardWidth / 2) / Math.tan(Math.PI / units.length)) + 70;

    const next = () => setActiveIndex((prev) => (prev + 1) % units.length);
    const prev = () => setActiveIndex((prev) => (prev - 1 + units.length) % units.length);

    // Giro Automático com Pausa Inteligente
    useEffect(() => {
        if (isPaused) return;
        
        const timer = setInterval(() => {
            next();
        }, 4500); // 4.5 segundos por giro para leitura ideal

        return () => clearInterval(timer);
    }, [isPaused, activeIndex]);

    return (
        <section id="locations" className="relative py-16 bg-neutral-light text-primary-dark overflow-hidden min-h-[90vh] flex flex-col justify-center">
            {/* Elementos Decorativos de Fundo */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.03] grayscale invert mix-blend-multiply bg-[url('/images/bg-hero-poster.jpg')] bg-cover bg-fixed -z-10" />
            
            <div className="max-w-8xl mx-auto px-6 md:px-12 lg:px-8 xl:px-16 2xl:px-20 mb-20">
                <header className="flex flex-col items-center text-center space-y-6">
                    <TypingText phrases={[subtitle]} />
                    <Title headline={headline} className="max-w-4xl" />
                    <p className="text-lg md:text-xl text-primary-dark/60 max-w-3xl mx-auto leading-relaxed">
                        {description}
                    </p>
                </header>
            </div>

            {/* PALCO 3D REAL (Cilindro de 400px) */}
            <div 
                className="relative w-full h-[520px] flex items-center justify-center [perspective:2500px]"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                {/* Carrrossel Central Draggable */}
                <motion.div 
                    className="relative w-[400px] h-[400px] [transform-style:preserve-3d] cursor-grab active:cursor-grabbing"
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.1}
                    onDragStart={() => setIsPaused(true)}
                    onDragEnd={(e, info) => {
                        const threshold = 50; // Sensibilidade do arraste
                        if (info.offset.x < -threshold) {
                            next();
                        } else if (info.offset.x > threshold) {
                            prev();
                        }
                        setIsPaused(false);
                    }}
                    animate={{ rotateY: -activeIndex * angleStep }}
                    transition={{ type: "spring", stiffness: 45, damping: 15 }}
                >
                    {units.map((unit, index) => {
                        const angle = index * angleStep;
                        return (
                            <div
                                key={unit.id}
                                className="absolute inset-0 [transform-style:preserve-3d] backface-hidden"
                                style={{
                                    transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                                    opacity: 1, // Visibilidade mantida pela física 3D
                                }}
                            >
                                <motion.div
                                    animate={{ 
                                        opacity: activeIndex === index ? 1 : 0.3,
                                        scale: activeIndex === index ? 1.1 : 0.9,
                                        filter: activeIndex === index ? "blur(0px)" : "blur(2px)"
                                    }}
                                    transition={{ duration: 0.5 }}
                                    className="h-full w-full"
                                >
                                    <LocationCard
                                        unit={unit}
                                        index={index}
                                    />
                                </motion.div>
                            </div>
                        );
                    })}
                </motion.div>

                {/* Gradientes laterais removidos para evitar ofuscação dos cards */}
            </div>

            {/* BARRA DE NAVEGAÇÃO INFERIOR */}
            <div 
                className="max-w-8xl mx-auto px-6 md:px-20 mt-12 flex flex-col md:flex-row items-center justify-between gap-8 relative z-30"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                
                {/* Setas e Progresso */}
                <div className="flex items-center gap-8">
                    <div className="flex gap-4">
                        <button 
                            onClick={prev} 
                            aria-label="Unidade Anterior"
                            className="p-4 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-primary-dark hover:bg-accent hover:text-white transition-all shadow-xl"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <button 
                            onClick={next} 
                            aria-label="Próxima Unidade"
                            className="p-4 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-primary-dark hover:bg-accent hover:text-white transition-all shadow-xl"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>

                    <div className="w-48 h-[1px] bg-primary-dark/10 relative hidden md:block">
                        <motion.div 
                            className="absolute top-0 left-0 h-full bg-accent"
                            animate={{ width: `${((activeIndex + 1) / units.length) * 100}%` }}
                        />
                    </div>
                </div>

                {/* Dots e Contador */}
                <div className="flex items-center gap-8">
                    <div className="flex gap-2">
                        {units.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveIndex(index)}
                                aria-label={`Ir para unidade ${index + 1}`}
                                className={`h-1.5 rounded-full transition-all duration-500 ${activeIndex === index ? "w-10 bg-accent" : "w-3 bg-primary-dark/10"}`}
                            />
                        ))}
                    </div>
                    <div className="text-2xl font-black text-primary-dark/10 flex gap-1">
                        <span className="text-primary-dark">{String(activeIndex + 1).padStart(2, '0')}</span>
                        <span>/</span>
                        <span>{String(units.length).padStart(2, '0')}</span>
                    </div>
                </div>
            </div>
        </section>
    );
}