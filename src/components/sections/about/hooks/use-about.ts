import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export const useAbout = () => {
    const containerRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const profileRef = useRef<HTMLDivElement>(null);
    const bioRef = useRef<HTMLDivElement>(null);
    const featuresRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!containerRef.current) return;

        // 1. Reveal Header
        gsap.from(headerRef.current, {
            scrollTrigger: {
                trigger: headerRef.current,
                start: "top 85%",
                toggleActions: "play none none reverse",
            },
            y: 40,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });

        // 2. Profile and Bio Parallel Entry
        const tlContent = gsap.timeline({
            scrollTrigger: {
                trigger: profileRef.current,
                start: "top 80%",
                toggleActions: "play none none reverse",
            }
        });

        tlContent.from(profileRef.current, {
            x: -60,
            opacity: 0,
            duration: 1.2,
            ease: "power4.out"
        }).from(bioRef.current, {
            x: 60,
            opacity: 0,
            duration: 1.2,
            ease: "power4.out"
        }, "-=1.0");

        // 3. Features Staggered Entry
        gsap.from(".about-feature-item", {
            scrollTrigger: {
                trigger: featuresRef.current,
                start: "top 85%",
                toggleActions: "play none none reverse",
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out",
            delay: 0.2
        });

    }, { scope: containerRef });

    return {
        containerRef,
        headerRef,
        profileRef,
        bioRef,
        featuresRef
    };
};
