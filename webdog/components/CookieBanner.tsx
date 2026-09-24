'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { GTM_ID } from '@/lib/analytics';
import { readConsent, saveConsent } from '@/lib/consent';

type View = 'hidden' | 'banner' | 'prefs';

// Reopen from anywhere with: window.dispatchEvent(new Event('open-cookie-settings'))
export default function CookieBanner() {
  const [view, setView] = useState<View>('hidden');
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!GTM_ID) return;
    if (!readConsent()) setView('banner');
    const reopen = () => {
      const c = readConsent();
      setAnalytics(c?.analytics ?? false);
      setMarketing(c?.marketing ?? false);
      setView('prefs');
    };
    window.addEventListener('open-cookie-settings', reopen);
    return () => window.removeEventListener('open-cookie-settings', reopen);
  }, []);

  // Move keyboard focus into the panel when preferences open.
  useEffect(() => {
    if (view === 'prefs') panel.current?.querySelector<HTMLElement>('input, button')?.focus();
  }, [view]);

  if (view === 'hidden') return null;

  const done = (a: boolean, m: boolean) => {
    saveConsent(a, m);
    setView('hidden');
  };

  return (
    <div
      ref={panel}
      className={`cookies ${view === 'prefs' ? 'cookies--prefs' : ''}`}
      role="dialog"
      aria-labelledby="cookies-title"
      aria-describedby="cookies-desc"
    >
      <p id="cookies-title" className="cookies__title">
        {view === 'prefs' ? 'Cookie preferences' : 'Cookies'}
      </p>
      <p id="cookies-desc">
        We use cookies to see how people use this site and to measure our marketing. Nothing is set unless you allow
        it. <Link href="/privacy#cookies">Read our cookie policy</Link>
      </p>

      {view === 'prefs' && (
        <div className="cookies__cats">
          <div className="cookies__cat">
            <div>
              <p className="cookies__cat-name">Strictly necessary</p>
              <p>Remembers your cookie choice. Always on.</p>
            </div>
            <span className="cookies__always">On</span>
          </div>
          <label className="cookies__cat">
            <div>
              <p className="cookies__cat-name">Analytics</p>
              <p>Google Analytics, to understand which pages people use.</p>
            </div>
            <input
              type="checkbox"
              role="switch"
              className="switch"
              checked={analytics}
              onChange={(e) => setAnalytics(e.target.checked)}
            />
          </label>
          <label className="cookies__cat">
            <div>
              <p className="cookies__cat-name">Marketing</p>
              <p>Measures whether our ads lead to enquiries.</p>
            </div>
            <input
              type="checkbox"
              role="switch"
              className="switch"
              checked={marketing}
              onChange={(e) => setMarketing(e.target.checked)}
            />
          </label>
        </div>
      )}

      <div className="cookies__actions">
        <button className="btn btn--ink btn--sm" onClick={() => done(true, true)}>
          Accept all
        </button>
        <button className="btn btn--outline btn--sm" onClick={() => done(false, false)}>
          Reject all
        </button>
        {view === 'banner' ? (
          <button className="cookies__manage" onClick={() => setView('prefs')}>
            Manage preferences
          </button>
        ) : (
          <button className="cookies__manage" onClick={() => done(analytics, marketing)}>
            Save my choices
          </button>
        )}
      </div>
    </div>
  );
}
