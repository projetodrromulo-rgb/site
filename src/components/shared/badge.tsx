import { forwardRef, ReactNode } from "react";
import { ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface BadgeProps {
    children: ReactNode;
    className?: string;
}

export const Badge = forwardRef<HTMLDivElement, BadgeProps>(
    ({ children, className }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    "inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0db9f2]/10 border border-[#0db9f2]/20 text-[#0db9f2] text-xs font-bold uppercase tracking-widest mb-8",
                    className
                )}
            >
                <ShieldCheck size={14} className="fill-current" />
                {children}
            </div>
        );
    }
);

Badge.displayName = "Badge";
