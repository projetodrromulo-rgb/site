import { forwardRef } from "react";
import Image from "next/image";
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
                    "bg-white/10 backdrop-blur-md rounded-xl p-4 flex items-center justify-center border border-white/10 hover:bg-white/20 transition-all duration-300 h-24 hover:shadow-lg group/logo",
                    className
                )}
            >
                <div className="relative w-full h-full transform transition-transform group-hover/logo:scale-110">
                    <Image
                        src={src}
                        alt={alt}
                        fill
                        className="object-contain"
                        unoptimized
                    />
                </div>
            </div>
        );
    }
);

PlanLogo.displayName = "PlanLogo";
