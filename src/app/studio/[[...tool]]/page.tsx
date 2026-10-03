"use client";

import { useEffect, useState } from "react";
import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

export default function StudioPage() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="fixed inset-0 bg-[#0B2B40] flex items-center justify-center text-white font-sans text-sm">
                Carregando Sanity Studio...
            </div>
        );
    }

    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: `
                html, body {
                    height: 100% !important;
                    overflow: hidden !important;
                }
            ` }} />
            <div className="fixed inset-0 bg-[#0B2B40] z-0 overflow-hidden">
                {/* @ts-ignore */}
                <NextStudio config={config} />
            </div>
        </>
    );
}
