import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface CTADescriptionProps {
    children: React.ReactNode;
    className?: string;
}

export const CTADescription = forwardRef<HTMLParagraphElement, CTADescriptionProps>(
    ({ children, className }, ref) => {
        return (
            <p
                ref={ref}
                className={cn(
                    "text-white/70 text-lg sm:text-xl font-normal leading-relaxed mb-12 max-w-2xl mx-auto",
                    className
                )}
            >
                {children}
            </p>
        );
    }
);

CTADescription.displayName = "CTADescription";
