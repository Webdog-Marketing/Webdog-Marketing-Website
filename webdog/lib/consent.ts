'use client';

import { CONSENT_KEY, CONSENT_MAX_AGE_DAYS, CONSENT_VERSION, track } from './analytics';

export type Consent = { v: number; ts: number; analytics: boolean; marketing: boolean };

type W = Window & { gtag?: (...a: unknown[]) => void; __wdLoadGtm?: () => void };

/** The visitor's saved choice, or null if none / expired / from an older version. */
export function readConsent(): Consent | null {
  try {
    const c = JSON.parse(localStorage.getItem(CONSENT_KEY) || 'null') as Consent | null;
    if (!c || c.v !== CONSENT_VERSION) return null;
    if (Date.now() - c.ts > CONSENT_MAX_AGE_DAYS * 864e5) return null;
    return c;
  } catch {
    return null;
  }
}

// Cookies set by Google tags, removed when consent is withdrawn.
const ANALYTICS_COOKIES = [/^_ga$/, /^_ga_/, /^_gid$/, /^_gat/];
const MARKETING_COOKIES = [/^_gcl_/, /^_gac_/, /^IDE$/, /^_fbp$/, /^li_fat_id$/];

function clearCookies(patterns: RegExp[]) {
  const host = location.hostname;
  const bare = host.replace(/^www\./, '');
  const domains = ['', host, `.${host}`, bare, `.${bare}`];
  document.cookie
    .split(';')
    .map((c) => c.split('=')[0].trim())
    .filter((name) => patterns.some((p) => p.test(name)))
    .forEach((name) => {
      domains.forEach((d) => {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${d ? `; domain=${d}` : ''}`;
      });
    });
}

export function saveConsent(analytics: boolean, marketing: boolean) {
  const w = window as W;
  const consent: Consent = { v: CONSENT_VERSION, ts: Date.now(), analytics, marketing };
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
  } catch {}

  const a = analytics ? 'granted' : 'denied';
  const m = marketing ? 'granted' : 'denied';
  w.gtag?.('consent', 'update', { analytics_storage: a, ad_storage: m, ad_user_data: m, ad_personalization: m });

  if (!analytics) clearCookies(ANALYTICS_COOKIES);
  if (!marketing) clearCookies(MARKETING_COOKIES);

  track({ event: 'consent_update', consent_analytics: a, consent_marketing: m });

  // Strict mode: GTM only loads once something is allowed.
  if (analytics || marketing) w.__wdLoadGtm?.();
}
