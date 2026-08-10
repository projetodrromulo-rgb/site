"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { CtaWhatsApp } from "@/components/shared/cta-whatsapp";
import { Breadcrumb } from "@/components/shared/breadcrumb";
import { MapPin, Phone, ShieldCheck, Star } from "lucide-react";

const SLIDE_DURATION = 6;   // seconds each image stays
const FADE_DURATION = 1.8; // seconds for crossfade

interface CityHeroProps {
    cityName: string;
    headline: {
        textHighlight: string;
    };
    description: string;
    ctaText: string;
    whatsAppNumber: string;
    bgImages?: string[];
    trustLocations?: Array<{ name: string; telephone: string }>;
}

const DEFAULT_IMAGES = ["/images/spine_surgery_team.png"];

export default function CityHero({
    cityName,
    headline,
    description,
    ctaText,
    whatsAppNumber,
    bgImages,
    trustLocations
}: CityHeroProps) {
    const containerRef = useRef<HTMLElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    // Refs for each slide layer
    const slidesRef = useRef<(HTMLDivElement | null)[]>([]);
    const kenBurnsRef = useRef<(HTMLDivElement | null)[]>([]);

    const images = (bgImages && bgImages.length > 0) ? bgImages : DEFAULT_IMAGES;

    // Split description into the first sentence (H1) and the rest
    const firstPeriodIndex = description.indexOf(".");
    const h1Text = firstPeriodIndex !== -1 ? description.substring(0, firstPeriodIndex) : description;
    const remainingDescription = firstPeriodIndex !== -1 ? description.substring(firstPeriodIndex + 1).trim() : "";

    // Slideshow logic with GSAP — runs imperatively so it can loop indefinitely
    useEffect(() => {
        if (images.length <= 1) return;

        const slides = slidesRef.current.filter(Boolean) as HTMLDivElement[];
        const kenBurns = kenBurnsRef.current.filter(Boolean) as HTMLDivElement[];

        if (slides.length === 0) return;

        // Start: first slide visible, all others hidden
        gsap.set(slides, { opacity: 0 });
        gsap.set(slides[0], { opacity: 1 });

        // Ken Burns on first slide immediately
        const startKenBurns = (index: number) => {
            const el = kenBurns[index];
            if (!el) return;
            gsap.fromTo(
                el,
                { scale: 1.0, x: "0%", y: "0%" },
                {
                    scale: 1.08,
                    x: index % 2 === 0 ? "-2%" : "2%",
                    y: index % 2 === 0 ? "-1.5%" : "1.5%",
                    duration: SLIDE_DURATION + FADE_DURATION,
                    ease: "none",
                }
            );
        };

        startKenBurns(0);

        let current = 0;
        let intervalId: ReturnType<typeof setInterval>;

        const advance = () => {
            const next = (current + 1) % slides.length;

            // Reset next slide position before showing
            gsap.set(slides[next], { opacity: 0 });
            gsap.set(kenBurns[next], { scale: 1.0, x: "0%", y: "0%" });

            // Start Ken Burns on next slide
            startKenBurns(next);

            // Crossfade: fade out current, fade in next
            gsap.to(slides[current], { opacity: 0, duration: FADE_DURATION, ease: "power2.inOut" });
            gsap.to(slides[next], { opacity: 1, duration: FADE_DURATION, ease: "power2.inOut" });

            current = next;
        };

        intervalId = setInterval(advance, SLIDE_DURATION * 1000);

        return () => {
            clearInterval(intervalId);
            gsap.killTweensOf(slides);
            gsap.killTweensOf(kenBurns);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [images.join(",")]);

    // Entry animations
    useGSAP(() => {
        const tl = gsap.timeline();

        if (bgRef.current) {
            tl.fromTo(
                bgRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 2.0, ease: "power2.out" }
            );
        }

        if (contentRef.current) {
            tl.fromTo(
                contentRef.current.children,
                { opacity: 0, y: 28 },
                { opacity: 1, y: 0, duration: 1.0, stagger: 0.12, ease: "power3.out" },
                "-=1.4"
            );
        }
    }, { scope: containerRef });

    return (
        <section
            ref={containerRef}
            className="relative w-full min-h-screen flex flex-col items-center justify-center px-6 md:px-12 lg:px-20 overflow-hidden bg-primary-dark"
        >
            {/* Background Slideshow */}
            <div
                ref={bgRef}
                className="absolute inset-0 w-full h-full z-0 pointer-events-none select-none overflow-hidden"
            >
                {images.map((src, i) => (
                    <div
                        key={src}
                        ref={(el) => { slidesRef.current[i] = el; }}
                        className="absolute inset-0 w-full h-full"
                        style={{ opacity: i === 0 ? 1 : 0 }}
                    >
                        {/* Ken Burns wrapper per slide */}
                        <div
                            ref={(el) => { kenBurnsRef.current[i] = el; }}
                            className="absolute inset-0 w-full h-full will-change-transform"
                        >
                            <Image
                                src={src}
                                alt={`Cirurgia de coluna — especialista em ${cityName}`}
                                fill
                                priority={i === 0}
                                sizes="100vw"
                                className="object-cover object-center"
                            />
                        </div>
                    </div>
                ))}

                {/* Slide indicator dots */}
                {images.length > 1 && (
                    <div className="absolute bottom-20 right-6 md:right-12 z-20 flex gap-1.5">
                        {images.map((_, i) => (
                            <div
                                key={i}
                                className="w-1.5 h-1.5 rounded-full bg-white/30"
                                style={{
                                    animation: `slideIndicator ${images.length * SLIDE_DURATION}s ${i * SLIDE_DURATION}s infinite`,
                                }}
                            />
                        ))}
                    </div>
                )}

                {/* Multi-layer gradient for depth and readability */}
                <div
                    className="absolute inset-0 z-10"
                    style={{
                        background: `
                            linear-gradient(to right, rgba(11, 43, 64, 0.97) 0%, rgba(11, 43, 64, 0.85) 35%, rgba(11, 43, 64, 0.45) 65%, rgba(11, 43, 64, 0.20) 100%),
                            linear-gradient(to top, rgba(11, 43, 64, 0.99) 0%, transparent 55%)
                        `
                    }}
                />
            </div>

            {/* Main Content */}
            <div className="relative z-10 w-full max-w-7xl mx-auto flex items-center justify-start pt-20 sm:pt-24 md:pt-28 pb-20 md:pb-32">
                <div
                    ref={contentRef}
                    className="flex flex-col items-start text-left space-y-4 md:space-y-6 max-w-2xl"
                >
                    {/* Breadcrumb Navigation */}
                    <Breadcrumb
                        className="-ml-4 sm:-ml-8 md:-ml-16 lg:-ml-24"
                        items={[
                            { label: "Início", href: "/" },
                            { label: "Especialista em Coluna", href: "/#sobre" },
                            { label: cityName }
                        ]}
                    />

                    {/* Location Badge */}
                    <div className="flex items-center gap-2 bg-accent/15 border border-accent/30 backdrop-blur-sm px-4 py-2 rounded-full">
                        <MapPin size={14} className="text-accent shrink-0" />
                        <span className="text-accent text-xs font-bold uppercase tracking-widest">{cityName} · MG</span>
                    </div>

                    {/* Specialty Tag / H1 */}
                    <h1 className="text-neutral-light/85 text-base md:text-lg font-semibold leading-snug border-l-2 border-accent/50 pl-4 py-0.5">
                        {h1Text}
                    </h1>

                    {/* Doctor Name */}
                    <h2 className="font-serif text-[clamp(2.8rem,6vw,5rem)] font-bold text-neutral-light leading-[1.05] drop-shadow-2xl">
                        {headline.textHighlight}
                    </h2>

                    {remainingDescription && (
                        <p className="text-neutral-light/65 text-sm md:text-base leading-relaxed max-w-xl">
                            {remainingDescription}
                        </p>
                    )}

                    {/* CTA */}
                    <div className="pt-2">
                        <CtaWhatsApp
                            cta={{ text: ctaText, whatsAppNumber: whatsAppNumber }}
                            fullWidth={false}
                            analyticsLabel={`cta_cidade_${cityName.toLowerCase().replace(/\s+/g, '_')}`}
                        />
                    </div>
                </div>
            </div>

            {/* Bottom Trust Strip */}
            <div className="absolute bottom-0 left-0 right-0 z-10 border-t border-white/10 bg-black/30 backdrop-blur-md px-4 md:px-8 py-4">
                <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
                    {/* Credenciais */}
                    <div className="flex items-center gap-2 text-neutral-light/70 text-xs font-medium">
                        <ShieldCheck size={14} className="text-accent shrink-0" />
                        <span>CRM 73889 · RQE 59057 · TEOT 19406</span>
                    </div>
                    <div className="hidden md:block w-px h-4 bg-white/20" />
                    <div className="flex items-center gap-2 text-neutral-light/70 text-xs font-medium">
                        <Star size={14} className="text-accent shrink-0" />
                        <span>Cirurgia Minimamente Invasiva</span>
                    </div>
                    {/* Clínicas com telefone */}
                    {trustLocations && trustLocations.length > 0 && (
                        <>
                            <div className="hidden md:block w-px h-4 bg-white/20" />
                            {trustLocations.map((loc) => (
                                <div key={loc.name} className="flex items-center gap-2">
                                    <MapPin size={13} className="text-accent shrink-0" />
                                    <span className="text-neutral-light/75 text-xs">{loc.name}</span>
                                    <a
                                        href={`tel:${loc.telephone.replace(/[^+\d]/g, "")}`}
                                        className="flex items-center gap-1 text-accent hover:text-white transition-colors text-xs font-bold tracking-wide"
                                        aria-label={`Ligar para ${loc.name}: ${loc.telephone}`}
                                    >
                                        <Phone size={11} className="shrink-0" />
                                        {loc.telephone}
                                    </a>
                                </div>
                            ))}
                        </>
                    )}
                </div>
            </div>

            {/* Keyframe for dot indicators */}
            <style>{`
                @keyframes slideIndicator {
                    0%, 100% { background-color: rgba(255,255,255,0.25); transform: scale(1); }
                    10%, 90% { background-color: rgba(255,255,255,0.85); transform: scale(1.4); }
                }
            `}</style>
        </section>
    );
}
