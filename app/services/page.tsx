import type { Metadata } from 'next';
import Link from 'next/link';
import { site } from '@/lib/site';
import { services } from '@/lib/services';
import ServiceIcon from '@/components/ServiceIcon';
import '@/components/service-page.css';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Conversion rate optimisation, internationalisation, website design, communications, SEO, content marketing and paid media management.',
};

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
              <li key={s.slug} id={s.slug} className="svc">
                <span className="svc__icon">
                  <ServiceIcon d={s.icon} />
                </span>
                <h2 className="svc__name">
                  {/* old anchor from the homepage links, kept inside the heading so it doesn't break the grid */}
                  {s.slug === 'conversion-rate-optimisation' && <span id="ux-ui-design" />}
                  <Link href={`/services/${s.slug}`}>{s.name}</Link>
                </h2>
                <div className="svc__text">
                  <p>
                    <strong>{s.tagline}</strong> {s.intro[s.intro.length - 1]}
                  </p>
                  <Link href={`/services/${s.slug}`} className="link svc__more">
                    More about {s.name === 'SEO' ? 'SEO' : s.name.toLowerCase()}
                  </Link>
                </div>
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
            <a href={site.officeHoursUrl} target="_blank" rel="noopener" className="link">
              or book a free hour
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
