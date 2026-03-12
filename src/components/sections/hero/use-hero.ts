import { useState, useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const PHRASES = [
    "Ortopedia e Cirurgia de Coluna",
    "Cirurgia Minimamente Invasiva",
    "Recuperação Rápida e Segura"
];

export const useHero = () => {
    const containerRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const mediaContainerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const doctorImageRef = useRef<HTMLImageElement>(null);
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
            contentRef.current?.children || [],
            {
                y: 30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: "power3.out"
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
            doctorImageRef.current,
            {
                opacity: 0,
                y: 50,
                duration: 1.2,
                ease: "power3.out"
            },
            "-=1.0"
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
        gsap.to(doctorImageRef.current, {
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
        doctorImageRef,
        overlayRef,
        logoRef,
        handleVideoEnded
    };
};
