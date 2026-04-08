import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface TitleProps {
    children: React.ReactNode;
    className?: string;
}

export const InsuranceTitle = forwardRef<HTMLHeadingElement, TitleProps>(
    ({ children, className }, ref) => {
        return (
            <h2
                ref={ref}
                className={cn(
                    "text-4xl text-[#0A192F] md:text-5xl font-black leading-tight mt-4",
                    className
                )}
            >
                {children}
            </h2>
        );
    }
);

InsuranceTitle.displayName = "InsuranceTitle";
