"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Phone, Menu, X, Home, Stethoscope, User, MapPin, ShieldCheck, Newspaper, Star } from "lucide-react";
import { Logo } from "./sections/hero/_components/logo";

export default function Navbar() {
    const { scrollY } = useScroll();
    const [hasScrolled, setHasScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Dados do logo - idealmente viriam de um provider ou props, mas usaremos os do hero por enquanto
    const logoData = {
        src: "/images/logo.svg",
        alt: "Dr. Rômulo Oliveira Logo"
    };

    useMotionValueEvent(scrollY, "change", (latest) => {
        if (latest > 50) {
            setHasScrolled(true);
        } else {
            setHasScrolled(false);
        }
    });

    const navLinks = [
        { label: "Início", href: "/", icon: Home },
        { label: "Especialidades", href: "/#procedimentos", icon: Stethoscope },
        { label: "Sobre", href: "/#sobre", icon: User },
        { label: "Onde Atendemos", href: "/#locations", icon: MapPin },
        { label: "Convênios", href: "/#insurance-section", icon: ShieldCheck },
        { label: "Blog", href: "/#blog", icon: Newspaper },
        { label: "Depoimentos", href: "/#testimonials", icon: Star },
    ];

    return (
        <>
            <div

                className={`fixed top-0 left-0 w-full z-[150] transition-all duration-500 ${hasScrolled
                    ? "bg-primary-dark/70 backdrop-blur-xl shadow-xl border-b border-white/5 py-2"
                    : "bg-transparent py-4"
                    }`}
            >
                <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 flex items-center justify-between">
                    {/* Logo Section */}
                    <Logo
                        logoImage={logoData}
                        scrolled={hasScrolled}
                        className="scale-75 md:scale-90 origin-left"
                    />

                    {/* Menu Button Container */}
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsMenuOpen(true)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold transition-all hover:scale-105 active:scale-95 group ${hasScrolled
                                ? "bg-primary-dark text-white border border-white/10 shadow-lg"
                                : "bg-white/10 backdrop-blur-md text-white border border-white/20"
                                }`}
                        >
                            <span className="hidden md:block text-sm uppercase tracking-wider">Menu</span>
                            <div className={`p-1 rounded-full ${hasScrolled ? 'bg-white/20 text-white' : 'bg-white/10 text-white'}`}>
                                <Menu size={20} />
                            </div>
                        </button>
                    </div>
                </div>
            </div>

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
                                    className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-accent hover:text-primary-dark transition-all hover:rotate-90"
                                >
                                    <X className="w-6 h-6 md:w-8 md:h-8" />
                                </button>
                            </div>

                            {/* Menu Content */}
                            <div className="h-full flex flex-col items-center justify-center max-w-4xl mx-auto px-6">
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.1 }}
                                    className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-3 md:gap-y-6 w-full"
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
                                                className="flex items-center gap-4 md:gap-6 px-4 py-2 md:p-4 group"
                                            >
                                                <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-accent/5 border border-accent/20 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-primary-dark transition-all duration-300">
                                                    <link.icon className="w-5 h-5 md:w-7 md:h-7" />
                                                </div>
                                                <div className="space-y-1">
                                                    <span className="text-lg md:text-2xl font-black text-white/90 group-hover:text-accent transition-colors block">
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
                                        className="flex items-center justify-center gap-3 md:gap-4 py-4 md:py-5 bg-accent text-primary-dark font-black text-lg md:text-xl rounded-2xl shadow-2xl shadow-accent/20 hover:scale-[1.02] active:scale-95 transition-all"
                                    >
                                        <Phone className="w-5 h-5 md:w-6 md:h-6" />
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
