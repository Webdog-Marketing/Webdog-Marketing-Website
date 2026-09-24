import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { marked } from 'marked';
import { getCaseStudies, getCaseStudy, REVALIDATE_SECONDS } from '@/lib/airtable';

export const revalidate = REVALIDATE_SECONDS;

export async function generateStaticParams() {
  return (await getCaseStudies()).map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const cs = await getCaseStudy(params.slug);
  return cs ? { title: cs.title, description: cs.excerpt } : {};
}

export default async function CaseStudyPage({ params }: { params: { slug: string } }) {
  const cs = await getCaseStudy(params.slug);
  if (!cs) notFound();

  // Body is written in Airtable (rich text field → markdown) by Matt only.
  const html = cs.body ? await marked.parse(cs.body) : `<p>${cs.excerpt}</p>`;

  return (
    <article>
      <section className="page-hero">
        <div className="wrap">
          <Link href="/case-studies" className="page-hero__back">
            All case studies
          </Link>
          <p className="page-hero__client">{cs.client}</p>
          <h1 className="page-hero__title page-hero__title--long">{cs.title}</h1>
          {cs.stats.length > 0 && (
            <ul className="stats stats--hero">
              {cs.stats.map((s) => (
                <li key={s.label}>
                  <span aria-hidden="true">{s.emoji}</span>
                  <strong>{s.value}</strong> {s.label}
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
      {cs.cover && (
        <div className="wrap">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="cs-cover" src={cs.cover} alt="" width={1200} height={680} />
        </div>
      )}
      <section className="section">
        <div className="wrap prose" dangerouslySetInnerHTML={{ __html: html }} />
      </section>
      <section className="section">
        <div className="wrap cs-cta">
          <h2 className="h3">Want results like {cs.client}?</h2>
          <Link href="/#audit" className="btn btn--fluro btn--lg">
            Get your free funnel audit
          </Link>
        </div>
      </section>
    </article>
  );
}
