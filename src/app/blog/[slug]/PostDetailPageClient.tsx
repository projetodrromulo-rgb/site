"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Clock, ChevronDown, ChevronUp, AlignLeft, HelpCircle, BookOpen, Sparkles, Book } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Logo } from "@/components/sections/hero/_components/logo";
import { CtaWhatsApp } from "@/components/shared/cta-whatsapp";
import Image from "next/image";
import { urlFor } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";
import { useState, useEffect } from "react";
import Footer from "@/components/sections/footer";

function slugify(text: string) {
    return text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-");
}

function parseHtmlReferences(html: string): { title: string; items: string[] }[] {
    if (typeof window === "undefined") {
        return [{ title: "Referências Fundamentais", items: [html] }];
    }
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const groups: { title: string; items: string[] }[] = [];
    let currentGroup: { title: string; items: string[] } | null = null;

    Array.from(doc.body.children).forEach((el) => {
        const tagName = el.tagName.toLowerCase();
        if (["h2", "h3", "h4"].includes(tagName)) {
            currentGroup = {
                title: el.textContent || "",
                items: []
            };
            groups.push(currentGroup);
        } else if (tagName === "ul" || tagName === "ol") {
            Array.from(el.children).forEach((li) => {
                if (!currentGroup) {
                    currentGroup = { title: "Referências Fundamentais", items: [] };
                    groups.push(currentGroup);
                }
                currentGroup.items.push(li.innerHTML);
            });
        } else {
            const htmlContent = el.innerHTML.trim();
            if (htmlContent) {
                if (!currentGroup) {
                    currentGroup = { title: "Referências Fundamentais", items: [] };
                    groups.push(currentGroup);
                }
                currentGroup.items.push(htmlContent);
            }
        }
    });

    if (groups.length === 0 && html) {
        return [{ title: "Referências Fundamentais", items: [html] }];
    }

    return groups;
}

interface ReferencesSectionProps {
    referencesContent: any;
    processedReferencesHtml: string;
}

function ReferencesSection({ referencesContent, processedReferencesHtml }: ReferencesSectionProps) {
    const isStructured = Array.isArray(referencesContent) && typeof referencesContent[0] === "string";

    const parsedPortableTextGroups = (() => {
        if (isStructured || !referencesContent || !Array.isArray(referencesContent)) return null;
        const groups: { title: string; blocks: any[] }[] = [];
        let currentGroup: { title: string; blocks: any[] } | null = null;

        referencesContent.forEach((block: any) => {
            const isHeading = block._type === "block" && ["h2", "h3", "h4"].includes(block.style);
            if (isHeading) {
                const titleText = block.children ? block.children.map((c: any) => c.text).join("") : "";
                currentGroup = {
                    title: titleText,
                    blocks: []
                };
                groups.push(currentGroup);
            } else {
                if (!currentGroup) {
                    currentGroup = {
                        title: "Referências Fundamentais",
                        blocks: []
                    };
                    groups.push(currentGroup);
                }
                currentGroup.blocks.push(block);
            }
        });
        return groups;
    })();

    const [htmlGroups, setHtmlGroups] = useState<{ title: string; items: string[] }[]>([]);

    useEffect(() => {
        if (processedReferencesHtml) {
            setHtmlGroups(parseHtmlReferences(processedReferencesHtml));
        }
    }, [processedReferencesHtml]);

    const getCardMeta = (title: string, index: number) => {
        const lowerTitle = title.toLowerCase();

        const schemes = [
            { icon: "📚", bg: "bg-cyan-50 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-400", ring: "ring-cyan-500/10" },
            { icon: "📊", bg: "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400", ring: "ring-indigo-500/10" },
            { icon: "🧠", bg: "bg-pink-50 dark:bg-pink-950/40 text-pink-600 dark:text-pink-400", ring: "ring-pink-500/10" },
            { icon: "🌱", bg: "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400", ring: "ring-emerald-500/10" },
            { icon: "🛡️", bg: "bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400", ring: "ring-amber-500/10" }
        ];

        if (lowerTitle.includes("livro") || lowerTitle.includes("academic") || lowerTitle.includes("bibliograf") || lowerTitle.includes("fundament")) {
            return { icon: "📚", bg: "bg-cyan-50 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-400", ring: "ring-cyan-500/10" };
        }
        if (lowerTitle.includes("revis") || lowerTitle.includes("meta") || lowerTitle.includes("artigo") || lowerTitle.includes("estudo")) {
            return { icon: "📊", bg: "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400", ring: "ring-indigo-500/10" };
        }
        if (lowerTitle.includes("neuro") || lowerTitle.includes("memoria") || lowerTitle.includes("cerebro") || lowerTitle.includes("cognit")) {
            return { icon: "🧠", bg: "bg-pink-50 dark:bg-pink-950/40 text-pink-600 dark:text-pink-400", ring: "ring-pink-500/10" };
        }

        return schemes[index % schemes.length];
    };

    const getFlatCardTitle = (text: string) => {
        const lower = text.toLowerCase();
        if (lower.includes("guideline") || lower.includes("diretriz") || lower.includes("recommendation")) {
            return "Diretrizes Clínicas";
        }
        if (lower.includes("review") || lower.includes("meta-analysis") || lower.includes("metanálise")) {
            return "Revisão e Metanálise";
        }
        if (lower.includes("book") || lower.includes("livro")) {
            return "Livro Acadêmico";
        }
        if (lower.includes("trial") || lower.includes("clinical") || lower.includes("estudo") || lower.includes("randomized")) {
            return "Estudo Clínico";
        }
        return "Artigo Científico";
    };

    const renderCard = (title: string, itemsContent: React.ReactNode, index: number) => {
        const borderColor = "border-t-primary-dark";

        return (
            <div
                key={title + index}
                className={`bg-white dark:bg-[#0c1a20] rounded-[2rem] p-8 border border-slate-100 dark:border-neutral-800/80 border-t-4 ${borderColor} shadow-md flex flex-col items-start hover:shadow-lg transition-shadow duration-300`}
            >
                {/* References List */}
                <div className="flex flex-col gap-6 w-full text-left">
                    {itemsContent}
                </div>
            </div>
        );
    };

    const isFlatPortableText = parsedPortableTextGroups
        ? (parsedPortableTextGroups.length <= 1 && (parsedPortableTextGroups[0]?.title === "Referências Fundamentais" || parsedPortableTextGroups[0]?.title === "Referências Científicas"))
        : false;

    const isFlatHtml = htmlGroups.length <= 1 && (htmlGroups[0]?.title === "Referências Fundamentais" || htmlGroups[0]?.title === "Referências Científicas");

    if (isStructured) {
        return (
            <div className="grid grid-cols-1 gap-6">
                {(referencesContent as string[]).map((ref: string, idx: number) => (
                    <div
                        key={idx}
                        className="bg-white dark:bg-[#0c1a20] rounded-[2rem] p-8 border border-slate-100 dark:border-neutral-800/80 border-t-4 border-t-primary-dark shadow-md flex flex-col items-start hover:shadow-lg transition-shadow duration-300 w-full text-slate-655 dark:text-slate-300 text-sm leading-relaxed font-sans text-left"
                    >
                        {ref}
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-6">
            {/* 1. PortableText groups */}
            {parsedPortableTextGroups && !isFlatPortableText && parsedPortableTextGroups.map((group, index) => {
                const itemsContent = group.blocks.map((block, bIdx) => (
                    <div key={bIdx} className="text-sm text-slate-650 dark:text-slate-300 leading-relaxed font-sans prose prose-slate dark:prose-invert max-w-none prose-p:my-0 prose-strong:text-slate-800 dark:prose-strong:text-slate-100 prose-strong:font-bold prose-em:italic">
                        <PortableText
                            value={[block]}
                            components={{
                                block: {
                                    normal: ({ children }) => <p className="text-sm text-slate-650 dark:text-slate-300 leading-relaxed">{children}</p>
                                },
                                listItem: {
                                    bullet: ({ children }) => <p className="text-sm text-slate-650 dark:text-slate-300 leading-relaxed">{children}</p>,
                                    number: ({ children }) => <p className="text-sm text-slate-650 dark:text-slate-300 leading-relaxed">{children}</p>
                                },
                                marks: {
                                    strong: ({ children }) => <strong className="font-bold text-slate-800 dark:text-slate-100">{children}</strong>,
                                    em: ({ children }) => <span className="italic text-slate-505 dark:text-neutral-455">{children}</span>
                                }
                            }}
                        />
                    </div>
                ));
                return renderCard(group.title, itemsContent, index);
            })}

            {/* 2. Flat PortableText items (each item is a card) */}
            {parsedPortableTextGroups && isFlatPortableText && parsedPortableTextGroups[0].blocks.map((block, index) => {
                const textContent = block.children ? block.children.map((c: any) => c.text).join("") : "";
                const title = getFlatCardTitle(textContent);
                const itemsContent = (
                    <div className="text-sm text-slate-655 dark:text-slate-300 leading-relaxed font-sans prose prose-slate dark:prose-invert max-w-none prose-p:my-0 prose-strong:text-slate-800 dark:prose-strong:text-slate-100 prose-strong:font-bold prose-em:italic">
                        <PortableText
                            value={[block]}
                            components={{
                                block: {
                                    normal: ({ children }) => <p className="text-sm text-slate-655 dark:text-slate-300 leading-relaxed">{children}</p>
                                },
                                listItem: {
                                    bullet: ({ children }) => <p className="text-sm text-slate-655 dark:text-slate-300 leading-relaxed">{children}</p>,
                                    number: ({ children }) => <p className="text-sm text-slate-655 dark:text-slate-300 leading-relaxed">{children}</p>
                                },
                                marks: {
                                    strong: ({ children }) => <strong className="font-bold text-slate-800 dark:text-slate-100">{children}</strong>,
                                    em: ({ children }) => <span className="italic text-slate-505 dark:text-neutral-455">{children}</span>
                                }
                            }}
                        />
                    </div>
                );
                return renderCard(title, itemsContent, index);
            })}

            {/* 3. HTML groups */}
            {!parsedPortableTextGroups && !isFlatHtml && htmlGroups.map((group, index) => {
                const itemsContent = group.items.map((itemHtml, iIdx) => (
                    <div
                        key={iIdx}
                        className="text-sm text-slate-650 dark:text-slate-300 leading-relaxed font-sans [&>strong]:text-slate-800 [&>strong]:dark:text-slate-100 [&>strong]:font-bold [&>em]:italic [&>em]:text-slate-500 [&>em]:dark:text-neutral-455"
                        dangerouslySetInnerHTML={{ __html: itemHtml }}
                    />
                ));
                return renderCard(group.title, itemsContent, index);
            })}

            {/* 4. Flat HTML items (each item is a card) */}
            {!parsedPortableTextGroups && isFlatHtml && htmlGroups[0]?.items.map((itemHtml, index) => {
                const plainText = itemHtml.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
                const title = getFlatCardTitle(plainText);
                const itemsContent = (
                    <div
                        className="text-sm text-slate-650 dark:text-slate-300 leading-relaxed font-sans [&>strong]:text-slate-800 [&>strong]:dark:text-slate-100 [&>strong]:font-bold [&>em]:italic [&>em]:text-slate-500 [&>em]:dark:text-neutral-455"
                        dangerouslySetInnerHTML={{ __html: itemHtml }}
                    />
                );
                return renderCard(title, itemsContent, index);
            })}
        </div>
    );
}

const ptComponents = {
    types: {
        image: ({ value }: any) => {
            if (!value?.asset) return null;
            const imageUrl = urlFor(value).url();
            return (
                <div className="relative w-full aspect-video overflow-hidden rounded-3xl my-12 shadow-xl border border-slate-100 dark:border-neutral-800">
                    <img
                        src={imageUrl}
                        alt={value.alt || 'Imagem do Artigo'}
                        className="object-cover w-full h-full"
                    />
                </div>
            );
        }
    },
    block: {
        h2: ({ value, children }: any) => {
            const text = value.children.map((c: any) => c.text).join("");
            const id = slugify(text);
            return <h2 id={id} className="text-3xl md:text-4xl mt-16 mb-8 leading-tight font-display font-black tracking-tight text-slate-900 dark:text-slate-100 scroll-mt-24">{children}</h2>;
        },
        h3: ({ value, children }: any) => {
            const text = value.children.map((c: any) => c.text).join("");
            const id = slugify(text);
            return <h3 id={id} className="text-2xl md:text-3xl mt-12 mb-6 leading-tight font-display font-black tracking-tight text-slate-900 dark:text-slate-100 scroll-mt-24">{children}</h3>;
        }
    }
};

interface PostDetailPageClientProps {
    initialData: any;
}

export default function PostDetailPageClient({ initialData }: PostDetailPageClientProps) {
    const {
        post,
        logoData,
        relatedPosts,
        ctaTitle,
        ctaDescription,
        tocItems,
        processedHtml,
        cleanedContent,
        faqItems,
        referencesContent,
        processedReferencesHtml,
        disclaimer,
        footerContent
    } = initialData;

    const [tocExpanded, setTocExpanded] = useState(true);
    const DISCLAIMER_DEFAULT = "Este conteúdo possui caráter meramente educativo e informativo. Não substitui consulta médica. Agende uma consulta com um médico especialista se notar dores persistentes ou que se irradiam para as pernas.";
    const disclaimerText = disclaimer ?? DISCLAIMER_DEFAULT;

    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const [activeId, setActiveId] = useState<string>("");

    useEffect(() => {
        if (tocItems.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                // Find all entries that are intersecting the rootMargin area
                const visibleEntries = entries.filter((entry) => entry.isIntersecting);
                if (visibleEntries.length > 0) {
                    // Use the first intersecting one from the top
                    setActiveId(visibleEntries[0].target.id);
                }
            },
            {
                // Check if element is in the top/middle section of the viewport (accounting for header)
                rootMargin: "-120px 0px -60% 0px",
                threshold: 0,
            }
        );

        tocItems.forEach((item: any) => {
            const el = document.getElementById(item.id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [tocItems]);

    const toggleFaq = (index: number) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    const TocCard = () => {
        if (tocItems.length === 0) return null;
        return (
            <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden w-full mt-8">
                <div
                    onClick={() => setTocExpanded(!tocExpanded)}
                    className="bg-[#0A192F] text-white px-5 py-3.5 flex items-center justify-between cursor-pointer select-none active:opacity-95 transition-opacity"
                >
                    <span className="font-bold text-xs uppercase tracking-widest flex items-center gap-2 font-display">
                        <AlignLeft size={16} className="text-[#0db9f2]" />
                        Conteúdo do Post
                    </span>
                    {tocExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
                {tocExpanded && (
                    <div className="p-5 bg-slate-50/30 max-h-[70vh] overflow-y-auto">
                        <div className="flex flex-col">
                            {tocItems.map((item: any) => (
                                <div
                                    key={item.id}
                                    className={`flex items-start gap-1.5 text-sm leading-relaxed transition-all ${item.isH3
                                        ? `pl-6 text-xs mt-1.5 mb-2 border-l ml-1.5 ${activeId === item.id
                                            ? "border-[#0db9f2] text-[#0db9f2] font-semibold"
                                            : "border-slate-200 text-slate-500"
                                        }`
                                        : `font-semibold mt-2.5 ${activeId === item.id
                                            ? "text-[#0db9f2]"
                                            : "text-slate-800"
                                        }`
                                        }`}
                                >
                                    {item.numberPrefix && (
                                        <span className={`font-bold shrink-0 transition-colors ${activeId === item.id ? "text-[#0db9f2]" : "text-[#0db9f2]/70"
                                            }`}>{item.numberPrefix}</span>
                                    )}
                                    <a
                                        href={`#${item.id}`}
                                        className={`hover:text-[#0db9f2] hover:underline transition-colors ${activeId === item.id ? "text-[#0db9f2] font-bold" : ""
                                            }`}
                                    >
                                        {item.text}
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        );
    };

    const hasReferences = !!(referencesContent || processedReferencesHtml);
    const formatDisplayDate = (dateStr: string) => {
        if (!dateStr) return "";
        if (dateStr.includes("de")) return `Criação: ${dateStr}`;
        const monthsMap: Record<string, string> = {
            jan: "Janeiro", fev: "Fevereiro", mar: "Março", abr: "Abril",
            mai: "Maio", jun: "Junho", jul: "Julho", ago: "Agosto",
            set: "Setembro", out: "Outubro", nov: "Novembro", dez: "Dezembro"
        };
        const cleanStr = dateStr.replace(",", "");
        const parts = cleanStr.split(/\s+/);
        if (parts.length >= 3) {
            const day = parts[0];
            const monthKey = parts[1].toLowerCase().substring(0, 3);
            const year = parts[2];
            const monthName = monthsMap[monthKey] || parts[1];
            return `Criação: ${day} de ${monthName} de ${year}`;
        }
        return `Criação: ${dateStr}`;
    };

    const getCleanText = (item: any) => {
        if (item.answerBlocks) {
            return item.answerBlocks
                .map((block: any) => {
                    if (block.children) {
                        return block.children.map((c: any) => c.text).join("");
                    }
                    return "";
                })
                .join(" ");
        }
        if (item.answerHTML) {
            return item.answerHTML.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
        }
        if (item.answerText) {
            return item.answerText;
        }
        return "";
    };

    const faqSchema = faqItems.length > 0 ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqItems.map((item: any) => ({
            "@type": "Question",
            "name": item.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": getCleanText(item)
            }
        }))
    } : null;

    return (
        <div className="bg-[#f5f8f8] min-h-screen flex flex-col font-sans selection:bg-[#0db9f2]/30 overflow-x-clip text-slate-900">
            {faqSchema && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
                />
            )}
            <header className="fixed top-0 left-0 right-0 z-50 bg-[#0A192F] backdrop-blur-md border-b border-white/5">
                <div className="flex items-center p-4 justify-between max-w-5xl mx-auto w-full gap-4">
                    <Link href="/blog" className="text-[#0db9f2] flex items-center gap-2 px-4 py-2 hover:bg-white/10 rounded-xl transition-all active:scale-95 group">
                        <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="text-sm font-bold uppercase tracking-wider hidden md:block">Voltar</span>
                    </Link>

                    <Link href="/" className="flex-1 flex justify-center">
                        <Logo
                            logoImage={logoData}
                            scrolled={true}
                            className="scale-75 md:scale-90"
                        />
                    </Link>

                    <div className="flex w-24 items-center justify-end">
                    </div>
                </div>
            </header>

            <main className="flex-1 max-w-6xl mx-auto w-full px-4 pt-32 pb-32">
                {/* Article Header (Full Width Centered) */}
                <header className="mb-8 max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="inline-block bg-[#0db9f2] px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white mb-4 shadow-sm">
                            {post.category}
                        </span>
                        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 leading-[1.1] mb-6 tracking-tight">
                            {post.title}
                        </h1>

                        {post.excerpt && (
                            <div className="relative overflow-hidden my-8 p-6 md:p-8 rounded-3xl bg-gradient-to-br from-white via-slate-50/50 to-slate-100/30 border border-slate-200/80 shadow-xl shadow-slate-100/50">
                                <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-[#0db9f2] to-cyan-500 rounded-l-3xl" />

                                <div className="flex gap-4 items-start">
                                    <div className="hidden sm:flex p-3 rounded-2xl bg-[#0db9f2]/10 text-[#0db9f2] shrink-0">
                                        <Sparkles size={22} className="animate-pulse" />
                                    </div>
                                    <div>
                                        <span className="text-xs font-bold uppercase tracking-widest text-[#0db9f2] block mb-2">
                                            Neste Artigo
                                        </span>
                                        <p className="text-slate-700 text-lg md:text-xl font-medium leading-relaxed italic">
                                            "{post.excerpt}"
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Author & Meta */}
                        <div className="flex items-center gap-4 py-6 border-y border-slate-200">
                            <div className="size-12 rounded-full overflow-hidden shrink-0 border border-slate-200">
                                <Image
                                    src={"/images/avatar.png"}
                                    alt="Dr. Rômulo Oliveira"
                                    width={48}
                                    height={48}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            <div className="flex-1">
                                <p className="text-slate-900 font-bold text-sm md:text-base leading-tight">
                                    Dr. Rômulo Oliveira
                                </p>
                                <p className="text-slate-550 text-xs md:text-sm font-medium leading-relaxed mt-0.5">
                                    <span className="text-slate-400">CRM 73889 | RQE 59057 | TEOT 19406</span>
                                </p>
                            </div>
                            <div className="flex flex-col items-end gap-1.5 text-right shrink-0">
                                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-500 text-xs font-bold">
                                    <Clock size={14} /> {post.readTime}
                                </div>
                                <p className="text-slate-400 text-[11px] font-medium">
                                    {formatDisplayDate(post.date)}
                                </p>

                            </div>
                        </div>
                    </motion.div>
                </header>

                {/* Feature Image (Full Width Centered) */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="relative w-full aspect-video md:aspect-[21/9] overflow-hidden rounded-3xl mb-12 shadow-2xl shadow-slate-200/50 max-w-5xl mx-auto"
                >
                    <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        priority
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                        className="object-cover"
                    />
                </motion.div>

                {/* Global Warning / Disclaimer Box (Below hero image) */}
                <div className="max-w-5xl mx-auto mb-10 p-5 bg-amber-500/5 border-l-4 border-amber-500 rounded-r-2xl text-slate-600 text-sm leading-relaxed italic">
                    <span className="font-bold text-amber-600 not-italic">⚠️ Aviso:</span> {disclaimerText}
                </div>

                {/* Grid Container starting where the text body starts */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mt-12 w-full">

                    {/* Desktop TOC Sidebar (Left) */}
                    <aside className="hidden lg:block lg:col-span-4 sticky top-28 self-start space-y-6">
                        <TocCard />
                    </aside>

                    {/* Content Column (Right) */}
                    <div className="lg:col-span-8">

                        {/* Mobile TOC Inline Card */}
                        <div className="block lg:hidden mb-8">
                            <TocCard />
                        </div>

                        {/* Content Rendering */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="prose prose-slate max-w-none 
                                prose-headings:font-display prose-headings:font-black prose-headings:tracking-tight prose-headings:text-slate-900
                                prose-p:text-slate-700 prose-p:leading-relaxed prose-p:text-lg prose-p:my-8
                                prose-strong:text-inherit prose-strong:font-black
                                prose-h2:text-3xl md:text-4xl prose-h2:mt-16 prose-h2:mb-8 prose-h2:leading-tight
                                prose-blockquote:border-l-4 prose-blockquote:border-[#0db9f2] prose-blockquote:bg-[#0db9f2]/5 
                                prose-blockquote:py-4 prose-blockquote:px-8 prose-blockquote:rounded-r-2xl prose-blockquote:italic
                                prose-blockquote:text-xl prose-blockquote:font-medium prose-blockquote:text-slate-800
                                prose-ul:list-none prose-ul:pl-0
                                prose-li:text-slate-700 prose-li:text-lg prose-li:relative prose-li:pl-8
                                prose-li:before:content-[''] prose-li:before:absolute prose-li:before:left-0 prose-li:before:top-[0.6em]
                                prose-li:before:size-2 prose-li:before:rounded-full prose-li:before:bg-[#0db9f2]
                                prose-img:rounded-3xl"
                        >
                            {Array.isArray(cleanedContent) ? (
                                <PortableText value={cleanedContent} components={ptComponents} />
                            ) : (
                                <div dangerouslySetInnerHTML={{ __html: processedHtml }} />
                            )}
                        </motion.div>

                        {/* Interactive Accordion FAQ Section */}
                        {faqItems.length > 0 && (
                            <section className="mt-16 border-t border-slate-200 pt-12">
                                <h2 id="faq" className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-8 flex items-center gap-2.5 font-display scroll-mt-24">
                                    <HelpCircle className="text-[#0db9f2]" size={28} />
                                    Perguntas Frequentes
                                </h2>

                                <div className="space-y-4">
                                    {faqItems.map((item: any, index: number) => {
                                        const isOpen = openFaq === index;
                                        return (
                                            <div
                                                key={index}
                                                className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm bg-white transition-colors"
                                            >
                                                <button
                                                    onClick={() => toggleFaq(index)}
                                                    className="w-full text-left py-4 px-6 flex items-center justify-between font-bold text-slate-800 hover:text-[#0db9f2] transition-colors focus:outline-none bg-slate-50/20"
                                                >
                                                    <span className="text-sm md:text-base leading-snug">{item.question}</span>
                                                    {isOpen ? (
                                                        <ChevronUp size={18} className="text-[#0db9f2] shrink-0 ml-4" />
                                                    ) : (
                                                        <ChevronDown size={18} className="text-slate-400 shrink-0 ml-4" />
                                                    )}
                                                </button>

                                                <div
                                                    className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? "max-h-[1000px] border-t border-slate-100" : "max-h-0"
                                                        }`}
                                                >
                                                    <div className="p-6 text-slate-650 text-sm md:text-base leading-relaxed bg-white">
                                                        {item.answerBlocks ? (
                                                            <div className="prose prose-slate max-w-none prose-p:my-2 prose-p:text-slate-650">
                                                                <PortableText value={item.answerBlocks} components={ptComponents} />
                                                            </div>
                                                        ) : item.answerHTML ? (
                                                            <div
                                                                className="prose prose-slate max-w-none prose-p:my-2 prose-p:text-slate-650"
                                                                dangerouslySetInnerHTML={{ __html: item.answerHTML }}
                                                            />
                                                        ) : (
                                                            <p className="text-slate-600 leading-relaxed">{item.answerText}</p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </section>
                        )}


                        {/* References Section */}
                        {hasReferences && (
                            <section className="mt-16">
                                <h2 id="referencias" className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-8 flex items-center gap-2.5 font-display scroll-mt-24">
                                    <Book className="text-[#0db9f2]" size={28} />
                                    Referências Bibliográficas
                                </h2>

                                <ReferencesSection
                                    referencesContent={referencesContent}
                                    processedReferencesHtml={processedReferencesHtml}
                                />
                            </section>
                        )}
                    </div>
                </div>

                {/* CTA & Related Articles Section (Full Width Centered) */}
                <div className="max-w-5xl mx-auto mt-20">
                    {/* CTA Card Section */}
                    <section id="agendamento" className="p-8 rounded-3xl bg-gradient-to-br from-[#0A192F] to-[#112240] text-white relative overflow-hidden group shadow-2xl scroll-mt-24">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#0db9f2]/10 blur-[100px] rounded-full -mr-20 -mt-20" />
                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                            <div className="text-center md:text-left flex-1">
                                <h3 className="text-2xl md:text-3xl font-bold mb-3">{ctaTitle}</h3>
                                <p className="text-[#0db9f2] text-lg font-medium opacity-90">
                                    {ctaDescription}
                                </p>
                            </div>
                            <CtaWhatsApp 
                                cta={{ text: "Agendar Avaliação Especializada", whatsAppNumber: "5531996689572" }} 
                                analyticsLabel={`blog_cta_${slugify(post.title)}`}
                            />
                        </div>
                    </section>
                </div>
            </main>

            {footerContent && <Footer content={footerContent} />}

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
