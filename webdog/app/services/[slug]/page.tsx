import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ContactForm from '@/components/ContactForm';
import Testimonials from '@/components/Testimonials';
import ServiceIcon from '@/components/ServiceIcon';
import { getService, services } from '@/lib/services';
import { getTestimonials } from '@/lib/airtable';
import { site } from '@/lib/site';
import '@/components/service-page.css';

export const dynamicParams = false; // only the services in lib/services.ts exist

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const s = getService(params.slug);
  if (!s) return {};
  return {
    title: s.metaTitle,
    description: s.metaDescription,
    alternates: { canonical: `/services/${s.slug}` },
  };
}

export default async function ServicePage({ params }: { params: { slug: string } }) {
  const s = getService(params.slug);
  if (!s) notFound();

  const reviews = s.reviewTags.length
    ? (await getTestimonials()).filter((t) => t.services?.some((tag) => s.reviewTags.includes(tag)))
    : [];
  const lower = s.name === 'SEO' ? 'SEO' : s.name.toLowerCase();
  const related = s.related.map(getService).filter(Boolean) as NonNullable<ReturnType<typeof getService>>[];

  // Structured data: helps Google (and AI search) understand the service and FAQs.
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: s.name,
      description: s.metaDescription,
      provider: { '@type': 'Organization', name: site.name, url: site.url },
      areaServed: 'United Kingdom',
      url: `${site.url}/services/${s.slug}`,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: s.faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* HERO */}
      <section className="page-hero svc-hero">
        <div className="wrap svc-hero__inner">
          <div>
            <Link href="/services" className="page-hero__back">
              All services
            </Link>
            <h1 className="page-hero__title">{s.name}</h1>
            <p className="svc-hero__tagline">{s.tagline}</p>
            {s.intro.map((p) => (
              <p key={p} className="svc-hero__intro">
                {p}
              </p>
            ))}
            <div className="svc-hero__actions">
              <Link href="#contact" className="btn btn--fluro btn--lg">
                Book a strategy call
              </Link>
              <Link href="/#audit" className="svc-hero__link">
                or get a free funnel audit
              </Link>
            </div>
          </div>
          <aside className="svc-best" aria-labelledby="best-for">
            <span className="svc-best__icon">
              <ServiceIcon d={s.icon} />
            </span>
            <h2 id="best-for" className="svc-best__title">
              Best for
            </h2>
            <ul>
              {s.bestFor.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            {s.fromPrice && <p className="svc-best__price">{s.fromPrice}</p>}
          </aside>
        </div>
      </section>

      {/* WHAT'S INCLUDED */}
      <section className="section">
        <div className="wrap">
          <div className="section__head">
            <h2 className="h2">What’s included</h2>
          </div>
          <ul className="svc-included">
            {s.included.map((i) => (
              <li key={i.title}>
                <h3>{i.title}</h3>
                <p>{i.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* PACKAGE */}
      {s.package && (
        <section className="section section--tight">
          <div className="wrap">
            <div className="svc-package">
              <div>
                <p className="svc-package__name">{s.package.name}</p>
                <p className="svc-package__text">{s.package.text}</p>
              </div>
              <div className="svc-package__side">
                <p className="svc-package__price">{s.package.price}</p>
                <Link href="#contact" className="btn btn--ink">
                  Ask about this package
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* HOW IT WORKS */}
      <section className="section svc-how">
        <div className="wrap">
          <div className="section__head">
            <h2 className="h2">How it works</h2>
          </div>
          <ol className="svc-steps">
            {s.steps.map((st, i) => (
              <li key={st.title}>
                <span className="svc-steps__n" aria-hidden="true">
                  {i + 1}
                </span>
                <h3>{st.title}</h3>
                <p>{st.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* PROOF */}
      {s.proof.length > 0 && (
        <section className="section">
          <div className="wrap">
            <div className="section__head">
              <h2 className="h2">Results</h2>
              <p>Work we’ve done in this area.</p>
            </div>
            <div className="svc-proof">
              {s.proof.map((p) => (
                <article key={p.title} className={`svc-proof__card ${p.stats ? 'svc-proof__card--stats' : ''}`}>
                  <p className="svc-proof__label">{p.label}</p>
                  <h3 className="svc-proof__title">{p.title}</h3>
                  <p className="svc-proof__text">{p.text}</p>
                  {p.stats && (
                    <ul className="svc-proof__stats">
                      {p.stats.map((st) => (
                        <li key={st.label}>
                          <span aria-hidden="true">{st.emoji}</span>
                          <strong>{st.value}</strong>
                          <span>{st.label}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {p.href && (
                    <Link href={p.href} className="link">
                      Read the case study
                    </Link>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* REVIEWS */}
      {reviews.length > 0 && (
        <section className="section clients">
          <div className="wrap">
            <div className="section__head">
              <h2 className="h2">What clients say</h2>
            </div>
            <Testimonials items={reviews} />
          </div>
        </section>
      )}

      {/* FAQS */}
      <section className="section">
        <div className="wrap svc-faq">
          <h2 className="h2">Questions</h2>
          <div className="svc-faq__list">
            {s.faqs.map((f) => (
              <details key={f.q} className="role">
                <summary>
                  <span className="role__title svc-faq__q">{f.q}</span>
                  <span className="role__toggle" aria-hidden="true" />
                </summary>
                <div className="role__body">
                  <p>{f.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* RELATED */}
      <section className="section section--tight">
        <div className="wrap">
          <p className="svc-related__title">Related services</p>
          <ul className="svc-related">
            {related.map((r) => (
              <li key={r.slug}>
                <Link href={`/services/${r.slug}`}>
                  <ServiceIcon d={r.icon} size={22} />
                  {r.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CONTACT */}
      <section className="audit" id="contact">
        <div className="wrap audit__inner">
          <div className="audit__copy">
            <h2 className="h2">Let’s talk about {lower}</h2>
            <p className="audit__lede">
              Tell us a bit about your business and we’ll find a time for a strategy call.
            </p>
            <p className="audit__alt">
              Or come and see us. Open office hours run every Thursday, 1–5pm, in person at Generator Hub on Exeter
              Quayside or online.{' '}
              <a href={site.officeHoursUrl} target="_blank" rel="noopener">
                Book a free hour
              </a>
            </p>
          </div>
          <div className="audit__card">
            <ContactForm defaultTopic="strategy" defaultMessage={`I'm interested in ${lower}.`} />
          </div>
        </div>
      </section>
    </>
  );
}
