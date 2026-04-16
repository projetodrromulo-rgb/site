"use client";

import { useHero } from "./hooks/use-hero";
import { HeroContent } from "./types";
import { BackgroundVideo, Description, HeroSpotlight, ScrollDown } from './_components';
import { Title, TypingText } from "@/components/shared";
import { CtaWhatsApp } from "@/components/shared/cta-whatsapp";

interface HeroProps {
    content: HeroContent;

}

export default function Hero({ content }: HeroProps) {

    const {
        containerRef,
        contentRef,
        mediaContainerRef,
        videoRef,
        spotlightRef,
        overlayRef,
        scrollRef,
        handleVideoEnded
    } = useHero();

    const { typingPhrases, headline, description, cta, logoImage, backgroundVideo } = content;

    return (
        <section
            id="hero"
            ref={containerRef}
            className="relative w-full min-h-screen flex items-center px-6 md:px-12 lg:px-24  overflow-hidden"
        >

            <div
                ref={mediaContainerRef}
                className="absolute inset-0 w-full h-full opacity-0 pointer-events-none z-0"
            >
                <BackgroundVideo
                    backgroundVideo={backgroundVideo}
                    mediaContainerRef={mediaContainerRef}
                    videoRef={videoRef}
                    overlayRef={overlayRef}
                    handleVideoEnded={handleVideoEnded}
                />

            </div>

            <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center justify-center text-center h-full pb-8 lg:py-0">

                <div ref={contentRef} className="relative flex flex-col items-center text-center drop-shadow-2xl z-20 pointer-events-auto">
                    <div className="hero-animate-item"><TypingText phrases={typingPhrases} /></div>
                    <div className="hero-animate-item w-full flex justify-center"><Title headline={headline} /></div>
                    <div className="hero-animate-item w-full flex justify-center"><Description description={description} /></div>
                    <CtaWhatsApp cta={cta} />
                </div>

                <HeroSpotlight
                    ref={spotlightRef}
                    className="absolute bottom-0 left-0 w-full h-[50vh] md:h-[65vh] xl:h-[75vh] flex justify-center items-end opacity-0 translate-y-[50px] pointer-events-none z-10"
                />
            </div>

            <ScrollDown
                ref={scrollRef}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 opacity-0"
            />
        </section >
    );
}
