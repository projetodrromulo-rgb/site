import { client, projectId } from "@/lib/sanity";

export interface AuthorProfile {
  name: string;
  role: string;
  credentials: string;
  avatarUrl: string;
  avatarAlt: string;
  bio: string;
}

export const DEFAULT_AUTHOR: AuthorProfile = {
  name: "Dr. Rômulo Oliveira",
  role: "Ortopedista e Cirurgião de Coluna",
  credentials: "CRM-MG 73.889 | RQE 59.057 | TEOT 19.406",
  avatarUrl: "/images/avatar.png",
  avatarAlt: "Dr. Rômulo Oliveira",
  bio: "Médico ortopedista formado pela UNEC, especialista em Ortopedia e Traumatologia pela SBOT e com fellowship em Cirurgia da Coluna pelo Hospital da Baleia, em Belo Horizonte.",
};

export interface RawSanityAuthor {
  name?: string | null;
  role?: string | null;
  credentials?: string | null;
  avatarUrl?: string | null;
  avatarAlt?: string | null;
  bio?: string | null;
}

export const AUTHOR_GROQ_FIELDS = `{
  name,
  role,
  credentials,
  "avatarUrl": coalesce(avatar.asset->url, ""),
  "avatarAlt": coalesce(avatar.alt, ""),
  bio
}`;

export function resolveAuthorProfile(raw?: RawSanityAuthor | null): AuthorProfile {
  if (!raw) return DEFAULT_AUTHOR;
  const name = raw.name?.trim() || DEFAULT_AUTHOR.name;
  return {
    name,
    role: raw.role?.trim() || DEFAULT_AUTHOR.role,
    credentials: raw.credentials?.trim() || DEFAULT_AUTHOR.credentials,
    avatarUrl: raw.avatarUrl?.trim() || DEFAULT_AUTHOR.avatarUrl,
    avatarAlt: raw.avatarAlt?.trim() || name,
    bio: raw.bio?.trim() || DEFAULT_AUTHOR.bio,
  };
}

export async function getDefaultAuthor(): Promise<AuthorProfile> {
  if (!projectId || projectId === "placeholder") {
    return DEFAULT_AUTHOR;
  }

  try {
    const raw = await client.fetch<RawSanityAuthor | null>(
      `*[_type == "author"] | order(_updatedAt desc)[0] ${AUTHOR_GROQ_FIELDS}`
    );
    return resolveAuthorProfile(raw);
  } catch (error) {
    console.error("Error fetching author profile from Sanity, falling back to default:", error);
    return DEFAULT_AUTHOR;
  }
}

