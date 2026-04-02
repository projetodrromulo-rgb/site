import { forwardRef } from "react";

interface HeroSpotlightProps {
    className?: string;
}

export const HeroSpotlight = forwardRef<HTMLDivElement, HeroSpotlightProps>(
    ({ className }, ref) => {
        return (
            <div
                ref={ref}
                className={className}
            >
                {/* Iluminação central atrás do conteúdo */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 max-w-2xl h-1/2 bg-[#0db9f2]/20 blur-[120px] rounded-full -z-10"></div>
            </div>
        );
    }
);

HeroSpotlight.displayName = "HeroSpotlight";
