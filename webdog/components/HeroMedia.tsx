'use client';

import { useEffect, useRef } from 'react';
import FunnelArt from './FunnelArt';
import { site } from '@/lib/site';

/*
 * Hero visual. Set site.heroVideo in lib/site.ts to swap the built-in funnel
 * illustration for your own animation (see README → "Hero animation").
 */
export default function HeroMedia() {
  const ref = useRef<HTMLVideoElement>(null);
  const v = site.heroVideo;

  useEffect(() => {
    // Respect "reduce motion": stop on the first frame.
    if (ref.current && window.matchMedia('(prefers-reduced-motion: reduce)').matches) ref.current.pause();
  }, []);

  if (!v) return <FunnelArt />;
  return (
    <video
      ref={ref}
      className="hero__video"
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster={v.poster}
      width={1080}
      height={1080}
      aria-label={v.alt}
    >
      {v.webm && <source src={v.webm} type="video/webm" />}
      <source src={v.mp4} type="video/mp4" />
    </video>
  );
}
