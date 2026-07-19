"use client";

import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function LenisInit() {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // standard quintic
        });

        // Sincroniza o ScrollTrigger com o Lenis
        lenis.on('scroll', ScrollTrigger.update);

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);

        // Intercepta todos os links âncora dinamicamente usando delegação de eventos
        const handleAnchorClick = (e: MouseEvent) => {
            const target = (e.target as HTMLElement).closest('a');
            if (!target) return;

            const href = target.getAttribute("href");
            if (!href) return;

            const currentPathname = window.location.pathname;
            // Verifica se o link é uma âncora para a mesma página
            const isSamePageHash =
                href.startsWith("#") ||
                href.startsWith(`${currentPathname}#`) ||
                (currentPathname === "/" && href.startsWith("/#"));

            if (isSamePageHash) {
                const hashIndex = href.indexOf("#");
                if (hashIndex === -1) return;
                const hash = href.substring(hashIndex);

                e.preventDefault();

                if (hash === "#" || hash === "#hero") {
                    lenis.scrollTo(0, {
                        duration: 1.5,
                        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                    });
                } else if (hash.length > 1) {
                    const el = document.querySelector(hash);
                    if (el) {
                        const styles = window.getComputedStyle(el);
                        const scrollMarginTop = parseInt(styles.scrollMarginTop, 10) || 0;
                        const offset = scrollMarginTop > 0 ? -scrollMarginTop : -110;

                        lenis.scrollTo(hash, {
                            duration: 1.5,
                            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                            offset: offset,
                        });
                    }
                }
            }
        };

        document.addEventListener("click", handleAnchorClick as EventListener);

        return () => {
            document.removeEventListener("click", handleAnchorClick as EventListener);
            gsap.ticker.remove(lenis.raf);
            lenis.destroy();
        };
    }, []);

    return null;
}
