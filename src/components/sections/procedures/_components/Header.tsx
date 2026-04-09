"use client";

import { forwardRef } from "react";

interface HeaderProps {
    badge: string;
    title: string;
    description: string;
}

export const Header = forwardRef<HTMLDivElement, HeaderProps>(
    ({ badge, title, description }, ref) => {
        return (
            <div ref={ref} className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                <span className="procedures-animate-badge block text-[#0db9f2] font-bold uppercase tracking-widest text-xs opacity-0">
                    {badge}
                </span>
                <h2 className="procedures-animate-title text-4xl md:text-5xl font-black text-white leading-tight mt-4 opacity-0">
                    Tratamentos <span className="text-[#0db9f2] italic">Especializados</span>
                </h2>
                <p className="procedures-animate-desc text-white/70 text-lg mt-6 leading-relaxed opacity-0">
                    {description}
                </p>
            </div>
        );
    }
);

Header.displayName = "Header";
