import { MetadataRoute } from 'next';
import { allProcedures } from '@/components/sections/procedures/data/procedures';
import { allPosts } from '@/components/sections/blog/data/posts';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.drromulocoluna.com.br';

  const procedureUrls = allProcedures.map((procedure) => ({
    url: `${baseUrl}/procedimentos/${procedure.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const blogUrls = allPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...procedureUrls,
    ...blogUrls,
  ];
}

