import { SharedComponentsTypes } from "./types";

interface TitleProps {
    headline: SharedComponentsTypes['headline'];
    className?: string;
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}
export function Title({
    headline,
    className = "",
    as: Tag = 'h2'

}: TitleProps) {
    return (
        <Tag
            className={`flex flex-col gap-1 lg:gap-2 mb-4 lg:mb-6 tracking-tight drop-shadow-lg font-inter ${className}`}
            style={{ color: headline.styles?.textColorTitle }}
        >
            <span className={`text-[clamp(2rem,6vw,4.5rem)] font-black leading-[1.1]`}>
                {headline.textTop} <br className="hidden md:block" />
                <span
                    className="text-transparent bg-clip-text bg-gradient-to-r"
                    style={{
                        backgroundImage: `linear-gradient(to right, ${headline.styles?.textColorHighlightFrom}, ${headline.styles?.textColorHighlightTo})`,
                    }}
                >
                    {headline.textHighlight}
                </span>
            </span>
            {headline.textBottom && (
                <span
                    className="text-[clamp(1.5rem,4vw,3rem)] font-extrabold leading-[1.2]"
                    style={{ color: headline.styles?.textColorBottom }}
                >
                    {headline.textBottom}
                </span>
            )}
        </Tag>
    );
}