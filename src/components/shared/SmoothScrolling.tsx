"use client";

import dynamic from "next/dynamic";

const LenisInit = dynamic(() => import("./LenisInit"), {
    ssr: false,
});

const WhatsAppButton = dynamic(() => import("@/components/WhatsAppButton"), {
    ssr: false,
});

export default function SmoothScrolling({ children }: { children: React.ReactNode }) {
    return (
        <>
            <LenisInit />
            {children}
            <WhatsAppButton />
        </>
    );
}
