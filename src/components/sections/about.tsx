"use client";

import Image from "next/image";
import { Award, Zap, Activity, ShieldCheck, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function About() {

    return (
        <section id="sobre" className="relative w-full overflow-hidden bg-neutral-light border-b border-primary-dark/5 lg:pt-16 pt-24   ">
            {/* Biography Section Root Container */}
            <div className="relative px-6 md:px-12 lg:px-4 text-primary-dark max-w-7xl mx-auto w-full space-y-20 lg:space-y-24 bg-neutral-light lg:pb-16">
                <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at 20% 80%, rgba(61, 142, 185, 0.05) 0%, transparent 40%)' }}></div>

                {/* Header Container - Row for Subtitle + Title (Centered) */}
                <div className="flex flex-row flex-wrap w-full justify-center ">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-4 text-center w-full "
                    >
                        <div className="flex items-center gap-4 justify-center w-full">
                            <div className="w-12 h-[1px] bg-accent/40"></div>
                            <span className="text-accent text-sm font-bold uppercase tracking-widest whitespace-nowrap">Sobre o Especialista</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl lg:text-5xl font-black leading-tight text-primary-dark">
                            Comprometido com sua <br />
                            <span className="text-accent italic">Saúde e Bem-estar</span>
                        </h2>
                    </motion.div>
                </div>

                {/* Content Column Block */}
                <div className="flex flex-col w-full ">
                    {/* Inner Flex Row - Image Left / Text Right */}
                    {/* Aligned to top (items-start) on container level to allow text leading */}
                    <div className="flex flex-col lg:flex-row items-start gap-16 lg:gap-8 w-full ">

                        {/* Profile Image - Manually centered vertically (lg:self-center) relative to text block */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="relative w-xl shrink-0 order-2 lg:order-1 lg:self-center px-16  "
                        >
                            <div className="relative h-[440px] group overflow-visible w-full ">
                                <Image
                                    src="/images/foto-about.svg"
                                    alt="Dr. Rômulo Oliveira"
                                    width={400}
                                    height={250}
                                    className="object-cover  transition-transform duration-700 group-hover:scale-110 rounded-2xl"
                                    unoptimized
                                />

                            </div>
                        </motion.div>

                        {/* Bio Text - Naturally aligned to top (default for flex alignment items-start) */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className=" space-y-6 text-primary-dark/70 text-lg md:text-xl leading-relaxed lg:text-left order-1 lg:order-2"
                        >
                            <p>
                                O Dr. Rômulo Oliveira dedica sua trajetória profissional ao tratamento avançado de patologias da coluna vertebral, unindo tecnologia de ponta e um olhar humano e individualizado.
                            </p>
                            <p>
                                Especialista reconhecido em <strong className="text-primary-dark font-bold">cirurgias minimamente invasivas</strong>, seu foco principal é reduzir o tempo de recuperação, permitindo que o paciente retorne às suas atividades diárias com o máximo de conforto e segurança.
                            </p>
                            <p>
                                Sua abordagem prioriza técnicas que preservam a musculatura e estabilidade da coluna, sempre buscando a solução menos agressiva e mais eficaz para cada caso clínico.
                            </p>

                            <div className="pt-8 flex justify-center lg:justify-end">
                                <Link
                                    href="/sobre"
                                    className="inline-flex items-center gap-2 text-accent font-bold group hover:gap-4 transition-all duration-300"
                                >
                                    <span className="relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-accent after:transform after:scale-x-0 group-hover:after:scale-x-100 after:transition-transform after:duration-300">
                                        Conheça a trajetória completa do Dr. Rômulo
                                    </span>
                                    <ArrowRight size={20} className="transition-transform duration-300 group-hover:translate-x-1" />
                                </Link>
                            </div>
                        </motion.div>


                    </div>
                </div>
            </div>

            {/* Trust/Feature Bar */}
            <div className="w-full border-t border-primary-dark/10 bg-white/50 py-12 px-6   ">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 w-full">
                    <div className="flex items-center gap-4 lg:px-8 relative justify-center lg:justify-start">
                        <div className="text-accent shrink-0">
                            <Award size={32} />
                        </div>
                        <div className="space-y-0.5 text-center lg:text-left">
                            <h4 className="font-bold text-primary-dark leading-tight">Especialista em Coluna</h4>
                            <p className="text-xs text-primary-dark/60 font-medium">Membro Titular SBOT/SBC</p>
                        </div>
                        <div className="hidden lg:block absolute right-0 h-10 w-[1px] bg-primary-dark/10"></div>
                    </div>

                    <div className="flex items-center gap-4 lg:px-8 relative justify-center lg:justify-start">
                        <div className="text-accent shrink-0">
                            <Zap size={32} />
                        </div>
                        <div className="space-y-0.5 text-center lg:text-left">
                            <h4 className="font-bold text-primary-dark leading-tight">Tecnologia de Ponta</h4>
                            <p className="text-xs text-primary-dark/60 font-medium">Técnicas Minimamente Invasivas</p>
                        </div>
                        <div className="hidden lg:block absolute right-0 h-10 w-[1px] bg-primary-dark/10"></div>
                    </div>

                    <div className="flex items-center gap-4 lg:px-8 relative justify-center lg:justify-start">
                        <div className="text-accent shrink-0">
                            <Activity size={32} />
                        </div>
                        <div className="space-y-0.5 text-center lg:text-left">
                            <h4 className="font-bold text-primary-dark leading-tight">Recuperação Rápida</h4>
                            <p className="text-xs text-primary-dark/60 font-medium">Foco no retorno às atividades</p>
                        </div>
                        <div className="hidden lg:block absolute right-0 h-10 w-[1px] bg-primary-dark/10"></div>
                    </div>

                    <div className="flex items-center gap-4 lg:px-8 justify-center lg:justify-start">
                        <div className="text-accent shrink-0">
                            <ShieldCheck size={32} />
                        </div>
                        <div className="space-y-0.5 text-center lg:text-left">
                            <h4 className="font-bold text-primary-dark leading-tight">Segurança e Ética</h4>
                            <p className="text-xs text-primary-dark/60 font-medium">Procedimentos Certificados</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
