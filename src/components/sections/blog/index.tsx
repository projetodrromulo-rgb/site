"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { BlogSectionContent } from "./types";
import { BlogHeader, BlogPostCard } from "./_components";
import { useBlog } from "./hooks/use-blog";

interface BlogSectionProps {
    content: BlogSectionContent;
}

export default function BlogSection({ content }: BlogSectionProps) {
    const containerRef = useRef<HTMLElement>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [visibleItems, setVisibleItems] = useState(3.5);
    const posts = content.posts;
    const postsCount = posts.length;

    useBlog(containerRef);

    // Sync visible items with JS for boundary logic
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) setVisibleItems(1);
            else if (window.innerWidth < 1024) setVisibleItems(2.5);
            else setVisibleItems(3.5);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const maxIndex = Math.max(0, postsCount - Math.floor(visibleItems));

    const nextStep = () => {
        if (currentIndex < maxIndex) {
            setCurrentIndex(prev => prev + 1);
        }
    };

    const prevStep = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
        }
    };

    const isAtStart = currentIndex === 0;
    const isAtEnd = currentIndex >= maxIndex;

    return (
        <section
            id="blog"
            ref={containerRef}
            className="py-24 bg-[#f5f8f8] relative overflow-hidden"
        >
            {/* Light Pattern Texture */}
            <div className="absolute inset-0 opacity-[0.4] pointer-events-none"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230db9f2' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}
            />

            <div className="container mx-auto px-4 max-w-7xl relative z-10">
                <BlogHeader
                    badge={content.badge}
                    headline={content.headline}
                    description={content.description}
                />

                <div className="relative">
                    {/* Navigation Buttons - Flanking */}
                    <div className="absolute top-1/2 left-0 md:-left-4 lg:-left-16 -translate-y-1/2 z-20 blog-animate-footer opacity-0">
                        <button
                            onClick={prevStep}
                            disabled={isAtStart}
                            className={`group size-10 md:size-12 lg:size-14 rounded-full border border-[#112240]/10 bg-white/90 backdrop-blur-md shadow-xl flex items-center justify-center text-[#112240] hover:bg-[#0db9f2] hover:text-white transition-all duration-300 active:scale-95 ${isAtStart ? 'opacity-0 scale-90 pointer-events-none' : 'opacity-100 cursor-pointer'}`}
                            aria-label="Anterior"
                        >
                            <ChevronLeft size={20} className="md:size-24 group-hover:-translate-x-0.5 transition-transform" />
                        </button>
                    </div>

                    <div className="absolute top-1/2 right-0 md:-right-4 lg:-right-16 -translate-y-1/2 z-20 blog-animate-footer opacity-0">
                        <button
                            onClick={nextStep}
                            disabled={isAtEnd}
                            className={`group size-10 md:size-12 lg:size-14 rounded-full border border-[#112240]/10 bg-white/90 backdrop-blur-md shadow-xl flex items-center justify-center text-[#112240] hover:bg-[#0db9f2] hover:text-white transition-all duration-300 active:scale-95 ${isAtEnd ? 'opacity-0 scale-90 pointer-events-none' : 'opacity-100 cursor-pointer'}`}
                            aria-label="Próximo"
                        >
                            <ChevronRight size={20} className="md:size-24 group-hover:translate-x-0.5 transition-transform" />
                        </button>
                    </div>

                    {/* Carousel Container */}
                    <div className="overflow-hidden -mx-4 px-12 py-4 lg:mx-0 lg:px-1">
                        <motion.div
                            className="flex gap-4 md:gap-6 [--visible-items:1] md:[--visible-items:2.5] lg:[--visible-items:3.5]"
                            animate={{ 
                                x: `calc(-${currentIndex * 100}% - ${currentIndex * (visibleItems === 1 ? 16 : 24)}px)` 
                            }}
                            transition={{ 
                                type: "spring", 
                                stiffness: 200, 
                                damping: 25, 
                                mass: 0.8
                            }}
                        >
                            {posts.map((post, idx) => (
                                <div
                                    key={post.slug}
                                    className="w-full md:w-[calc(100%/var(--visible-items)-20px)] shrink-0"
                                >
                                    <BlogPostCard
                                        post={post}
                                        index={idx}
                                    />
                                </div>
                            ))}
                        </motion.div>
                    </div>

                </div>


                {/* View All Button */}
                <div className="flex justify-center mt-12 blog-animate-footer opacity-0">
                    <Link href="/blog">
                        <button
                            className="w-full md:w-auto px-10 py-4 bg-[#112240] text-slate-300 border border-white/10 rounded-full font-extrabold transition-all duration-300 shadow-lg hover:bg-[#0db9f2] hover:text-[#112240] hover:scale-105 active:scale-95"
                        >
                            {content.viewAllCta}
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
