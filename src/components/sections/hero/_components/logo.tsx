import { forwardRef } from "react";
import { HeroContent } from "../types";
import Image from "next/image";

interface LogoProps {
    logoImage: HeroContent['logoImage'];
    className?: string;
}

export const Logo = forwardRef<HTMLDivElement, LogoProps>(
    ({ logoImage, className }, ref) => {
        return (
            <div ref={ref} className={`${className} flex items-center gap-3 md:gap-4 group cursor-pointer`}>
                {/* Logo Image/Icon */}
                <div className="relative">
                    <Image
                        src={logoImage.src}
                        alt={logoImage.alt}
                        width={250}
                        height={80}
                        priority
                        className="h-12 md:h-16 lg:h-20 w-auto drop-shadow-2xl transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Sutil brilho atrás do logo */}
                    <div className="absolute inset-0 bg-[#0db9f2]/10 blur-2xl rounded-full -z-10 group-hover:bg-[#0db9f2]/20 transition-colors"></div>
                </div>

                {/* Brand Text */}
                <div className="flex flex-col justify-center border-l border-white/10 pl-3 md:pl-4">
                    <div className="text-white font-bold leading-none tracking-tight text-lg md:text-xl lg:text-2xl font-inter uppercase">
                        Dr. Rômulo <span className="text-[#0db9f2]">Oliveira</span>
                    </div>
                    <div className="text-white/60 text-[10px] md:text-[12px] font-medium uppercase tracking-[0.15em] mt-1 whitespace-nowrap">
                        Ortopedista e Cirurgião de Coluna
                    </div>
                </div>
            </div>
        );
    }
);

Logo.displayName = "Logo";