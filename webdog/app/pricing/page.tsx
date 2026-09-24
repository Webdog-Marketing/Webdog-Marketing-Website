import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'Monthly marketing plans for SMBs, B2B SaaS startups and scale-ups. Clear pricing from £1,000 a month.',
};

// Edit plans here. `featured: true` adds the label and highlight.
const plans = [
  {
    name: 'SMBs',
    price: '£1,000',
    featured: true,
    label: 'Great starting point',
    blurb: 'For sole traders or micro-enterprises who want to develop their marketing alongside a trusted partner.',
    features: ['Full website management', 'Communications mapping', 'SEO strategy and deployment', 'Content creation'],
  },
  {
    name: 'Startup',
    price: '£4,000',
    blurb: 'Growing B2B SaaS companies scaling their marketing to generate more leads.',
    features: [
      'Demand generation strategy',
      'Messaging & positioning',
      'Website conversion rate optimisation',
      'Content creation',
      'Ads management',
      'Full-funnel campaigns',
    ],
  },
  {
    name: 'Scaleup',
    price: '£7,500',
    blurb: 'SaaS companies ready to accelerate growth and expand their market reach at a faster pace.',
    features: [
      'Demand generation strategy',
      'Messaging & positioning',
      'Website conversion rate optimisation',
      'Content creation',
      'Paid ads management',
      'Full-funnel campaigns',
      'SEO strategy & execution',
      'ABM campaigns',
    ],
  },
] as { name: string; price: string; featured?: boolean; label?: string; blurb: string; features: string[] }[];

const TERM = '12-month plan';

export default function PricingPage() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <h1 className="page-hero__title">Our pricing plans</h1>
          <p className="page-hero__lede">Clear monthly pricing. No hidden extras.</p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <ul className="plans">
            {plans.map((p) => (
              <li key={p.name} className={`plan ${p.featured ? 'plan--featured' : ''}`}>
                {p.label && <span className="plan__label">{p.label}</span>}
                <h2 className="plan__name">{p.name}</h2>
                <p className="plan__price">
                  <strong>{p.price}</strong> <span>per month</span>
                </p>
                <p className="plan__term">{TERM}</p>
                <p className="plan__blurb">{p.blurb}</p>
                <ul className="plan__features">
                  {p.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
                <Link
                  href={`/about?topic=pricing&plan=${encodeURIComponent(p.name)}#contact`}
                  className={`btn ${p.featured ? 'btn--fluro' : 'btn--ink'} plan__cta`}
                >
                  Talk to us about {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--tight">
        <div className="wrap cs-cta">
          <div>
            <h2 className="h3">Not sure which plan fits?</h2>
            <p className="cs-cta__sub">Start with a free funnel audit and we’ll tell you where your budget should go first.</p>
          </div>
          <div className="cs-cta__actions">
            <Link href="/#audit" className="btn btn--fluro btn--lg">
              Get your free funnel audit
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
