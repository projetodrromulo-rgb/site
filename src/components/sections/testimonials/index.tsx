"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { TestimonialsSectionContent } from "./types";
import { TypingText } from "@/components/shared";

interface TestimonialsSectionProps {
    content: TestimonialsSectionContent;
}

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
                <div className="mb-16 space-y-4">
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

                <div className="relative h-[440px] md:h-[460px] flex items-center justify-center perspective-1000">
                    {/* Navigation Buttons */}
                    <button
                        onClick={handlePrev}
                        className="absolute left-0 md:left-4 lg:left-10 z-50 p-4 rounded-full bg-white shadow-xl text-primary-medium hover:scale-110 active:scale-95 transition-all border border-gray-100 group"
                        aria-label="Previous Testimonial"
                    >
                        <ChevronLeft size={24} className="group-hover:-translate-x-0.5 transition-transform" />
                    </button>
                    <button
                        onClick={handleNext}
                        className="absolute right-0 md:right-4 lg:right-10 z-50 p-4 rounded-full bg-white shadow-xl text-primary-medium hover:scale-110 active:scale-95 transition-all border border-gray-100 group"
                        aria-label="Next Testimonial"
                    >
                        <ChevronRight size={24} className="group-hover:translate-x-0.5 transition-transform" />
                    </button>

                    {/* 3D Carousel Cards */}
                    <div className="relative w-full max-w-5xl h-full flex items-center justify-center overflow-visible">

                        {/* LEFT CARD (Visual only on desktop) */}
                        <AnimatePresence initial={false}>
                            <motion.div
                                key={visibleItems[0].key}
                                className="absolute w-[240px] md:w-[300px] p-6 bg-primary-dark backdrop-blur-md rounded-3xl shadow-lg border border-white/10 flex flex-col gap-4 items-center justify-center select-none pointer-events-none hidden md:flex"
                                initial={{ x: -80, opacity: 0, scale: 0.6, rotateY: 20 }}
                                animate={{ x: -240, opacity: 0.6, scale: 0.75, zIndex: 10, rotateY: 25, filter: "blur(1px)" }}
                                exit={{ opacity: 0, scale: 0.5, x: -120 }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                            >
                                <Quote className="text-white/10 w-8 h-8 self-start" />
                                <p className="text-white/60 italic font-light line-clamp-3">"{visibleItems[0].text}"</p>
                                <div className="font-bold text-white/60">{visibleItems[0].name}</div>
                            </motion.div>
                        </AnimatePresence>

                        {/* RIGHT CARD (Visual only on desktop) */}
                        <AnimatePresence initial={false}>
                            <motion.div
                                key={visibleItems[2].key}
                                className="absolute w-[240px] md:w-[300px] p-6 bg-primary-dark backdrop-blur-md rounded-3xl shadow-lg border border-white/10 flex flex-col gap-4 items-center justify-center select-none pointer-events-none hidden md:flex"
                                initial={{ x: 80, opacity: 0, scale: 0.6, rotateY: -20 }}
                                animate={{ x: 240, opacity: 0.6, scale: 0.75, zIndex: 10, rotateY: -25, filter: "blur(1px)" }}
                                exit={{ opacity: 0, scale: 0.5, x: 120 }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                            >
                                <Quote className="text-white/10 w-8 h-8 self-start" />
                                <p className="text-white/60 italic font-light line-clamp-3">"{visibleItems[2].text}"</p>
                                <div className="font-bold text-white/60">{visibleItems[2].name}</div>
                            </motion.div>
                        </AnimatePresence>

                        {/* CENTER CARD (Active) */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={visibleItems[1].key}
                                className="absolute w-[90%] max-w-[420px] bg-primary-dark p-8 md:p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(11,43,64,0.3)] border border-white/10 flex flex-col gap-6 items-center z-30"
                                initial={{ scale: 0.8, opacity: 0, y: 30, rotateY: 0 }}
                                animate={{ scale: 1, opacity: 1, y: 0, zIndex: 30 }}
                                exit={{ scale: 0.8, opacity: 0, y: -30 }}
                                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                            >
                                <div className="bg-white/5 p-5 rounded-full ring-8 ring-white/[0.02]">
                                    <Quote className="text-accent w-10 h-10" />
                                </div>

                                <p className="text-xl md:text-2xl text-white/95 italic font-light leading-relaxed text-center">
                                    "{visibleItems[1].text}"
                                </p>

                                <div className="flex flex-col items-center gap-4">
                                    <div className="flex gap-1.5">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                size={22}
                                                className={`transition-all duration-500 ${i < visibleItems[1].rating ? 'fill-accent text-accent' : 'text-white/10'}`}
                                            />
                                        ))}
                                    </div>

                                    <div className="text-center group">
                                        <h4 className="text-2xl font-bold text-white mb-1">{visibleItems[1].name}</h4>
                                        <span className="text-sm text-accent uppercase tracking-[0.2em] font-medium opacity-90">
                                            {visibleItems[1].location}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
}
