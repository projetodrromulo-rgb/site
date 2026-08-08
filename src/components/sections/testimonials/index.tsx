"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote, ExternalLink } from "lucide-react";
import { TestimonialsSectionContent } from "./types";
import { TypingText } from "@/components/shared";

interface TestimonialsSectionProps {
    content: TestimonialsSectionContent;
}

function GoogleIcon({ className = "w-5 h-5" }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z" />
            <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.29v3.15C3.26 21.3 7.31 24 12 24z" />
            <path fill="#FBBC05" d="M5.28 14.24c-.25-.72-.38-1.49-.38-2.24s.13-1.52.38-2.24V6.61H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.39l3.99-3.15z" />
            <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.61l3.99 3.15c.95-2.85 3.6-4.96 6.72-4.96z" />
        </svg>
    );
}

const GOOGLE_REVIEWS_URL = "https://share.google/bufGLkBDzMaQiNUj6";

export default function TestimonialsSection({ content }: TestimonialsSectionProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const { testimonials } = content;

    // Auto-play logic
    useEffect(() => {
        const timer = setInterval(() => {
            handleNext();
        }, 6000);
        return () => clearInterval(timer);
    }, [currentIndex]);

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    // Calculate indices for circular 3D effect
    const prevIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
    const nextIndex = (currentIndex + 1) % testimonials.length;

    const visibleItems = [
        { ...testimonials[prevIndex], pos: "left", key: `prev-${testimonials[prevIndex].id}` },
        { ...testimonials[currentIndex], pos: "center", key: `curr-${testimonials[currentIndex].id}` },
        { ...testimonials[nextIndex], pos: "right", key: `next-${testimonials[nextIndex].id}` },
    ];

    return (
        <section id="testimonials" className="py-24 bg-white relative overflow-hidden">
            {/* Subtle Decorative Elements */}
            <div className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-30 z-0">
                <svg className="absolute -top-10 -right-10 w-[500px] h-[500px] text-primary-medium/5 animate-pulse duration-[10s]" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <path fill="currentColor" d="M44.7,-76.4C58.1,-69.2,69.5,-56.1,76.8,-41.2C84.1,-26.3,87.4,-9.6,85.1,6.5C82.8,22.6,74.9,38.1,63.1,49.8C51.2,61.6,35.4,69.6,18.8,73.5C2.2,77.4,-15.2,77.2,-31.1,71.5C-47,65.8,-61.4,54.6,-70.6,40.1C-79.8,25.6,-83.8,7.8,-81.4,-9.2C-79,-26.2,-70.2,-42.4,-57.4,-51.7C-44.6,-61,-27.8,-63.5,-12.9,-65.8C1.9,-68.2,16.8,-70.4,31.2,-72.1C45.6,-73.8,59.5,-75,73.4,-76.2" transform="translate(100 100)" />
                </svg>
            </div>

            <div className="container mx-auto px-6 text-center relative z-10">
                <div className="mb-12 space-y-4">
                    <span className="text-primary-medium font-semibold uppercase tracking-wider text-sm flex items-center justify-center gap-2 mb-4">
                        <TypingText phrases={[content.badge]} />
                    </span>
                    <h2 className="text-4xl lg:text-5xl font-bold text-primary-dark">
                        {content.title.split(" ").map((word, i) =>
                            word === "Pacientes" ? <span key={i} className="text-accent italic font-cursive text-6xl"> {word}</span> : i === 0 ? word : ` ${word}`
                        )}
                    </h2>
                    <div className="h-1 w-20 bg-gradient-to-r from-primary-medium to-accent rounded-full mx-auto mt-4"></div>
                </div>

                <div className="relative min-h-[460px] md:min-h-[480px] flex items-center justify-center perspective-1000 my-4">
                    {/* Navigation Buttons */}
                    <button
                        onClick={handlePrev}
                        className="absolute left-0 md:left-2 lg:left-6 z-50 p-3.5 md:p-4 rounded-full bg-white shadow-xl text-primary-medium hover:scale-110 active:scale-95 transition-all border border-gray-100 group"
                        aria-label="Previous Testimonial"
                    >
                        <ChevronLeft size={24} className="group-hover:-translate-x-0.5 transition-transform" />
                    </button>
                    <button
                        onClick={handleNext}
                        className="absolute right-0 md:right-2 lg:right-6 z-50 p-3.5 md:p-4 rounded-full bg-white shadow-xl text-primary-medium hover:scale-110 active:scale-95 transition-all border border-gray-100 group"
                        aria-label="Next Testimonial"
                    >
                        <ChevronRight size={24} className="group-hover:translate-x-0.5 transition-transform" />
                    </button>

                    {/* 3D Carousel Cards */}
                    <div className="relative w-full max-w-6xl h-full flex items-center justify-center overflow-visible py-2">

                        {/* LEFT CARD (Visual only on desktop) */}
                        <AnimatePresence initial={false}>
                            <motion.div
                                key={visibleItems[0].key}
                                className="absolute w-[260px] lg:w-[320px] p-6 bg-primary-dark backdrop-blur-md rounded-3xl shadow-lg border border-white/10 flex flex-col gap-4 items-center justify-center select-none pointer-events-none hidden md:flex"
                                initial={{ x: -100, opacity: 0, scale: 0.6, rotateY: 20 }}
                                animate={{ x: -320, opacity: 0.35, scale: 0.75, zIndex: 10, rotateY: 25, filter: "blur(1px)" }}
                                exit={{ opacity: 0, scale: 0.5, x: -140 }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                            >
                                <Quote className="text-white/10 w-8 h-8 self-start" />
                                <p className="text-white/60 italic font-light text-sm line-clamp-3">"{visibleItems[0].text}"</p>
                                <div className="flex flex-col items-center gap-1.5 text-center">
                                    <div className="font-bold text-white/60 text-xs">{visibleItems[0].name}</div>
                                    <div className="flex items-center gap-1.5 bg-white/10 px-2.5 py-0.5 rounded-full text-[10px] text-white/60 font-medium">
                                        <GoogleIcon className="w-3 h-3" />
                                        <span>Avaliação no Google</span>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* RIGHT CARD (Visual only on desktop) */}
                        <AnimatePresence initial={false}>
                            <motion.div
                                key={visibleItems[2].key}
                                className="absolute w-[260px] lg:w-[320px] p-6 bg-primary-dark backdrop-blur-md rounded-3xl shadow-lg border border-white/10 flex flex-col gap-4 items-center justify-center select-none pointer-events-none hidden md:flex"
                                initial={{ x: 100, opacity: 0, scale: 0.6, rotateY: -20 }}
                                animate={{ x: 320, opacity: 0.35, scale: 0.75, zIndex: 10, rotateY: -25, filter: "blur(1px)" }}
                                exit={{ opacity: 0, scale: 0.5, x: 140 }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                            >
                                <Quote className="text-white/10 w-8 h-8 self-start" />
                                <p className="text-white/60 italic font-light text-sm line-clamp-3">"{visibleItems[2].text}"</p>
                                <div className="flex flex-col items-center gap-1.5 text-center">
                                    <div className="font-bold text-white/60 text-xs">{visibleItems[2].name}</div>
                                    <div className="flex items-center gap-1.5 bg-white/10 px-2.5 py-0.5 rounded-full text-[10px] text-white/60 font-medium">
                                        <GoogleIcon className="w-3 h-3" />
                                        <span>Avaliação no Google</span>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* CENTER CARD (Active) */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={visibleItems[1].key}
                                className="relative w-[95%] max-w-[580px] bg-primary-dark p-6 sm:p-8 md:p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(11,43,64,0.35)] border border-white/10 flex flex-col gap-5 md:gap-6 items-center z-30"
                                initial={{ scale: 0.85, opacity: 0, y: 30, rotateY: 0 }}
                                animate={{ scale: 1, opacity: 1, y: 0, zIndex: 30 }}
                                exit={{ scale: 0.85, opacity: 0, y: -30 }}
                                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                            >
                                <div className="bg-white/5 p-4 md:p-5 rounded-full ring-8 ring-white/[0.02]">
                                    <Quote className="text-accent w-8 h-8 md:w-10 md:h-10" />
                                </div>

                                <p className="text-base sm:text-lg md:text-xl text-white/95 italic font-light leading-relaxed text-center px-2">
                                    "{visibleItems[1].text}"
                                </p>

                                <div className="flex flex-col items-center gap-3 md:gap-4 mt-auto">
                                    <div className="flex gap-1.5">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                size={20}
                                                className={`transition-all duration-500 ${i < visibleItems[1].rating ? 'fill-accent text-accent' : 'text-white/10'}`}
                                            />
                                        ))}
                                    </div>

                                    <div className="text-center flex flex-col items-center gap-2">
                                        <h4 className="text-xl md:text-2xl font-bold text-white mb-0.5">{visibleItems[1].name}</h4>

                                        {/* Badge 'Avaliação no Google' diretamente debaixo do nome */}
                                        <div className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3.5 py-1 rounded-full border border-white/15 shadow-sm">
                                            <GoogleIcon className="w-4 h-4 shrink-0" />
                                            <span className="text-[11px] font-semibold text-white/90 uppercase tracking-wider">
                                                Avaliação no Google
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Mensagem e Link para ver outros comentários no Google */}
                <div className="mt-12 md:mt-16 flex flex-col items-center justify-center space-y-4">
                    <p className="text-sm md:text-base text-primary-dark/80 font-medium max-w-lg mx-auto">
                        Para ver estes e outros comentários de nossos pacientes, acesse nosso perfil oficial no Google.
                    </p>
                    <a
                        href={GOOGLE_REVIEWS_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-primary-dark text-white hover:bg-primary-dark/90 transition-all shadow-lg hover:shadow-xl hover:scale-[1.03] active:scale-95 text-xs md:text-sm font-bold uppercase tracking-wider group"
                    >
                        <GoogleIcon className="w-5 h-5 bg-white rounded-full p-0.5" />
                        <span>Ver mais avaliações no Google</span>
                        <ExternalLink size={16} className="text-accent group-hover:translate-x-0.5 transition-transform" />
                    </a>
                </div>
            </div>
        </section>
    );
}
