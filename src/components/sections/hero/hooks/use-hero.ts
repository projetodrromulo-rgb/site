import { useState, useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export const useHero = () => {
    const containerRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const mediaContainerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const spotlightRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);

    // Video playback optimization (Performance)
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (video.ended) return;
                if (entry.isIntersecting) {
                    video.play().catch(() => { });
                } else {
                    video.pause();
                }
            },
            { threshold: 0.1 }
        );

        observer.observe(video);
        return () => observer.disconnect();
    }, []);

    const logoRef = useRef<HTMLDivElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Entry animations
    useGSAP(() => {
        const tl = gsap.timeline();

        // Logo animation (Delayed by 3 seconds as requested)
        gsap.fromTo(logoRef.current,
            { opacity: 0, y: -20 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                delay: 3,
                ease: "power3.out"
            }
        );

        tl.from(
            ".hero-animate-item",
            {
                y: 30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: "power3.out",
                clearProps: "all" // Garante que estilos inline do GSAP não atrapalhem após a animação
            }
        ).fromTo(
            mediaContainerRef.current,
            { opacity: 0, scale: 1.05 },
            {
                opacity: 0.9,
                scale: 1,
                duration: 2.5,
                ease: "power2.inOut"
            },
            "-=0.6"
        ).from(
            spotlightRef.current,
            {
                opacity: 0,
                y: 50,
                duration: 1.2,
                ease: "power3.out"
            },
            "-=1.0"
        ).fromTo(
            scrollRef.current,
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out"
            },
            "-=0.5"
        );
    }, { scope: containerRef });

    // Move interaction logic to event handler (Vercel Best Practices 5.8)
    const handleVideoEnded = useCallback(() => {
        // Clareia a sobreposição no vídeo (aumentando opacidade visual do vídeo)
        gsap.to(overlayRef.current, {
            backgroundColor: "rgba(15, 23, 42, 0.9)",
            duration: 2,
            ease: "power2.out"
        });

        // Entrada do médico centralizado abaixo
        gsap.to(spotlightRef.current, {
            opacity: 1,
            y: 0,
            duration: 1.5,
            ease: "power2.out"
        });
    }, []);

    return {
        containerRef,
        contentRef,
        mediaContainerRef,
        videoRef,
        spotlightRef,
        overlayRef,
        logoRef,
        scrollRef,
        handleVideoEnded
    };
};
