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

    // Configurações Responsivas do Carrossel 3D
    const [cardWidth, setCardWidth] = useState(400);
    const [cardHeight, setCardHeight] = useState(450);

    useEffect(() => {
        const handleResize = () => {
            const w = window.innerWidth;
            if (w < 480) { // Mobile Pequeno
                setCardWidth(200);
                setCardHeight(300);
            } else if (w < 768) { // Mobile / Tablet
                setCardWidth(240);
                setCardHeight(340);
            } else if (w < 1024) { // Laptop Pequeno
                setCardWidth(280);
                setCardHeight(360);
            } else { // Desktop
                setCardWidth(320);
                setCardHeight(380);
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const angleStep = 360 / units.length;
    // Raio otimizado para a largura dinâmica com respiro generoso
    const radius = useMemo(() => {
        return Math.round((cardWidth / 2) / Math.tan(Math.PI / units.length)) + (cardWidth < 400 ? 50 : 70);
    }, [cardWidth, units.length]);

    const next = () => setActiveIndex((prev) => (prev + 1) % units.length);
    const prev = () => setActiveIndex((prev) => (prev - 1 + units.length) % units.length);

    // Giro Automático com Velocidade Aumentada
    useEffect(() => {
        if (isPaused) return;

        const timer = setInterval(() => {
            next();
        }, 2800);

        return () => clearInterval(timer);
    }, [isPaused, activeIndex]);

    return (
        <motion.section
            id="locations"
            initial={{ opacity: 1 }}
            className="relative py-16 bg-neutral-light text-primary-dark overflow-hidden min-h-[90vh] flex flex-col justify-center"
        >
            {/* Elementos Decorativos de Fundo */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.03] grayscale invert mix-blend-multiply bg-[url('/images/bg-hero-poster.png')] bg-cover bg-fixed -z-10" />

            <div className="max-w-8xl mx-auto px-6 md:px-12 lg:px-8 xl:px-16 2xl:px-20 mb-20">
                <header className="flex flex-col items-center text-center space-y-6">
                    <TypingText phrases={[subtitle]} />
                    <Title headline={headline} className="max-w-4xl" />
                    <p className="text-lg md:text-xl text-primary-dark/60 max-w-3xl mx-auto leading-relaxed px-4">
                        {description}
                    </p>
                </header>
            </div>

            {/* PALCO 3D REAL (Responsivo) */}
            <div
                className="relative w-full flex items-center justify-center [perspective:2500px]"
                style={{ height: cardHeight + 120 }}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                {/* Carrrossel Central Draggable */}
                <motion.div
                    className="relative [transform-style:preserve-3d] cursor-grab active:cursor-grabbing"
                    style={{
                        width: cardWidth,
                        height: cardHeight,
                        willChange: "transform"
                    }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.1}
                    onDragStart={() => setIsPaused(true)}
                    onDragEnd={(e, info) => {
                        const threshold = 50;
                        if (info.offset.x < -threshold) {
                            next();
                        } else if (info.offset.x > threshold) {
                            prev();
                        }
                        setIsPaused(false);
                    }}
                    initial={{ rotateY: -360 }}
                    animate={{ rotateY: -activeIndex * angleStep }}
                    transition={{
                        rotateY: { type: "tween", duration: 0.8, ease: [0.22, 1, 0.36, 1] },
                        default: { duration: 0.1 }
                    }}
                >
                    {units.map((unit, index) => {
                        const angle = index * angleStep;
                        return (
                            <div
                                key={unit.id}
                                className="absolute inset-0 [transform-style:preserve-3d] backface-hidden"
                                style={{
                                    transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                                    opacity: 1,
                                }}
                            >
                                <motion.div
                                    animate={{
                                        opacity: 1,
                                        scale: activeIndex === index ? 1.05 : 0.85,
                                        filter: "blur(0px)",
                                        z: activeIndex === index ? 50 : 0
                                    }}
                                    transition={{ duration: 0.3, ease: "easeOut" }}
                                    className="h-full w-full will-change-transform"
                                    style={{ transformStyle: "preserve-3d" }}
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
        </motion.section>
    );
}