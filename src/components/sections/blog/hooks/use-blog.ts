"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export function useBlogAnimation() {
    const containerRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        if (!containerRef.current) return;

        const badge = containerRef.current.querySelector(".blog-animate-badge");
        const title = containerRef.current.querySelector(".blog-animate-title");
        const desc = containerRef.current.querySelector(".blog-animate-desc");
        const cards = containerRef.current.querySelectorAll(".blog-animate-card");
        const footers = containerRef.current.querySelectorAll(".blog-animate-footer");

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%",
                toggleActions: "play none none none"
            }
        });

        if (badge) {
            tl.to(badge, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power3.out"
            });
        }

        if (title) {
            tl.to(title, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power3.out"
            }, "-=0.6");
        }

        if (desc) {
            tl.to(desc, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power3.out"
            }, "-=0.6");
        }

        if (cards && cards.length > 0) {
            tl.to(cards, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.2,
                ease: "power2.out"
            }, "-=0.4");
        }

        if (footers && footers.length > 0) {
            tl.to(footers, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: "power2.out"
            }, "-=0.2");
        }

    }, { scope: containerRef });

    return { containerRef };
}

