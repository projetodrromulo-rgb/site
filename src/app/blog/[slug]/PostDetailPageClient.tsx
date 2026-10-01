"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Clock, ChevronDown, ChevronUp, AlignLeft, HelpCircle, BookOpen, Sparkles, Book, Home, ChevronRight } from "lucide-react";
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

/** Converte URLs em formato texto (https://...) em links clicáveis <a> */
function linkifyText(text: string): React.ReactNode {
    if (!text) return text;
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);

    if (parts.length <= 1) return text;

    return parts.map((part, i) => {
        if (/^https?:\/\//i.test(part)) {
            let url = part;
            let trailing = "";
            const match = part.match(/([.,;)]+)$/);
            if (match) {
                trailing = match[1];
                url = part.slice(0, -trailing.length);
            }
            return (
                <span key={i}>
                    <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#0db9f2] underline underline-offset-2 hover:text-cyan-600 transition-colors break-all font-medium"
                    >
                        {url}
                    </a>
                    {trailing}
                </span>
            );
        }
        return part;
    });
}

function processChildrenAutoLinks(children: any): React.ReactNode {
    if (typeof children === "string") {
        return linkifyText(children);
    }
    if (Array.isArray(children)) {
        return children.map((child, idx) => {
            if (typeof child === "string") {
                return <span key={idx}>{linkifyText(child)}</span>;
            }
            return child;
        });
    }
    return children;
}

const refPtComponents = {
    block: {
        normal: ({ children }: any) => <>{processChildrenAutoLinks(children)}</>,
        h1: ({ children }: any) => <>{processChildrenAutoLinks(children)}</>,
        h2: ({ children }: any) => <>{processChildrenAutoLinks(children)}</>,
        h3: ({ children }: any) => <>{processChildrenAutoLinks(children)}</>,
        h4: ({ children }: any) => <>{processChildrenAutoLinks(children)}</>,
    },
    list: {
        bullet: ({ children }: any) => <>{processChildrenAutoLinks(children)}</>,
        number: ({ children }: any) => <>{processChildrenAutoLinks(children)}</>,
    },
    listItem: {
        bullet: ({ children }: any) => <>{processChildrenAutoLinks(children)}</>,
        number: ({ children }: any) => <>{processChildrenAutoLinks(children)}</>,
    },
    marks: {
        link: ({ value, children }: any) => {
            const href = value?.href || "#";
            const isExternal = value?.blank !== false || href.startsWith("http");
            return (
                <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#0db9f2] underline underline-offset-2 hover:text-cyan-600 transition-colors break-all font-medium"
                >
                    {children}
                </a>
            );
        },
        strong: ({ children }: any) => <strong className="font-bold text-slate-800 dark:text-slate-100">{children}</strong>,
        em: ({ children }: any) => <em className="italic">{children}</em>,
    },
};

/** Card individual de referência */
function RefCard({ children }: { children: React.ReactNode }) {
    return (
        <div className="bg-white dark:bg-[#0c1a20] rounded-[2rem] px-6 py-5 border border-slate-100 dark:border-neutral-800/80 border-t-4 border-t-primary-dark shadow-md hover:shadow-lg transition-shadow duration-300 w-full text-slate-700 dark:text-slate-300 text-sm leading-relaxed font-sans">
            {children}
        </div>
    );
}

function ReferencesSection({ referencesContent, processedReferencesHtml }: ReferencesSectionProps) {
    // isStructured = true apenas para dados legados (array of string pura)
    const isStructured = Array.isArray(referencesContent) && referencesContent.length > 0 && typeof referencesContent[0] === "string";

    const [htmlGroups, setHtmlGroups] = useState<{ title: string; items: string[] }[]>([]);

    useEffect(() => {
        if (processedReferencesHtml) {
            setHtmlGroups(parseHtmlReferences(processedReferencesHtml));
        }
    }, [processedReferencesHtml]);

    // ── Legado: array of strings ─────────────────────────────────────────────
    if (isStructured) {
        return (
            <div className="grid grid-cols-1 gap-4">
                {(referencesContent as string[]).map((ref: string, idx: number) => (
                    <RefCard key={idx}>{linkifyText(ref)}</RefCard>
                ))}
            </div>
        );
    }

    // ── Portable Text: cada bloco vira um card individual ────────────────────
    if (Array.isArray(referencesContent) && referencesContent.length > 0) {
        return (
            <div className="grid grid-cols-1 gap-4">
                {referencesContent.map((block: any, idx: number) => {
                    const children = block.children || [];
                    const plainText = children.map((c: any) => c.text || "").join("").trim();
                    if (!plainText) return null;
                    return (
                        <RefCard key={block._key || idx}>
                            <PortableText value={[block]} components={refPtComponents} />
                        </RefCard>
                    );
                })}
            </div>
        );
    }

    // ── HTML legado ──────────────────────────────────────────────────────────
    const allHtmlItems = htmlGroups.flatMap(g => g.items);
    if (allHtmlItems.length > 0) {
        return (
            <div className="grid grid-cols-1 gap-4">
                {allHtmlItems.map((itemHtml, index) => {
                    const linkedHtml = itemHtml.replace(
                        /(?<!href=["'])(https?:\/\/[^\s<]+)/g,
                        '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-[#0db9f2] underline underline-offset-2 hover:text-cyan-600 transition-colors break-all font-medium">$1</a>'
                    );
                    return (
                        <RefCard key={index}>
                            <span
                                className="[&>a]:text-[#0db9f2] [&>a]:underline [&>a]:underline-offset-2 [&>strong]:font-bold [&>em]:italic"
                                dangerouslySetInnerHTML={{ __html: linkedHtml }}
                            />
                        </RefCard>
                    );
                })}
            </div>
        );
    }

    return null;
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

    const [openFaqs, setOpenFaqs] = useState<number[]>([]);

    useEffect(() => {
        if (faqItems && faqItems.length > 0) {
            setOpenFaqs(faqItems.map((_: any, i: number) => i));
        }
    }, [faqItems]);

    const [activeId, setActiveId] = useState<string>("");
    const [backTarget, setBackTarget] = useState({ href: "/blog", label: "Voltar para o Blog" });

    useEffect(() => {
        if (typeof window !== "undefined" && document.referrer) {
            try {
                const referrerUrl = new URL(document.referrer);
                if (referrerUrl.origin === window.location.origin) {
                    const pathname = referrerUrl.pathname;
                    if (pathname === "/blog" || pathname === "/blog/") {
                        setBackTarget({ href: "/blog", label: "Voltar para o Blog" });
                    } else if (pathname === "/" || pathname === "" || referrerUrl.hash === "#blog") {
                        setBackTarget({ href: "/#blog", label: "Voltar para o Início" });
                    }
                }
            } catch {
                // mantém padrão { href: "/blog", label: "Voltar para o Blog" }
            }
        }
    }, []);

    useEffect(() => {
        if (typeof window !== "undefined" && !window.location.hash) {
            window.scrollTo(0, 0);
            if ((window as any).__lenis) {
                (window as any).__lenis.scrollTo(0, { immediate: true });
            }
        }
    }, []);

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
        setOpenFaqs(prev =>
            prev.includes(index)
                ? prev.filter(i => i !== index)
                : [...prev, index]
        );
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
    // Formata uma data ISO (datetime ou date) em pt-BR com fuso America/Sao_Paulo
    const fmtDate = (iso: string): string => {
        if (!iso) return "";
        try {
            // Se for apenas data (YYYY-MM-DD), adiciona o offset de Brasília para evitar off-by-one de UTC
            const normalized = iso.length === 10 ? `${iso}T00:00:00-03:00` : iso;
            return new Intl.DateTimeFormat('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                timeZone: 'America/Sao_Paulo',
            }).format(new Date(normalized));
        } catch {
            return iso;
        }
    };

    // publishedAt (ISO datetime com fuso) tem prioridade;
    // fallback para date (YYYY-MM-DD) adicionando meia-noite em Brasília (-03:00)
    const publishedIso: string = post.publishedAt || (post.date ? `${post.date}T00:00:00-03:00` : "");
    const updatedIso: string = post._updatedAt || "";
    const reviewedIso: string = post.medicalReviewedAt ? `${post.medicalReviewedAt}T00:00:00-03:00` : "";

    // Exibir "Atualizado em" apenas se a data de atualização for pelo menos 1 dia após a publicação
    const showUpdated = (() => {
        if (!updatedIso || !publishedIso) return false;
        try {
            const pubDate = new Date(publishedIso);
            const updDate = new Date(updatedIso);
            return (updDate.getTime() - pubDate.getTime()) > 86_400_000; // > 1 dia
        } catch { return false; }
    })();

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

    return (
        <div className="bg-[#f5f8f8] min-h-screen flex flex-col font-sans selection:bg-[#0db9f2]/30 overflow-x-clip text-slate-900">
            <main className="flex-1 max-w-6xl mx-auto w-full px-4 pt-28 md:pt-32 pb-32">
                {/* Article Header (Full Width Centered) */}
                <header className="mb-8 max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {/* Top Bar: Breadcrumb + Dynamic Voltar Button */}
                        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                            {/* Breadcrumb Navigation: Home > Blog > Categoria > [Artigo] */}
                            <nav aria-label="Navegação Breadcrumb">
                                <ol
                                    itemScope
                                    itemType="https://schema.org/BreadcrumbList"
                                    className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm text-slate-600 font-medium flex-wrap"
                                >
                                    <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem" className="flex items-center gap-1.5">
                                        <meta itemProp="position" content="1" />
                                        <Link
                                            href="/"
                                            itemProp="item"
                                            className="flex items-center gap-1.5 text-slate-600 hover:text-[#0db9f2] transition-colors py-1 px-2 rounded-lg hover:bg-slate-200/60"
                                        >
                                            <Home size={15} className="text-slate-500" />
                                            <span itemProp="name">Home</span>
                                        </Link>
                                    </li>

                                    <li className="text-slate-400 select-none" aria-hidden="true">
                                        <ChevronRight size={14} />
                                    </li>

                                    <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem" className="flex items-center gap-1.5">
                                        <meta itemProp="position" content="2" />
                                        <Link
                                            href="/blog"
                                            itemProp="item"
                                            className="text-slate-600 hover:text-[#0db9f2] transition-colors py-1 px-2 rounded-lg hover:bg-slate-200/60"
                                        >
                                            <span itemProp="name">Blog</span>
                                        </Link>
                                    </li>

                                    <li className="text-slate-400 select-none" aria-hidden="true">
                                        <ChevronRight size={14} />
                                    </li>

                                    <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem" className="flex items-center gap-1.5 min-w-0">
                                        <meta itemProp="position" content="3" />
                                        <span itemProp="name" className="text-slate-900 font-semibold truncate max-w-[180px] sm:max-w-[280px] md:max-w-[400px]" title={post.title}>
                                            {post.title}
                                        </span>
                                    </li>
                                </ol>
                            </nav>

                            {/* Botão Voltar Dinâmico */}
                            <Link
                                href={backTarget.href}
                                className="inline-flex items-center gap-2 text-slate-600 hover:text-[#0db9f2] font-semibold text-sm transition-colors py-2 px-3.5 rounded-xl hover:bg-slate-200/60 active:scale-95 group w-fit"
                            >
                                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                                <span>{backTarget.label}</span>
                            </Link>
                        </div>

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
                                        <div className="text-slate-700 text-lg md:text-xl font-medium leading-relaxed italic prose prose-slate max-w-none prose-p:my-0 prose-strong:text-slate-800 prose-strong:font-bold">
                                            {Array.isArray(post.excerpt) ? (
                                                <PortableText value={post.excerpt} components={ptComponents} />
                                            ) : (
                                                <p>"{post.excerpt}"</p>
                                            )}
                                        </div>
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
                                <p className="text-slate-600 text-[13px] md:text-sm font-medium leading-snug mt-0.5">
                                    Ortopedista e Cirurgia de Coluna
                                </p>
                                <p className="text-slate-400 text-[11px] md:text-xs font-medium leading-relaxed mt-0.5">
                                    CRM 73889 | RQE 59057 | TEOT 19406
                                </p>
                            </div>
                            <div className="flex flex-col items-end gap-1.5 text-right shrink-0">
                                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-500 text-xs font-bold">
                                    <Clock size={14} /> {post.readTime}
                                </div>
                                <p className="text-slate-400 text-[11px] font-medium leading-relaxed">
                                    {publishedIso && (
                                        <>
                                            Publicado em{" "}
                                            <time dateTime={publishedIso}>{fmtDate(publishedIso)}</time>
                                        </>
                                    )}
                                    {showUpdated && (
                                        <>
                                            {" "}&middot; Atualizado em{" "}
                                            <time dateTime={updatedIso}>{fmtDate(updatedIso)}</time>
                                        </>
                                    )}
                                </p>
                                {reviewedIso && (
                                    <p className="text-slate-400 text-[10px] font-medium mt-0.5">
                                        Revisão médica em{" "}
                                        <time dateTime={reviewedIso}>{fmtDate(reviewedIso)}</time>
                                    </p>
                                )}

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
                    <figure>
                        <Image
                            src={post.image?.url ?? ''}
                            alt={post.image?.alt ?? post.title}

                            fill
                            priority
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                            className="object-cover"
                        />
                        <figcaption className="mt-2 text-sm text-slate-600">

                        </figcaption>
                    </figure>

                </motion.div>
                <strong className="post-legend">Imagem 01: {post.image?.alt}</strong>
                {/* Global Warning / Disclaimer Box (Below hero image) */}
                <div className="max-w-5xl mx-auto mb-10 p-5 bg-amber-500/5 border-l-4 border-amber-500 rounded-r-2xl text-slate-600 text-sm leading-relaxed italic">
                    <span className="font-bold text-amber-600 not-italic">⚠️ Aviso:</span> {disclaimerText}
                </div>

                {/* Grid Container starting where the text body starts */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mt-12 w-full post-content">

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
                                        const isOpen = openFaqs.includes(index);
                                        return (
                                            <div
                                                key={index}
                                                className="border border-slate-200 rounded-2xl shadow-sm bg-white overflow-hidden transition-colors"
                                            >
                                                <button
                                                    onClick={() => toggleFaq(index)}
                                                    className="w-full text-left py-5 px-6 flex items-start gap-4 text-slate-700 hover:text-[#0db9f2] transition-colors focus:outline-none bg-slate-50/20"
                                                >
                                                    <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 font-medium shrink-0 text-sm mt-0.5 bg-white">
                                                        Q
                                                    </div>
                                                    <span className="text-base md:text-lg font-bold text-slate-800 leading-snug flex-1 mt-0.5">{item.question}</span>
                                                    <div className="shrink-0 mt-0.5 text-slate-400 font-light text-2xl leading-none">
                                                        {isOpen ? "−" : "+"}
                                                    </div>
                                                </button>

                                                <div
                                                    className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
                                                        }`}
                                                >
                                                    <div className="px-6 pb-6 pt-2 text-slate-650 text-sm md:text-base leading-relaxed pl-[4.5rem]">
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

                {/* Author Bio Card */}
                <div className="max-w-5xl mx-auto mt-12 mb-4">
                    <div className="flex items-start gap-5 p-6 md:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm">
                        {/* Avatar */}
                        <div className="shrink-0">
                            <div className="size-16 md:size-20 rounded-full overflow-hidden border-2 border-slate-100 shadow">
                                <Image
                                    src="/images/avatar.png"
                                    alt="Dr. Rômulo Oliveira"
                                    width={80}
                                    height={80}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                            <p className="text-[11px] md:text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">
                                Escrito por
                            </p>
                            <h3 className="text-base md:text-lg font-extrabold text-slate-900 leading-tight">
                                Dr. Rômulo Oliveira
                            </h3>
                            <p className="text-xs md:text-sm font-semibold text-[#0db9f2] mt-0.5">
                                Ortopedista e Cirurgião de Coluna
                            </p>
                            <p className="text-[11px] text-slate-400 font-medium mt-0.5">
                                CRM-MG 73.889 &nbsp;|&nbsp; RQE 59.057 &nbsp;|&nbsp; TEOT 19.406
                            </p>
                            <p className="text-slate-600 text-sm md:text-base leading-relaxed mt-3">
                                Especialista em cirurgia minimamente invasiva da coluna vertebral, com mais de uma
                                década de experiência no tratamento de doenças degenerativas, hérnias discais e
                                deformidades. Atende em Belo Horizonte e região com foco em resultados precisos e
                                recuperação rápida.{" "}
                                <a
                                    href="/sobre"
                                    className="text-[#0db9f2] font-semibold hover:underline underline-offset-2 transition-colors"
                                >
                                    Conheça o Dr. Rômulo →
                                </a>
                            </p>
                        </div>
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
