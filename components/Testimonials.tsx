import type { Testimonial } from '@/lib/airtable';
import Avatar from './Avatar';
import ReviewText from './ReviewText';
import QuoteScroller from './QuoteScroller';

export function Stars({ n }: { n: number }) {
  return (
    <span className="stars" aria-hidden="true">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} viewBox="0 0 20 20" width="18" height="18" className={i <= Math.round(n) ? 'on' : ''}>
          <path d="M10 1.5l2.6 5.4 5.9.8-4.3 4.1 1 5.8L10 14.8l-5.2 2.8 1-5.8L1.5 7.7l5.9-.8z" />
        </svg>
      ))}
    </span>
  );
}

export function GoogleG() {
  return (
    <svg viewBox="0 0 48 48" width="20" height="20" aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.5l6.7-6.7C35.6 2.4 30.2 0 24 0 14.6 0 6.6 5.4 2.6 13.2l7.8 6.1C12.3 13.6 17.7 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.1 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.4c-.5 2.9-2.2 5.3-4.6 7l7.2 5.6c4.2-3.9 7.1-9.6 7.1-17.1z" />
      <path fill="#FBBC05" d="M10.4 28.7c-.5-1.4-.8-3-.8-4.7s.3-3.3.8-4.7l-7.8-6.1C.9 16.6 0 20.2 0 24s.9 7.4 2.6 10.8l7.8-6.1z" />
      <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.2-5.6c-2 1.4-4.9 2.3-8.7 2.3-6.3 0-11.7-4.1-13.6-9.8l-7.8 6.1C6.6 42.6 14.6 48 24 48z" />
    </svg>
  );
}

/*
 * Each card shows a short pull quote (Quote) in large type, with the full review
 * (Review) underneath, collapsed to a few lines. If only a long Quote is filled in,
 * its first sentence becomes the pull quote and the rest is collapsed, so cards
 * never balloon.
 */
function split(t: Testimonial) {
  if (t.review) return { headline: t.quote, review: t.review };
  if (t.quote.length <= 160) return { headline: t.quote, review: undefined };
  const first = t.quote.split(/(?<=[.!?])\s+/)[0];
  const headline = first.length <= 160 ? first : `${first.slice(0, 150).replace(/\s+\S*$/, '')}…`;
  return { headline, review: t.quote };
}

export default function Testimonials({ items }: { items: Testimonial[] }) {
  return (
    <QuoteScroller count={items.length}>
      {items.map((t) => {
        const { headline, review } = split(t);
        const by = [t.role, t.company].filter(Boolean).join(', ') || (t.source === 'Google' ? 'Google review' : '');
        return (
          <figure key={t.id} className="quote">
            {t.source === 'Google' ? (
              <p className="quote__google">
                <GoogleG />
                <Stars n={t.rating ?? 5} />
                <span className="sr-only">{t.rating ?? 5} out of 5 stars on Google</span>
              </p>
            ) : (
              <svg className="quote__mark" viewBox="0 0 40 32" aria-hidden="true">
                <path d="M0 32V19C0 8 6 1 17 0l2 5c-6 2-9 6-9 11h8v16zm22 0V19c0-11 6-18 17-19l1 5c-6 2-9 6-9 11h8v16z" />
              </svg>
            )}
            <blockquote>
              <p className="quote__text">{headline}</p>
              {t.context && !review && <p className="quote__context">{t.context}</p>}
              {review && <ReviewText text={review} />}
            </blockquote>
            <figcaption>
              <Avatar src={t.headshot} name={t.name} />
              <span>
                <strong>{t.name}</strong>
                {by && (
                  <>
                    <br />
                    {by}
                  </>
                )}
              </span>
            </figcaption>
            {t.services && t.services.length > 0 && (
              <ul className="quote__tags" aria-label="Services">
                {t.services.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            )}
          </figure>
        );
      })}
    </QuoteScroller>
  );
}
