'use client';

import { useEffect, useState } from 'react';
import { CONSENT_KEY, GTM_ID, track } from '@/lib/analytics';

type Choice = 'granted' | 'denied';

function applyConsent(choice: Choice) {
  const w = window as unknown as { gtag?: (...args: unknown[]) => void };
  const value = choice;
  w.gtag?.('consent', 'update', {
    ad_storage: value,
    ad_user_data: value,
    ad_personalization: value,
    analytics_storage: value,
  });
  track({ event: 'consent_update', consent: choice });
}

// Reopen from anywhere with: window.dispatchEvent(new Event('open-cookie-settings'))
export default function CookieBanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!GTM_ID) return;
    try {
      if (!localStorage.getItem(CONSENT_KEY)) setOpen(true);
    } catch {
      setOpen(true);
    }
    const reopen = () => setOpen(true);
    window.addEventListener('open-cookie-settings', reopen);
    return () => window.removeEventListener('open-cookie-settings', reopen);
  }, []);

  if (!open) return null;

  const choose = (choice: Choice) => {
    try {
      localStorage.setItem(CONSENT_KEY, choice);
    } catch {}
    applyConsent(choice);
    setOpen(false);
  };

  return (
    <div className="cookies" role="dialog" aria-live="polite" aria-labelledby="cookies-title">
      <p id="cookies-title" className="cookies__title">Cookies</p>
      <p>
        We’d like to use analytics cookies to see how people use this site so we can improve it. Nothing is set
        unless you accept.
      </p>
      <div className="cookies__actions">
        <button className="btn btn--ink btn--sm" onClick={() => choose('granted')}>
          Accept cookies
        </button>
        <button className="btn btn--outline btn--sm" onClick={() => choose('denied')}>
          Reject cookies
        </button>
      </div>
    </div>
  );
}
