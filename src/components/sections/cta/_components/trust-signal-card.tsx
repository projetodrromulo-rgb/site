import { forwardRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TrustSignalCardProps {
    icon: ReactNode;
    title: string;
    description: string;
    className?: string;
}

export const TrustSignalCard = forwardRef<HTMLDivElement, TrustSignalCardProps>(
    ({ icon, title, description, className }, ref) => {
        return (
            <div
                ref={ref}
                className={cn("flex flex-col items-center gap-4 group", className)}
            >
                <div className="w-16 h-16 rounded-2xl bg-[#0db9f2]/10 flex items-center justify-center text-[#0db9f2] transition-transform group-hover:scale-110 duration-300">
                    {icon}
                </div>
                <h3 className="text-white font-bold text-base md:text-lg">
                    {title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed px-2">
                    {description}
                </p>
            </div>
        );
    }
);

TrustSignalCard.displayName = "TrustSignalCard";
