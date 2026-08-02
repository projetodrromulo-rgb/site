import { PortableText } from "@portabletext/react";
import Link from "next/link";
import { HeroContent } from "../types";

interface DescriptionProps {
    description: HeroContent['description'];
}

const heroPtComponents = {
    block: {
        h1: ({ children }: any) => (
            <h1 className="text-inherit font-inherit text-[clamp(1rem,1.2vw,1.25rem)] font-medium leading-relaxed m-0 inline">
                {children}
            </h1>
        ),
        h2: ({ children }: any) => (
            <h2 className="text-inherit font-inherit text-[clamp(1rem,1.2vw,1.25rem)] font-medium leading-relaxed m-0 inline">
                {children}
            </h2>
        ),
        normal: ({ children }: any) => (
            <p className="text-inherit font-inherit leading-relaxed m-0 inline">
                {children}
            </p>
        ),
    },
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
                        className="text-inherit no-underline font-normal"
                    >
                        {children}
                    </a>
                );
            }

            return (
                <Link
                    href={href}
                    className="text-inherit no-underline font-normal"
                >
                    {children}
                </Link>
            );
        },
    },
};

export function Description({ description }: DescriptionProps) {
    return (
        <div className="text-slate-300 text-[clamp(1rem,1.2vw,1.25rem)] font-medium leading-relaxed mb-6 lg:mb-8 max-w-[95%] xl:max-w-[80%] drop-shadow-md mx-auto">
            {Array.isArray(description) ? (
                <PortableText value={description} components={heroPtComponents} />
            ) : (
                <h1 className="text-inherit font-inherit leading-relaxed m-0">{description}</h1>
            )}
        </div>
    );
}