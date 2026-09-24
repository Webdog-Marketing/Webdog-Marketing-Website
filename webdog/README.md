# webdog.marketing

Next.js 14 (App Router) site for Webdog Marketing. Code on GitHub, hosted on Vercel, content in Airtable.

```bash
npm install
cp .env.example .env.local   # add your Airtable details
npm run dev                  # http://localhost:3000
```

Without Airtable env vars the site still runs, using the current live copy in `lib/fallback.ts`.

## What lives where

| Change | Where |
| --- | --- |
| Testimonials, headshots | Airtable → **Testimonials** |
| Case studies (cards + full write-ups) | Airtable → **Case Studies** |
| Audit requests, newsletter sign-ups | Arrive in Airtable → **Leads** |
| Homepage copy, services, How we work | `app/page.tsx` |
| Brand colours, fonts | Top of `app/globals.css` |
| Nav, email, socials, legal line | `lib/site.ts` |
| Logo | `components/Logo.tsx` (placeholder — swap for the real file in `/public/brand/`) |

Airtable edits appear within 5 minutes. To publish instantly, visit
`https://www.webdog.marketing/api/revalidate?secret=YOUR_REVALIDATE_SECRET`
(or call that URL from an Airtable automation when a record changes).

## Airtable base

Create one base with three tables. Field names must match exactly.

**Testimonials**

| Field | Type | Notes |
| --- | --- | --- |
| Name | Single line text | Primary field |
| Quote | Long text | The big headline quote |
| Context | Long text | Optional line under the quote |
| Role | Single line text | e.g. Head of Marketing |
| Company | Single line text | |
| Headshot | Attachment | Square crop, 400px+. Leave empty to show initials |
| Order | Number | Lower shows first |
| Published | Checkbox | Only ticked rows appear |

**Case Studies**

| Field | Type | Notes |
| --- | --- | --- |
| Title | Single line text | Primary field |
| Slug | Single line text | URL: `/case-studies/<slug>`, e.g. `pass-the-keys` |
| Client | Single line text | |
| Excerpt | Long text | Card summary |
| Cover | Attachment | 16:10 image. Empty = client name on green |
| Stats | Long text | One per line: `💸 \| £500k \| saved in commission` |
| Body | Long text, **rich text on** | The full write-up (headings, lists, quotes) |
| Order | Number | |
| Published | Checkbox | |

**Leads**

| Field | Type |
| --- | --- |
| Name | Single line text (primary) |
| Email | Email |
| Website | URL |
| Notes | Long text |
| Type | Single select: `Funnel audit`, `Newsletter` |
| Source | Single line text |

Tip: add an Airtable automation on **Leads** → "When record created" → send yourself an email, so audit requests reach you straight away.

### Token

Airtable → Builder hub → Personal access tokens → Create:
scopes `data.records:read` and `data.records:write`, access to this base only.

## Why images go through `/media/...`

Airtable attachment links expire after about 2 hours, so the pages never embed them directly.
Headshots and covers are served from `/media/<table>/<recordId>?field=...&v=<attachmentId>`,
which fetches a fresh link on request. Swapping a photo in Airtable changes the `v=` value,
so the new image shows as soon as the page refreshes and Vercel can cache each image indefinitely.

## Deploy (Vercel)

1. Push to a new GitHub repo.
2. Vercel → Add New Project → import the repo (framework auto-detects as Next.js).
3. Add the env vars from `.env.example`.
4. Deploy, check the `*.vercel.app` preview, then point `webdog.marketing` at Vercel
   (Vercel → Settings → Domains, then update DNS where the domain is registered).
   Disconnect the domain from Wix at the same time.

`next.config.mjs` 301-redirects the old Wix URLs (`/resources`, `/news`, `/post/...`, `/pricing-plans/...`)
to the new routes so existing links and rankings carry over.

## Tracking: GTM, GA4, Search Console

**Google Tag Manager** loads on every page from `NEXT_PUBLIC_GTM_ID` (Vercel → Settings → Environment Variables, Production only so previews don't pollute data).

**Consent:** Consent Mode v2 is built in. Analytics and ads storage default to *denied* until the visitor clicks "Accept cookies" in the banner. "Cookie settings" in the footer reopens it. GA4 still receives cookieless pings before consent, so modelled data fills the gap.

**GA4 (set up inside GTM, not in code):**
1. Tags → New → *Google Tag* → your GA4 Measurement ID (`G-...`) → trigger *Initialization – All Pages*.
2. Built-in consent checks handle the rest; no extra consent tags needed.
3. Conversions the site already pushes to the dataLayer:
   - `generate_lead` (with `form_name: funnel_audit`) when an audit request succeeds
   - `sign_up` (with `method: newsletter`) when someone subscribes
   - `consent_update` when a visitor makes a cookie choice
   For each: Triggers → New → *Custom Event* with that event name, then a *GA4 Event* tag with the same name. Mark `generate_lead` as a key event in GA4.
4. Preview in GTM, then Submit/Publish the container.

**Search Console:** best option is a *Domain* property verified by DNS TXT record (covers www, non-www, http and https, and survives any site rebuild). If you use a *URL prefix* property instead, put the meta-tag content value in `NEXT_PUBLIC_GSC_VERIFICATION`. Then submit `https://www.webdog.marketing/sitemap.xml`.

`robots.txt` blocks Google on Vercel preview URLs; only production is indexable.

## Still to build

`/about`, `/services`, `/insights`, `/jobs`, `/pricing` — linked from the nav/footer but not yet created.
