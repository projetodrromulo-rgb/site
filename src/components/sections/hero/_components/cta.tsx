import { IconWhatsApp } from "@/components/icon-whats-app";
import { HeroContent } from "../types";

interface CtaProps {
    cta: HeroContent['cta'];
}

export function Cta({ cta }: CtaProps) {
    return (
        <div>
            <a
                className="relative z-30 flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#25D366]/90 text-white px-8 py-5 rounded-xl font-extrabold text-lg shadow-lg shadow-[#25D366]/20 transition-all active:scale-95 group"
                href={cta.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Falar com Dr. Rômulo Oliveira pelo WhatsApp"
            >
                {cta.text}
                <div className="group-hover:animate-pulse transition-all duration-300 flex items-center justify-center">
                    <IconWhatsApp />
                </div>
            </a>
        </div>

    );
}