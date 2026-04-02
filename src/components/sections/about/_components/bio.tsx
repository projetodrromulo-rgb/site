import { forwardRef } from "react";
import { Award } from "lucide-react";

interface AboutBioProps {
    paragraphs: string[];
    formation: string[];
    className?: string;
}

export const AboutBio = forwardRef<HTMLDivElement, AboutBioProps>(
    ({ paragraphs, formation, className }, ref) => {
        return (
            <div ref={ref} className={`${className} space-y-8 text-primary-dark/80 text-lg md:text-xl leading-relaxed flex-1`}>
                {/* Texto Biográfico principal */}
                <div className="space-y-4">
                    {paragraphs.map((p, idx) => (
                        <p key={idx} className="font-medium">{p}</p>
                    ))}
                </div>

                {/* Bloco de Formação com destaque */}
                <div className="pt-6 border-t border-primary-dark/10 space-y-6">
                    <h3 className="text-2xl font-black text-primary-dark flex items-center gap-3 uppercase tracking-tight">
                        <Award className="text-accent" size={28} strokeWidth={2.5} />
                        Formação de Excelência
                    </h3>
                    
                    <ul className="grid grid-cols-1 gap-4">
                        {formation.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-4 text-base md:text-lg group">
                                <span className="mt-2 shrink-0 w-2.5 h-2.5 rounded-full bg-accent/40 group-hover:bg-accent transition-colors duration-300" />
                                <span className="text-primary-dark/70 group-hover:text-primary-dark transition-colors">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
);

AboutBio.displayName = "AboutBio";
