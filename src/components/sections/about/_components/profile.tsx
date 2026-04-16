import { forwardRef } from "react";
import Image from "next/image";

interface AboutProfileProps {
    src: string;
    alt: string;
    className?: string;
}

export const AboutProfile = forwardRef<HTMLDivElement, AboutProfileProps>(
    ({ src, alt, className }, ref) => {
        return (
            <figure ref={ref} className={`${className} relative shrink-0 flex group [perspective:2000px]`}>
                <div className="absolute top-10 left-10 -right-6 -bottom-6 bg-accent/5 rounded-[2.5rem] -z-20 group-hover:bg-accent/10 transition-all duration-700 ease-out blur-[2px] group-hover:translate-x-4 group-hover:translate-y-4" />


                <div className="relative h-[500px] md:h-[650px] w-[350px] md:w-[480px] bg-white/10 p-[5px] rounded-[2.8rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.10)] transition-all duration-700 ease-out group-hover:[transform:rotateX(6deg)_rotateY(-12deg)_translateZ(40px)] border-b-[6px] border-r-[6px] border-black/10 overflow-hidden group/card shadow-accent/5">


                    <div className="relative w-full h-full bg-white rounded-[2.7rem] p-3 flex items-center justify-center">
                        <div className="relative w-full h-full overflow-hidden rounded-[2rem]">
                            <Image
                                src={src}
                                alt={alt}
                                fill
                                className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                sizes="(max-width: 768px) 350px, 480px"
                                priority
                                unoptimized
                            />

                            {/* Overlay sutil de gradiente (Interior) */}
                            <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/20 via-transparent to-transparent opacity-50 group-hover:opacity-30 transition-opacity" />
                        </div>
                    </div>
                </div>

                {/* 4. Elemento de Brilho de Acento no rodapé (Ambient Light) */}
                <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-accent/20 rounded-full blur-[120px] pointer-events-none -z-30 group-hover:bg-accent/40 transition-all duration-1000" />

                {/* Acessibilidade (SEO e Leitores de Tela) */}
                <figcaption className="sr-only">{alt}</figcaption>
            </figure>
        );
    }
);

AboutProfile.displayName = "AboutProfile";
