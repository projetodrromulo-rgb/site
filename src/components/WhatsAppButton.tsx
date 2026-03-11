"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
    return (
        <motion.a
            href="https://wa.me/5511999999999"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 1
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="fixed bottom-8 right-8 z-[100] w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl shadow-[#25D366]/30 group"
            aria-label="Contato via WhatsApp"
        >
            {/* Ping effect */}
            <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 group-hover:animate-ping -z-10" />

            <MessageCircle size={32} />

            {/* Subtle Tooltip/Label */}
            <span className="absolute right-full mr-4 px-4 py-2 bg-primary-dark/80 backdrop-blur-md border border-white/10 text-white text-sm font-semibold rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap translate-x-2 group-hover:translate-x-0">
                Descubra como podemos ajudar você
            </span>
        </motion.a>
    );
}
