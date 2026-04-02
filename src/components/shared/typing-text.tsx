"use client";

import { useState, useEffect } from "react";
import { sharedComponentsTypes } from "./types";

interface TypingTextProps {
    phrases: sharedComponentsTypes['typingPhrases'];
    className?: string;
}

export function TypingText({ phrases, className }: TypingTextProps) {
    const [text, setText] = useState("");
    const [phraseIndex, setPhraseIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentPhrase = phrases[phraseIndex];
        let timeout: NodeJS.Timeout;

        if (isDeleting) {
            if (text.length === 0) {
                timeout = setTimeout(() => {
                    setIsDeleting(false);
                    setPhraseIndex((prev) => (prev + 1) % phrases.length);
                }, 30);
            } else {
                timeout = setTimeout(() => {
                    setText(currentPhrase.substring(0, text.length - 1));
                }, 30);
            }
        } else {
            if (text.length === currentPhrase.length) {
                timeout = setTimeout(() => setIsDeleting(true), 2500);
            } else {
                timeout = setTimeout(() => {
                    setText(currentPhrase.substring(0, text.length + 1));
                }, 80);
            }
        }

        return () => clearTimeout(timeout);
    }, [text, isDeleting, phraseIndex]);

    return (

        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0db9f2]/10 border border-[#0db9f2]/20 mb-4 lg:mb-6 drop-shadow-sm ${className}`}>
            <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0db9f2] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0db9f2]"></span>
            </span>
            <span className="text-[#0db9f2] text-xs md:text-sm font-bold uppercase tracking-wider">
                {text}
                <span className="animate-pulse">|</span>
            </span>
        </div>
    );
}
