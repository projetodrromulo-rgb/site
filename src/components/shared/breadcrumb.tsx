import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
    className?: string;
}

export function Breadcrumb({ items, className = "" }: BreadcrumbProps) {
    if (!items || items.length === 0) return null;

    return (
        <nav aria-label="Navegação Breadcrumb" className={`w-full overflow-x-auto ${className}`}>
            <ol
                itemScope
                itemType="https://schema.org/BreadcrumbList"
                className="flex items-center gap-1.5 text-xs text-neutral-light/70 whitespace-nowrap"
            >
                {items.map((item, index) => {
                    const isLast = index === items.length - 1;

                    return (
                        <li
                            key={item.label + index}
                            itemProp="itemListElement"
                            itemScope
                            itemType="https://schema.org/ListItem"
                            className="flex items-center gap-1.5"
                        >
                            <meta itemProp="position" content={String(index + 1)} />

                            {!isLast && item.href ? (
                                <>
                                    <Link
                                        href={item.href}
                                        itemProp="item"
                                        className="hover:text-accent transition-colors flex items-center gap-1.5 font-medium text-neutral-light/80"
                                    >
                                        {index === 0 && <Home size={13} className="shrink-0 text-accent/80" />}
                                        <span itemProp="name">{item.label}</span>
                                    </Link>
                                    <ChevronRight size={12} className="text-white/30 shrink-0" aria-hidden="true" />
                                </>
                            ) : (
                                <span itemProp="name" className="text-accent font-semibold">
                                    {item.label}
                                </span>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}
