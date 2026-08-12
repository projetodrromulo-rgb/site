"use client";

import { useLayoutEffect, useEffect, useRef } from "react";

interface JsonLdHeadProps {
    id: string;
    schema: any;
}

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function JsonLdHead({ id, schema }: JsonLdHeadProps) {
    const scriptRef = useRef<HTMLScriptElement>(null);

    useIsomorphicLayoutEffect(() => {
        if (!schema || typeof document === "undefined") return;

        const scriptEl = scriptRef.current || document.getElementById(id);
        if (scriptEl && scriptEl.parentNode !== document.head) {
            document.head.appendChild(scriptEl);
        }

        return () => {
            if (scriptEl && scriptEl.parentNode) {
                scriptEl.parentNode.removeChild(scriptEl);
            }
        };
    }, [id, schema]);

    if (!schema) return null;

    return (
        <script
            ref={scriptRef}
            id={id}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
