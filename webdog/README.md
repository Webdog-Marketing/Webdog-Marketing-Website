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
| Pricing plans | `plans` list at the top of `app/pricing/page.tsx` |
| Blog posts | Airtable → **Insights** |
| Privacy policy | `app/privacy/page.tsx` |
| Matt's photo on About | Put the file in `public/about/`, then set `aboutPhoto` in `lib/site.ts` |
| Team members | Airtable → **Team** |
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
| Source | Single select: `Client`, `Google` | `Google` shows the Google logo and stars instead of the quote mark |
| Rating | Number (or Rating field) | Stars for Google reviews, 1–5 |
| Order | Number | Lower shows first |
| Published | Checkbox | Only ticked rows appear |

Google reviews: copy each review's text into Quote, the reviewer's name into Name, set Source = Google and Rating = 5. Role and Company can stay empty. The "5.0 · 5 Google reviews" badge on the homepage is set in `lib/site.ts` → `googleReviews`; update the count by hand as reviews come in.

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

**Insights** (blog posts; newest first by Date)

| Field | Type | Notes |
| --- | --- | --- |
| Title | Single line text | Primary field |
| Slug | Single line text | URL: `/insights/<slug>`. Keep the old Wix slugs so existing links still work |
| Excerpt | Long text | Card summary and meta description |
| Date | Date | Publish date |
| Cover | Attachment | 16:10 image. Empty shows the Webdog icon on green |
| Body | Long text, **rich text on** | The article |
| Published | Checkbox | |

**Team** (About page)

| Field | Type | Notes |
| --- | --- | --- |
| Name | Single line text | Primary field |
| Role | Single line text | |
| Headshot | Attachment | Square, 600px+. Empty shows initials |
| Bio | Long text | Optional, one or two sentences |
| LinkedIn | URL | Optional |
| Order | Number | |
| Published | Checkbox | |

**Jobs**

| Field | Type | Notes |
| --- | --- | --- |
| Title | Single line text | Primary field |
| Summary | Long text | The role description |
| Requirements | Long text | One requirement per line |
| Order | Number | |
| Published | Checkbox | Untick to hide a filled role |

**Leads** (audit requests, newsletter, contact form, job applications)

| Field | Type |
| --- | --- |
| Name | Single line text (primary) |
| Email | Email |
| Phone | Phone number |
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

## Hero animation

The homepage hero shows a built-in funnel illustration until you add your own animation.

**Export spec**
- Format: MP4 (H.264) required, plus WebM (VP9) optional for smaller files in Chrome/Firefox
- Size: 1080 × 1080 px (square; shown at up to ~540px, exported at 2× for sharp screens)
- Length: 6–12 seconds, looping seamlessly (last frame flows into the first)
- Frame rate: 30fps. No audio track
- File size: under 2 MB each, ideally around 1 MB
- Background: solid #0E3526 baked in (video can't be transparent in every browser, so it must match the hero colour)
- Keep the important content inside the central ~80%, as the frame has rounded corners
- Poster: a still of the first frame as JPG or WebP, under 150 KB. Shown while loading and to visitors with "reduce motion" switched on

**To install:** put the files in `public/hero/` (e.g. `hero.mp4`, `hero.webm`, `hero-poster.jpg`), then in `lib/site.ts` set:

```ts
heroVideo: { mp4: '/hero/hero.mp4', webm: '/hero/hero.webm', poster: '/hero/hero-poster.jpg', alt: 'Short description of the animation' },
```

Set it back to `null` to return to the funnel illustration.

## Tracking: GTM, GA4, Search Console

**Google Tag Manager** loads on every page from `NEXT_PUBLIC_GTM_ID` (Vercel → Settings → Environment Variables, Production only so previews don't pollute data).

**Consent:** the cookie banner offers Accept all, Reject all and Manage preferences (Analytics and Marketing switches).
- **Strict mode (default):** GTM isn't loaded at all until the visitor allows analytics or marketing, so nothing reaches Google beforehand. Change `CONSENT_STRICT` in `lib/analytics.ts` to `false` for Google's "advanced" mode (GTM loads straight away and sends cookieless pings for modelled data).
- Choices map to Consent Mode v2: Analytics → `analytics_storage`; Marketing → `ad_storage`, `ad_user_data`, `ad_personalization`.
- Choices are remembered for 12 months, then the banner asks again. Bump `CONSENT_VERSION` to re-ask everyone (e.g. when you add a new tracking tool).
- Turning a category off deletes the Google cookies it set (`_ga`, `_ga_*`, `_gcl_*` etc.).
- "Cookie settings" in the footer and on /privacy reopens the preferences.
- **In GTM:** Google tags (GA4, Google Ads) respect consent automatically. For any non-Google tag (LinkedIn Insight, Meta Pixel, Hotjar), open the tag → Advanced settings → Consent settings → *Require additional consent* → `ad_storage` (marketing tools) or `analytics_storage` (analytics tools). Admin → Container settings → tick *Enable consent overview* to check every tag at a glance.

**GA4 (set up inside GTM, not in code):**
1. Tags → New → *Google Tag* → your GA4 Measurement ID (`G-...`) → trigger *Initialization – All Pages*.
2. Built-in consent checks handle the rest; no extra consent tags needed.
3. Conversions the site already pushes to the dataLayer:
   - `generate_lead` (with `form_name: funnel_audit`) when an audit request succeeds
   - `generate_lead` (with `form_name: contact`) when the About page contact form is sent
   - `job_application` when someone applies for a role
   - `sign_up` (with `method: newsletter`) when someone subscribes
   - `consent_update` when a visitor makes a cookie choice
   For each: Triggers → New → *Custom Event* with that event name, then a *GA4 Event* tag with the same name. Mark `generate_lead` as a key event in GA4.
4. Preview in GTM, then Submit/Publish the container.

**Search Console:** best option is a *Domain* property verified by DNS TXT record (covers www, non-www, http and https, and survives any site rebuild). If you use a *URL prefix* property instead, put the meta-tag content value in `NEXT_PUBLIC_GSC_VERIFICATION`. Then submit `https://www.webdog.marketing/sitemap.xml`.

`robots.txt` blocks Google on Vercel preview URLs; only production is indexable.

## Still to build

Nothing structural. Before launch: fill in `REGISTERED_OFFICE` and `ICO_NUMBER` at the top of `app/privacy/page.tsx`, and move the three Insights articles and case study write-ups into Airtable.
