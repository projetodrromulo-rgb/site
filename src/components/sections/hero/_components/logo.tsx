import { forwardRef } from "react";
import { HeroContent } from "../types";
import Image from "next/image";

interface LogoProps {
    logoImage: HeroContent['logoImage'];
    className?: string;
    scrolled?: boolean;
}

export const Logo = forwardRef<HTMLDivElement, LogoProps>(
    ({ logoImage, className, scrolled }, ref) => {
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
                        className="h-12 md:h-16 lg:h-16 w-auto drop-shadow-2xl group-hover:scale-105 transition-transform duration-300"
                    />
                    {/* Sutil brilho atrás do logo - apenas quando não scrollado */}
                    {!scrolled && <div className="absolute inset-0 blur-2xl rounded-full -z-10 bg-accent/20 transition-colors"></div>}
                </div>

                {/* Brand Text */}
                <div className={`flex flex-col justify-center border-l border-white/10 pl-3 md:pl-4 transition-colors duration-300`}>
                    <div className={`text-white font-bold leading-none tracking-tight text-lg md:text-xl lg:text-2xl font-inter uppercase transition-colors duration-300`}>
                        Dr. Rômulo <span className="text-accent">Oliveira</span>
                    </div>
                    <div className={`text-white/60 text-[10px] md:text-[12px] font-medium uppercase tracking-[0.15em] mt-1 whitespace-nowrap transition-colors duration-300`}>
                        Ortopedista e Cirurgião de Coluna
                    </div>
                </div>
            </div>
        );
    }
);

Logo.displayName = "Logo";