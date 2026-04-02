import { forwardRef } from "react";
import * as Icons from "lucide-react";
import { Feature } from "../types";

interface AboutFeaturesProps {
    features: Feature[];
}

export const AboutFeatures = forwardRef<HTMLDivElement, AboutFeaturesProps>(
    ({ features }, ref) => {
        return (
            <div
                ref={ref}

            >
                {/* Background sutil */}
                <div className="absolute inset-0 bg-primary-dark/5 pointer-events-none -z-10" />

                <div className="max-w-8xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-0 w-full group/container">
                    {features.map((feature, idx) => {
                        const IconComponent = (Icons as any)[feature.icon];

                        return (
                            <div
                                key={idx}
                                className="about-feature-item flex flex-col items-center lg:items-start md:flex-row gap-5 lg:px-10 relative justify-center lg:justify-start"
                            >
                                <div className="w-16 h-16 md:w-14 md:h-14 rounded-2xl bg-accent/10 flex items-center justify-center text-accent shrink-0 group-hover:scale-110 transition-transform duration-500">
                                    {IconComponent && <IconComponent size={32} strokeWidth={1.5} />}
                                </div>

                                <div className="space-y-1 text-center lg:text-left">
                                    <h4 className="font-extrabold text-primary-dark leading-tight text-lg">
                                        {feature.title}
                                    </h4>
                                    <p className="text-sm text-primary-dark/50 font-semibold tracking-wide uppercase">
                                        {feature.description}
                                    </p>
                                </div>

                                {/* Divisor vertical visível apenas no Desktop, exceto no último item */}
                                {idx < features.length - 1 && (
                                    <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 h-12 w-[1.5px] bg-primary-dark/10 scale-y-[0.6]"></div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
);

AboutFeatures.displayName = "AboutFeatures";
