import type { MetadataRoute } from 'next';
import { getCaseStudies } from '@/lib/airtable';
import { site } from '@/lib/site';

// Submit https://www.webdog.marketing/sitemap.xml in Search Console.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const cases = await getCaseStudies();
  const now = new Date();
  return [
    { url: `${site.url}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${site.url}/case-studies`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    ...cases.map((c) => ({
      url: `${site.url}/case-studies/${c.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];
}
