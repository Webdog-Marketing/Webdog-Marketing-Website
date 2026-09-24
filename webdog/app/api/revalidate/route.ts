import { revalidateTag } from 'next/cache';
import { NextRequest } from 'next/server';

// Visit /api/revalidate?secret=... (or call it from an Airtable automation)
// to publish Airtable edits immediately instead of waiting up to 5 minutes.
export async function GET(req: NextRequest) {
  if (req.nextUrl.searchParams.get('secret') !== process.env.REVALIDATE_SECRET) {
    return Response.json({ ok: false, error: 'Wrong or missing secret' }, { status: 401 });
  }
  revalidateTag('airtable');
  return Response.json({ ok: true, revalidated: new Date().toISOString() });
}
export const POST = GET;
