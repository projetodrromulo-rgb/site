"use client";

import { forwardRef } from "react";
import Link from "next/link";
import { Calendar, ArrowRight, Clock } from "lucide-react";
import { BlogPost } from "../types";

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
                            <Link 
                                href={`/blog/${post.slug}`} 
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-[#0db9f2] text-sm font-bold tracking-tight hover:text-white transition-all group/link underline-offset-4 hover:underline"
                            >
                                Ler artigo
                                <ArrowRight size={14} className="group-hover/link:translate-x-1.5 transition-transform" />
                            </Link>
                        </div>
                    </div>
                </div>
            </article>
        );
    }
);

BlogPostCard.displayName = "BlogPostCard";
