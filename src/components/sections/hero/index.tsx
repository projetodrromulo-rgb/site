"use client";

import { useHero } from "./use-hero";
import { HeroContent } from "./types";
import { TypingText } from "./typing-text";

interface HeroProps {
    content: HeroContent;
}

export default function Hero({ content }: HeroProps) {

    const {
        containerRef,
        contentRef,
        mediaContainerRef,
        videoRef,
        doctorImageRef,
        overlayRef,
        logoRef,
        handleVideoEnded
    } = useHero();

    const { typingPhrases, headline, description, cta } = content;

    return (
        <section
            ref={containerRef}
            className="relative w-full min-h-screen flex items-center px-6 md:px-12 lg:px-24 lg:pt-16 overflow-hidden"
        >
            {/* Logo Absoluta no Topo (apenas na Hero) */}
            <div ref={logoRef} className="absolute top-4 left-8 md:left-12 lg:left-4 z-[150] opacity-0">
                <img
                    src="/images/logo 603x211.svg"
                    alt="Dr. Rômulo Oliveira Logo"
                    className="h-16 md:h-24 lg:h-32 w-auto drop-shadow-2xl antialiased"
                    fetchPriority="high"
                />
            </div>

            {/* Background Spine Illustration */}
            <div
                ref={mediaContainerRef}
                className="absolute inset-0 w-full h-full opacity-0 pointer-events-none z-0"
            >
                <video
                    ref={videoRef}
                    src="/video/video-hero.webm"
                    autoPlay
                    muted
                    loop={false}
                    playsInline
                    preload="auto"
                    onEnded={handleVideoEnded}
                    className="absolute inset-0 w-full h-full object-cover transform-gpu"
                />
                <div ref={overlayRef} className="absolute inset-0 bg-background/70"></div>
            </div>

            {/* Content Overflow (Layout Centralizado) */}
            <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center justify-center text-center h-full pt-24 pb-8 lg:py-0">

                {/* Textos */}
                <div ref={contentRef} className="flex flex-col items-center text-center drop-shadow-2xl z-20">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0db9f2]/10 border border-[#0db9f2]/20 mb-4 lg:mb-6 drop-shadow-sm">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0db9f2] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0db9f2]"></span>
                        </span>
                        <TypingText phrases={typingPhrases} />
                    </div>

                    <h1 className="flex flex-col gap-1 lg:gap-2 mb-4 lg:mb-6 tracking-tight drop-shadow-lg font-inter">
                        <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1]">
                            {headline.top} <br className="hidden md:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-100 to-[#0db9f2]">
                                {headline.highlight}
                            </span>
                        </span>
                        <span className="text-slate-200 text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold leading-[1.2]">
                            {headline.bottom}
                        </span>
                    </h1>

                    <p className="text-slate-300 text-base md:text-lg lg:text-xl font-medium leading-relaxed mb-6 lg:mb-8 max-w-[95%] xl:max-w-[80%] drop-shadow-md mx-auto">
                        {description}
                    </p>

                    <div>
                        <a
                            className="flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#25D366]/90 text-white px-8 py-5 rounded-xl font-extrabold text-lg shadow-lg shadow-[#25D366]/20 transition-all active:scale-95 group"
                            href={cta.whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {cta.text}
                            <div className="group-hover:animate-pulse transition-all duration-300 flex items-center justify-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.663-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                                </svg>
                            </div>
                        </a>
                    </div>
                </div>

                {/* Imagem do Médico (Centralizada atrás do texto em telas grandes ou abaixo) */}
                <div
                    ref={doctorImageRef}
                    className="absolute bottom-0 left-0 w-full h-[50vh] md:h-[65vh] xl:h-[75vh] flex justify-center items-end opacity-0 translate-y-[50px] pointer-events-none z-10"
                >

                    {/* Iluminação central atrás da imagem */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 max-w-2xl h-1/2 bg-[#0db9f2]/20 blur-[120px] rounded-full -z-10"></div>
                </div>

            </div>
        </section>
    );
}
