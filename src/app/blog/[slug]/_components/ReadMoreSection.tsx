"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen, Clock } from "lucide-react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import { useState } from "react";

export interface RelatedPostItem {
  title: string;
  slug: string;
  publishedAt?: string;
  _createdAt?: string;
  readTime?: string;
  category?: string;
  excerpt?: string;
  image?: string | { url?: string; alt?: string };
}

interface ReadMoreSectionProps {
  posts: RelatedPostItem[];
}

// Apple-style critically damped springs (damping ratio 1.0 → bounce: 0)
const FLUID_SPRING = {
  type: "spring" as const,
  bounce: 0,
  duration: 0.36,
};

const PRESS_SPRING = {
  type: "spring" as const,
  bounce: 0,
  duration: 0.2,
};

function resolveImage(image: RelatedPostItem["image"], fallbackAlt: string) {
  if (!image) return { url: "", alt: fallbackAlt };
  if (typeof image === "string") return { url: image, alt: fallbackAlt };
  return { url: image.url || "", alt: image.alt || fallbackAlt };
}

function cleanExcerpt(excerpt?: string): string {
  if (!excerpt || typeof excerpt !== "string") return "";
  return excerpt.replace(/[\r\n]+/g, " ").replace(/\s+/g, " ").trim();
}

function ReadMoreRow({
  post,
  index,
  isLast,
  prefersReducedMotion,
}: {
  post: RelatedPostItem;
  index: number;
  isLast: boolean;
  prefersReducedMotion: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  // Subtle 1:1 pointer-tracked radial highlight (compositor-friendly, zero re-renders)
  const specularBackground = useMotionTemplate`radial-gradient(360px circle at ${pointerX}px ${pointerY}px, rgba(13, 185, 242, 0.08), transparent 72%)`;

  const { url: imageUrl, alt: imageAlt } = resolveImage(post.image, post.title);
  const excerptText = cleanExcerpt(post.excerpt);

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (prefersReducedMotion || e.pointerType !== "mouse") return;
    const rect = e.currentTarget.getBoundingClientRect();
    pointerX.set(e.clientX - rect.left);
    pointerY.set(e.clientY - rect.top);
  };

  return (
    <motion.article
      initial={
        prefersReducedMotion
          ? { opacity: 0 }
          : { opacity: 0, y: 14 }
      }
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={
        prefersReducedMotion
          ? { duration: 0.2, ease: "easeOut" }
          : { ...FLUID_SPRING, delay: index * 0.05 }
      }
      className={isLast ? "" : "border-b border-slate-900/[0.08]"}
    >
      <motion.div
        onPointerMove={handlePointerMove}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileTap={prefersReducedMotion ? undefined : { scale: 0.99 }}
        transition={PRESS_SPRING}
        className="py-4 sm:py-5"
      >
        <Link
          href={`/blog/${post.slug}`}
          className="apple-readmore-row group relative -mx-3 flex flex-col gap-4 overflow-hidden rounded-2xl px-3 py-3 transition-colors duration-200 hover:bg-white/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0db9f2] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f5f8f8] sm:flex-row sm:items-center sm:gap-6 md:gap-8"
        >
          {/* 1:1 pointer-tracked subtle light */}
          {!prefersReducedMotion && (
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
              style={{
                background: specularBackground,
                opacity: isHovered ? 1 : 0,
              }}
            />
          )}

          {/* Left Thumbnail (16:9) */}
          <div className="relative z-10 aspect-[16/9] w-full shrink-0 overflow-hidden rounded-xl border border-slate-900/[0.08] bg-slate-200/70 shadow-xs sm:w-[220px] md:w-[260px]">
            {imageUrl ? (
              <motion.div
                className="relative h-full w-full"
                animate={
                  prefersReducedMotion
                    ? undefined
                    : { scale: isHovered ? 1.035 : 1 }
                }
                transition={FLUID_SPRING}
              >
                <Image
                  src={imageUrl}
                  alt={imageAlt}
                  fill
                  sizes="(max-width: 640px) 100vw, 260px"
                  className="object-cover"
                />
              </motion.div>
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#0A192F] to-[#112240]">
                <BookOpen className="size-7 text-[#0db9f2]/70" aria-hidden="true" />
              </div>
            )}
          </div>

          {/* Right Editorial Info */}
          <div className="relative z-10 flex min-w-0 flex-1 items-center justify-between gap-4">
            <div className="min-w-0 flex-1">
              {/* Small uppercase category + readTime with slight positive tracking */}
              <div className="mb-2 flex flex-wrap items-center gap-2 text-[0.6875rem] font-semibold uppercase tracking-[0.06em] text-slate-500">
                {post.category && (
                  <span className="truncate text-slate-500 transition-colors duration-200 group-hover:text-[#0284c7]">
                    {post.category}
                  </span>
                )}
                {post.category && post.readTime && (
                  <span aria-hidden="true" className="text-slate-300">
                    ·
                  </span>
                )}
                {post.readTime && (
                  <span className="inline-flex items-center gap-1 normal-case tracking-[0.02em] text-slate-400">
                    <Clock className="size-3" aria-hidden="true" />
                    {post.readTime}
                  </span>
                )}
              </div>

              {/* Crisp negative-tracked article title */}
              <h3
                className="line-clamp-2 text-[1.125rem] font-bold leading-[1.3] tracking-[-0.018em] text-slate-900 transition-colors duration-200 group-hover:text-[#0A192F] md:text-[1.25rem]"
                style={{ fontOpticalSizing: "auto" }}
              >
                {post.title.trim()}
              </h3>

              {/* Article context / excerpt with comfortable body leading */}
              {excerptText && (
                <p className="mt-2 line-clamp-2 text-[0.875rem] leading-[1.55] tracking-[0em] text-slate-600 md:text-[0.9375rem]">
                  {excerptText}
                </p>
              )}
            </div>

            {/* Subtle forward hint on desktop */}
            <motion.span
              aria-hidden="true"
              animate={
                prefersReducedMotion ? undefined : { x: isHovered ? 4 : 0 }
              }
              transition={FLUID_SPRING}
              className="hidden size-9 shrink-0 items-center justify-center rounded-full border border-slate-900/[0.06] bg-white/80 text-slate-500 shadow-2xs transition-colors duration-200 group-hover:border-[#0db9f2]/30 group-hover:bg-[#0db9f2]/10 group-hover:text-[#0284c7] sm:inline-flex"
            >
              <ArrowRight className="size-4" />
            </motion.span>
          </div>
        </Link>
      </motion.div>
    </motion.article>
  );
}

export function ReadMoreSection({ posts }: ReadMoreSectionProps) {
  const prefersReducedMotion = Boolean(useReducedMotion());
  const visiblePosts = Array.isArray(posts) ? posts.slice(0, 3) : [];

  if (visiblePosts.length === 0) {
    return null;
  }

  return (
    <section
      id="leia-tambem"
      aria-labelledby="leia-tambem-heading"
      className="mt-20 scroll-mt-28"
    >
      {/* Editorial Section Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="apple-readmore-badge mb-3 inline-flex items-center rounded-lg border border-slate-900/[0.1] px-3 py-1 font-mono text-[0.75rem] font-medium tracking-[0.02em] text-slate-700">
            Continue sua leitura
          </span>
          <h2
            id="leia-tambem-heading"
            className="font-display text-[1.875rem] font-extrabold leading-[1.1] tracking-[-0.025em] text-slate-900 md:text-[2.25rem]"
            style={{ fontOpticalSizing: "auto" }}
          >
            Leia Também
          </h2>
        </div>

        <motion.div
          whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
          transition={PRESS_SPRING}
          className="self-start sm:self-auto"
        >
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 rounded-full border border-slate-900/[0.08] bg-white/80 px-4 py-2 text-[0.8125rem] font-semibold tracking-[0.01em] text-slate-700 shadow-2xs backdrop-blur-md transition-colors duration-200 hover:border-[#0db9f2]/40 hover:bg-white hover:text-[#0284c7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0db9f2] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f5f8f8]"
          >
            <span>Ver todos os artigos</span>
            <ArrowRight
              className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </motion.div>
      </div>

      {/* Editorial Vertical List (3 Horizontal Rows) */}
      <div className="border-t border-slate-900/[0.08]">
        {visiblePosts.map((item, idx) => (
          <ReadMoreRow
            key={item.slug}
            post={item}
            index={idx}
            isLast={idx === visiblePosts.length - 1}
            prefersReducedMotion={prefersReducedMotion}
          />
        ))}
      </div>
    </section>
  );
}
