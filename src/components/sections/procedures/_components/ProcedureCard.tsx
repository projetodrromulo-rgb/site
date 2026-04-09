"use client";

import { forwardRef } from "react";
import Link from "next/link";
import { ChevronRight, CheckCheck, Stethoscope, Activity, Disc, Syringe, Calendar } from "lucide-react";

const ICON_MAP: Record<string, any> = {
    check: CheckCheck,
    stethoscope: Stethoscope,
    activity: Activity,
    disc: Disc,
    syringe: Syringe,
    calendar: Calendar,
};

interface ProcedureCardProps {
    title: string;
    description: string;
    icon: string;
    slug: string;
    index: number;
}

export const ProcedureCard = forwardRef<HTMLDivElement, ProcedureCardProps>(
    ({ title, description, icon, slug, index }, ref) => {
        const Icon = ICON_MAP[icon] || Activity;
        return (
            <div
                ref={ref}
                className="procedures-animate-card group relative p-[1px] rounded-3xl overflow-hidden shadow-xl h-full opacity-0"
            >
                {/* Border Beam Effect */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,transparent_0%,transparent_10%,white_15%,transparent_20%,transparent_100%)] opacity-20 group-hover:opacity-100 transition-opacity duration-500 animate-[spin_4s_linear_infinite]" />
                </div>

                <div className="relative z-10 bg-[#112240] group-hover:bg-[#1a3055] p-8 rounded-[23px] h-full transition-all duration-300 border border-white/5 border-t-2 border-t-white/80 hover:border-transparent flex flex-col">
                    <div className="mb-6 w-14 h-14 rounded-2xl bg-[#0db9f2]/10 text-[#0db9f2] group-hover:bg-[#0db9f2] group-hover:text-white transition-all duration-300 flex items-center justify-center">
                        <Icon size={28} />
                    </div>

                    <div className="flex-1 space-y-3">
                        <h3 className="text-xl font-bold text-white group-hover:text-[#0db9f2] transition-colors leading-tight">
                            {title}
                        </h3>
                        <p className="text-white/60 text-sm leading-relaxed group-hover:text-white/80 transition-colors">
                            {description}
                        </p>
                    </div>

                    <Link
                        href={`/procedimentos/${slug}`}
                        className="flex items-center gap-2 text-[#0db9f2] text-sm font-bold group/btn pt-6 mt-auto transition-all relative w-fit"
                    >
                        <span className="relative animate-[pulse_2s_ease-in-out_infinite] group-hover/btn:animate-none">
                            Saiba mais
                            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#0db9f2] transition-all duration-300 group-hover/btn:w-full shadow-[0_0_8px_rgba(13,185,242,0.6)]" />
                        </span>
                        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#0db9f2]/0 group-hover/btn:bg-[#0db9f2]/10 transition-all">
                            <ChevronRight size={16} className="group-hover/btn:translate-x-1.5 transition-transform duration-300" />
                        </div>
                    </Link>
                </div>
            </div>
        );
    }
);

ProcedureCard.displayName = "ProcedureCard";
