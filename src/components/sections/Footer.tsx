"use client";

import { Phone, Mail, Instagram, Linkedin, MessageCircle, MapPin, ChevronRight } from "lucide-react";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const navLinks = [
        { label: "Início", href: "#" },
        { label: "Especialidades", href: "#procedimentos" },
        { label: "Sobre", href: "#sobre" },
        { label: "Onde Atendemos", href: "#locations" },
        { label: "Convênios", href: "#differentials" },
        { label: "Blog", href: "#blog" },
        { label: "Depoimentos", href: "#testimonials" },
    ];

    const clinics = [
        {
            name: "Unidade Barra",
            address: "Av. das Américas, 4666 - Sala 302, Barra da Tijuca",
            phone: "(21) 3385-0000",
        },
        {
            name: "Unidade Centro",
            address: "Rua México, 119 - Sala 1205, Centro",
            phone: "(21) 2240-1111",
        },
        {
            name: "Unidade Barra2",
            address: "Av. das Américas, 4666 - Sala 302, Barra da Tijuca",
            phone: "(21) 3385-0000",
        },
        {
            name: "Unidade Centro2",
            address: "Rua México, 119 - Sala 1205, Centro",
            phone: "(21) 2240-1111",
        }
    ];

    return (
        <footer className="bg-primary-dark border-t border-accent/20 pt-20 pb-10 px-6 md:px-12 lg:px-24">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Section */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-accent/10 border border-accent/30">
                                <span className="font-sans font-bold text-accent tracking-tighter text-lg">RO</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="font-sans font-bold text-neutral-light tracking-wide">Dr. Rômulo</span>
                                <span className="text-xs text-accent uppercase tracking-widest font-semibold italic">Cirurgião de Coluna</span>
                            </div>
                        </div>
                        <p className="text-neutral-light/60 text-sm leading-relaxed max-w-xs">
                            Excelência e precisão em cirurgia de coluna. Focado em devolver a qualidade de vida e mobilidade aos nossos pacientes através de técnicas modernas e humanizadas.
                        </p>
                        <div className="flex items-center gap-4">
                            <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-accent/5 border border-accent/20 flex items-center justify-center text-neutral-light/60 hover:bg-accent hover:text-primary-dark transition-all duration-300">
                                <MessageCircle size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-accent/5 border border-accent/20 flex items-center justify-center text-neutral-light/60 hover:bg-accent hover:text-primary-dark transition-all duration-300">
                                <Instagram size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-accent/5 border border-accent/20 flex items-center justify-center text-neutral-light/60 hover:bg-accent hover:text-primary-dark transition-all duration-300">
                                <Linkedin size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="space-y-6">
                        <h4 className="text-neutral-light font-bold flex items-center gap-2">
                            <ChevronRight size={16} className="text-accent" />
                            Navegação
                        </h4>
                        <ul className="space-y-3">
                            {navLinks.map((link) => (
                                <li key={link.label}>
                                    <a href={link.href} className="text-neutral-light/50 hover:text-accent text-sm transition-colors flex items-center gap-2 group">
                                        <span className="w-1 h-1 rounded-full bg-accent scale-0 group-hover:scale-100 transition-transform" />
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Locations */}
                    <div className="space-y-6 lg:col-span-2">
                        <h4 className="text-neutral-light font-bold flex items-center gap-2">
                            <ChevronRight size={16} className="text-accent" />
                            Nossas Unidades
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {clinics.map((clinic) => (
                                <div key={clinic.name} className="space-y-3">
                                    <h5 className="text-accent font-semibold text-sm uppercase tracking-wider">{clinic.name}</h5>
                                    <div className="space-y-2">
                                        <p className="text-neutral-light/50 text-sm flex items-start gap-2 leading-snug">
                                            <MapPin size={14} className="text-accent mt-0.5 shrink-0" />
                                            {clinic.address}
                                        </p>
                                        <p className="text-neutral-light text-sm flex items-center gap-2 font-mono">
                                            <Phone size={14} className="text-accent shrink-0" />
                                            {clinic.phone}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-accent/10 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-neutral-light/40 text-[10px] uppercase tracking-[0.2em] font-medium text-center md:text-left leading-relaxed">
                        © {currentYear} Dr. Rômulo - CRM 52.00000-0. <br className="md:hidden" /> todos os direitos reservados.
                    </p>
                    <div className="flex items-center gap-6">
                        <a href="#" className="text-neutral-light/30 hover:text-accent text-[10px] uppercase tracking-widest transition-colors font-bold">Privacidade</a>
                        <a href="#" className="text-neutral-light/30 hover:text-accent text-[10px] uppercase tracking-widest transition-colors font-bold">Termos</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
