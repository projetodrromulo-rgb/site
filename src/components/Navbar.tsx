"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { env } from "@/env";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import {
    Phone,
    Menu,
    X,
    Home,
    Stethoscope,
    User,
    MapPin,
    Newspaper,
    Star,
    ChevronDown,
    Activity,
    Shield,
    Flame,
    Syringe,
    Disc,
    Target
} from "lucide-react";
import { Logo } from "./sections/hero/_components/logo";
import { WhatsAppLink } from "./shared/whasapp-link";
import { IconWhatsApp } from "./icon-whats-app";

const specialtiesList = [
    {
        label: "Cirurgia Minimamente Invasiva",
        href: "/procedimentos/cirurgia-minimamente-invasiva-de-coluna",
        icon: Activity,
        desc: "Preservação muscular e rápida recuperação"
    },
    {
        label: "Endoscopia de Coluna",
        href: "/procedimentos/endoscopia-de-coluna",
        icon: Target,
        desc: "Incisão milimétrica com alta no mesmo dia"
    },
    {
        label: "Artroplastia Cervical",
        href: "/procedimentos/artroplastia-cervical",
        icon: Disc,
        desc: "Prótese discal para manter o movimento"
    },
    {
        label: "Tratamento de Escoliose",
        href: "/procedimentos/tratamento-de-escoliose",
        icon: Shield,
        desc: "Correção de deformidade postural e dor"
    },
    {
        label: "Tratamento de Tumores da Coluna",
        href: "/procedimentos/tratamento-de-tumores-da-coluna",
        icon: Stethoscope,
        desc: "Oncologia ortopédica de alta complexidade"
    },
    {
        label: "Artrodese da Coluna",
        href: "/procedimentos/artrodese-da-coluna",
        icon: Activity,
        desc: "Estabilização vertebral para dor grave"
    },
    {
        label: "Infiltrações e Bloqueios",
        href: "/procedimentos/infiltracoes-e-bloqueios-da-coluna",
        icon: Syringe,
        desc: "Alívio imediato da dor articular e nervosa"
    },
    {
        label: "Rizotomia por Radiofrequência",
        href: "/procedimentos/rizotomia-por-radiofrequencia",
        icon: Flame,
        desc: "Desativação dos nervos da dor lombar"
    }
];

const citiesList = [
    { label: "Belo Horizonte", href: "/ortopedista-especialista-em-coluna/belo-horizonte" },
    { label: "Betim", href: "/ortopedista-especialista-em-coluna/betim" },
    { label: "Contagem", href: "/ortopedista-especialista-em-coluna/contagem" },
    { label: "Nova Lima", href: "/ortopedista-especialista-em-coluna/nova-lima" },
    { label: "Vila da Serra", href: "/ortopedista-especialista-em-coluna/vila-da-serra" },
    { label: "Pampulha", href: "/ortopedista-especialista-em-coluna/pampulha" }
];

export default function Navbar() {
    const pathname = usePathname();
    const { scrollY } = useScroll();
    const [hasScrolled, setHasScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSpecialtiesOpen, setIsSpecialtiesOpen] = useState(false);
    const [isCitiesOpen, setIsCitiesOpen] = useState(false);

    // Ocultar a Navbar global em páginas do studio
    const isStudioPage = pathname?.startsWith("/studio");

    logoData: {
        src: "/images/logo.svg";
        alt: "Dr. Rômulo Oliveira Logo"
    };

    const logoData = {
        src: "/images/logo.svg",
        alt: "Dr. Rômulo Oliveira Logo"
    };

    useMotionValueEvent(scrollY, "change", (latest) => {
        if (latest > 90) {
            setHasScrolled(true);
        } else {
            setHasScrolled(false);
        }
    });

    const showSolidNavbar = hasScrolled || isStudioPage;

    return (
        <>
            <div
                id="global-navbar"
                className={`fixed top-0 left-0 w-full z-[150] ${isStudioPage
                    ? "bg-[#0B2B40] shadow-xl border-b border-white/5 py-2"
                    : showSolidNavbar
                        ? "bg-primary-dark/85 backdrop-blur-xl shadow-xl border-b border-white/10 py-2.5"
                        : "bg-transparent py-4"
                    }`}
            >
                <div className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20 flex items-center justify-between">
                    {/* Logo Section */}
                    <Link href="/" aria-label="Ir para a página inicial">
                        <Logo
                            logoImage={logoData}
                            scrolled={showSolidNavbar}
                            className="scale-75 md:scale-90 origin-left"
                        />
                    </Link>

                    {/* Navigation Menu */}
                    {!isStudioPage && (
                        <div className="flex items-center gap-4 lg:gap-8">
                            {/* Desktop Navigation Links */}
                            <nav className="hidden lg:flex items-center gap-5 xl:gap-7">
                                <Link
                                    href="/#hero"
                                    className="text-white/85 hover:text-white text-xs xl:text-sm uppercase tracking-wider font-bold transition-colors duration-300 py-2"
                                >
                                    Início
                                </Link>

                                <Link
                                    href="/#sobre"
                                    className="text-white/85 hover:text-white text-xs xl:text-sm uppercase tracking-wider font-bold transition-colors duration-300 py-2"
                                >
                                    Sobre
                                </Link>

                                {/* Especialidades Dropdown */}
                                <div
                                    className="relative py-2 group"
                                    onMouseEnter={() => setIsSpecialtiesOpen(true)}
                                    onMouseLeave={() => setIsSpecialtiesOpen(false)}
                                >
                                    <button
                                        className="flex items-center gap-1.5 text-white/85 group-hover:text-white text-xs xl:text-sm uppercase tracking-wider font-bold transition-colors duration-300"
                                        onClick={() => setIsSpecialtiesOpen(!isSpecialtiesOpen)}
                                    >
                                        Especialidades
                                        <ChevronDown size={14} className={`transition-transform duration-200 ${isSpecialtiesOpen ? 'rotate-180 text-accent' : ''}`} />
                                    </button>

                                    {/* Dropdown Menu */}
                                    <AnimatePresence>
                                        {isSpecialtiesOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: 8, scale: 0.98 }}
                                                transition={{ duration: 0.2 }}
                                                className="absolute top-full left-1/2 -translate-x-1/2 w-[540px] p-4 bg-primary-dark/95 backdrop-blur-2xl border border-white/15 rounded-2xl shadow-2xl grid grid-cols-2 gap-2 text-left mt-1"
                                            >
                                                {specialtiesList.map((item) => (
                                                    <Link
                                                        key={item.label}
                                                        href={item.href}
                                                        className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/10 transition-colors group/item"
                                                        onClick={() => setIsSpecialtiesOpen(false)}
                                                    >
                                                        <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent group-hover/item:bg-accent group-hover/item:text-primary-dark shrink-0 transition-colors">
                                                            <item.icon size={16} />
                                                        </div>
                                                        <div>
                                                            <span className="text-xs font-bold text-white group-hover/item:text-accent transition-colors block">
                                                                {item.label}
                                                            </span>
                                                            <span className="text-[10px] text-white/60 line-clamp-1">
                                                                {item.desc}
                                                            </span>
                                                        </div>
                                                    </Link>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* Onde Atendemos (Cidades) Dropdown */}
                                <div
                                    className="relative py-2 group"
                                    onMouseEnter={() => setIsCitiesOpen(true)}
                                    onMouseLeave={() => setIsCitiesOpen(false)}
                                >
                                    <button
                                        className="flex items-center gap-1.5 text-white/85 group-hover:text-white text-xs xl:text-sm uppercase tracking-wider font-bold transition-colors duration-300"
                                        onClick={() => setIsCitiesOpen(!isCitiesOpen)}
                                    >
                                        Onde Atendemos
                                        <ChevronDown size={14} className={`transition-transform duration-200 ${isCitiesOpen ? 'rotate-180 text-accent' : ''}`} />
                                    </button>

                                    {/* Cities Dropdown */}
                                    <AnimatePresence>
                                        {isCitiesOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: 8, scale: 0.98 }}
                                                transition={{ duration: 0.2 }}
                                                className="absolute top-full left-1/2 -translate-x-1/2 w-64 p-3 bg-primary-dark/95 backdrop-blur-2xl border border-white/15 rounded-2xl shadow-2xl flex flex-col gap-1 text-left mt-1"
                                            >
                                                {citiesList.map((city) => (
                                                    <Link
                                                        key={city.label}
                                                        href={city.href}
                                                        className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-white/10 text-white/90 hover:text-accent text-xs font-semibold transition-colors"
                                                        onClick={() => setIsCitiesOpen(false)}
                                                    >
                                                        <MapPin size={14} className="text-accent shrink-0" />
                                                        {city.label}
                                                    </Link>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                <Link
                                    href="/#blog"
                                    className="text-white/85 hover:text-white text-xs xl:text-sm uppercase tracking-wider font-bold transition-colors duration-300 py-2"
                                >
                                    Blog
                                </Link>

                                <Link
                                    href="/#testimonials"
                                    className="text-white/85 hover:text-white text-xs xl:text-sm uppercase tracking-wider font-bold transition-colors duration-300 py-2"
                                >
                                    Depoimentos
                                </Link>
                            </nav>

                            {/* Mobile Hamburger Menu Button */}
                            <button
                                onClick={() => setIsMenuOpen(true)}
                                className={`lg:hidden flex items-center gap-2 px-4 py-2 rounded-full font-bold transition-all hover:scale-105 active:scale-95 group ${showSolidNavbar
                                    ? "bg-primary-dark text-white border border-white/10 shadow-lg"
                                    : "bg-white/10 backdrop-blur-md text-white border border-white/20"
                                    }`}
                                aria-label="Abrir menu de navegação"
                            >
                                <span className="hidden md:block text-sm uppercase tracking-wider">Menu</span>
                                <div className={`p-1 rounded-full ${showSolidNavbar ? 'bg-white/20 text-white' : 'bg-white/10 text-white'}`}>
                                    <Menu size={20} />
                                </div>
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Fullscreen Overlay Menu Mobile */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-primary-dark/95 backdrop-blur-3xl z-[200] overflow-y-auto"
                    >
                        {/* Close Button UI */}
                        <div className="absolute top-6 right-6">
                            <button
                                onClick={() => setIsMenuOpen(false)}
                                className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-accent hover:text-primary-dark transition-all"
                                aria-label="Fechar menu de navegação"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Menu Content */}
                        <div className="min-h-full py-16 px-6 max-w-2xl mx-auto flex flex-col justify-between">
                            <div className="space-y-8">
                                <div className="space-y-4">
                                    <h3 className="text-xs font-bold text-accent uppercase tracking-widest border-b border-white/10 pb-2">
                                        Navegação Principal
                                    </h3>
                                    <div className="grid grid-cols-2 gap-3">
                                        <Link href="/#hero" onClick={() => setIsMenuOpen(false)} className="p-3 rounded-xl bg-white/5 text-white text-sm font-bold flex items-center gap-2">
                                            <Home size={16} className="text-accent" /> Início
                                        </Link>
                                        <Link href="/#sobre" onClick={() => setIsMenuOpen(false)} className="p-3 rounded-xl bg-white/5 text-white text-sm font-bold flex items-center gap-2">
                                            <User size={16} className="text-accent" /> Sobre
                                        </Link>
                                        <Link href="/#blog" onClick={() => setIsMenuOpen(false)} className="p-3 rounded-xl bg-white/5 text-white text-sm font-bold flex items-center gap-2">
                                            <Newspaper size={16} className="text-accent" /> Blog
                                        </Link>
                                        <Link href="/#testimonials" onClick={() => setIsMenuOpen(false)} className="p-3 rounded-xl bg-white/5 text-white text-sm font-bold flex items-center gap-2">
                                            <Star size={16} className="text-accent" /> Depoimentos
                                        </Link>
                                    </div>
                                </div>

                                {/* Especialidades Section */}
                                <div className="space-y-4">
                                    <h3 className="text-xs font-bold text-accent uppercase tracking-widest border-b border-white/10 pb-2 flex items-center gap-2">
                                        <Stethoscope size={16} /> Especialidades & Tratamentos
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                        {specialtiesList.map((item) => (
                                            <Link
                                                key={item.label}
                                                href={item.href}
                                                onClick={() => setIsMenuOpen(false)}
                                                className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-white/90 hover:text-accent text-xs font-semibold transition-colors flex items-center gap-2.5"
                                            >
                                                <item.icon size={16} className="text-accent shrink-0" />
                                                {item.label}
                                            </Link>
                                        ))}
                                    </div>
                                </div>

                                {/* Cidades Section */}
                                <div className="space-y-4">
                                    <h3 className="text-xs font-bold text-accent uppercase tracking-widest border-b border-white/10 pb-2 flex items-center gap-2">
                                        <MapPin size={16} /> Onde Atendemos (Cidades)
                                    </h3>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                        {citiesList.map((city) => (
                                            <Link
                                                key={city.label}
                                                href={city.href}
                                                onClick={() => setIsMenuOpen(false)}
                                                className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-white/90 hover:text-accent text-xs font-semibold transition-colors text-center"
                                            >
                                                {city.label}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Bottom CTA Action */}
                            <div className="pt-8">
                                <WhatsAppLink className="flex text-white items-center justify-center gap-3 py-4 bg-accent text-primary-dark font-black text-base rounded-2xl shadow-xl hover:scale-[1.02] transition-all">
                                    <IconWhatsApp />
                                    AGENDAR MINHA CONSULTA
                                </WhatsAppLink>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

