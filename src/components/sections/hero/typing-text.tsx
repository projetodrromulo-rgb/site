"use client";

import { useState, useEffect } from "react";

interface TypingTextProps {
    phrases: string[];
}

export function TypingText({ phrases }: TypingTextProps) {
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
        <span className="text-[#0db9f2] text-xs md:text-sm font-bold uppercase tracking-wider">
            {text}
            <span className="animate-pulse">|</span>
        </span>
    );
}
