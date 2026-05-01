import { forwardRef, useState } from "react";
import { Hospital } from "../types";
import { InsuranceMarquee } from "./insurance-marquee";
import { InsuranceModal } from "./insurance-modal";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";

interface HospitalCardProps {
    hospital: Hospital;
    className?: string;
}

export const HospitalCard = forwardRef<HTMLDivElement, HospitalCardProps>(
    ({ hospital, className }, ref) => {
        const [isModalOpen, setIsModalOpen] = useState(false);

        // Prepare rows for the marquee
        const plans = hospital?.plans ?? [];
        const midpoint = Math.ceil(plans.length / 2);

        const row1 = plans.slice(0, midpoint);
        const row2 = plans.slice(midpoint);

        return (
            <>
                <div
                    ref={ref}
                    className={cn(
                        "group relative overflow-hidden bg-[#0A192F] p-8 md:p-12 rounded-3xl transition-[border,box-shadow] duration-500 border border-[#0db9f2]/10 hover:border-[#0db9f2]/30 hover:shadow-2xl flex flex-col justify-center min-h-[400px]",
                        className
                    )}
                >
                    <div className="flex flex-col gap-6 relative z-30">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                            <h3 className="text-3xl font-bold text-white group-hover:text-[#0db9f2] transition-colors">
                                {hospital.name}
                            </h3>

                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="inline-flex items-center gap-2 px-6 h-11 bg-white/5 hover:bg-[#0db9f2] border border-white/10 hover:border-[#0db9f2] rounded-xl text-white text-[11px] font-black uppercase tracking-wider transition-all duration-300 active:scale-95 group/btn"
                            >
                                <Plus size={16} className="transition-transform group-hover/btn:rotate-90" />
                                Todos os convênios
                            </button>
                        </div>

                        {/* Infinite Scrolling Inside Card */}
                        <div className="space-y-0 relative overflow-visible ">
                            <InsuranceMarquee
                                plans={row1}
                                direction="left"
                                speed={hospital.speed ?? 40}
                                className="bg-transparent"
                            />
                            <InsuranceMarquee
                                plans={row2}
                                direction="right"
                                speed={hospital.speed ?? 40}
                                className="bg-transparent"
                            />
                        </div>
                    </div>

                    {/* Masking gradients for marquee inside card */}
                    <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-[#0A192F] via-[#0A192F]/80 to-transparent z-20 pointer-events-none" />
                    <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-[#0A192F] via-[#0A192F]/80 to-transparent z-20 pointer-events-none" />

                    {/* Light highlight effect */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#0db9f2]/10 rounded-full blur-[120px] group-hover:bg-[#0db9f2]/20 transition-all duration-700 pointer-events-none z-10" />
                </div>

                <InsuranceModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    plans={plans}
                    hospitalName={hospital.name}
                />
            </>
        );
    }
);

HospitalCard.displayName = "HospitalCard";
