"use client";

import { env } from "@/env";
import { Phone } from "lucide-react";
import { sendGAEvent } from "@next/third-parties/google";

interface WhatsAppLinkProps {
    message?: string;
    children: React.ReactNode;
    whatsAppNumber?: string;
    className?: string;
    ariaLabel?: string;

}

export function WhatsAppLink({ message: messageProps, children, className, whatsAppNumber: whatsAppNumberProps, ariaLabel: ariaLabelProps }: WhatsAppLinkProps) {
    const message = messageProps || env().ctaWhatsappText;
    const whatsAppNumber = whatsAppNumberProps || env().whatsAppNumber;
    const ariaLabel = ariaLabelProps || "Falar com Dr. Rômulo Oliveira pelo WhatsApp";
    return (
        <a
            href={`https://wa.me/${whatsAppNumber}?text=${message}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`${className}`}
            aria-label={ariaLabel}
            onClick={() => sendGAEvent('event', 'click_whatsapp', { value: ariaLabel.toLowerCase().replace(/[^a-z0-9]+/g, '_') })}
        >
            {children}

        </a>
    )

}