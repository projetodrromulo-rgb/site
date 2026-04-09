"use client";

import { useProceduresAnimation } from "./hooks/use-procedures";
import { ProceduresSectionContent } from "./types";
import { Header, ProcedureCard } from "./_components";

interface ProceduresProps {
    content: ProceduresSectionContent;
}

export function Procedures({ content }: ProceduresProps) {
    const { containerRef } = useProceduresAnimation();

    return (
        <section
            id="procedimentos"
            ref={containerRef as any}
            className="py-24 bg-[#0A192F] relative overflow-hidden"
        >
            {/* Background Glows */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: `
                        radial-gradient(circle at 50% 20%, rgba(13, 185, 242, 0.1), transparent 50%),
                        radial-gradient(circle at 80% 80%, rgba(13, 185, 242, 0.05), transparent 40%)
                    `
                }}
            />

            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <Header
                    badge={content.badge}
                    title={content.title}
                    description={content.description}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {content.items.map((proc, idx) => (
                        <ProcedureCard
                            key={`${proc.title}-${idx}`}
                            title={proc.title}
                            description={proc.description}
                            icon={proc.icon}
                            slug={proc.slug}
                            index={idx}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
