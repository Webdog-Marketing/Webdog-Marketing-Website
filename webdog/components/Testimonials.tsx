import type { Testimonial } from '@/lib/airtable';
import Avatar from './Avatar';

// Horizontal scroll-snap row: swipeable on mobile, no carousel JS needed.
export default function Testimonials({ items }: { items: Testimonial[] }) {
  return (
    <div className={`quotes ${items.length === 1 ? 'quotes--single' : ''}`} tabIndex={0} aria-label="Client testimonials">
      {items.map((t) => (
        <figure key={t.id} className="quote">
          <svg className="quote__mark" viewBox="0 0 40 32" aria-hidden="true">
            <path d="M0 32V19C0 8 6 1 17 0l2 5c-6 2-9 6-9 11h8v16zm22 0V19c0-11 6-18 17-19l1 5c-6 2-9 6-9 11h8v16z" />
          </svg>
          <blockquote>
            <p className="quote__text">{t.quote}</p>
            {t.context && <p className="quote__context">{t.context}</p>}
          </blockquote>
          <figcaption>
            <Avatar src={t.headshot} name={t.name} />
            <span>
              <strong>{t.name}</strong>
              <br />
              {t.role}
              {t.company ? `, ${t.company}` : ''}
            </span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
