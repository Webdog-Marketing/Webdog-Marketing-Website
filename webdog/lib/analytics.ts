// Tracking IDs come from Vercel env vars, so nothing is hard-coded in the repo.
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID; // GTM-XXXXXXX
export const GSC_VERIFICATION = process.env.NEXT_PUBLIC_GSC_VERIFICATION; // only for URL-prefix verification

/*
 * Consent settings.
 * STRICT: Google Tag Manager isn't loaded at all until the visitor opts in, so
 *   nothing is sent to Google beforehand. Safest reading of UK PECR.
 * Set to false for Google "advanced" consent mode: GTM loads straight away and
 *   GA4 sends cookieless pings before consent (gives modelled data in GA4).
 */
export const CONSENT_STRICT = true;
export const CONSENT_KEY = 'wd-consent';
export const CONSENT_VERSION = 1; // bump to re-ask everyone (e.g. when adding a new tool)
export const CONSENT_MAX_AGE_DAYS = 365; // re-ask after this long

type DataLayerEvent = Record<string, unknown> & { event: string };

/** Push a custom event to GTM (e.g. form submissions → GA4 conversions). */
export function track(payload: DataLayerEvent) {
  if (typeof window === 'undefined') return;
  const w = window as unknown as { dataLayer?: unknown[] };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push(payload);
}
