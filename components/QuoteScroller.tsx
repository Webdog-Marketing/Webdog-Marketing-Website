'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

/** Horizontal, swipeable row of testimonial cards with previous/next buttons. */
export default function QuoteScroller({ children, count }: { children: React.ReactNode; count: number }) {
  const track = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const update = useCallback(() => {
    const el = track.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    update();
    const el = track.current;
    el?.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      el?.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [update]);

  const move = (dir: 1 | -1) => {
    const el = track.current;
    const card = el?.querySelector<HTMLElement>('.quote');
    if (!el || !card) return;
    el.scrollBy({ left: dir * (card.offsetWidth + 20), behavior: 'smooth' });
  };

  const showNav = count > 1 && !(atStart && atEnd);

  return (
    <div className="quotes-wrap">
      <div ref={track} className={`quotes ${count === 1 ? 'quotes--single' : ''}`} tabIndex={0} aria-label="Client testimonials">
        {children}
      </div>
      {showNav && (
        <div className="quotes__nav">
          <button type="button" className="quotes__btn" onClick={() => move(-1)} disabled={atStart} aria-label="Previous reviews">
            <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <button type="button" className="quotes__btn" onClick={() => move(1)} disabled={atEnd} aria-label="Next reviews">
            <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </div>
      )}
    </div>
  );
}
