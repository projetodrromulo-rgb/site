"use client";

import { useState } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Phone, Menu, X, Home, Stethoscope, User, MapPin, ShieldCheck, Newspaper, Star } from "lucide-react";

export default function Navbar() {
    const { scrollY } = useScroll();
    const [hasScrolled, setHasScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        if (latest > 50) {
            setHasScrolled(true);
        } else {
            setHasScrolled(false);
        }
    });

    const navLinks = [
        { label: "Início", href: "#", icon: Home },
        { label: "Especialidades", href: "#procedimentos", icon: Stethoscope },
        { label: "Sobre", href: "#sobre", icon: User },
        { label: "Onde Atendemos", href: "#locations", icon: MapPin },
        { label: "Convênios", href: "#differentials", icon: ShieldCheck },
        { label: "Blog", href: "#blog", icon: Newspaper },
        { label: "Depoimentos", href: "#testimonials", icon: Star },
    ];

    return (
        <>
            <motion.header
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
                className="fixed top-8 left-0 right-0 z-[150] flex justify-center"
            >
                {/* Minimal Circular Menu Button - Centered */}
                <button
                    onClick={() => setIsMenuOpen(true)}
                    className={`w-14 h-14 rounded-full flex items-center justify-center text-accent transition-all hover:scale-110 active:scale-90 shadow-xl shadow-black/20 group relative overflow-hidden ${hasScrolled
                        ? "bg-primary-dark/60 backdrop-blur-2xl border border-accent/30"
                        : "bg-accent/10 border border-accent/30"
                        }`}
                >
                    <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <Menu size={28} className="relative z-10" />
                </button>
            </motion.header>

            {/* Fullscreen Overlay Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMenuOpen(false)}
                            className="fixed inset-0 bg-primary-dark/70 backdrop-blur-3xl z-[200]"
                        >
                            {/* Close Button UI */}
                            <div className="absolute top-8 right-8 lg:top-12 lg:right-24">
                                <button
                                    onClick={() => setIsMenuOpen(false)}
                                    className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-accent hover:text-primary-dark transition-all hover:rotate-90"
                                >
                                    <X size={32} />
                                </button>
                            </div>

                            {/* Menu Content */}
                            <div className="h-full flex flex-col items-center justify-center max-w-4xl mx-auto px-6">
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.1 }}
                                    className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6 w-full"
                                >
                                    {navLinks.map((link, idx) => (
                                        <motion.div
                                            key={link.label}
                                            initial={{ x: -20, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            transition={{ delay: 0.2 + idx * 0.05 }}
                                        >
                                            <a
                                                href={link.href}
                                                onClick={() => setIsMenuOpen(false)}
                                                className="flex items-center gap-6 p-4 group"
                                            >
                                                <div className="w-14 h-14 rounded-2xl bg-accent/5 border border-accent/20 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-primary-dark transition-all duration-300">
                                                    <link.icon size={28} />
                                                </div>
                                                <div className="space-y-1">
                                                    <span className="text-2xl font-black text-white/90 group-hover:text-accent transition-colors block">
                                                        {link.label}
                                                    </span>
                                                    <div className="w-0 h-[2px] bg-accent group-hover:w-full transition-all duration-500" />
                                                </div>
                                            </a>
                                        </motion.div>
                                    ))}
                                </motion.div>

                                {/* Bottom Appointment Action */}
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.6 }}
                                    className="mt-16 w-full max-w-md"
                                >
                                    <a
                                        href="https://wa.me/5511999999999"
                                        target="_blank"
                                        className="flex items-center justify-center gap-4 py-5 bg-accent text-primary-dark font-black text-xl rounded-2xl shadow-2xl shadow-accent/20 hover:scale-[1.02] active:scale-95 transition-all"
                                    >
                                        <Phone size={24} />
                                        AGENDAR MINHA CONSULTA
                                    </a>
                                </motion.div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
