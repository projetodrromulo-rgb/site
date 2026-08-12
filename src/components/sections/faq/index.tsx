"use client";

import { useState } from "react";
import { FAQContent } from "./types";
import { ChevronDown, HelpCircle, MessageCircle, Sparkles, CheckCircle2 } from "lucide-react";
import { env } from "@/env";

interface CityFaqProps {
    content: FAQContent;
}

export default function CityFaqSection({ content }: CityFaqProps) {
    const { title, faqs, cityName, badge = "Tire suas Dúvidas" } = content;
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const displayFaqs = (faqs || []).slice(0, 5);
    if (!displayFaqs || displayFaqs.length === 0) return null;

    const toggleFaq = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const whatsAppNumber = content.whatsAppNumber || env().whatsAppNumber || "5531999675665";
    const cleanNumber = whatsAppNumber.replace(/\D/g, "");
    const message = encodeURIComponent(`Olá! Gostaria de tirar algumas dúvidas sobre a consulta de coluna em ${cityName || "Belo Horizonte"}.`);
    const whatsappUrl = `https://wa.me/${cleanNumber}?text=${message}`;

    return (
        <section id="faq" className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8 bg-primary-dark">

            {/* Background Glow Overlay */}
            <div
                className="absolute inset-0 pointer-events-none opacity-40"
                style={{
                    background: `
                        radial-gradient(circle at 10% 20%, rgba(13, 185, 242, 0.08), transparent 45%),
                        radial-gradient(circle at 90% 80%, rgba(13, 185, 242, 0.06), transparent 45%)
                    `
                }}
            />

            <div className="relative z-10 max-w-4xl mx-auto">
                {/* Section Header */}
                <div className="text-center space-y-4 mb-14">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/30 text-accent text-xs font-bold uppercase tracking-wider">
                        <Sparkles size={14} />
                        {badge}
                    </span>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                        {title}
                    </h2>
                    <p className="text-neutral-light/70 text-sm sm:text-base max-w-2xl mx-auto">
                        Esclareça as principais questões sobre consultas, convênios e tratamentos de coluna {cityName ? `em ${cityName}` : "com o Dr. Rômulo Oliveira"}.
                    </p>
                </div>

                {/* FAQ Accordion List */}
                <div className="space-y-4">
                    {displayFaqs.map((faq, index) => {
                        const isOpen = openIndex === index;
                        return (
                            <div
                                key={index}
                                className={`rounded-2xl transition-all duration-300 border overflow-hidden ${
                                    isOpen
                                        ? "bg-white/[0.06] border-accent/40 shadow-lg shadow-accent/5"
                                        : "bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04]"
                                }`}
                            >
                                <button
                                    onClick={() => toggleFaq(index)}
                                    className="w-full text-left p-5 sm:p-6 flex items-start justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-2xl"
                                    aria-expanded={isOpen}
                                >
                                    <div className="flex items-center gap-3 sm:gap-4">
                                        <div
                                            className={`p-2.5 rounded-xl transition-colors duration-300 shrink-0 ${
                                                isOpen
                                                    ? "bg-accent text-primary-dark font-bold"
                                                    : "bg-accent/10 text-accent"
                                            }`}
                                        >
                                            <HelpCircle className="w-5 h-5" />
                                        </div>
                                        <span className="text-base sm:text-lg font-bold text-white leading-snug">
                                            {faq.question}
                                        </span>
                                    </div>
                                    <div
                                        className={`p-2 rounded-lg bg-white/5 text-neutral-light/70 transition-transform duration-300 shrink-0 ${
                                            isOpen ? "rotate-180 text-accent bg-accent/10" : ""
                                        }`}
                                    >
                                        <ChevronDown className="w-5 h-5" />
                                    </div>
                                </button>

                                {isOpen && (
                                    <div className="px-5 pb-6 sm:px-6 sm:pb-6 pt-0 text-neutral-light/85 text-sm sm:text-base leading-relaxed border-t border-white/5 mt-1 animate-fadeIn">
                                        <div className="flex items-start gap-3 mt-3">
                                            <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                                            <div>{faq.answer}</div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Bottom WhatsApp Help Banner */}
                <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-accent/10 via-white/[0.03] to-accent/5 border border-accent/20 text-center space-y-4 shadow-xl">
                    <h3 className="text-lg sm:text-xl font-bold text-white flex items-center justify-center gap-2">
                        <MessageCircle className="w-5 h-5 text-accent" />
                        Ainda tem alguma dúvida específica?
                    </h3>
                    <p className="text-neutral-light/75 text-sm max-w-xl mx-auto">
                        Nossa equipe está disponível no WhatsApp para orientar sobre locais de atendimento, agendamentos e cobertura de convênios.
                    </p>
                    <div>
                        <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-full bg-accent text-primary-dark font-black text-sm sm:text-base hover:bg-accent/90 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-accent/20"
                        >
                            <MessageCircle className="w-5 h-5 fill-current" />
                            Falar com a Equipe no WhatsApp
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
