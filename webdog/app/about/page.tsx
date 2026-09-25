import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';
import Avatar from '@/components/Avatar';
import { getTeam, REVALIDATE_SECONDS } from '@/lib/airtable';
import { site } from '@/lib/site';

export const revalidate = REVALIDATE_SECONDS;
export const metadata: Metadata = {
  title: 'About',
  description:
    'Meet Matt Webb and the Webdog team: a small, specialist marketing team for B2B SaaS companies, based in Exeter, Devon.',
};

export default async function AboutPage() {
  const team = await getTeam();
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <h1 className="page-hero__title">Small team. Big results. Absolutely no fluff.</h1>
        </div>
      </section>

      {/* MEET MATT */}
      <section className="section">
        <div className="wrap founder">
          <div className="founder__photo">
            {site.aboutPhoto ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={site.aboutPhoto} alt="Matt Webb, founder of Webdog, working at his laptop" width={1000} height={1333} />
            ) : (
              <span className="founder__placeholder" aria-hidden="true" />
            )}
          </div>
          <div className="founder__text">
            <p className="founder__kicker">Meet the founder</p>
            <h2 className="h2">Hi, I’m Matt</h2>
            <p className="founder__lede">
              I’ve spent over 15 years in marketing, in-house and agency-side, helping B2B businesses grow.
            </p>
            <p>
              Along the way I’ve helped a MarTech SaaS business grow from £10m to £20m ARR, cut an HR SaaS company’s
              customer acquisition cost by 35% while doubling their MQLs and SQLs, and built a PropTech business a
              direct booking engine that saved them £500k in commission.
            </p>
            <p>
              Every one of those businesses had the same problem: a marketing team pulled in every direction, asked to
              do everything, but rarely given the space to focus on what actually moves the needle. So in 2026 I went
              full-time with Webdog to fix exactly that.
            </p>
            <p>
              I’m based in Devon and work from Generator Hub on Exeter Quayside. Away from client work I volunteer as
              General Secretary of the Marshall Islands Soccer Federation, and I still play football most weekends.
            </p>
          </div>
        </div>
      </section>

      {/* WHY / HOW */}
      <section className="section section--tight">
        <div className="wrap story">
          <div className="story__row">
            <h2 className="h2">Our why</h2>
            <div className="story__text">
              <p>
                We started Webdog because we kept seeing the same thing: brilliant SaaS products that couldn’t get out
                of their own way. Leaky funnels. Confusing onboarding. Messaging that talked about features instead of
                outcomes. Traffic that never converted.
              </p>
              <p>These weren’t bad businesses. They were businesses that hadn’t found the right partner yet.</p>
            </div>
          </div>

          <div className="story__row">
            <h2 className="h2">The how</h2>
            <div className="story__text">
              <p>
                That’s what Webdog is for. We’re a small, specialist team. We work exclusively with B2B SaaS companies
                because depth beats breadth every time. We know your world: ARR targets, churn pressure, the difference
                between a free trial and a freemium model, and why your sales team keeps blaming marketing.
              </p>
              <p>
                We’re not a factory. We take on a focused roster of clients and give each one serious attention. We
                embed as an extension of your team, handling the day-to-day whilst keeping one eye firmly on the goals
                that drive real growth. When you work with Webdog, you talk to the people actually doing the work.
              </p>
            </div>
          </div>

          <blockquote className="pull">Not a skills problem. A focus problem.</blockquote>
        </div>
      </section>

      {/* TEAM */}
      {team.length > 0 && (
        <section className="section team-section">
          <div className="wrap">
            <div className="section__head">
              <h2 className="h2">The pack</h2>
              <p>The people doing the work.</p>
            </div>
            <ul className="team">
              {team.map((m) => (
                <li key={m.id} className="member">
                  <div className="member__photo">
                    {m.headshot ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={m.headshot} alt={`Photo of ${m.name}`} width={480} height={480} loading="lazy" />
                    ) : (
                      <Avatar name={m.name} size={96} />
                    )}
                  </div>
                  <h3 className="member__name">{m.name}</h3>
                  <p className="member__role">{m.role}</p>
                  {m.bio && <p className="member__bio">{m.bio}</p>}
                  {m.linkedin && (
                    <a href={m.linkedin} className="link member__link" target="_blank" rel="noopener">
                      LinkedIn
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* CONTACT */}
      <section className="audit" id="contact">
        <div className="wrap audit__inner">
          <div className="audit__copy">
            <h2 className="h2">Contact Webdog</h2>
            <p className="audit__lede">
              Drop us a line with any questions, enquiries or business proposals, or ask for a strategy call and we’ll
              find a time that works.
            </p>
            <p className="audit__alt">
              Email <a href={`mailto:${site.email}`}>{site.email}</a>
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
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
