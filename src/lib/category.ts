import { client, projectId } from "@/lib/sanity";

export const DEFAULT_BLOG_CATEGORIES = [
  "Saúde da Coluna",
  "Procedimentos Minimamente Invasivos",
  "Exames de Imagem",
];

/**
 * Resolve o nome da categoria tanto quando `category` é uma referência (`category->title`)
 * quanto quando ainda está salvo como string legada no Sanity, evitando vazamento de objeto `_ref`.
 */
export const CATEGORY_GROQ_FIELD = `"category": coalesce(category->title, select(defined(category) && !defined(category._ref) => category, ""))`;

export async function getBlogCategories(): Promise<string[]> {
  if (!projectId || projectId === "placeholder") {
    return DEFAULT_BLOG_CATEGORIES;
  }

  try {
    const categories = await client.fetch<Array<{ title?: string }>>(
      `*[_type == "category"] | order(title asc) { title }`
    );
    const titles = (categories || [])
      .map((c) => c.title?.trim() || "")
      .filter(Boolean);

    return titles.length > 0 ? titles : DEFAULT_BLOG_CATEGORIES;
  } catch (error) {
    console.error("Error fetching blog categories from Sanity, falling back to default:", error);
    return DEFAULT_BLOG_CATEGORIES;
  }
}

