import type { Metadata } from 'next';
import Link from 'next/link';
import { getInsights, REVALIDATE_SECONDS } from '@/lib/airtable';
import { formatDate } from '@/lib/format';

export const revalidate = REVALIDATE_SECONDS;
export const metadata: Metadata = {
  title: 'Insights',
  description: 'Practical B2B SaaS marketing advice on funnels, conversion, channels and growth from the Webdog team.',
};

export default async function InsightsPage() {
  const posts = await getInsights();
  const [lead, ...rest] = posts;

  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <h1 className="page-hero__title">Latest insights</h1>
          <p className="page-hero__lede">Practical marketing thinking for B2B SaaS teams.</p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          {!lead ? (
            <p className="intro">New articles are on the way.</p>
          ) : (
            <>
              <article className="post post--lead">
                <Link href={`/insights/${lead.slug}`} className="post__link">
                  <div className="post__cover">
                    {lead.cover ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={lead.cover} alt="" width={900} height={560} />
                    ) : (
                      <span className="post__mark" aria-hidden="true" />
                    )}
                  </div>
                  <div className="post__body">
                    <time className="post__date" dateTime={lead.date}>
                      {formatDate(lead.date)}
                    </time>
                    <h2 className="post__title">{lead.title}</h2>
                    <p className="post__excerpt">{lead.excerpt}</p>
                    <span className="case__more">Read the article</span>
                  </div>
                </Link>
              </article>

              {rest.length > 0 && (
                <div className="posts">
                  {rest.map((p) => (
                    <article key={p.id} className="post">
                      <Link href={`/insights/${p.slug}`} className="post__link">
                        <div className="post__cover">
                          {p.cover ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={p.cover} alt="" width={640} height={400} loading="lazy" />
                          ) : (
                            <span className="post__mark" aria-hidden="true" />
                          )}
                        </div>
                        <div className="post__body">
                          <time className="post__date" dateTime={p.date}>
                            {formatDate(p.date)}
                          </time>
                          <h2 className="post__title">{p.title}</h2>
                          <p className="post__excerpt">{p.excerpt}</p>
                          <span className="case__more">Read the article</span>
                        </div>
                      </Link>
                    </article>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
