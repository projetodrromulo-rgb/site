import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export const useInsurance = (dependencies: any[] = []) => {
    const containerRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        if (!containerRef.current) return;

        // Limpar animações anteriores se houver
        const items = containerRef.current.querySelectorAll(".insurance-animate-item");
        if (items.length === 0) return;

        gsap.fromTo(items, 
            {
                y: 50,
                opacity: 0
            },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                stagger: 0.15,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 90%",
                    toggleActions: "play none none none",
                    // markers: true, // DEBUG
                }
            }
        );

        // Força o recálculo dos gatilhos após a criação
        ScrollTrigger.refresh();

    }, { scope: containerRef, dependencies });

    return {
        containerRef
    };
};
