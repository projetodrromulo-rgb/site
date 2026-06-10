import { MetadataRoute } from 'next';
import { getProceduresContent } from '@/components/sections/procedures/data/get-content';
import { allPosts } from '@/components/sections/blog/data/posts';
import { client, projectId } from '@/lib/sanity';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.drromulocoluna.com.br';

  // 1. Fetch procedures (dynamically from Sanity with local fallback)
  const proceduresContent = await getProceduresContent();
  const procedureUrls = proceduresContent.items.map((procedure) => ({
    url: `${baseUrl}/procedimentos/${procedure.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // 2. Fetch blog posts (dynamically from Sanity with local fallback)
  let posts = allPosts;
  if (projectId && projectId !== 'placeholder') {
    try {
      const query = `*[_type == "post"] { "slug": slug.current }`;
      const sanityPosts = await client.fetch<any[]>(query);
      if (sanityPosts && sanityPosts.length > 0) {
        posts = sanityPosts;
      }
    } catch (error) {
      console.error('Error fetching sitemap posts from Sanity:', error);
    }
  }

  const blogUrls = posts.map((post) => ({
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
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    ...procedureUrls,
    ...blogUrls,
  ];
}


