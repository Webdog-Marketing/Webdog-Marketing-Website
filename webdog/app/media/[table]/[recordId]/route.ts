import { NextRequest } from 'next/server';
import { getAttachment } from '@/lib/airtable';

// Only these table/field pairs can be served — stops the route being used
// to read anything else in the base.
const ALLOWED: Record<string, { fields: string[]; size: 'large' | 'full' }> = {
  Testimonials: { fields: ['Headshot'], size: 'large' },
  'Case Studies': { fields: ['Cover'], size: 'full' },
  Insights: { fields: ['Cover'], size: 'full' },
  Team: { fields: ['Headshot'], size: 'large' },
};

export async function GET(req: NextRequest, { params }: { params: { table: string; recordId: string } }) {
  const table = decodeURIComponent(params.table);
  const field = req.nextUrl.searchParams.get('field') ?? '';
  const rule = ALLOWED[table];
  if (!rule || !rule.fields.includes(field) || !/^rec[A-Za-z0-9]{14}$/.test(params.recordId)) {
    return new Response('Not found', { status: 404 });
  }

  const url = await getAttachment(table, params.recordId, field, rule.size);
  if (!url) return new Response('Not found', { status: 404 });

  const upstream = await fetch(url, { cache: 'no-store' });
  if (!upstream.ok || !upstream.body) return new Response('Image unavailable', { status: 502 });

  return new Response(upstream.body, {
    headers: {
      'Content-Type': upstream.headers.get('content-type') ?? 'image/jpeg',
      // ?v= changes whenever the attachment changes, so each URL is immutable.
      'Cache-Control': 'public, max-age=31536000, s-maxage=31536000, immutable',
    },
  });
}
