import { forwardRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PlanLogoProps {
    src: string;
    alt: string;
    className?: string;
}

export const PlanLogo = forwardRef<HTMLDivElement, PlanLogoProps>(
    ({ src, alt, className }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    "relative bg-white/10 backdrop-blur-md rounded-xl p-4 flex items-center justify-center border border-white/10 hover:bg-white/20 transition-all duration-300 h-24 hover:shadow-lg group/logo z-[99] hover:z-[110] ",
                    className
                )}
            >
                {/* Tooltip - Using CSS for visibility to ensure reliable trigger from parent hover */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover/logo:opacity-100 group-hover/logo:-top-12 transition-all duration-300 pointer-events-none z-[100]">
                    <div className="bg-[#0A192F] text-white text-[20px] font-bold py-1.5 px-3 rounded-lg whitespace-nowrap shadow-2xl border border-[#0db9f2]/30 relative tracking-wide">
                        {alt}
                        {/* Little arrow */}
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#0A192F] border-r border-b border-[#0db9f2]/30 rotate-45" />
                    </div>
                </div>

                <div className="relative w-full h-full transform transition-transform group-hover/logo:scale-180 bg-white rounded-lg">
                    <Image
                        src={src}
                        alt={alt}
                        fill
                        className="object-contain p-2"
                        unoptimized
                    />
                </div>
            </div>
        );
    }
);

PlanLogo.displayName = "PlanLogo";
