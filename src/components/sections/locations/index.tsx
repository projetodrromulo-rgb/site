"use client"

import { MapPin, Phone, Globe } from "lucide-react";
import { motion } from "framer-motion";
import { LocationsContent } from "./types";

interface LocationsProps {
    content: LocationsContent;
}

export default function Locations({ content }: LocationsProps) {
    const { sectionSubtitle, sectionTitle, sectionDescription, units } = content;

    return (
        <section id="locations" className="relative py-24 px-6 md:px-12 lg:px-24 bg-neutral-light text-primary-dark">
            <div className="max-w-7xl mx-auto space-y-16">
                <div className="text-center space-y-4">
                    <span className="text-accent text-sm font-bold uppercase tracking-widest">{sectionSubtitle}</span>
                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-primary-dark">{sectionTitle}</h3>
                    <p className="text-primary-dark/60 max-w-2xl mx-auto">
                        {sectionDescription}
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
                    {units.map((unit, index) => (
                        <motion.div
                            key={unit.id}
                            initial={{ opacity: 0, y: 50, scale: 0.98 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{
                                duration: 1.2,
                                delay: index * 0.15,
                                ease: [0.16, 1, 0.3, 1]
                            }}
                            whileHover={{
                                rotateX: 5,
                                rotateY: -5,
                                scale: 1.02,
                                transition: { duration: 0.4, ease: "easeOut" }
                            }}
                            className="bg-white p-8 rounded-3xl border border-primary-dark/10 border-t-4 border-t-accent flex flex-col gap-6 h-full group shadow-sm hover:shadow-2xl hover:shadow-accent/5 overflow-hidden"
                            style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
                        >
                            <div className="flex justify-between items-start" style={{ transform: "translateZ(20px)" }}>
                                <div className="space-y-1">
                                    <h4 className="text-2xl font-bold text-primary-dark">{unit.title}</h4>
                                    <p className="text-accent font-semibold">{unit.subtitle}</p>
                                </div>
                                {unit.websiteUrl ? (
                                    <a
                                        href={unit.websiteUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent hover:bg-accent hover:text-white transition-colors cursor-pointer"
                                        title={`Visitar site de ${unit.title}`}
                                    >
                                        <Globe size={24} />
                                    </a>
                                ) : (
                                    <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent">
                                        <MapPin size={24} />
                                    </div>
                                )}
                            </div>

                            <div className="space-y-4 text-primary-dark/60" style={{ transform: "translateZ(10px)" }}>
                                <p className="flex items-start gap-3">
                                    <MapPin size={18} className="text-accent mt-1 shrink-0" />
                                    {unit.address}
                                </p>
                                <p className="flex items-center gap-3">
                                    <Phone size={18} className="text-accent shrink-0" />
                                    {unit.phone}
                                </p>
                            </div>

                            <a
                                href={unit.mapUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 w-full mt-auto py-4 bg-accent text-white font-bold rounded-2xl hover:bg-accent/90 transition-all active:scale-95 shadow-lg shadow-accent/20"
                                style={{ transform: "translateZ(30px)" }}
                            >
                                <Globe size={18} />
                                Ver no Google Maps
                            </a>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}