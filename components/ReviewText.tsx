'use client';

import { useEffect, useId, useRef, useState } from 'react';

/** Full review text, collapsed to a few lines with a "Read full review" toggle. */
export default function ReviewText({ text }: { text: string }) {
  const [open, setOpen] = useState(false);
  // Start clamped, then measure: if the text fits in the clamp, drop the fade and button.
  const [overflows, setOverflows] = useState<boolean | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    const el = ref.current;
    if (el) setOverflows(el.scrollHeight > el.clientHeight + 2);
  }, []);

  const paragraphs = text.split(/\n\s*\n|\n/).map((p) => p.trim()).filter(Boolean);

  return (
    <div className="review">
      <div
        ref={ref}
        id={id}
        className={`review__text ${!open && overflows !== false ? 'is-clamped' : ''}`}
      >
        {paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
      {overflows === true && (
        <button type="button" className="review__toggle" aria-expanded={open} aria-controls={id} onClick={() => setOpen(!open)}>
          {open ? 'Show less' : 'Read full review'}
        </button>
      )}
    </div>
  );
}
