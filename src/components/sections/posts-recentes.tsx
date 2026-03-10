"use client";

import { motion } from "framer-motion";
import { Calendar, ArrowRight, Clock } from "lucide-react";
import Link from "next/link";
import { allPosts } from "@/data/posts";

const displayPosts = allPosts.slice(0, 3);

export function PostsRecentes() {
    return (
        <section id="blog" className="py-24 bg-[#f5f8f8] relative overflow-hidden">
            {/* Light Pattern Texture */}
            <div className="absolute inset-0 opacity-[0.4] pointer-events-none"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230db9f2' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}
            />

            <div className="container mx-auto px-4 max-w-7xl relative z-10">
                {/* Header Context */}
                <div className="mb-16 text-center lg:text-left">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-4xl"
                    >
                        <span className="text-[#0db9f2] font-bold tracking-[0.2em] text-xs uppercase mb-2 block">
                            Educação e Saúde
                        </span>
                        <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-4">
                            Blog da Saúde Vertebral
                        </h2>
                        <p className="text-slate-600 text-lg max-w-2xl">
                            Informações especializadas sobre tratamentos, prevenção e as últimas tecnologias em cirurgia de coluna.
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {displayPosts.map((post, idx) => (
                        <motion.article
                            key={post.slug}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 * (idx + 1) }}
                            className="group relative flex flex-col h-full"
                        >
                            {/* Card Content - Persistent Dark Blue Top Border (#1a3055) */}
                            <div className="relative z-10 flex flex-col h-full bg-[#112240] border border-white/5 border-t-2 border-t-[#1a3055] rounded-xl overflow-hidden transition-all duration-500 shadow-xl shadow-[#0db9f2]/5 group-hover:bg-[#1a3055] group-hover:-translate-y-2 group-hover:shadow-[0_-12px_30px_-10px_rgba(13,185,242,0.25)]">

                                {/* Image Container - Always Colorful */}
                                <div className="aspect-video w-full relative overflow-hidden bg-slate-800">
                                    <div className="absolute inset-0 bg-transparent z-10" />
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                                    />
                                    <div className="absolute top-3 left-3 z-20">
                                        <span className="px-3 py-1.5 rounded-md bg-[#0db9f2] text-white text-[10px] font-black uppercase tracking-wider shadow-md">
                                            {post.category}
                                        </span>
                                    </div>
                                </div>

                                {/* Text content - Permanent Lamp Area */}
                                <div className="p-6 flex flex-col flex-1 relative overflow-hidden">
                                    {/* Permanent Lamp Effect Layers */}
                                    <div className="absolute top-0 left-0 w-full h-[80%] pointer-events-none z-0">
                                        {/* Core Light glow over title */}
                                        <div className="absolute top-0 left-0 w-full h-full bg-[#0db9f2]/5 blur-[60px] rounded-full opacity-100" />
                                        {/* Subtle central focus */}
                                        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[60%] h-[40%] bg-white/[0.04] blur-[30px] rounded-full opacity-100" />
                                    </div>

                                    {/* Content inside the light */}
                                    <div className="relative z-10 space-y-4">
                                        <h3 className="text-white text-xl font-bold leading-snug group-hover:text-[#0db9f2] transition-colors duration-500">
                                            {post.title}
                                        </h3>

                                        <div className="flex items-center gap-3 text-white/50 text-xs font-semibold">
                                            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/40 border border-white/5 shadow-sm">
                                                <Calendar size={12} className="text-[#0db9f2]/70" /> {post.date}
                                            </span>
                                            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/40 border border-white/5 shadow-sm">
                                                <Clock size={12} className="text-[#0db9f2]/70" /> {post.readTime}
                                            </span>
                                        </div>
                                    </div>

                                    <p className="relative z-10 mt-6 text-white/60 text-sm leading-relaxed mb-6 line-clamp-2 italic font-light">
                                        "{post.excerpt}"
                                    </p>

                                    <div className="relative z-10 mt-auto pt-4 border-t border-white/5 flex items-center justify-end">
                                        <Link href={`/blog/${post.slug}`} className="flex items-center gap-2 text-[#0db9f2] text-sm font-bold tracking-tight hover:text-white transition-all group/link underline-offset-4 hover:underline">
                                            Ler artigo
                                            <ArrowRight size={14} className="group-hover/link:translate-x-1.5 transition-transform" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>

                {/* View All Button */}
                <div className="flex justify-center mt-16">
                    <Link href="/blog">
                        <motion.button
                            whileHover={{ scale: 1.05, backgroundColor: "#0db9f2", color: "#112240" }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full md:w-auto px-10 py-4 bg-[#112240] text-slate-300 border border-white/10 rounded-full font-extrabold transition-all duration-300 shadow-lg"
                        >
                            Ver Todos os Artigos
                        </motion.button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
