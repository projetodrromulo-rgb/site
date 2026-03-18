"use client";

import Image from "next/image";
import { Award, Zap, Activity, ShieldCheck, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { AboutContent } from "./types";

interface AboutProps {
    content: AboutContent;
}

const iconMap = {
    Award,
    Zap,
    Activity,
    ShieldCheck
};

export default function About({ content }: AboutProps) {
    const { subtitle, headline, image, paragraphs, formation, features } = content;

    return (
        <section id="sobre" className="relative w-full overflow-hidden bg-neutral-light border-b border-primary-dark/5 lg:pt-16 pt-24">
            {/* Biography Section Root Container */}
            <div className="max-w-7xl relative px-6 md:px-12 lg:px-8 xl:px-16 2xl:px-20 text-primary-dark max-w-8xl mx-auto w-full space-y-20 lg:space-y-24 bg-neutral-light lg:pb-16">
                <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at 20% 80%, rgba(61, 142, 185, 0.05) 0%, transparent 40%)' }}></div>

                {/* Header Container - Row for Subtitle + Title (Centered) */}
                <div className="flex flex-row flex-wrap w-full justify-center">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-4 text-center w-full"
                    >
                        <div className="flex items-center gap-4 justify-center w-full">
                            <div className="w-18 h-[1px] bg-accent/40"></div>
                            <span className="text-accent text-sm font-bold uppercase tracking-widest whitespace-nowrap">{subtitle}</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl lg:text-5xl font-black leading-tight text-primary-dark">
                            {headline.normal} <br />
                            <span className="text-accent italic">{headline.highlight}</span>
                        </h2>
                    </motion.div>
                </div>

                {/* Content Column Block */}
                <div className="flex flex-col w-full">
                    {/* Inner Flex Row - Image Left / Text Right */}
                    <div className="flex flex-col lg:flex-row items-start gap-16 lg:gap-8 w-full   ">

                        {/* Profile Image */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="relative   shrink-0 order-2 lg:order-1 lg:self-center flex"
                        >
                            <div className="relative h-[600px] group overflow-visible  ">
                                <Image
                                    src={image.src}
                                    alt={image.alt}
                                    width={400}
                                    height={250}
                                    className="object-cover transition-transform duration-700 group-hover:scale-110 rounded-2xl"
                                    unoptimized
                                />
                            </div>
                        </motion.div>

                        {/* Bio Text */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className=" space-y-6 text-primary-dark/70 text-lg md:text-xl leading-relaxed lg:text-left order-1 lg:order-2 flex-1 ml-8"
                        >
                            <div className="space-y-4">
                                {paragraphs.map((p, idx) => (
                                    <p key={idx}>{p}</p>
                                ))}
                            </div>

                            <div className="pt-4 space-y-4">
                                <h3 className="text-xl font-bold text-primary-dark flex items-center gap-2">
                                    <Award className="text-accent" size={24} />
                                    Formação
                                </h3>
                                <ul className="space-y-3">
                                    {formation.map((item, idx) => (
                                        <li key={idx} className="flex items-start gap-3 text-base md:text-lg">
                                            <span className="mt-1.5 shrink-0 w-2 h-2 rounded-full bg-accent/60" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Trust/Feature Bar */}
            <div className="w-full border-t border-primary-dark/10 bg-white/50 py-12 px-6">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 w-full">
                    {features.map((feature, idx) => {
                        const IconComponent = iconMap[feature.icon as keyof typeof iconMap];
                        return (
                            <div key={idx} className="flex items-center gap-4 lg:px-8 relative justify-center lg:justify-start">
                                <div className="text-accent shrink-0">
                                    {IconComponent && <IconComponent size={32} />}
                                </div>
                                <div className="space-y-0.5 text-center lg:text-left">
                                    <h4 className="font-bold text-primary-dark leading-tight">{feature.title}</h4>
                                    <p className="text-xs text-primary-dark/60 font-medium">{feature.description}</p>
                                </div>
                                {idx < features.length - 1 && (
                                    <div className="hidden lg:block absolute right-0 h-10 w-[1px] bg-primary-dark/10"></div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
