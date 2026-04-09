"use client";

import { Title, TypingText } from "@/components/shared";
import { forwardRef } from "react";
import { SharedComponentsTypes } from "@/components/shared/types";

interface BlogHeaderProps {
    badge: string;
    headline: SharedComponentsTypes["headline"];
    description: string;
}

export const BlogHeader = forwardRef<HTMLDivElement, BlogHeaderProps>(
    ({ badge, headline, description }, ref) => {

        return (
            <div ref={ref} className="blog-animate-header mb-16 text-center lg:text-left opacity-0">
                <div className="max-w-4xl">
                    <TypingText phrases={[badge]} />

                    <Title headline={headline} />


                    <p className="text-slate-600 text-lg max-w-2xl">
                        {description}
                    </p>
                </div>
            </div>
        );
    }
);

BlogHeader.displayName = "BlogHeader";
