import { forwardRef } from "react";
import { MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

interface ActionButtonProps {
    href: string;
    text: string;
    className?: string;
}

export const ActionButton = forwardRef<HTMLDivElement, ActionButtonProps>(
    ({ href, text, className }, ref) => {
        return (
            <div ref={ref} className={cn("flex flex-col sm:flex-row items-center justify-center gap-4 mb-20", className)}>
                <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xl font-bold transition-all shadow-lg shadow-[#25D366]/20 border border-transparent active:scale-95"
                >
                    <MessageSquare className="w-6 h-6 fill-current" />
                    {text}
                </a>
            </div>
        );
    }
);

ActionButton.displayName = "ActionButton";
