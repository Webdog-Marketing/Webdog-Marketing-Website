import { fallbackCaseStudies, fallbackInsights, fallbackJobs, fallbackTeam, fallbackTestimonials } from './fallback';

/*
 * Airtable is the CMS for anything Matt needs to change without a redeploy:
 * testimonials (incl. headshots) and case studies.
 *
 * Content is cached for 5 minutes (ISR). To see a change instantly, hit
 * /api/revalidate?secret=YOUR_SECRET after editing in Airtable.
 *
 * If the env vars are missing (local dev before setup, preview builds),
 * the site falls back to the copy in lib/fallback.ts so it always renders.
 */

const TOKEN = process.env.AIRTABLE_TOKEN;
const BASE = process.env.AIRTABLE_BASE_ID;
export const airtableConfigured = Boolean(TOKEN && BASE);

export const REVALIDATE_SECONDS = 300;

type Attachment = {
  id: string;
  url: string;
  type?: string;
  thumbnails?: { large?: { url: string }; full?: { url: string } };
};

type AirtableRecord<F> = { id: string; fields: F };

export type Testimonial = {
  id: string;
  quote: string;
  context?: string;
  name: string;
  role: string;
  company: string;
  headshot?: string; // stable /media/... URL, never a raw Airtable URL
  source?: string; // 'Google' shows the Google review badge
  rating?: number; // 1–5 stars, shown for Google reviews
};

export type CaseStudy = {
  id: string;
  slug: string;
  title: string;
  client: string;
  excerpt: string;
  cover?: string;
  stats: { emoji: string; value: string; label: string }[];
  body?: string; // markdown (Airtable rich text)
};

/**
 * Airtable attachment URLs expire after ~2 hours, so pages never embed them.
 * Instead they point at /media/<table>/<recordId>, which looks up a fresh URL
 * on request. The attachment id is added as ?v= so a new photo = a new URL,
 * which lets the CDN cache each image forever.
 */
function mediaUrl(table: string, recordId: string, field: string, att?: Attachment[]) {
  const first = att?.[0];
  if (!first) return undefined;
  return `/media/${table}/${recordId}?field=${encodeURIComponent(field)}&v=${first.id}`;
}

async function listRecords<F>(table: string, params: Record<string, string> = {}) {
  const records: AirtableRecord<F>[] = [];
  let offset: string | undefined;
  do {
    const qs = new URLSearchParams(params);
    if (offset) qs.set('offset', offset);
    const res = await fetch(`https://api.airtable.com/v0/${BASE}/${encodeURIComponent(table)}?${qs}`, {
      headers: { Authorization: `Bearer ${TOKEN}` },
      next: { revalidate: REVALIDATE_SECONDS, tags: ['airtable'] },
    });
    if (!res.ok) throw new Error(`Airtable ${table}: ${res.status} ${await res.text()}`);
    const json = (await res.json()) as { records: AirtableRecord<F>[]; offset?: string };
    records.push(...json.records);
    offset = json.offset;
  } while (offset);
  return records;
}

const published = { filterByFormula: '{Published}', 'sort[0][field]': 'Order', 'sort[0][direction]': 'asc' };

/** "🔥 | £500k | saved in commission" — one stat per line in Airtable. */
function parseStats(raw?: string) {
  return (raw ?? '')
    .split('\n')
    .map((line) => line.split('|').map((s) => s.trim()))
    .filter((parts) => parts.length === 3 && parts[1])
    .map(([emoji, value, label]) => ({ emoji, value, label }));
}

type TestimonialFields = {
  Quote?: string;
  Context?: string;
  Name?: string;
  Role?: string;
  Company?: string;
  Headshot?: Attachment[];
  Source?: string;
  Rating?: number;
};

export async function getTestimonials(): Promise<Testimonial[]> {
  if (!airtableConfigured) return fallbackTestimonials;
  try {
    const rows = await listRecords<TestimonialFields>('Testimonials', published);
    return rows.map(({ id, fields: f }) => ({
      id,
      quote: f.Quote ?? '',
      context: f.Context,
      name: f.Name ?? '',
      role: f.Role ?? '',
      company: f.Company ?? '',
      headshot: mediaUrl('Testimonials', id, 'Headshot', f.Headshot),
      source: f.Source,
      rating: f.Rating,
    }));
  } catch (err) {
    console.error(err);
    return fallbackTestimonials;
  }
}

type CaseStudyFields = {
  Title?: string;
  Slug?: string;
  Client?: string;
  Excerpt?: string;
  Cover?: Attachment[];
  Stats?: string;
  Body?: string;
};

function toCaseStudy({ id, fields: f }: AirtableRecord<CaseStudyFields>): CaseStudy {
  return {
    id,
    slug: f.Slug ?? id,
    title: f.Title ?? '',
    client: f.Client ?? '',
    excerpt: f.Excerpt ?? '',
    cover: mediaUrl('Case Studies', id, 'Cover', f.Cover),
    stats: parseStats(f.Stats),
    body: f.Body,
  };
}

export async function getCaseStudies(): Promise<CaseStudy[]> {
  if (!airtableConfigured) return fallbackCaseStudies;
  try {
    return (await listRecords<CaseStudyFields>('Case Studies', published)).map(toCaseStudy);
  } catch (err) {
    console.error(err);
    return fallbackCaseStudies;
  }
}

export async function getCaseStudy(slug: string) {
  const all = await getCaseStudies();
  return all.find((c) => c.slug === slug);
}

export type Insight = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date?: string; // ISO yyyy-mm-dd
  cover?: string;
  body?: string; // markdown (Airtable rich text)
};

type InsightFields = { Title?: string; Slug?: string; Excerpt?: string; Date?: string; Cover?: Attachment[]; Body?: string };

/** Blog posts, newest first. */
export async function getInsights(): Promise<Insight[]> {
  if (!airtableConfigured) return fallbackInsights;
  try {
    const rows = await listRecords<InsightFields>('Insights', {
      filterByFormula: '{Published}',
      'sort[0][field]': 'Date',
      'sort[0][direction]': 'desc',
    });
    return rows.map(({ id, fields: f }) => ({
      id,
      slug: f.Slug ?? id,
      title: f.Title ?? '',
      excerpt: f.Excerpt ?? '',
      date: f.Date,
      cover: mediaUrl('Insights', id, 'Cover', f.Cover),
      body: f.Body,
    }));
  } catch (err) {
    console.error(err);
    return fallbackInsights;
  }
}

export async function getInsight(slug: string) {
  return (await getInsights()).find((i) => i.slug === slug);
}

export type TeamMember = { id: string; name: string; role: string; bio?: string; linkedin?: string; headshot?: string };

type TeamFields = { Name?: string; Role?: string; Bio?: string; LinkedIn?: string; Headshot?: Attachment[] };

export async function getTeam(): Promise<TeamMember[]> {
  if (!airtableConfigured) return fallbackTeam;
  try {
    const rows = await listRecords<TeamFields>('Team', published);
    return rows.map(({ id, fields: f }) => ({
      id,
      name: f.Name ?? '',
      role: f.Role ?? '',
      bio: f.Bio,
      linkedin: f.LinkedIn,
      headshot: mediaUrl('Team', id, 'Headshot', f.Headshot),
    }));
  } catch (err) {
    // Team table not created yet → show the built-in list.
    console.error(err);
    return fallbackTeam;
  }
}

export type Job = { id: string; title: string; summary: string; requirements: string[] };

type JobFields = { Title?: string; Summary?: string; Requirements?: string };

/** Open roles. Untick Published in Airtable to hide a role; no rows = "no open roles" message. */
export async function getJobs(): Promise<Job[]> {
  if (!airtableConfigured) return fallbackJobs;
  try {
    const rows = await listRecords<JobFields>('Jobs', published);
    return rows.map(({ id, fields: f }) => ({
      id,
      title: f.Title ?? '',
      summary: f.Summary ?? '',
      requirements: (f.Requirements ?? '')
        .split('\n')
        .map((r) => r.replace(/^[-•*]\s*/, '').trim())
        .filter(Boolean),
    }));
  } catch (err) {
    // Jobs table not created yet → show the built-in roles rather than an empty page.
    console.error(err);
    return fallbackJobs;
  }
}

/** Used by the media route to get a fresh (unexpired) attachment URL. */
export async function getAttachment(table: string, recordId: string, field: string, size: 'large' | 'full') {
  const res = await fetch(`https://api.airtable.com/v0/${BASE}/${encodeURIComponent(table)}/${recordId}`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
    next: { revalidate: 60 },
  });
  if (!res.ok) return undefined;
  const { fields } = (await res.json()) as { fields: Record<string, Attachment[] | undefined> };
  const att = fields[field]?.[0];
  if (!att) return undefined;
  return att.thumbnails?.[size]?.url ?? att.url;
}

/** Form submissions land in the Leads table. */
export async function createLead(fields: Record<string, string>) {
  if (!airtableConfigured) {
    console.warn('Airtable not configured — lead not saved:', fields);
    return;
  }
  const res = await fetch(`https://api.airtable.com/v0/${BASE}/Leads`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ records: [{ fields }], typecast: true }),
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`Airtable Leads: ${res.status} ${await res.text()}`);
}
