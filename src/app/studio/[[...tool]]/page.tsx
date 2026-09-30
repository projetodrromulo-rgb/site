"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

export default function StudioPage() {
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
