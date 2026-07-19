"use client"

import { Title, TypingText } from "@/components/shared";
import { LocationCard } from "./_components";
import { LocationsContent } from "./types";
import { motion } from "framer-motion";
import { useLocationsAnimation } from "./hooks/use-locations";
import { Hospital } from "@/components/sections/insurance/types";
import { PortableText } from "@portabletext/react";
import Link from "next/link";

const locationsPtComponents = {
    marks: {
        link: ({ children, value }: any) => {
            const href = value?.href || "";
            const isExternal = /^https?:\/\//.test(href);

            if (isExternal) {
                return (
                    <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-dark font-semibold underline hover:opacity-80 transition-opacity"
                    >
                        {children}
                    </a>
                );
            }

            return (
                <Link
                    href={href}
                    className="text-primary-dark font-semibold underline hover:opacity-80 transition-opacity"
                >
                    {children}
                </Link>
            );
        },
    },
};

function renderDescription(description: any) {
    if (!description) return null;
    if (typeof description === "string") {
        return <p>{description}</p>;
    }
    const blocks = Array.isArray(description) ? description : [description];
    return <PortableText value={blocks} components={locationsPtComponents} />;
}

interface LocationsGridProps {
    content: LocationsContent;
    hospitals?: Hospital[];
}

export default function LocationsGrid({ content, hospitals = [] }: LocationsGridProps) {
    const { subtitle, headline, description, units = [] } = content || {};
    const { containerRef } = useLocationsAnimation();

    return (
        <motion.section
            id="locations"
            ref={containerRef as any}
            initial={{ opacity: 1 }}
            className="relative py-20 bg-neutral-light text-primary-dark overflow-hidden min-h-[90vh] flex flex-col justify-center"
        >
            <div className="max-w-8xl mx-auto px-6 md:px-12 lg:px-8 xl:px-16 2xl:px-20 mb-16">
                <header className="flex flex-col items-center text-center space-y-6">
                    <TypingText phrases={[subtitle]} />
                    <Title headline={headline} className="max-w-4xl" />
                    <div className="text-lg md:text-xl text-primary-dark/60 max-w-3xl mx-auto leading-relaxed px-4">
                        {renderDescription(description)}
                    </div>
                </header>
            </div>

            {/* Grid de Cards (2D Responsivo) */}
            <div className="max-w-8xl mx-auto px-6 md:px-12 lg:px-8 xl:px-16 2xl:px-20 w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10 justify-items-center">
                    {units.map((unit, index) => (
                        <motion.div
                            key={unit.id}
                            className="w-full max-w-md h-[450px]"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                        >
                            <LocationCard
                                unit={unit}
                                index={index}
                                hospitals={hospitals}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>

            <div className="max-w-8xl mx-auto px-6 md:px-12 lg:px-8 xl:px-16 2xl:px-20 w-full mt-12">
                <span className="text-[10px] text-primary-dark/30 uppercase tracking-widest font-bold">
                    * Imagens meramente ilustrativas
                </span>
            </div>
        </motion.section>
    );
}
