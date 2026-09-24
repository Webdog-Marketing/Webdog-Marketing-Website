import type { Metadata } from 'next';
import CaseStudyCard from '@/components/CaseStudyCard';
import { getCaseStudies, REVALIDATE_SECONDS } from '@/lib/airtable';

export const revalidate = REVALIDATE_SECONDS;
export const metadata: Metadata = {
  title: 'Case studies',
  description: 'How Webdog has helped B2B brands fix leaky funnels and grow.',
};

export default async function CaseStudiesPage() {
  const all = await getCaseStudies();
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <h1 className="page-hero__title">Case studies</h1>
          <p className="page-hero__lede">Results from the brands we’ve worked with.</p>
        </div>
      </section>
      <section className="section">
        <div className="wrap cases">
          {all.map((cs) => (
            <CaseStudyCard key={cs.id} cs={cs} />
          ))}
        </div>
      </section>
    </>
  );
}
