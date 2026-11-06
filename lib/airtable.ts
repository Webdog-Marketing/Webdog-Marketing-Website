import { unstable_cache } from 'next/cache';
import { fallbackCaseStudies, fallbackInsights, fallbackJobs, fallbackTeam, fallbackTestimonials, localHeadshots } from './fallback';

/*
 * Airtable is the CMS for anything Matt needs to change without a redeploy:
 * testimonials (incl. headshots) and case studies.
 *
 * Content is cached for 24 hours to stay well inside Airtable's free-plan limit
 * of 1,000 API calls a month (shared by every base in the workspace). To see a
 * change straight away, hit
 * /api/revalidate?secret=YOUR_SECRET after editing in Airtable.
 *
 * If the env vars are missing (local dev before setup, preview builds),
 * the site falls back to the copy in lib/fallback.ts so it always renders.
 */

const TOKEN = process.env.AIRTABLE_TOKEN;
const BASE = process.env.AIRTABLE_BASE_ID;
export const airtableConfigured = Boolean(TOKEN && BASE);

export const REVALIDATE_SECONDS = 86400; // 24 hours

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
  review?: string; // full review text, shown collapsed under the pull quote
  services?: string[]; // what we did for them, shown as tags
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
  Review?: string;
  Services?: string[] | string; // multiple select (or comma-separated text)
};

async function loadTestimonials(): Promise<Testimonial[]> {
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
      review: f.Review?.trim() || undefined,
      services: (Array.isArray(f.Services) ? f.Services : (f.Services ?? '').split(','))
        .map((s) => s.trim())
        .filter(Boolean),
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

async function loadCaseStudies(): Promise<CaseStudy[]> {
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
async function loadInsights(): Promise<Insight[]> {
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

async function loadTeam(): Promise<TeamMember[]> {
  if (!airtableConfigured) return fallbackTeam;
  try {
    const rows = await listRecords<TeamFields>('Team', published);
    return rows.map(({ id, fields: f }) => ({
      id,
      name: f.Name ?? '',
      role: f.Role ?? '',
      bio: f.Bio,
      linkedin: f.LinkedIn,
      // Airtable photo first; otherwise the one stored in public/team/
      headshot: mediaUrl('Team', id, 'Headshot', f.Headshot) ?? localHeadshots[(f.Name ?? '').trim()],
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
async function loadJobs(): Promise<Job[]> {
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
async function loadAttachment(table: string, recordId: string, field: string, size: 'large' | 'full') {
  const res = await fetch(`https://api.airtable.com/v0/${BASE}/${encodeURIComponent(table)}/${recordId}`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
    // Attachment links expire after ~2 hours, so this lookup is cached for 1 hour.
    // It only runs when the CDN doesn't already have the image.
    next: { revalidate: 3600 },
  });
  if (!res.ok) return undefined;
  const { fields } = (await res.json()) as { fields: Record<string, Attachment[] | undefined> };
  const att = fields[field]?.[0];
  if (!att) return undefined;
  return att.thumbnails?.[size]?.url ?? att.url;
}

/*
 * Every read goes through Next's shared data cache, keyed by function (and its
 * arguments). The *result* is cached, including the built-in fallback when Airtable
 * is unreachable or over its limit, so a failing Airtable can never cause a storm of
 * repeat calls from bots, crawlers or missing pages. One call per table per day.
 * /api/revalidate clears it all (tag "airtable").
 */
const daily = { revalidate: REVALIDATE_SECONDS, tags: ['airtable'] };
export const getTestimonials = unstable_cache(loadTestimonials, ['airtable-testimonials'], daily);
export const getCaseStudies = unstable_cache(loadCaseStudies, ['airtable-case-studies'], daily);
export const getInsights = unstable_cache(loadInsights, ['airtable-insights'], daily);
export const getTeam = unstable_cache(loadTeam, ['airtable-team'], daily);
export const getJobs = unstable_cache(loadJobs, ['airtable-jobs'], daily);
// Attachment links expire after ~2 hours, so these lookups are cached for 1 hour.
export const getAttachment = unstable_cache(loadAttachment, ['airtable-attachment'], {
  revalidate: 3600,
  tags: ['airtable'],
});

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
