"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

const LenisInit = dynamic(() => import("./LenisInit"), {
    ssr: false,
});

const WhatsAppButton = dynamic(() => import("@/components/WhatsAppButton"), {
    ssr: false,
});

export default function SmoothScrolling({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isStudioPage = pathname?.startsWith("/studio");

    if (isStudioPage) {
        return <>{children}</>;
    }

    return (
        <>
            <LenisInit />
            {children}
            <WhatsAppButton />
        </>
    );
}
