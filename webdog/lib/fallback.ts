import type { CaseStudy, Testimonial } from './airtable';

// Mirrors the current live content. Used only when Airtable isn't connected.

export const fallbackTestimonials: Testimonial[] = [
  {
    id: 'fallback-duncan',
    quote: "Saved us 000's by building our direct booking website.",
    context: "We helped a PropTech business reduce reliance on OTA's by building a user-friendly booking website.",
    name: 'Duncan Rooney',
    role: 'Head of Marketing',
    company: 'Pass the Keys',
  },
];

export const fallbackCaseStudies: CaseStudy[] = [
  {
    id: 'fallback-ptk',
    slug: 'pass-the-keys',
    client: 'Pass the Keys',
    title: 'How We Helped Pass the Keys Build a Direct Booking Engine That Saved £500k in Commission',
    excerpt:
      'Pass the Keys had 3,000 properties and a growing commission bill. Here is how a direct booking website, built around underserved traveller niches, changed the economics of their business.',
    stats: [
      { emoji: '💸', value: '£500k', label: 'saved in commission' },
      { emoji: '🏡', value: '3,000', label: 'properties' },
    ],
  },
  {
    id: 'fallback-applaud',
    slug: 'applaud',
    client: 'Applaud',
    title: 'How We Helped Applaud Grow Their Organic Presence in the US Market',
    excerpt:
      'Applaud had strong UK organic growth but were struggling to replicate it in the US. Here is how we fixed the foundations and built a content programme that changed that.',
    stats: [],
  },
  {
    id: 'fallback-stannp',
    slug: 'stannp',
    client: 'Stannp',
    title: 'How We Helped Stannp Reduce Paid Reliance and Win Back Organic Growth',
    excerpt:
      'Stannp had a decade of experience but a website that was holding them back. Here is how a full redesign and content overhaul changed their conversion picture.',
    stats: [],
  },
];
