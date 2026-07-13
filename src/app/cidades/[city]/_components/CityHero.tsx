"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { CtaWhatsApp } from "@/components/shared/cta-whatsapp";

interface CityHeroProps {
    cityName: string;
    headline: {
        textHighlight: string;
    };
    description: string;
    ctaText: string;
    whatsAppNumber: string;
}

export default function CityHero({
    cityName,
    headline,
    description,
    ctaText,
    whatsAppNumber
}: CityHeroProps) {
    const containerRef = useRef<HTMLElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    // Split description into the first sentence (H1) and the rest
    const firstPeriodIndex = description.indexOf(".");
    const h1Text = firstPeriodIndex !== -1 ? description.substring(0, firstPeriodIndex) : description;
    const remainingDescription = firstPeriodIndex !== -1 ? description.substring(firstPeriodIndex + 1).trim() : "";

    useGSAP(() => {
        const tl = gsap.timeline();

        // Soft fade-in for the background image
        if (bgRef.current) {
            tl.fromTo(
                bgRef.current,
                { opacity: 0, scale: 1.02 },
                { opacity: 1, scale: 1, duration: 2.0, ease: "power2.out" }
            );
        }

        // Animation for brand text column
        if (contentRef.current) {
            tl.fromTo(
                contentRef.current.children,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 1.0, stagger: 0.15, ease: "power3.out" },
                "-=1.2"
            );
        }
    }, { scope: containerRef });

    return (
        <section
            ref={containerRef}
            className="relative w-full min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-20 py-24 overflow-hidden bg-primary-dark"
        >
            {/* Hospital corridor background image with subtle radial lighting */}
            <div
                ref={bgRef}
                className="absolute inset-0 w-full h-full z-0 pointer-events-none select-none"
            >
                <Image
                    src="/images/operating_room_spine.png"
                    alt={`Especialista em Coluna em ${cityName}`}
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover"
                />
                <div 
                    className="absolute inset-0"
                    style={{
                        background: `
                            radial-gradient(circle at center, rgba(11, 43, 64, 0.45) 0%, rgba(11, 43, 64, 0.88) 75%),
                            linear-gradient(to bottom, rgba(11, 43, 64, 0.4) 0%, rgba(11, 43, 64, 0.98) 100%)
                        `
                    }}
                />
            </div>

            {/* Clean Single Column Left-Aligned Layout */}
            <div className="relative z-10 w-full max-w-7xl mx-auto flex items-center justify-start pt-12">
                
                {/* Brand Copy (Title, Description, CTA) */}
                <div 
                    ref={contentRef} 
                    className="flex flex-col items-start text-left space-y-6 max-w-3xl"
                >


                    {/* Visually third: H1 main keyword */}
                    <h1 className="text-neutral-light/95 text-lg md:text-xl font-bold leading-snug drop-shadow-md border-l-2 border-accent/40 pl-4 py-1 order-3">
                        {h1Text}
                    </h1>

                    {/* Visually second: Doctor's Name */}
                    <h2 className="font-serif text-[clamp(2.5rem,5.5vw,4.5rem)] font-bold text-neutral-light leading-[1.1] drop-shadow-2xl order-2">
                        {headline.textHighlight}
                    </h2>

                    {remainingDescription && (
                        <p className="text-neutral-light/70 text-xs md:text-sm leading-relaxed max-w-2xl pl-4 order-4">
                            {remainingDescription}
                        </p>
                    )}

                    <div className="pt-4 order-5">
                        <CtaWhatsApp 
                            cta={{ text: ctaText, whatsAppNumber: whatsAppNumber }} 
                            fullWidth={false}
                            className="max-w-xs" 
                        />
                    </div>
                </div>

            </div>
        </section>
    );
}
