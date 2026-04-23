"use client";

import { HeroContent } from "../types";
import { Ref, useState, useEffect } from "react";
import { motion } from "framer-motion";

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
        // Detectar se é dispositivo móvel
        const isMobile = window.innerWidth < 768;

        if (isMobile) {
            // No mobile, aguarda 2 segundos antes de começar a carregar o vídeo
            const timer = setTimeout(() => {
                setShouldLoadVideo(true);
            }, 2000);
            return () => clearTimeout(timer);
        } else {
            // No desktop carrega imediatamente
            setShouldLoadVideo(true);
        }
    }, []);

    return (
        <div
            ref={mediaContainerRef}
            aria-hidden="true"
        >
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
                    className="absolute inset-0 w-full h-full object-cover transform-gpu"
                />
            )}
            <div ref={overlayRef} className="absolute inset-0 bg-background/70"></div>
        </div>
    )
}