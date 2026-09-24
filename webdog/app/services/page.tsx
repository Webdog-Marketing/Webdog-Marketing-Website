import type { Metadata } from 'next';
import Link from 'next/link';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'UX/UI design, website development, digital strategy, SEO, international expansion and communications for B2B SaaS businesses.',
};

const icon = (d: string) => (
  <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={d} />
  </svg>
);

const services = [
  {
    id: 'ux-ui-design',
    name: 'UX/UI design',
    icon: icon('M3 5h18v12H3zM3 9h18M13 13l5 2-2 1-1 2z'),
    text: 'We design user experiences that reduce friction, build trust fast, and guide visitors towards the actions that matter. From landing pages to full product onboarding flows, we make every screen work harder.',
  },
  {
    id: 'website-development',
    name: 'Website development',
    icon: icon('M8 8l-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14'),
    text: 'We build fast, clean websites designed around your growth goals. No bloated themes or disappearing developers. We work closely with you to deliver a functional site which is built with conversions in mind.',
  },
  {
    id: 'digital-strategy',
    name: 'Digital strategy',
    icon: icon('M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM12 12h.01'),
    text: 'Before we spend a penny or write a word, we understand your market, your buyers, and your current funnel. We build strategies that connect the dots, from awareness to activation, so every channel is pulling in the same direction.',
  },
  {
    id: 'seo',
    name: 'SEO',
    icon: icon('M10.5 17a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13zM20 20l-4.8-4.8M8 12l2-2 1.5 1.5L14 9'),
    text: 'We do SEO the right way: technical foundations, content that earns rankings, and a relentless focus on the keywords your buyers actually use. No tricks or shortcuts. Just sustainable traffic growth that keeps paying dividends.',
  },
  {
    id: 'international-expansion',
    name: 'International expansion',
    icon: icon('M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z'),
    text: "Expanding internationally isn't just about translating your website. It's understanding how buyers behave differently, which channels work where, and building trust from scratch. We've done it. We'll guide you through it.",
  },
  {
    id: 'communications',
    name: 'Communications',
    icon: icon('M4 5h16v11H9l-5 4zM8 9h8M8 12h5'),
    text: 'From email sequences that nurture leads to messaging frameworks that sharpen your positioning, we help you communicate clearly and persuasively at every stage of the buyer journey. Sending the right message, at the right time.',
  },
];

export default function ServicesPage() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <h1 className="page-hero__title">Our services</h1>
          <p className="page-hero__lede page-hero__lede--wide">
            Full-funnel expertise and zero filler. Every service we offer exists for one reason: to help your B2B
            SaaS business acquire more customers and retain them for longer.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <ul className="svc-list">
            {services.map((s) => (
              <li key={s.id} id={s.id} className="svc">
                <span className="svc__icon">{s.icon}</span>
                <h2 className="svc__name">{s.name}</h2>
                <p className="svc__text">{s.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--tight">
        <div className="wrap cs-cta">
          <div>
            <h2 className="h3">Not sure where to start?</h2>
            <p className="cs-cta__sub">A free funnel audit shows you which of these will move the needle first.</p>
          </div>
          <div className="cs-cta__actions">
            <Link href="/#audit" className="btn btn--fluro btn--lg">
              Get your free funnel audit
            </Link>
            <a href={site.bookingUrl} target="_blank" rel="noopener" className="link">
              or book a free hour
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
