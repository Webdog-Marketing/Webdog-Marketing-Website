// Tracking IDs come from Vercel env vars, so nothing is hard-coded in the repo.
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID; // GTM-XXXXXXX
export const GSC_VERIFICATION = process.env.NEXT_PUBLIC_GSC_VERIFICATION; // only for URL-prefix verification
export const CONSENT_KEY = 'wd-consent'; // 'granted' | 'denied'

type DataLayerEvent = Record<string, unknown> & { event: string };

/** Push a custom event to GTM (e.g. form submissions → GA4 conversions). */
export function track(payload: DataLayerEvent) {
  if (typeof window === 'undefined') return;
  const w = window as unknown as { dataLayer?: unknown[] };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push(payload);
}
