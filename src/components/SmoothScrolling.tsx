"use client";

import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

export default function SmoothScrolling({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // standard quintic
        });

        // Intercepta todos os links âncora dinamicamente usando delegação de eventos
        const handleAnchorClick = (e: MouseEvent) => {
            const target = (e.target as HTMLElement).closest('a');
            if (!target) return;

            const hash = target.getAttribute("href");
            if (hash && hash.startsWith("#")) {
                e.preventDefault();

                if (hash === "#") {
                    // Se for apenas "#", volta para o topo da página suavemente
                    lenis.scrollTo(0, {
                        duration: 2.5,
                        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                    });
                } else if (hash.length > 1 && document.querySelector(hash)) {
                    // Se houver um ID válido de destino
                    lenis.scrollTo(hash, {
                        duration: 2.5, // Scroll suave e beeeem lento (2.5 segundos)
                        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                    });
                }
            }
        };

        // Adiciona o listener no document para pegar cliques em novos elementos inseridos
        document.addEventListener("click", handleAnchorClick as EventListener);

        let rafId: number;

        function raf(time: number) {
            lenis.raf(time);
            rafId = requestAnimationFrame(raf);
        }

        rafId = requestAnimationFrame(raf);

        return () => {
            document.removeEventListener("click", handleAnchorClick as EventListener);
            cancelAnimationFrame(rafId);
            lenis.destroy();
        };
    }, []);

    return <>{children}</>;
}
