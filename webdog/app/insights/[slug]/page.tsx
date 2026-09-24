import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { marked } from 'marked';
import { getInsight, getInsights, REVALIDATE_SECONDS } from '@/lib/airtable';
import { formatDate } from '@/lib/format';

export const revalidate = REVALIDATE_SECONDS;

export async function generateStaticParams() {
  return (await getInsights()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getInsight(params.slug);
  return post
    ? { title: post.title, description: post.excerpt, openGraph: { type: 'article', publishedTime: post.date } }
    : {};
}

export default async function InsightPage({ params }: { params: { slug: string } }) {
  const post = await getInsight(params.slug);
  if (!post) notFound();

  const html = post.body ? await marked.parse(post.body) : `<p>${post.excerpt}</p>`;

  return (
    <article>
      <section className="page-hero">
        <div className="wrap">
          <Link href="/insights" className="page-hero__back">
            All insights
          </Link>
          {post.date && (
            <p className="page-hero__client">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            </p>
          )}
          <h1 className="page-hero__title page-hero__title--long">{post.title}</h1>
        </div>
      </section>
      {post.cover && (
        <div className="wrap">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="cs-cover" src={post.cover} alt="" width={1200} height={680} />
        </div>
      )}
      <section className="section">
        <div className="wrap prose" dangerouslySetInnerHTML={{ __html: html }} />
      </section>
      <section className="section section--tight">
        <div className="wrap cs-cta">
          <div>
            <h2 className="h3">Want to know where your funnel is leaking?</h2>
            <p className="cs-cta__sub">Free. No call required. Back in 48 hours.</p>
          </div>
          <Link href="/#audit" className="btn btn--fluro btn--lg">
            Get your free funnel audit
          </Link>
        </div>
      </section>
    </article>
  );
}
