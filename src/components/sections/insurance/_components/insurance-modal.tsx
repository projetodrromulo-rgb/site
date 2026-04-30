"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { Plan } from "../types";
import { PlanLogo } from "./plan-logo";
import { cn } from "@/lib/utils";

interface InsuranceModalProps {
    isOpen: boolean;
    onClose: () => void;
    plans: Plan[];
    hospitalName: string;
}


const variants = {
    enter: (direction: number) => ({
        x: direction > 0 ? 20 : -20,
        opacity: 0
    }),
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1
    },
    exit: (direction: number) => ({
        zIndex: 0,
        x: direction < 0 ? 20 : -20,
        opacity: 0
    })
};

export function InsuranceModal({ isOpen, onClose, plans, hospitalName }: InsuranceModalProps) {
    const [itemsPerPage, setItemsPerPage] = useState(12);
    const [page, setPage] = useState(0);
    const [direction, setDirection] = useState(0);

    // Dynamic items per page based on screen size
    useEffect(() => {
        setItemsPerPage(6);
    }, []);

    const totalPages = Math.ceil(plans.length / itemsPerPage);
    const currentPlans = plans.slice(page * itemsPerPage, (page + 1) * itemsPerPage);

    const paginate = (newDirection: number) => {
        const newPage = page + newDirection;
        if (newPage >= 0 && newPage < totalPages) {
            setDirection(newDirection);
            setPage(newPage);
        }
    };

    // Reset pagination when modal opens or layout changes
    useEffect(() => {
        if (isOpen) {
            setPage(0);
            setDirection(0);
            document.body.classList.add("insurance-modal-open");
        } else {
            document.body.classList.remove("insurance-modal-open");
        }
        return () => document.body.classList.remove("insurance-modal-open");
    }, [isOpen, itemsPerPage]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-6 overflow-hidden  ">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-xl"
                    />

                    {/* Modal Container */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        transition={{
                            type: "spring",
                            damping: 25,
                            stiffness: 300,
                            duration: 0.4
                        }}
                        className="relative w-full max-w-6xl h-[650px] md:h-[700px] bg-[#0A192F] border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-6 md:p-8 flex items-center justify-between border-b border-white/5 bg-white/[0.02] z-2">
                            <div className="space-y-1">
                                <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-tighter">
                                    Todos os <span className="text-[#0db9f2]">Convênios</span>
                                </h2>
                                <p className="text-white/50 text-xs md:text-sm font-medium">
                                    Aceitos em {hospitalName}
                                </p>
                            </div>
                            <button
                                onClick={onClose}
                                className="size-10 rounded-full bg-white/5 hover:bg-white/10 text-white flex items-center justify-center transition-all hover:scale-110 active:scale-90 group"
                            >
                                <X className="size-5 transition-transform group-hover:rotate-90" />
                            </button>
                        </div>

                        {/* Plans Grid Area */}
                        <div className="flex-1 relative overflow-hidden px-12 md:px-32 pt-12 md:pt-16 pb-8">
                            <AnimatePresence initial={false} custom={direction} mode="wait">
                                <motion.div
                                    key={page}
                                    custom={direction}
                                    variants={variants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={{
                                        x: { type: "spring", stiffness: 300, damping: 30 },
                                        opacity: { duration: 0.2 }
                                    }}
                                    className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8"
                                >
                                    {currentPlans.map((plan, index) => (
                                        <div key={`${plan.name}-${index}`}>
                                            <PlanLogo
                                                src={plan.src}
                                                alt={plan.name}
                                                className="h-24 w-32 md:h-34 w-full p-3"
                                            />
                                        </div>
                                    ))}
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Pagination Footer - Locations Style */}
                        <div className="py-8 border-t border-white/5 bg-white/[0.01] relative z-30">
                            <div className="max-w-4xl mx-auto px-12 flex flex-col md:flex-row items-center justify-between gap-8">
                                {/* Arrows and Progress */}
                                <div className="flex items-center gap-8 w-full md:w-auto">
                                    <div className="flex gap-4">
                                        <button
                                            onClick={() => paginate(-1)}
                                            disabled={page === 0}
                                            aria-label="Página Anterior"
                                            className="p-4 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-white hover:bg-[#0db9f2] hover:text-white transition-all shadow-xl disabled:opacity-20 disabled:pointer-events-none group"
                                        >
                                            <ChevronLeft size={20} className="transition-transform group-hover:-translate-x-0.5" />
                                        </button>
                                        <button
                                            onClick={() => paginate(1)}
                                            disabled={page >= totalPages - 1}
                                            aria-label="Próxima Página"
                                            className="p-4 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-white hover:bg-[#0db9f2] hover:text-white transition-all shadow-xl disabled:opacity-20 disabled:pointer-events-none group"
                                        >
                                            <ChevronRight size={20} className="transition-transform group-hover:translate-x-0.5" />
                                        </button>
                                    </div>

                                    <div className="flex-1 md:w-48 h-[1px] bg-white/10 relative">
                                        <motion.div
                                            className="absolute top-0 left-0 h-full bg-[#0db9f2]"
                                            animate={{ width: `${((page + 1) / totalPages) * 100}%` }}
                                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        />
                                    </div>
                                </div>

                                {/* Dots and Counter */}
                                <div className="flex items-center gap-8">
                                    <div className="flex gap-2">
                                        {Array.from({ length: totalPages }).map((_, i) => (
                                            <button
                                                key={i}
                                                onClick={() => {
                                                    setDirection(i > page ? 1 : -1);
                                                    setPage(i);
                                                }}
                                                aria-label={`Ir para página ${i + 1}`}
                                                className={cn(
                                                    "h-1.5 rounded-full transition-all duration-500",
                                                    page === i ? "w-10 bg-[#0db9f2]" : "w-3 bg-white/10"
                                                )}
                                            />
                                        ))}
                                    </div>
                                    <div className="text-2xl font-black text-white/10 flex gap-1">
                                        <span className="text-white">{String(page + 1).padStart(2, '0')}</span>
                                        <span>/</span>
                                        <span>{String(totalPages).padStart(2, '0')}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer decorative border */}
                        <div className="p-1 bg-gradient-to-r from-transparent via-[#0db9f2]/30 to-transparent" />
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
