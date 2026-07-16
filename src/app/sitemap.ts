import { MetadataRoute } from 'next';
import { getProceduresContent } from '@/components/sections/procedures/data/get-content';
import { client, projectId } from '@/lib/sanity';
import { citiesData } from './ortopedista-especialista-em-coluna/data/locations';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.drromulocoluna.com.br';

  // 1. Fetch procedures (dynamically from Sanity with local fallback)
  let procedures: Array<{ slug: string; lastModified: Date }> = [];
  
  if (projectId && projectId !== 'placeholder') {
    try {
      const query = `*[_type == "procedures-section"][0] {
        items[]-> {
          "slug": slug.current,
          _updatedAt
        }
      }`;
      const data = await client.fetch<any>(query);
      if (data && data.items) {
        procedures = data.items.map((item: any) => ({
          slug: item.slug,
          lastModified: item._updatedAt ? new Date(item._updatedAt) : new Date(),
        }));
      }
    } catch (error) {
      console.error('Error fetching sitemap procedures from Sanity:', error);
    }
  }

  if (procedures.length === 0) {
    const proceduresContent = await getProceduresContent();
    procedures = proceduresContent.items.map((procedure) => ({
      slug: procedure.slug,
      lastModified: new Date('2026-06-10'), // Fixed baseline date for static fallback
    }));
  }

  const procedureUrls = procedures.map((procedure) => ({
    url: `${baseUrl}/procedimentos/${procedure.slug}`,
    lastModified: procedure.lastModified,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // 2. Fetch blog posts (dynamically from Sanity)
  let posts: Array<{ slug: string; lastModified: Date }> = [];
  if (projectId && projectId !== 'placeholder') {
    try {
      const query = `*[_type == "post"] { "slug": slug.current, _updatedAt }`;
      const sanityPosts = await client.fetch<any[]>(query);
      if (sanityPosts && sanityPosts.length > 0) {
        posts = sanityPosts.map((post: any) => ({
          slug: post.slug,
          lastModified: post._updatedAt ? new Date(post._updatedAt) : new Date(),
        }));
      }
    } catch (error) {
      console.error('Error fetching sitemap posts from Sanity:', error);
    }
  }

  const blogUrls = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.lastModified,
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  // Calculate dynamic modifications for general pages based on latest content updates
  const latestPostDate = posts.length > 0 
    ? new Date(Math.max(...posts.map(p => p.lastModified.getTime()))) 
    : new Date('2026-06-10');
    
  const latestProcedureDate = procedures.length > 0 
    ? new Date(Math.max(...procedures.map(p => p.lastModified.getTime()))) 
    : new Date('2026-06-10');
    
  const rootLastModified = new Date(Math.max(latestPostDate.getTime(), latestProcedureDate.getTime()));

  // 3. Fetch location pages (dynamically from Sanity)
  let locations: Array<{ slug: string; lastModified: Date }> = [];
  if (projectId && projectId !== 'placeholder') {
    try {
      const query = `*[_type == "locationPage"] { "slug": slug.current, _updatedAt }`;
      const sanityLocations = await client.fetch<any[]>(query);
      if (sanityLocations && sanityLocations.length > 0) {
        locations = sanityLocations.map((loc: any) => ({
          slug: loc.slug,
          lastModified: loc._updatedAt ? new Date(loc._updatedAt) : new Date('2026-07-12'),
        }));
      }
    } catch (error) {
      console.error('Error fetching sitemap locations from Sanity:', error);
    }
  }

  if (locations.length === 0) {
    locations = Object.values(citiesData).map((city) => ({
      slug: city.slug,
      lastModified: new Date('2026-07-12'),
    }));
  }

  const locationUrls = locations.map((loc) => ({
    url: `${baseUrl}/ortopedista-especialista-em-coluna/${loc.slug}`,
    lastModified: loc.lastModified,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: rootLastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: latestPostDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    ...procedureUrls,
    ...blogUrls,
    ...locationUrls,
  ];
}


