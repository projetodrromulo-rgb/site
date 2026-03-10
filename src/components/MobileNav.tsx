"use client";

import { useState } from "react";
import { Home, User, Stethoscope, MessageCircle, Menu, X, MapPin, ShieldCheck, Newspaper, Star, Phone } from "lucide-react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function MobileNav() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    // Do not show on blog pages
    if (pathname === "/blog" || pathname?.startsWith("/blog/")) {
        return null;
    }

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
            {/* Bottom Bar */}
            <nav className="fixed bottom-0 left-0 right-0 flex gap-2 border-t border-white/5 bg-[#101e22]/95 px-4 pb-4 pt-2 backdrop-blur-md z-[100] transition-opacity duration-300">
                <a className="flex flex-1 flex-col items-center justify-center gap-1 text-accent hover:text-white transition-colors" href="#">
                    <div className="flex h-8 items-center justify-center">
                        <Home size={24} />
                    </div>
                    <p className="text-[10px] font-bold uppercase tracking-wider">Início</p>
                </a>

                <a className="flex flex-1 flex-col items-center justify-center gap-1 text-accent hover:text-white transition-colors" href="#sobre">
                    <div className="flex h-8 items-center justify-center">
                        <User size={24} />
                    </div>
                    <p className="text-[10px] font-bold uppercase tracking-wider">Sobre</p>
                </a>

                <a className="flex flex-1 flex-col items-center justify-center gap-1 text-accent hover:text-white transition-colors" href="#procedimentos">
                    <div className="flex h-8 items-center justify-center">
                        <Stethoscope size={24} />
                    </div>
                    <p className="text-[10px] font-bold uppercase tracking-wider">Técnicas</p>
                </a>

                <button
                    onClick={() => setIsOpen(true)}
                    className="flex flex-1 flex-col items-center justify-center gap-1 text-accent hover:text-white transition-colors"
                >
                    <div className="flex h-8 items-center justify-center">
                        <Menu size={24} />
                    </div>
                    <p className="text-[10px] font-bold uppercase tracking-wider">Mais</p>
                </button>
            </nav>

            {/* Menu Drawer */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[110]"
                        />
                        <motion.div
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed bottom-0 left-0 right-0 bg-[#101e22] border-t border-accent/20 rounded-t-[32px] p-8 z-[120] max-h-[85vh] overflow-y-auto"
                        >
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-xl font-black text-white italic">Navegação</h2>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="grid grid-cols-1 gap-4 mb-8">
                                {navLinks.map((link) => (
                                    <a
                                        key={link.label}
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-accent/10 hover:border-accent/20 transition-all group"
                                    >
                                        <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-colors">
                                            <link.icon size={24} />
                                        </div>
                                        <span className="text-lg font-bold text-white/90 group-hover:text-accent transition-colors">
                                            {link.label}
                                        </span>
                                    </a>
                                ))}
                            </div>

                            <a
                                href="https://wa.me/5511999999999"
                                target="_blank"
                                className="flex items-center justify-center gap-3 w-full py-5 bg-accent text-primary-dark font-black rounded-2xl shadow-lg shadow-accent/20 hover:scale-[1.02] active:scale-95 transition-all mb-8"
                            >
                                <Phone size={20} />
                                AGENDAR CONSULTA
                            </a>

                            {/* iOS Indicator Spacing */}
                            <div className="h-6" />
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* iOS Home Indicator mock for styling */}
            <div className="fixed bottom-1 left-1/2 -translate-x-1/2 w-32 h-1 bg-slate-700 rounded-full opacity-50 z-[101]"></div>
        </>
    );
}
