import type { MetadataRoute } from 'next';
import { getCaseStudies, getInsights } from '@/lib/airtable';
import { site } from '@/lib/site';

// Submit https://www.webdog.marketing/sitemap.xml in Search Console.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [cases, insights] = await Promise.all([getCaseStudies(), getInsights()]);
  const now = new Date();
  return [
    { url: `${site.url}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${site.url}/services`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${site.url}/pricing`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${site.url}/case-studies`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${site.url}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${site.url}/jobs`, lastModified: now, changeFrequency: 'weekly', priority: 0.5 },
    { url: `${site.url}/insights`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${site.url}/privacy`, lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
    ...insights.map((i) => ({
      url: `${site.url}/insights/${i.slug}`,
      lastModified: i.date ? new Date(i.date) : now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    ...cases.map((c) => ({
      url: `${site.url}/case-studies/${c.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];
}
