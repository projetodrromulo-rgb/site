import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface DescriptionProps {
    children: React.ReactNode;
    className?: string;
}

export const InsuranceDescription = forwardRef<HTMLParagraphElement, DescriptionProps>(
    ({ children, className }, ref) => {
        return (
            <p
                ref={ref}
                className={cn(
                    "text-blue-900/60 text-lg mt-6 leading-relaxed font-medium",
                    className
                )}
            >
                {children}
            </p>
        );
    }
);

InsuranceDescription.displayName = "InsuranceDescription";
