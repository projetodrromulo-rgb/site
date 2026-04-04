import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface CTATitleProps {
    children: React.ReactNode;
    className?: string;
}

export const CTATitle = forwardRef<HTMLHeadingElement, CTATitleProps>(
    ({ children, className }, ref) => {
        return (
            <h2
                ref={ref}
                className={cn(
                    "text-white text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight mb-8",
                    className
                )}
            >
                {children}
            </h2>
        );
    }
);

CTATitle.displayName = "CTATitle";
