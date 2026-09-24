import type { Metadata } from 'next';
import JobForm from '@/components/JobForm';
import { getJobs, REVALIDATE_SECONDS } from '@/lib/airtable';

export const revalidate = REVALIDATE_SECONDS;
export const metadata: Metadata = {
  title: 'Jobs',
  description: 'Work at Webdog. Join a small team doing sharp work for ambitious B2B SaaS companies.',
};

const perks = [
  {
    title: 'Your work has a direct impact',
    text: 'No waiting 6 months to see if your idea gets approved. Good thinking gets acted on fast. We’re responsible but responsive.',
  },
  {
    title: 'Work across the whole business',
    text: 'Designers talk to strategists. Strategists talk to clients. Nobody is siloed into a job title. You’ll build a broader skillset here than you would anywhere bigger.',
  },
  {
    title: 'Clients who are genuinely invested',
    text: 'We’re selective about who we work with. That means you spend your time on clients who want to do great work.',
  },
  {
    title: 'Autonomy over your craft',
    text: 'We hire specialists and trust them. You won’t spend days justifying your decisions or being micromanaged.',
  },
  {
    title: 'Honest feedback, in both directions',
    text: 'We’ll tell you straight when something isn’t working, and we expect the same back. No surprises. Just regular, direct conversations about how things are going.',
  },
  {
    title: 'You’ll never stop learning',
    text: 'B2B SaaS moves fast. Working across multiple clients means constant exposure to new problems, markets, and challenges. If you like staying sharp, this environment will suit you.',
  },
];

export default async function JobsPage() {
  const jobs = await getJobs();
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <h1 className="page-hero__title">Work at Webdog</h1>
          <p className="page-hero__lede">There are always opportunities for talented people to join our pack.</p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <p className="intro">
            We’re a small team, which means you’ll never be a cog in a machine. At Webdog, you work across real
            challenges for ambitious SaaS companies, not busywork handed down from an account manager three layers
            above you. You’ll have genuine input into strategy, direct relationships with clients, and the kind of
            variety that keeps you sharp. We’re flexible, we trust the people we hire, and we genuinely invest in their
            growth. If you want to do the best work of your career without disappearing into a big agency, you might be
            exactly who we’re looking for.
          </p>

          <h2 className="h2 jobs__h">What it’s like to work at Webdog</h2>
          <ul className="perks">
            {perks.map((p) => (
              <li key={p.title}>
                <h3 className="perks__title">{p.title}</h3>
                <p>{p.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section roles-section">
        <div className="wrap">
          <h2 className="h2 jobs__h">Open positions</h2>
          {jobs.length === 0 ? (
            <p className="intro">No open roles right now. If you think you’d be a great fit, send a speculative application below.</p>
          ) : (
            <div className="roles">
              {jobs.map((j) => (
                <details key={j.id} className="role">
                  <summary>
                    <span className="role__title">{j.title}</span>
                    <span className="role__toggle" aria-hidden="true" />
                  </summary>
                  <div className="role__body">
                    <p>{j.summary}</p>
                    {j.requirements.length > 0 && (
                      <>
                        <h3 className="role__h">Requirements</h3>
                        <ul>
                          {j.requirements.map((r) => (
                            <li key={r}>{r}</li>
                          ))}
                        </ul>
                      </>
                    )}
                    <a href="#apply" className="btn btn--ink">
                      Apply for this role
                    </a>
                  </div>
                </details>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="audit" id="apply">
        <div className="wrap audit__inner">
          <div className="audit__copy">
            <h2 className="h2">Think you have what it takes?</h2>
            <p className="audit__lede">Send us your details and a link to your CV. We read every application.</p>
          </div>
          <div className="audit__card">
            <JobForm positions={jobs.map((j) => j.title)} />
          </div>
        </div>
      </section>
    </>
  );
}
