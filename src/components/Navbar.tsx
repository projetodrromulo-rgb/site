"use client";

import { useState } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import Link from "next/link";
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
                className={`fixed top-0 left-0 right-0 z-[150] flex justify-center px-4 py-4 transition-all duration-500 will-change-transform ${hasScrolled ? "pt-4" : "pt-8"
                    }`}
            >
                <div
                    className={`flex items-center justify-between w-full max-w-5xl px-6 py-3 transition-all duration-500 rounded-full ${hasScrolled
                        ? "bg-primary-dark/40 backdrop-blur-3xl border border-accent/20 shadow-lg shadow-black/20"
                        : "bg-transparent border border-transparent"
                        }`}
                >
                    {/* Logo/Brand */}
                    <Link href="/" className="flex items-center gap-2 group shrink-0">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-accent/10 border border-accent/30 group-hover:bg-accent/20 transition-colors">
                            <span className="font-sans font-bold text-accent tracking-tighter">RO</span>
                        </div>
                        <span className="font-sans font-semibold text-neutral-light tracking-wide text-sm hidden sm:block">
                            Dr. Rômulo
                        </span>
                    </Link>

                    {/* Navigation Container - Desktop (Hidden except menu icon) */}
                    <div className="flex items-center gap-4">
                        <a
                            href="https://wa.me/5511999999999"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-accent text-primary-dark font-sans font-semibold text-sm rounded-full hover:bg-accent/90 transition-all hover:scale-105 active:scale-95 shadow-md"
                        >
                            <Phone size={16} />
                            <span>Agendar</span>
                        </a>

                        <button
                            onClick={() => setIsMenuOpen(true)}
                            className="w-12 h-12 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center text-accent hover:bg-accent hover:text-primary-dark transition-all hover:scale-105 active:scale-95"
                        >
                            <Menu size={24} />
                        </button>
                    </div>
                </div>
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
