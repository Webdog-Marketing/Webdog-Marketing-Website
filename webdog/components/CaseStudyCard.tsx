import Link from 'next/link';
import type { CaseStudy } from '@/lib/airtable';

export default function CaseStudyCard({ cs }: { cs: CaseStudy }) {
  return (
    <article className="case">
      <Link href={`/case-studies/${cs.slug}`} className="case__link">
        <div className="case__cover">
          {cs.cover ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={cs.cover} alt="" loading="lazy" width={640} height={420} />
          ) : (
            <span className="case__client-mark">{cs.client}</span>
          )}
        </div>
        <div className="case__body">
          <p className="case__client">{cs.client}</p>
          <h3 className="case__title">{cs.title}</h3>
          {cs.stats.length > 0 && (
            <ul className="stats">
              {cs.stats.slice(0, 3).map((s) => (
                <li key={s.label}>
                  <span aria-hidden="true">{s.emoji}</span>
                  <strong>{s.value}</strong> {s.label}
                </li>
              ))}
            </ul>
          )}
          <p className="case__excerpt">{cs.excerpt}</p>
          <span className="case__more">Read the case study</span>
        </div>
      </Link>
    </article>
  );
}
