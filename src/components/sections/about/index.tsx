"use client";

import { useAbout } from "./hooks/use-about";
import { AboutContent } from "./types";
import { AboutProfile, AboutBio, AboutFeatures } from "./_components";
import { TypingText } from "@/components/shared/typing-text";
import { Title } from "@/components/shared/title";


interface AboutProps {
    content: AboutContent;
}

export default function About({ content }: AboutProps) {
    const {
        subtitle,
        headline,
        customH2Title,
        image,
        paragraphs,
        neighborhoods,
        formation,
        features
    } = content;

    const {
        containerRef,
        headerRef,
        profileRef,
        bioRef,
        featuresRef
    } = useAbout();

    return (
        <section
            id="sobre"
            ref={containerRef}
            aria-labelledby="about-title"
            className="relative w-full overflow-hidden bg-neutral-light border-b border-primary-dark/5 lg:pt-16"
        >
            <div className="max-w-8xl mx-auto px-6 pt-6 md:px-12 lg:px-8 xl:px-16 2xl:px-20 text-primary-dark w-full space-y-16 lg:space-y-24 md:pb-12">
                <header id="about-title" ref={headerRef} className="space-y-6 text-center w-full flex flex-col items-center">
                    <TypingText
                        phrases={[subtitle]}
                        className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary-dark"
                    />

                    {customH2Title ? (
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary-dark font-serif tracking-tight leading-snug max-w-4xl text-center drop-shadow-sm">
                            {customH2Title}
                        </h2>
                    ) : (
                        <Title
                            headline={headline}
                            className="text-2xl md:text-3xl lg:text-4xl font-bold"
                        />
                    )}
                </header>

                <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-20 w-full">
                    <AboutProfile
                        ref={profileRef}
                        src={image.src}
                        alt={image.alt}
                    />

                    <article className="flex-1">
                        <AboutBio
                            ref={bioRef}
                            paragraphs={paragraphs}
                            neighborhoods={neighborhoods}
                            formation={formation}
                        />
                    </article>
                </div>
            </div>


            {/* Barra de Diferenciais na base da seção */}
            <footer className="w-full border-t border-primary-dark/10 bg-white/40 backdrop-blur-xl py-14 px-6 md:px-12 lg:px-8 xl:px-0 2xl:px-20 relative overflow-hidden">
                <AboutFeatures
                    ref={featuresRef}
                    features={features}
                />
            </footer>
        </section>
    );
}
