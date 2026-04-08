import { forwardRef } from "react";
import { PlanLogo } from "./plan-logo";
import { Plan } from "../types";
import { cn } from "@/lib/utils";

interface MarqueeRowProps {
    plans: Plan[];
    direction?: "left" | "right";
    speed?: number;
    className?: string;
}

export const InsuranceMarquee = forwardRef<HTMLDivElement, MarqueeRowProps>(
    ({ plans, direction = "left", speed = 40, className }, ref) => {
        if (!plans || plans.length === 0) return null;

        // Repeat plans as many times as necessary to fill the width
        const sets = 4;
        const items = Array.from({ length: sets }).flatMap(() => plans);

        return (
            <div
                ref={ref}
                className={cn("overflow-hidden whitespace-nowrap relative py-2 group/marquee w-full", className)}
            >
                <div 
                    className={cn(
                        "flex gap-6 w-max",
                        direction === "left" ? "animate-marquee-left" : "animate-marquee-right"
                    )}
                    style={{ 
                        animationDuration: `${speed}s`,
                    }}
                >
                    {items.map((plan, idx) => (
                        <PlanLogo
                            key={`${plan.name}-${idx}`}
                            src={plan.src}
                            alt={plan.name}
                            className="w-44 shrink-0"
                        />
                    ))}
                </div>
            </div>
        );
    }
);

InsuranceMarquee.displayName = "InsuranceMarquee";
