"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RefObject } from "react";

gsap.registerPlugin(ScrollTrigger);

export function useBlog(containerRef: RefObject<HTMLElement | null>) {
    useGSAP(() => {
        if (!containerRef.current) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%",
                toggleActions: "play none none none"
            }
        });

        tl.to(".blog-animate-header", {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out"
        })
        .to(".blog-animate-card", {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.2,
            ease: "power2.out"
        }, "-=0.4")
        .to(".blog-animate-footer", {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out"
        }, "-=0.2");

    }, { scope: containerRef });
}
