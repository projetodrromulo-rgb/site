import { HeroContent } from "../types";

interface TitleProps {
    headline: HeroContent['headline'];
    className?: string;
}

export function Title({ headline, className }: TitleProps) {
    return (
        <h1 aria-label={`${headline.top} ${headline.highlight} ${headline.bottom}`} className="flex flex-col gap-1 lg:gap-2 mb-4 lg:mb-6 tracking-tight drop-shadow-lg font-inter " >
            <span className="text-[clamp(2rem,6vw,4.5rem)] font-black text-white leading-[1.1]">
                {headline.top} <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-100 to-[#0db9f2]">
                    {headline.highlight}
                </span>
            </span>
            <span className="text-slate-200 text-[clamp(1.5rem,4vw,3rem)] font-extrabold leading-[1.2]">
                {headline.bottom}
            </span>
        </h1>
    )
}