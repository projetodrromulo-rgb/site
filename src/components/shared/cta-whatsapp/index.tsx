import { IconWhatsApp } from "@/components/icon-whats-app";
import { WhatsAppButtonType } from "./type";
import { cn } from "@/lib/utils";


type WhatsAppButtonProps = {
    cta: WhatsAppButtonType
    className?: string
    fullWidth?: boolean
}

export function CtaWhatsApp({ cta, className, fullWidth = false }: WhatsAppButtonProps) {
    return (
        <div className={cn(fullWidth ? "w-full" : "w-fit", className)}>
            <a
                className={cn(
                    "animate-pulse transition-all duration-300 relative z-30 flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#25D366]/90 text-white py-5 rounded-xl font-extrabold text-lg shadow-lg shadow-[#25D366]/20 transition-all active:scale-95 group px-10",
                    fullWidth ? "w-full" : "w-fit"
                )}
                href={`https://wa.me/${cta.whatsAppNumber}?text=Olá, vim do site Dr. Romulo. Gostaria de agendar uma consulta.`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Falar com Dr. Rômulo Oliveira pelo WhatsApp"
            >
                {cta.text}
                <div className="flex items-center justify-center transition-all duration-300 group-hover:animate-pulse">
                    <IconWhatsApp />
                </div>
            </a>
        </div>
    );
}