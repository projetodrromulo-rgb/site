"use client"
import Image from "next/image";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

export function Convenios() {
    return (
        <section id="differentials" className="py-24 bg-white relative z-20">
            {/* Direct Diagnostic Image */}
            <div className="hidden">
                <img src="/test-unimed.png" alt="Test" />
            </div>

            <div className="container mx-auto px-6 max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

                    {/* Left Column - Sticky Title */}
                    <div className="lg:col-span-4 lg:sticky lg:top-32 space-y-6">
                        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">

                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0db9f2]/10 border border-[#0db9f2]/20 text-[#0db9f2] text-xs font-bold uppercase tracking-widest mb-8"
                            >
                                <ShieldCheck size={14} className="fill-current" />
                                <span className="text-blue-800 font-bold uppercase tracking-widest text-xs">
                                    Planos de Saúde e Convênio
                                </span>
                            </div>
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                            >

                                <h2 className="text-4xl text-[#0A192F] md:text-5xl font-black  leading-tight mt-4">
                                    Convênios  <span className="text-[#0A192F] italic">Aceitos</span>
                                </h2>
                                <p className="text-blue-800 text-lg mt-6 leading-relaxed">
                                    Trabalhamos com as principais operadoras do mercado para garantir agilidade, conforto e excelência no seu atendimento especializado em patologias da coluna.
                                </p>
                            </motion.div>
                        </div>
                    </div>

                    {/* Right Column - List of Features */}
                    <div className="lg:col-span-8 flex flex-col gap-12">
                        {/* Hospital Card */}
                        <div className="group relative overflow-hidden bg-[#0A192F] hover:bg-[#112240] p-8 md:p-12 rounded-3xl transition-all duration-300 border border-transparent hover:border-lavanda/20 hover:shadow-xl animate-fade-in-up delay-100">
                            <div className="flex flex-col md:flex-row gap-8 relative z-10">
                                <div className="flex-1 space-y-6">
                                    <div className="space-y-4">
                                        <h3 className="text-3xl font-bold text-white group-hover:text-[#0db9f2] transition-colors">
                                            Hospital Mater Dei
                                        </h3>

                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
                                            {[
                                                { name: "Unimed", src: "/images/Convenios/Unimed.png" },
                                                { name: "Sulamérica", src: "/images/Convenios/sulamerica.png" },
                                                { name: "CEMIG", src: "/images/Convenios/CEMIG.png" },
                                                { name: "Copasa", src: "/images/Convenios/Copasa.png" },
                                                { name: "Unimed", src: "/images/Convenios/Unimed copy.png" },
                                                { name: "Sulamérica", src: "/images/Convenios/sulamerica copy.png" },
                                                { name: "CEMIG", src: "/images/Convenios/CEMIG copy.png" },
                                                { name: "Copasa", src: "/images/Convenios/Copasa copy.png" }
                                            ].map((plan, idx) => (
                                                <div
                                                    key={idx}
                                                    className="bg-white/10 backdrop-blur-md rounded-xl p-4 flex items-center justify-center border border-white/10 hover:bg-white/20 transition-all duration-300 h-24"
                                                >
                                                    <div className="relative w-full h-full">
                                                        <Image
                                                            src={plan.src}
                                                            alt={plan.name}
                                                            fill
                                                            className="object-contain"
                                                            unoptimized
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="group relative overflow-hidden bg-[#0A192F] hover:bg-[#112240] p-8 md:p-12 rounded-3xl transition-all duration-300 border border-transparent hover:border-lavanda/20 hover:shadow-xl animate-fade-in-up delay-100">
                            <div className="flex flex-col md:flex-row gap-8 relative z-10">
                                <div className="flex-1 space-y-6">
                                    <div className="space-y-4">
                                        <h3 className="text-3xl font-bold text-white group-hover:text-[#0db9f2] transition-colors">
                                            Hospital Mater Dei
                                        </h3>

                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
                                            {[
                                                { name: "Unimed", src: "/images/Convenios/Unimed.png" },
                                                { name: "Sulamérica", src: "/images/Convenios/sulamerica.png" },
                                                { name: "CEMIG", src: "/images/Convenios/CEMIG.png" },
                                                { name: "Copasa", src: "/images/Convenios/Copasa.png" },
                                                { name: "Unimed", src: "/images/Convenios/Unimed copy.png" },
                                                { name: "Sulamérica", src: "/images/Convenios/sulamerica copy.png" },
                                                { name: "CEMIG", src: "/images/Convenios/CEMIG copy.png" },
                                                { name: "Copasa", src: "/images/Convenios/Copasa copy.png" }
                                            ].map((plan, idx) => (
                                                <div
                                                    key={idx}
                                                    className="bg-white/10 backdrop-blur-md rounded-xl p-4 flex items-center justify-center border border-white/10 hover:bg-white/20 transition-all duration-300 h-24"
                                                >
                                                    <div className="relative w-full h-full">
                                                        <Image
                                                            src={plan.src}
                                                            alt={plan.name}
                                                            fill
                                                            className="object-contain"
                                                            unoptimized
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="group relative overflow-hidden bg-[#0A192F] hover:bg-[#112240] p-8 md:p-12 rounded-3xl transition-all duration-300 border border-transparent hover:border-lavanda/20 hover:shadow-xl animate-fade-in-up delay-100">
                            <div className="flex flex-col md:flex-row gap-8 relative z-10">
                                <div className="flex-1 space-y-6">
                                    <div className="space-y-4">
                                        <h3 className="text-3xl font-bold text-white group-hover:text-[#0db9f2] transition-colors">
                                            Hospital Mater Dei
                                        </h3>

                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
                                            {[
                                                { name: "Unimed", src: "/images/Convenios/Unimed.png" },
                                                { name: "Sulamérica", src: "/images/Convenios/sulamerica.png" },
                                                { name: "CEMIG", src: "/images/Convenios/CEMIG.png" },
                                                { name: "Copasa", src: "/images/Convenios/Copasa.png" },
                                                { name: "Unimed", src: "/images/Convenios/Unimed copy.png" },
                                                { name: "Sulamérica", src: "/images/Convenios/sulamerica copy.png" },
                                                { name: "CEMIG", src: "/images/Convenios/CEMIG copy.png" },
                                                { name: "Copasa", src: "/images/Convenios/Copasa copy.png" }
                                            ].map((plan, idx) => (
                                                <div
                                                    key={idx}
                                                    className="bg-white/10 backdrop-blur-md rounded-xl p-4 flex items-center justify-center border border-white/10 hover:bg-white/20 transition-all duration-300 h-24"
                                                >
                                                    <div className="relative w-full h-full">
                                                        <Image
                                                            src={plan.src}
                                                            alt={plan.name}
                                                            fill
                                                            className="object-contain"
                                                            unoptimized
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="group relative overflow-hidden bg-[#0A192F] hover:bg-[#112240] p-8 md:p-12 rounded-3xl transition-all duration-300 border border-transparent hover:border-lavanda/20 hover:shadow-xl animate-fade-in-up delay-100">
                            <div className="flex flex-col md:flex-row gap-8 relative z-10">
                                <div className="flex-1 space-y-6">
                                    <div className="space-y-4">
                                        <h3 className="text-3xl font-bold text-white group-hover:text-[#0db9f2] transition-colors">
                                            Hospital Mater Dei
                                        </h3>

                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
                                            {[
                                                { name: "Unimed", src: "/images/Convenios/Unimed.png" },
                                                { name: "Sulamérica", src: "/images/Convenios/sulamerica.png" },
                                                { name: "CEMIG", src: "/images/Convenios/CEMIG.png" },
                                                { name: "Copasa", src: "/images/Convenios/Copasa.png" },
                                                { name: "Unimed", src: "/images/Convenios/Unimed copy.png" },
                                                { name: "Sulamérica", src: "/images/Convenios/sulamerica copy.png" },
                                                { name: "CEMIG", src: "/images/Convenios/CEMIG copy.png" },
                                                { name: "Copasa", src: "/images/Convenios/Copasa copy.png" }
                                            ].map((plan, idx) => (
                                                <div
                                                    key={idx}
                                                    className="bg-white/10 backdrop-blur-md rounded-xl p-4 flex items-center justify-center border border-white/10 hover:bg-white/20 transition-all duration-300 h-24"
                                                >
                                                    <div className="relative w-full h-full">
                                                        <Image
                                                            src={plan.src}
                                                            alt={plan.name}
                                                            fill
                                                            className="object-contain"
                                                            unoptimized
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}