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

        const badge = containerRef.current.querySelector(".procedures-animate-badge");
        const title = containerRef.current.querySelector(".procedures-animate-title");
        const desc = containerRef.current.querySelector(".procedures-animate-desc");
        const cards = containerRef.current.querySelectorAll(".procedures-animate-card");

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 85%",
                toggleActions: "play none none reverse"
            }
        });

        // Header Animations
        if (badge) {
            tl.to(badge, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: "power2.out"
            });
        }

        if (title) {
            tl.to(title, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: "power2.out"
            }, "-=0.4");
        }

        if (desc) {
            tl.to(desc, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: "power2.out"
            }, "-=0.4");
        }

        // Cards Animations - using stagger
        if (cards && cards.length > 0) {
            tl.to(cards, {
                opacity: 1,
                y: 0,
                stagger: 0.1,
                duration: 0.8,
                ease: "back.out(1.2)"
            }, "-=0.2");
        }

    }, { scope: containerRef });

    return { containerRef };
}
