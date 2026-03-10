"use client";

import { motion } from "framer-motion";
import {
    ArrowLeft,
    Calendar,
    Clock,
    Share2,
    User,
    ChevronRight,
    ArrowRight,
    MessageCircle
} from "lucide-react";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { allPosts } from "@/data/posts";

export default function PostDetailPage() {
    const { slug } = useParams();
    const post = allPosts.find((p) => p.slug === slug);

    if (!post) {
        notFound();
    }

    const relatedPosts = allPosts
        .filter((p) => p.slug !== slug && p.category === post.category)
        .slice(0, 2);

    return (
        <div className="bg-[#f5f8f8] dark:bg-[#0a191e] min-h-screen flex flex-col font-sans selection:bg-[#0db9f2]/30 overflow-x-hidden text-slate-900 dark:text-slate-100">
            {/* Dark Blue Header - Fixed Positioning */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-[#0A192F] dark:bg-[#0a191e]/95 backdrop-blur-md border-b border-white/5">
                <div className="flex items-center p-4 justify-between max-w-5xl mx-auto w-full gap-4">
                    <Link href="/blog" className="text-[#0db9f2] flex size-12 shrink-0 items-center justify-center hover:bg-white/10 rounded-xl transition-all active:scale-95">
                        <ArrowLeft size={28} />
                    </Link>
                    <h2 className="text-white dark:text-slate-100 text-sm md:text-base font-bold leading-tight tracking-tight flex-1 text-center font-display line-clamp-1 pr-12 md:pr-0">
                        {post.title}
                    </h2>
                    <div className="hidden md:flex w-12 items-center justify-end" aria-hidden="true" />
                </div>
            </header>

            <main className="flex-1 max-w-4xl mx-auto w-full px-4 pt-24 pb-32">
                {/* Article Header */}
                <header className="mb-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="inline-block bg-[#0db9f2] px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white mb-4 shadow-sm">
                            {post.category}
                        </span>
                        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-slate-100 leading-[1.1] mb-6 tracking-tight">
                            {post.title}
                        </h1>

                        {/* Author & Meta */}
                        <div className="flex items-center gap-4 py-6 border-y border-slate-200 dark:border-[#223f49]">
                            <div className="size-12 rounded-full bg-[#0db9f2]/10 flex items-center justify-center border border-[#0db9f2]/20">
                                <User className="text-[#0db9f2]" size={24} />
                            </div>
                            <div className="flex-1">
                                <p className="text-slate-900 dark:text-slate-100 font-bold text-sm md:text-base">
                                    {post.author}
                                </p>
                                <p className="text-slate-500 dark:text-[#0db9f2]/60 text-xs md:text-sm font-medium">
                                    {post.authorRole} • {post.date}
                                </p>
                            </div>
                            <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-[#162a31] text-slate-500 dark:text-slate-300 text-xs font-bold">
                                <Clock size={14} /> {post.readTime}
                            </div>
                        </div>
                    </motion.div>
                </header>

                {/* Feature Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="relative w-full aspect-video md:aspect-[21/9] overflow-hidden rounded-3xl mb-12 shadow-2xl shadow-[#0db9f2]/10"
                >
                    <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover"
                    />
                </motion.div>

                {/* Content Rendering */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="prose prose-slate dark:prose-invert max-w-none 
                        prose-headings:font-display prose-headings:font-extrabold prose-headings:tracking-tight prose-headings:text-slate-900 dark:prose-headings:text-slate-100
                        prose-p:text-slate-700 dark:prose-p:text-slate-300 prose-p:leading-relaxed prose-p:text-lg
                        prose-blockquote:border-l-4 prose-blockquote:border-[#0db9f2] prose-blockquote:bg-[#0db9f2]/5 
                        prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-xl prose-blockquote:italic
                        prose-li:text-slate-700 dark:prose-li:text-slate-300 prose-li:text-lg
                        prose-img:rounded-2xl"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* CTA Card Section */}
                <section className="mt-20 p-8 rounded-3xl bg-gradient-to-br from-[#0A192F] to-[#112240] text-white relative overflow-hidden group shadow-2xl">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#0db9f2]/10 blur-[100px] rounded-full -mr-20 -mt-20" />
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="text-center md:text-left flex-1">
                            <h3 className="text-2xl md:text-3xl font-bold mb-3">Sente dores frequentes?</h3>
                            <p className="text-[#0db9f2] text-lg font-medium opacity-90">
                                Agende uma avaliação especializada com o Dr. Rômulo.
                            </p>
                        </div>
                        <a
                            href="https://wa.me/5511999999999"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#0db9f2] hover:bg-[#0db9f2]/90 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 transition-all active:scale-95 shadow-lg shadow-[#0db9f2]/20"
                        >
                            <MessageCircle size={22} />
                            Falar no WhatsApp
                        </a>
                    </div>
                </section>

                {/* Related Articles */}
                {relatedPosts.length > 0 && (
                    <section className="mt-24 border-t border-slate-200 dark:border-[#223f49] pt-16">
                        <h4 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 mb-10 flex items-center gap-3">
                            Artigos Relacionados
                            <div className="h-px flex-1 bg-slate-200 dark:bg-[#223f49]" />
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {relatedPosts.map((rp) => (
                                <Link key={rp.slug} href={`/blog/${rp.slug}`} className="group">
                                    <div className="flex flex-col gap-4">
                                        <div className="relative aspect-video overflow-hidden rounded-2xl bg-slate-200 dark:bg-[#162a31]">
                                            <img
                                                src={rp.image}
                                                alt={rp.title}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                        </div>
                                        <h5 className="text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-[#0db9f2] transition-colors leading-snug">
                                            {rp.title}
                                        </h5>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}
            </main>

            {/* Custom Styles for Animation */}
            <style jsx global>{`
                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .animate-fade-in {
                    animation: fade-in 0.8s ease forwards;
                }
                .animation-delay-300 {
                    animation-delay: 300ms;
                }
            `}</style>
        </div>
    );
}
