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

// Converte data ISO do Sanity ("2026-07-02") para DD-MM-AAAA
// Usa manipulação direta de string para evitar dependência de ICU/locale do Node.js
function formatDate(isoDate: string): string {
    if (!isoDate) return "";
    if (!/^\d{4}-\d{2}-\d{2}/.test(isoDate)) return isoDate;
    const [year, month, day] = isoDate.split("-");
    return `${day}-${month}-${year}`;
}
function parsePostDate(dateStr?: string): number {
    if (!dateStr) return 0;
    if (/^\d{2}-\d{2}-\d{4}$/.test(dateStr)) {
        const [d, m, y] = dateStr.split("-");
        return new Date(`${y}-${m}-${d}`).getTime();
    }
    const timestamp = Date.parse(dateStr);
    return isNaN(timestamp) ? 0 : timestamp;
}

const categories = ["Todos", "Exames de Imagem", "Saúde de Coluna"];

interface BlogPageClientProps {
    initialPosts: any[];
}

export default function BlogPageClient({ initialPosts }: BlogPageClientProps) {
    const [selectedCategory, setSelectedCategory] = useState("Todos");
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 9;

    const filteredPosts = useMemo(() => {
        const filtered = initialPosts.filter(post => {
            const matchesCategory = selectedCategory === "Todos" ||
                (post.category && (
                    post.category.toLowerCase().trim() === selectedCategory.toLowerCase().trim() ||
                    (selectedCategory === "Saúde de Coluna" && (
                        post.category.toLowerCase().trim() === "saúde da coluna" ||
                        post.category.toLowerCase().trim() === "saúde de coluna"
                    ))
                ));
            const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (post.excerpt && post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()));
            return matchesCategory && matchesSearch;
        });

        return filtered.sort((a, b) => {
            const timeA = parsePostDate(a.date || a._createdAt);
            const timeB = parsePostDate(b.date || b._createdAt);
            return timeB - timeA;
        });
    }, [initialPosts, selectedCategory, searchQuery]);

    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
    const paginatedPosts = useMemo(() => {
        const startIndex = (currentPage - 1) * postsPerPage;
        return filteredPosts.slice(startIndex, startIndex + postsPerPage);
    }, [filteredPosts, currentPage]);

    // Reset scroll to top on initial page mount
    useEffect(() => {
        if (typeof window !== "undefined" && !window.location.hash) {
            window.scrollTo(0, 0);
            if ((window as any).__lenis) {
                (window as any).__lenis.scrollTo(0, { immediate: true });
            }
        }
    }, []);

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
        <div className="bg-[#f5f8f8] min-h-screen flex flex-col font-sans selection:bg-[#0db9f2]/30 overflow-x-hidden text-slate-900">
            <main id="blog-content" className="flex-1 max-w-5xl mx-auto w-full px-4 pt-28 md:pt-32 pb-32 scroll-mt-28">
                {/* Botão Voltar para a Seção Blog da Home */}
                <div className="pt-2 pb-4">
                    <Link
                        href="/#blog"
                        className="inline-flex items-center gap-2 text-slate-600 hover:text-[#0db9f2] font-semibold text-sm transition-colors py-2 px-3.5 rounded-xl hover:bg-slate-200/60 active:scale-95 group"
                    >
                        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                        <span>Voltar para o Início</span>
                    </Link>
                </div>

                {/* Search Bar */}
                <div className="py-6">
                    <label className="flex flex-col w-full group">
                        <div className="flex w-full items-stretch rounded-xl h-14 bg-slate-100 border border-slate-200 focus-within:border-[#0db9f2] transition-all shadow-sm">
                            <div className="text-slate-400 flex items-center justify-center pl-4">
                                <Search size={22} />
                            </div>
                            <input
                                className="flex w-full min-w-0 flex-1 border-none bg-transparent focus:ring-0 h-full placeholder:text-slate-400 px-4 text-base font-normal leading-normal text-slate-900"
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
                                : "bg-slate-200 text-slate-700 font-medium hover:bg-[#0db9f2]/20"
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
                                    <Link key={post.slug} href={`/blog/${post.slug}`}>
                                        <motion.article
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            transition={{ duration: 0.3 }}
                                            className="flex flex-col gap-4 group cursor-pointer"
                                            layout
                                        >
                                            {/* Image Container with Stitch logic */}
                                            <div className="relative w-full aspect-[16/9] overflow-hidden rounded-xl bg-slate-100">
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
                                                <p className="text-slate-500 text-[11px] font-bold uppercase tracking-[0.1em]">
                                                    {formatDate(post.date)} • {post.readTime} LEITURA
                                                </p>
                                                <h3 className="text-slate-900 text-lg font-bold leading-snug group-hover:text-[#0db9f2] transition-colors line-clamp-2">
                                                    {post.title}
                                                </h3>
                                                <p className="text-slate-600 text-sm leading-relaxed line-clamp-2">
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
                                <div className="bg-slate-100 p-6 rounded-full mb-4">
                                    <SearchX size={48} className="text-slate-400" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">
                                    Nenhum artigo encontrado
                                </h3>
                                <p className="text-slate-500 max-w-xs mx-auto">
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
                                    : "bg-slate-200 text-slate-700 hover:bg-[#0db9f2]/20 shadow-sm"
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
