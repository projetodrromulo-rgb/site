"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { ParallaxContent } from "./types";

gsap.registerPlugin(ScrollTrigger);

interface ParallaxSectionProps {
    content: ParallaxContent;
}

export default function ParallaxSection({ content }: ParallaxSectionProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!containerRef.current || !imageRef.current) return;

        gsap.fromTo(
            imageRef.current,
            { y: "-20%" },
            {
                y: "20%",
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                },
            }
        );
    }, { scope: containerRef });

    if (!content) return null;
    const { backgroundImage, title } = content;

    return (
        <section
            ref={containerRef}
            className="relative h-[40vh] md:h-[60vh] overflow-hidden flex items-center justify-center"
        >
            <div
                ref={imageRef}
                className="absolute inset-0 w-full h-[140%] -top-[20%]"
            >
                <Image
                    src={backgroundImage.src}
                    alt={backgroundImage.alt}
                    width={1920}
                    height={1080}
                    className="w-full h-full object-cover absolute inset-0 opacity-40 grayscale hover:grayscale-0 transition-all duration-700"
                    priority
                />
                {/* Overlay for better integration */}
                <div className="absolute inset-0 bg-gradient-to-b from-primary-dark via-transparent to-primary-dark opacity-90" />
            </div>

            <div className="relative z-10 text-center px-6">
                <h2 className="text-3xl md:text-5xl font-black text-white/20 italic tracking-tighter uppercase">
                    {title}
                </h2>
            </div>
        </section>
    );
}
