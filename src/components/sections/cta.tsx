"use client";

import { motion } from "framer-motion";
import { MessageSquare, ShieldCheck, Cpu, Zap, Phone } from "lucide-react";

export default function CTA() {
    const trustSignals = [
        {
            icon: <ShieldCheck className="w-8 h-8 md:w-10 md:h-10 text-[#0db9f2]" />,
            title: "Atendimento Especializado",
            description: "Cuidado focado em patologias complexas da coluna."
        },
        {
            icon: <Cpu className="w-8 h-8 md:w-10 md:h-10 text-[#0db9f2]" />,
            title: "Tecnologia de Ponta",
            description: "Cirurgias guiadas por vídeo e ferramentas robóticas."
        },
        {
            icon: <Zap className="w-8 h-8 md:w-10 md:h-10 text-[#0db9f2]" />,
            title: "Recuperação Rápida",
            description: "Procedimentos ambulatoriais e retorno precoce às atividades."
        }
    ];

    return (
        <section
            id="contato"
            className="relative overflow-hidden bg-[#0A192F] py-24 px-4 sm:px-6 lg:px-8"
        >
            {/* Elegant Deep Navy Gradient Glows */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: `
                        radial-gradient(circle at 20% 30%, rgba(13, 185, 242, 0.12), transparent 40%),
                        radial-gradient(circle at 80% 70%, rgba(13, 185, 242, 0.08), transparent 40%)
                    `
                }}
            />

            <div className="relative z-10 max-w-4xl mx-auto text-center">
                {/* Trust Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0db9f2]/10 border border-[#0db9f2]/20 text-[#0db9f2] text-xs font-bold uppercase tracking-widest mb-8"
                >
                    <ShieldCheck size={14} className="fill-current" />
                    Especialista em Coluna
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-white text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight mb-8"
                >
                    Agende sua Avaliação
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-white/70 text-lg sm:text-xl font-normal leading-relaxed mb-12 max-w-2xl mx-auto"
                >
                    E descubra como as técnicas minimamente invasivas podem restaurar sua qualidade de vida com segurança e rapidez.
                </motion.p>

                {/* Action Buttons */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
                >
                    <a
                        href="https://wa.me/5511999999999?text=Olá, Dr. Romulo. Gostaria de agendar uma consulta especializada."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xl font-bold transition-all shadow-lg shadow-[#25D366]/20 border border-transparent"
                    >
                        <MessageSquare className="w-6 h-6 fill-current" />
                        Chamar no WhatsApp
                    </a>
                </motion.div>

                {/* Trust Signals Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="grid grid-cols-1 sm:grid-cols-3 gap-10 pt-16 border-t border-white/10"
                >
                    {trustSignals.map((signal, idx) => (
                        <div key={idx} className="flex flex-col items-center gap-4 group">
                            <div className="w-16 h-16 rounded-2xl bg-[#0db9f2]/10 flex items-center justify-center text-[#0db9f2] transition-transform group-hover:scale-110 duration-300">
                                {signal.icon}
                            </div>
                            <h3 className="text-white font-bold text-base md:text-lg">
                                {signal.title}
                            </h3>
                            <p className="text-white/50 text-sm leading-relaxed px-2">
                                {signal.description}
                            </p>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Abstract Background Blobs */}
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#0db9f2]/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#0db9f2]/5 rounded-full blur-[100px] pointer-events-none" />
        </section>
    );
}