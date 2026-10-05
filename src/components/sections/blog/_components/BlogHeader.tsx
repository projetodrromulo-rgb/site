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
            <div ref={ref} className="mb-16 text-center lg:text-left">
                <div className="max-w-4xl space-y-4">
                    <div className="blog-animate-badge opacity-0">
                        <TypingText phrases={[badge]} />
                    </div>

                    <div className="blog-animate-title opacity-0">
                        <Title headline={headline} />
                    </div>

                    <p className="blog-animate-desc text-slate-600 text-lg max-w-2xl opacity-0">
                        {description}
                    </p>
                </div>
            </div>
        );
    }
);

BlogHeader.displayName = "BlogHeader";

