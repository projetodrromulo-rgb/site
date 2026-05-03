"use client";

import { HeroContent } from "../types";
import { Ref, useState, useEffect } from "react";
import { motion } from "framer-motion";

import Image from "next/image";

interface BackgroundVideoProps {
    backgroundVideo: HeroContent['backgroundVideo'];
    mediaContainerRef: Ref<HTMLDivElement> | undefined;
    videoRef: Ref<HTMLVideoElement> | undefined;
    overlayRef: Ref<HTMLDivElement> | undefined;
    handleVideoEnded: () => void;
}

export function BackgroundVideo({ backgroundVideo, mediaContainerRef, videoRef, overlayRef, handleVideoEnded }: BackgroundVideoProps) {
    const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);

    useEffect(() => {
        const checkMobile = window.innerWidth < 768;
        // Carrega o vídeo apenas se for desktop
        setShouldLoadVideo(!checkMobile);
        
        // No mobile, o vídeo não vai tocar, então chamamos o "ended" logo de cara
        // para garantir que qualquer lógica dependente seja destravada (se houver)
        if (checkMobile) {
            handleVideoEnded();
        }
    }, [handleVideoEnded]);

    return (
        <div
            aria-hidden="true"
        >
            {/* Imagem estática para Mobile (LCP Otimizado) */}
            <div className="block md:hidden absolute inset-0 w-full h-full">
                <Image 
                    src="/images/hero-mobile.webp" 
                    alt="Dr. Rômulo - Especialista em Coluna" 
                    fill 
                    className="object-cover"
                    priority
                />
            </div>

            {/* Vídeo para Desktop */}
            {shouldLoadVideo && (
                <motion.video
                    ref={videoRef}
                    src={backgroundVideo.src}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isVideoPlaying ? 1 : 0 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                    autoPlay
                    muted
                    loop={false}
                    playsInline
                    preload="auto"
                    onPlaying={() => setIsVideoPlaying(true)}
                    onEnded={handleVideoEnded}
                    className="hidden md:block absolute inset-0 w-full h-full object-cover transform-gpu"
                />
            )}
            <div ref={overlayRef} className="absolute inset-0 bg-background/70"></div>
        </div>
    )
}