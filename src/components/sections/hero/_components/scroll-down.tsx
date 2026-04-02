import { forwardRef } from "react";

interface ScrollDownProps {
    className?: string;
}

export const ScrollDown = forwardRef<HTMLDivElement, ScrollDownProps>(
    ({ className }, ref) => {
        const scrollToContent = () => {
            const nextSection = document.getElementById("sobre");
            if (nextSection) {
                nextSection.scrollIntoView({ behavior: "smooth" });
            }
        };

        return (
            <div
                ref={ref}
                onClick={scrollToContent}
                className={`${className} cursor-pointer group flex flex-col items-center gap-2  `}
                aria-label="Rolar para baixo"
            >
                <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center p-1.5">
                    <div className="w-1 h-2 bg-[#0db9f2] rounded-full animate-bounce"></div>
                </div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-white/50 font-bold group-hover:text-[#0db9f2] transition-colors ">
                    Scroll
                </span>
            </div>
        );
    }
);

ScrollDown.displayName = "ScrollDown";
