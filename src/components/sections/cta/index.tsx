"use client";

import { CTAContent } from "./types";
import { useCTA } from "./hooks/use-cta";
import { ActionButton, TrustSignalCard, CTADescription, CTATitle } from "./_components";
import { TypingText } from "@/components/shared";

interface CTAProps {
    content: CTAContent;
}

export default function CTA({ content }: CTAProps) {
    const { containerRef } = useCTA();
    const { typingPhrases, headline, description, whatsappUrl, trustSignals, id } = content;

    return (
        <section
            id={id}
            ref={containerRef}
            className="relative overflow-hidden bg-[#0A192F] py-24 px-4 sm:px-6 lg:px-8"
        >
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: `
                        radial-gradient(circle at 20% 30%, rgba(13, 185, 242, 0.12), transparent 40%),
                        radial-gradient(circle at 80% 70%, rgba(13, 185, 242, 0.08), transparent 40%)
                    `
                }}
            />

            <div className="relative z-10 max-w-4xl mx-auto text-center">


                <TypingText phrases={typingPhrases} className="cta-animate-item" />

                <CTATitle className="cta-animate-item">
                    {headline}
                </CTATitle>

                <CTADescription className="cta-animate-item">
                    {description}
                </CTADescription>

                <ActionButton
                    href={whatsappUrl}
                    text="Chamar no WhatsApp"
                    className="cta-animate-item"
                />

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 pt-16 border-t border-white/10">
                    {trustSignals.map((signal, idx) => (
                        <TrustSignalCard
                            key={idx}
                            {...signal}
                            className="cta-animate-item"
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}