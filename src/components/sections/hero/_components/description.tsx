import { PortableText } from "@portabletext/react";
import Link from "next/link";
import { HeroContent } from "../types";

interface DescriptionProps {
    description: HeroContent['description'];
}

const heroPtComponents = {
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
                <p>{description}</p>
            )}
        </div>
    );
}