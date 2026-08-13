"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function LenisInit() {
    const pathname = usePathname();
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // standard quintic
        });

        lenisRef.current = lenis;
        (window as any).__lenis = lenis;

        // Sincroniza o ScrollTrigger com o Lenis
        lenis.on('scroll', ScrollTrigger.update);

        const updateRaf = (time: number) => {
            lenis.raf(time * 1000);
        };

        gsap.ticker.add(updateRaf);
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
            gsap.ticker.remove(updateRaf);
            lenis.destroy();
            lenisRef.current = null;
            delete (window as any).__lenis;
        };
    }, []);

    // Reseta o scroll para o topo sempre que a rota mudar (a menos que haja um hash na URL)
    useEffect(() => {
        const resetScroll = () => {
            const hash = window.location.hash;
            if (hash) {
                const el = document.querySelector(hash);
                if (el) {
                    const styles = window.getComputedStyle(el);
                    const scrollMarginTop = parseInt(styles.scrollMarginTop, 10) || 0;
                    const offset = scrollMarginTop > 0 ? -scrollMarginTop : -110;
                    if (lenisRef.current) {
                        lenisRef.current.scrollTo(hash, { immediate: true, offset });
                    }
                    setTimeout(() => ScrollTrigger.refresh(), 100);
                    return;
                }
            }

            if (lenisRef.current) {
                lenisRef.current.scrollTo(0, { immediate: true });
            }
            window.scrollTo(0, 0);
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
            setTimeout(() => ScrollTrigger.refresh(), 100);
        };

        const timer = setTimeout(resetScroll, 10);
        return () => clearTimeout(timer);
    }, [pathname]);

    return null;
}

