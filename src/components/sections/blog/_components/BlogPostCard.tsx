"use client";

import { forwardRef } from "react";
import Link from "next/link";
import { Calendar, ArrowRight, Clock } from "lucide-react";
import { BlogPost } from "../types";
import Image from "next/image";

// Converte data ISO do Sanity ("2026-07-02T23:30:00.000Z" ou "2026-07-02") para DD/MM/AAAA
function formatDate(isoDate: string): string {
    if (!isoDate) return "";
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(isoDate)) return isoDate;
    if (/^\d{2}-\d{2}-\d{4}$/.test(isoDate)) {
        return isoDate.replace(/-/g, "/");
    }
    try {
        const dateObj = new Date(isoDate);
        if (!isNaN(dateObj.getTime())) {
            return new Intl.DateTimeFormat("pt-BR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                timeZone: "America/Sao_Paulo",
            }).format(dateObj);
        }
    } catch {
        // fallback
    }
    const match = isoDate.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (match) {
        const [, year, month, day] = match;
        return `${day}/${month}/${year}`;
    }
    return isoDate;
}

interface BlogPostCardProps {
    post: BlogPost;
    index: number;
}

export const BlogPostCard = forwardRef<HTMLElement, BlogPostCardProps>(
    ({ post, index }, ref) => {
        return (
            <article
                ref={ref as any}
                className="blog-animate-card group relative flex flex-col h-full opacity-0"
            >
                {/* Card Content - Persistent Dark Blue Top Border (#1a3055) */}
                <div className="relative z-10 flex flex-col h-full min-h-[540px] bg-[#112240] border border-white/5 border-t-2 border-t-[#1a3055] rounded-xl overflow-hidden transition-all duration-500 shadow-xl shadow-[#0db9f2]/5 group-hover:bg-[#1a3055] group-hover:-translate-y-2 group-hover:shadow-[0_-12px_30px_-10px_rgba(13,185,242,0.25)]">
                    {/* Image Container - Always Colorful */}
                    <div className="aspect-[16/10] w-full relative overflow-hidden bg-slate-800">
                        <div className="absolute inset-0 bg-transparent z-10" />
                        <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover group-hover:scale-105 transition-all duration-700"
                        />
                        <div className="absolute top-3 left-3 z-20">
                            {/** <span className="px-3 py-1.5 rounded-md bg-[#0db9f2] text-white text-[10px] font-black uppercase tracking-wider shadow-md">
                                {post.category}
                            </span>
                             */}
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
                            <div className="flex items-center justify-between text-white/60 text-sm font-semibold">
                                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/40 border border-white/5 shadow-sm">
                                    <Calendar size={13} className="text-[#0db9f2]" /> {formatDate(post.date)}
                                </span>
                                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/40 border border-white/5 shadow-sm">
                                    <Clock size={13} className="text-[#0db9f2]" /> {post.readTime}
                                </span>
                            </div>

                            <h3 className="text-white text-xl md:text-2xl font-bold leading-snug group-hover:text-[#0db9f2] transition-colors duration-500 line-clamp-4 h-[7rem] flex items-start overflow-hidden">
                                {post.title}
                            </h3>
                        </div>

                        <p className="relative z-10 mt-4 text-white/70 text-base leading-relaxed mb-4 line-clamp-3 italic font-light h-[5rem] overflow-hidden">
                            "{typeof post.excerpt === "string" ? post.excerpt : ""}"
                        </p>

                        <div className="relative z-10 flex items-center justify-center my-4 w-full">
                            <Link
                                href={`/blog/${post.slug}`}
                                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#0a192f] text-white border border-white text-sm font-bold tracking-wide hover:bg-[#112240] hover:border-[#0db9f2] hover:text-[#0db9f2] hover:shadow-lg hover:shadow-[#0db9f2]/20 transition-all duration-300 group/btn"
                            >
                                Ler artigo
                                <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                            </Link>
                        </div>

                        <div className="relative z-10 mt-auto pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3 min-w-0">
                                <div className="size-11 rounded-full overflow-hidden shrink-0 border border-white/10 shadow-sm">
                                    <Image
                                        src="/images/avatar.png"
                                        alt="Dr. Rômulo Oliveira"
                                        width={44}
                                        height={44}
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                                <div className="flex flex-col min-w-0">
                                    <span className="text-[11px] md:text-xs font-bold uppercase tracking-wider text-white/50 leading-tight">
                                        Escrito por
                                    </span>
                                    <p className="text-white font-bold text-sm md:text-base leading-tight mt-0.5 truncate">
                                        Dr. Rômulo Oliveira
                                    </p>
                                    <p className="text-[#0db9f2] text-xs md:text-sm font-medium leading-tight mt-0.5 truncate">
                                        Ortopedista e Cirurgia de Coluna
                                    </p>
                                    <p className="text-white/50 text-[11px] md:text-xs font-medium leading-tight mt-0.5 truncate">
                                        CRM 73889 | RQE 59057 | TEOT 19406
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        );
    }
);

BlogPostCard.displayName = "BlogPostCard";
