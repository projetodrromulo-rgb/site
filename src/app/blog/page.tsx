"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
    Calendar,
    ArrowRight,
    Clock,
    Search,
    Share2,
    ArrowLeft,
    SearchX,
    ChevronRight,
    Home,
    FileText,
    CalendarDays,
    User
} from "lucide-react";
import Link from "next/link";
import { useState, useMemo, useEffect } from "react";
import { allPosts } from "@/components/sections/blog/data/posts";

const categories = ["Todos", "Prevenção", "Cirurgia", "Bem-estar"];

export default function BlogPage() {
    const [selectedCategory, setSelectedCategory] = useState("Todos");
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 9;

    const filteredPosts = useMemo(() => {
        return allPosts.filter(post => {
            const matchesCategory = selectedCategory === "Todos" || post.category === selectedCategory;
            const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [selectedCategory, searchQuery]);

    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
    const paginatedPosts = useMemo(() => {
        const startIndex = (currentPage - 1) * postsPerPage;
        return filteredPosts.slice(startIndex, startIndex + postsPerPage);
    }, [filteredPosts, currentPage]);

    // Handle scroll to top on page change
    useEffect(() => {
        if (currentPage > 1) {
            const timer = setTimeout(() => {
                const element = document.getElementById('blog-content');
                if (element) {
                    element.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }, 50); // Small delay to wait for layout shifts
            return () => clearTimeout(timer);
        }
    }, [currentPage]);

    // Reset pagination when filter changes
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedCategory, searchQuery]);

    return (
        <div className="bg-[#f5f8f8] dark:bg-[#0a191e] min-h-screen flex flex-col font-sans selection:bg-[#0db9f2]/30 overflow-x-hidden text-slate-900 dark:text-slate-100">
            {/* Header Section - Fixed Positioning */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-[#0A192F] dark:bg-[#0a191e]/90 backdrop-blur-md border-b border-white/5 dark:border-[#223f49]">
                <div className="flex items-center p-4 justify-between max-w-5xl mx-auto w-full gap-4">
                    <Link href="/#blog" className="text-[#0db9f2] flex size-12 shrink-0 items-center justify-center hover:bg-white/10 rounded-xl transition-all active:scale-95">
                        <ArrowLeft size={28} />
                    </Link>
                    <h2 className="text-white dark:text-slate-100 text-lg md:text-xl font-bold leading-tight tracking-tight flex-1 text-center font-display">
                        Blog e Artigos
                    </h2>
                    <div className="flex w-12 items-center justify-end">
                        {/* Space reserved for symmetry */}
                    </div>
                </div>
            </header>

            <main id="blog-content" className="flex-1 max-w-5xl mx-auto w-full px-4 pt-24 pb-32 scroll-mt-28">
                {/* Search Bar */}
                <div className="py-6">
                    <label className="flex flex-col w-full group">
                        <div className="flex w-full items-stretch rounded-xl h-14 bg-slate-100 dark:bg-[#162a31] border border-transparent focus-within:border-[#0db9f2] transition-all shadow-sm">
                            <div className="text-slate-400 dark:text-[#0db9f2]/60 flex items-center justify-center pl-4">
                                <Search size={22} />
                            </div>
                            <input
                                className="flex w-full min-w-0 flex-1 border-none bg-transparent focus:ring-0 h-full placeholder:text-slate-400 dark:placeholder:text-[#0db9f2]/40 px-4 text-base font-normal leading-normal text-slate-900 dark:text-slate-100"
                                placeholder="Pesquisar artigos médicos..."
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </label>
                </div>

                {/* Categories Scroll */}
                <div className="flex gap-3 pb-8 overflow-x-auto no-scrollbar scrollbar-hide">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full px-6 text-sm font-semibold transition-all shadow-sm ${selectedCategory === cat
                                ? "bg-[#0db9f2] text-white shadow-lg shadow-[#0db9f2]/20"
                                : "bg-slate-200 dark:bg-[#223f49] text-slate-700 dark:text-slate-200 font-medium hover:bg-[#0db9f2]/20"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Articles Grid */}
                <div className="min-h-[400px]">
                    <AnimatePresence mode="popLayout">
                        {paginatedPosts.length > 0 ? (
                            <motion.div
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                                layout
                            >
                                {paginatedPosts.map((post) => (
                                    <Link key={post.slug} href={`/blog/${post.slug}`} target="_blank" rel="noopener noreferrer">
                                        <motion.article
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            transition={{ duration: 0.3 }}
                                            className="flex flex-col gap-4 group cursor-pointer"
                                            layout
                                        >
                                            {/* Image Container with Stitch logic */}
                                            <div className="relative w-full aspect-[16/9] overflow-hidden rounded-xl bg-slate-200 dark:bg-[#162a31]">
                                                <div
                                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                                                    style={{ backgroundImage: `url("${post.image}")` }}
                                                />
                                                <div className="absolute top-3 left-3">
                                                    <span className="bg-[#0db9f2] px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white shadow-md">
                                                        {post.category}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Content Treatment */}
                                            <div className="flex flex-col gap-2 px-1">
                                                <p className="text-slate-500 dark:text-[#0db9f2]/60 text-[11px] font-bold uppercase tracking-[0.1em]">
                                                    {post.date} • {post.readTime} LEITURA
                                                </p>
                                                <h3 className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-snug group-hover:text-[#0db9f2] transition-colors line-clamp-2">
                                                    {post.title}
                                                </h3>
                                                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed line-clamp-2">
                                                    {post.excerpt}
                                                </p>
                                            </div>
                                        </motion.article>
                                    </Link>
                                ))}
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex flex-col items-center justify-center py-20 text-center"
                            >
                                <div className="bg-slate-100 dark:bg-[#162a31] p-6 rounded-full mb-4">
                                    <SearchX size={48} className="text-slate-400 dark:text-[#0db9f2]/40" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                                    Nenhum artigo encontrado
                                </h3>
                                <p className="text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
                                    Não encontramos resultados para sua busca ou categoria selecionada.
                                </p>
                                <button
                                    onClick={() => {
                                        setSearchQuery("");
                                        setSelectedCategory("Todos");
                                    }}
                                    className="mt-6 text-[#0db9f2] font-bold hover:underline"
                                >
                                    Limpar todos os filtros
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Pagination - Only visible if there are multiple pages */}
                {totalPages > 1 && (
                    <div className="mt-16 flex justify-center gap-2">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <button
                                key={page}
                                onClick={() => {
                                    setCurrentPage(page);
                                }}
                                className={`size-10 rounded-lg font-bold transition-all active:scale-95 ${currentPage === page
                                        ? "bg-[#0db9f2] text-white shadow-lg shadow-[#0db9f2]/20"
                                        : "bg-slate-200 dark:bg-[#223f49] text-slate-700 dark:text-slate-200 hover:bg-[#0db9f2]/20 shadow-sm"
                                    }`}
                            >
                                {page}
                            </button>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
