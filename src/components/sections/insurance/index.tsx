"use client";

import { InsuranceContent } from "./types";
import { useInsurance } from "./hooks/use-insurance";
import { HospitalCard, InsuranceDescription, InsuranceTitle } from "./_components";
import { Badge } from "@/components/shared/badge";
import { cn } from "@/lib/utils";
import { Title, TypingText } from "@/components/shared";

interface InsuranceProps {
    content: InsuranceContent;
}

export function Insurance({ content }: InsuranceProps) {
    const { containerRef } = useInsurance([content]);



    if (!content) return null;
    const { id, badge, headline, description, hospitals } = content;

    return (
        <section
            id={id}
            ref={containerRef}
            className="py-24 bg-white relative z-20 w-full"
        >
            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

                    {/* Left Column - Sticky Info */}
                    <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit space-y-6">
                        <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-4">
                            <TypingText phrases={[badge]} />


                            <Title headline={headline} />

                            <InsuranceDescription className="insurance-animate-item text-[var(--color-primary-dark)]">
                                {description}
                            </InsuranceDescription>
                        </div>
                    </div>

                    {/* Right Column - Hospital Cards with Internal Marquee */}
                    <div className="lg:col-span-8 flex flex-col gap-12">
                        {(hospitals && hospitals.length > 0) ? (
                            hospitals.map((hospital, index) => (
                                <HospitalCard
                                    key={`hospital-${hospital.name}-${index}`}
                                    hospital={hospital}
                                    className="insurance-animate-item"
                                />
                            ))
                        ) : (
                            <div className="text-blue-900/40 text-center py-20 border border-dashed border-blue-900/10 rounded-3xl">
                                Nenhum convênio encontrado.
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Subtle background flair */}
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-900/10 to-transparent" />
        </section >
    );
}
