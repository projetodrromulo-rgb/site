import { forwardRef } from "react";
import { Award, MapPin } from "lucide-react";

interface AboutBioProps {
    paragraphs: string[];
    formation: string[];
    neighborhoods?: string[];
    className?: string;
}

export const AboutBio = forwardRef<HTMLDivElement, AboutBioProps>(
    ({ paragraphs, formation, neighborhoods, className }, ref) => {
        return (
            <div ref={ref} className={`${className} pb-6 space-y-8 text-primary-dark/80 text-lg md:text-xl leading-relaxed flex-1 `}>
                {/* Texto Biográfico principal */}
                <div className="space-y-4">
                    {paragraphs.map((p, idx) => (
                        <p key={idx} className="font-medium text-base md:text-lg">{p}</p>
                    ))}
                </div>

                {/* Bairros e Regiões de Atendimento (SEO Local) */}
                {neighborhoods && neighborhoods.length > 0 && (
                    <div className="pt-6 border-t border-primary-dark/10 space-y-4">
                        <h3 className="text-xl font-bold text-primary-dark flex items-center gap-2.5 tracking-tight uppercase">
                            <MapPin className="text-accent" size={22} strokeWidth={2.5} />
                            Bairros e Regiões de Atendimento
                        </h3>
                        <div className="flex flex-wrap gap-2 pt-1">
                            {neighborhoods.map((bairros, idx) => (
                                <span
                                    key={idx}
                                    className="text-xs md:text-sm font-semibold px-3.5 py-1.5 rounded-full bg-primary-dark/5 border border-primary-dark/15 text-primary-dark hover:border-accent/50 hover:bg-accent/10 transition-colors"
                                >
                                    {bairros}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Bloco de Formação com destaque */}
                <div className="pt-6 border-t border-primary-dark/10 space-y-6">
                    <h3 className="text-xl md:text-2xl font-black text-primary-dark flex items-center gap-3 uppercase tracking-tight">
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
