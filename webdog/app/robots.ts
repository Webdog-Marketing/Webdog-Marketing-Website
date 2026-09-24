import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';

// Vercel preview deployments (*.vercel.app) are kept out of Google;
// only the production domain is indexable.
export default function robots(): MetadataRoute.Robots {
  const isProd = process.env.VERCEL_ENV ? process.env.VERCEL_ENV === 'production' : true;
  if (!isProd) return { rules: { userAgent: '*', disallow: '/' } };
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/api/', '/media/'] },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
