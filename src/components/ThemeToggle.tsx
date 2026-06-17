"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
    const [theme, setTheme] = useState<"light" | "dark">("dark");

    useEffect(() => {
        // Check initial theme state on mount
        const isLight = document.documentElement.classList.contains("light");
        setTheme(isLight ? "light" : "dark");
    }, []);

    const toggleTheme = () => {
        const nextTheme = theme === "dark" ? "light" : "dark";
        setTheme(nextTheme);

        if (nextTheme === "light") {
            document.documentElement.classList.remove("dark");
            document.documentElement.classList.add("light");
            localStorage.setItem("theme", "light");
        } else {
            document.documentElement.classList.remove("light");
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        }
    };

    return (
        <button
            onClick={toggleTheme}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 dark:bg-white/5 dark:hover:bg-white/10 border border-white/10 transition-all duration-300 active:scale-95 text-[#0db9f2] cursor-pointer"
            aria-label="Alternar tema claro/escuro"
        >
            {theme === "dark" ? (
                <Sun className="w-5 h-5 animate-fade-in" />
            ) : (
                <Moon className="w-5 h-5 animate-fade-in text-[#0B2B40]" />
            )}
        </button>
    );
}
