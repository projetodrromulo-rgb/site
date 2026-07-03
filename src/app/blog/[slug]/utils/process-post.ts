function slugify(text: string) {
    return text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-");
}

export function processPostData(post: any, logoData: any, footerContent: any) {
    const ctaDescription = post?.ctaDescription || "Agende sua consulta com o Dr. Rômulo e dê o primeiro passo para uma vida livre das dores.";
    const ctaTitle = post?.ctaTitle || "Recupere sua qualidade de vida";
    const relatedPosts = post?.related || [];

    // Extract FAQ and References, and clean content
    const faqItems: any[] = [];
    let cleanedContent: any = null;
    let referencesContent: any = null;
    let processedHtml = "";
    let processedReferencesHtml = "";

    if (post) {
        const hasStructuredFaq = Array.isArray(post.faq) && post.faq.length > 0;
        if (hasStructuredFaq) {
            post.faq.forEach((item: any) => {
                faqItems.push({
                    question: item.question,
                    answerText: item.answer
                });
            });
        }

        const hasStructuredReferences = Array.isArray(post.references) && post.references.length > 0;

        if (Array.isArray(post.content)) {
            let inFaq = false;
            let inReferences = false;
            const tempContent: any[] = [];
            const tempReferences: any[] = [];
            let currentQuestion = "";
            let currentAnswerBlocks: any[] = [];

            post.content.forEach((block: any) => {
                const isHeading = block._type === "block" && ["h2", "h3"].includes(block.style);
                const text = block.children ? block.children.map((c: any) => c.text).join("") : "";

                if (isHeading && text.toLowerCase().includes("faq")) {
                    inFaq = true;
                    inReferences = false;
                    return; // Skip FAQ title
                }

                if (isHeading && (text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes("referencia"))) {
                    inReferences = true;
                    inFaq = false;
                    return; // Skip References title
                }

                if (inFaq) {
                    if (isHeading) {
                        inFaq = false;
                        tempContent.push(block);
                        return;
                    }

                    if (!hasStructuredFaq) {
                        // Check if block is a question
                        const isStrong = block.children && block.children.some((c: any) => c.marks && c.marks.includes("strong"));
                        if (isStrong && text.endsWith("?")) {
                            if (currentQuestion && currentAnswerBlocks.length > 0) {
                                faqItems.push({
                                    question: currentQuestion,
                                    answerBlocks: currentAnswerBlocks
                                });
                            }
                            currentQuestion = text;
                            currentAnswerBlocks = [];
                        } else {
                            if (currentQuestion) {
                                currentAnswerBlocks.push(block);
                            }
                        }
                    }
                } else if (inReferences) {
                    tempReferences.push(block);
                } else {
                    tempContent.push(block);
                }
            });

            // Push last FAQ
            if (!hasStructuredFaq && currentQuestion && currentAnswerBlocks.length > 0) {
                faqItems.push({
                    question: currentQuestion,
                    answerBlocks: currentAnswerBlocks
                });
            }

            cleanedContent = tempContent;
            referencesContent = hasStructuredReferences ? post.references : (tempReferences.length > 0 ? tempReferences : null);
        } else if (typeof post.content === "string") {
            let workingHtml = post.content;

            // Extract FAQ
            const faqRegex = /<h2[^>]*>faq.*?<\/h2>([\s\S]*?)(?=<h2|$)/i;
            const faqMatch = workingHtml.match(faqRegex);
            if (faqMatch) {
                const faqHtml = faqMatch[1];
                workingHtml = workingHtml.replace(faqRegex, "");

                if (!hasStructuredFaq) {
                    const itemRegex = /<p[^>]*><strong>(.*?)<\/strong><\/p>([\s\S]*?)(?=<p[^>]*><strong>|$)/g;
                    let itemMatch;
                    while ((itemMatch = itemRegex.exec(faqHtml)) !== null) {
                        const question = itemMatch[1].replace(/<[^>]*>/g, "");
                        const answer = itemMatch[2].trim();
                        faqItems.push({
                            question,
                            answerHTML: answer
                        });
                    }
                }
            }

            // Extract References
            const refRegex = /<h2[^>]*>[^<]*referencia.*?<\/h2>([\s\S]*)/i;
            const refMatch = workingHtml.match(refRegex);
            if (refMatch) {
                if (hasStructuredReferences) {
                    referencesContent = post.references;
                } else {
                    processedReferencesHtml = refMatch[1].trim();
                }
                workingHtml = workingHtml.replace(refRegex, "");
            }

            processedHtml = workingHtml;
        }
    }

    // Extract headings for Table of Contents from cleaned content
    const headings: any[] = [];
    if (cleanedContent && Array.isArray(cleanedContent)) {
        cleanedContent.forEach((block: any) => {
            if (block._type === "block" && ["h2", "h3"].includes(block.style)) {
                const text = block.children.map((c: any) => c.text).join("");
                headings.push({
                    text,
                    style: block.style,
                    id: slugify(text)
                });
            }
        });
    } else if (processedHtml) {
        processedHtml = processedHtml.replace(/<h(2|3)([^>]*)>(.*?)<\/h\1>/g, (match, level, attrs, text) => {
            const cleanText = text.replace(/<[^>]*>/g, "");
            const id = slugify(cleanText);
            headings.push({
                text: cleanText,
                style: `h${level}`,
                id
            });
            if (attrs.includes("id=")) return match;
            return `<h${level} id="${id}"${attrs}>${text}</h${level}>`;
        });
    }

    if (faqItems.length > 0) {
        headings.push({
            text: "FAQ – Perguntas Frequentes",
            style: "h2",
            id: "faq"
        });
    }

    if (referencesContent || processedReferencesHtml) {
        headings.push({
            text: "Referências",
            style: "h2",
            id: "referencias"
        });
    }

    headings.push({
        text: "Agendar Consulta",
        style: "h2",
        id: "agendamento"
    });

    // Format headings with proper numbers for H2
    let h2Counter = 0;
    const tocItems = headings.map((heading) => {
        const isH3 = heading.style === "h3";
        let numberPrefix = "";
        if (!isH3) {
            h2Counter++;
            numberPrefix = `${h2Counter}. `;
        }
        return {
            ...heading,
            isH3,
            numberPrefix
        };
    });

    return {
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
        disclaimer: post?.disclaimer ?? null,
        footerContent
    };
}
