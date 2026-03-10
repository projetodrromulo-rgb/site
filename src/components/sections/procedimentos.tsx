"use client";

import { motion } from "framer-motion";
import {
    Stethoscope,
    Disc,
    User,
    Activity,
    Syringe,
    ChevronRight,
    Calendar,
    CheckCheck
} from "lucide-react";

const procedures = [
    {
        title: "Cirurgia Minimamente Invasiva",
        description: "Técnicas modernas que permitem recuperações mais rápidas, com menos dor pós-operatória e cicatrizes reduzidas.",
        icon: CheckCheck,
        delay: 0.1
    },
    {
        title: "Endoscopia de Coluna",
        description: "Permite menor tempo cirúrgico e melhor visualização pelo aumento da câmera e tela de vídeo.",
        icon: CheckCheck,
        delay: 0.2
    },
    {
        title: "Artroplastia Cervical",
        description: "Substituição do disco cervical por uma prótese que reduz dor e mantém a mobilidade natural da coluna",
        icon: CheckCheck,
        delay: 0.3
    },
    {
        title: "Tratamento Escoliose",
        description: "Correção das curvas anormais patológicas.",
        icon: CheckCheck,
        delay: 0.4
    },
    {
        title: "Tratamento Tumores na Coluna",
        description: "Intervenção cirúrgica para garantir estabilidade e proteger as estruturas neurológicas.",
        icon: CheckCheck,
        delay: 0.5
    },
    {
        title: "Artrodese de coluna",
        description: "Procedimento para fundir uma vértebra à outra, com o propósito de estabilização do segmento.",
        icon: CheckCheck,
        delay: 0.6
    }
];

export function Procedimentos() {
    return (
        <section id="procedimentos" className="py-24 bg-[#0A192F] relative overflow-hidden">
            {/* Background Glows */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: `
                        radial-gradient(circle at 50% 20%, rgba(13, 185, 242, 0.1), transparent 50%),
                        radial-gradient(circle at 80% 80%, rgba(13, 185, 242, 0.05), transparent 40%)
                    `
                }}
            />

            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                {/* Centered Heading */}
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="text-[#0db9f2] font-bold uppercase tracking-widest text-xs">
                            Nossas Especialidades
                        </span>
                        <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mt-4">
                            Tratamentos <span className="text-[#0db9f2] italic">Especializados</span>
                        </h2>
                        <p className="text-white/70 text-lg mt-6 leading-relaxed">
                            Oferecemos tratamentos personalizados para diversas patologias da coluna,
                            utilizando as técnicas mais modernas da medicina.
                        </p>
                    </motion.div>
                </div>

                {/* Grid of Procedures */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {procedures.map((proc, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: proc.delay }}
                            className="group relative p-[1px] rounded-3xl overflow-hidden shadow-xl"
                        >
                            {/* Border Beam Effect */}
                            <div className="absolute inset-0 z-0">
                                <motion.div
                                    animate={{
                                        rotate: [0, 360]
                                    }}
                                    transition={{
                                        duration: 4,
                                        repeat: Infinity,
                                        ease: "linear"
                                    }}
                                    className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,transparent_0%,transparent_10%,white_15%,transparent_20%,transparent_100%)] opacity-20 group-hover:opacity-100 transition-opacity duration-500"
                                />
                            </div>

                            <div className="relative z-10 bg-[#112240] group-hover:bg-[#1a3055] p-8 rounded-[23px] h-full transition-all duration-300 border border-white/5 border-t-2 border-t-white/80 hover:border-transparent flex flex-col">
                                <div className="mb-6 w-14 h-14 rounded-2xl bg-[#0db9f2]/10 text-[#0db9f2] group-hover:bg-[#0db9f2] group-hover:text-white transition-all duration-300 flex items-center justify-center">
                                    <proc.icon size={28} />
                                </div>

                                <div className="flex-1 space-y-3">
                                    <h3 className="text-xl font-bold text-white group-hover:text-[#0db9f2] transition-colors leading-tight">
                                        {proc.title}
                                    </h3>
                                    <p className="text-white/60 text-sm leading-relaxed group-hover:text-white/80 transition-colors">
                                        {proc.description}
                                    </p>
                                </div>

                                <button className="flex items-center gap-2 text-[#0db9f2] text-xs font-bold group/btn pt-6 mt-auto">
                                    Saiba mais
                                    <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </motion.div>
                    ))}


                </div>
            </div>
        </section>
    );
}
