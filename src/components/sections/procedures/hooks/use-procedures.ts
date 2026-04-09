"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export function useProceduresAnimation() {
    const containerRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        if (!containerRef.current) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%",
                toggleActions: "play none none none"
            }
        });

        // Header Animations
        tl.to(".procedures-animate-badge", {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out"
        })
        .to(".procedures-animate-title", {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out"
        }, "-=0.4")
        .to(".procedures-animate-desc", {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out"
        }, "-=0.4");

        // Cards Animations - using stagger
        tl.to(".procedures-animate-card", {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: "back.out(1.2)"
        }, "-=0.2");

    }, { scope: containerRef });

    return { containerRef };
}
