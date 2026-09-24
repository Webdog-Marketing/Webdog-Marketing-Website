import Link from 'next/link';
import HeroMedia from '@/components/HeroMedia';
import Flag from '@/components/Flag';
import CaseStudyCard from '@/components/CaseStudyCard';
import Testimonials, { GoogleG, Stars } from '@/components/Testimonials';
import AuditForm from '@/components/AuditForm';
import { getCaseStudies, getTestimonials, REVALIDATE_SECONDS } from '@/lib/airtable';
import { site } from '@/lib/site';

export const revalidate = REVALIDATE_SECONDS;

const steps = [
  { name: 'Audit', text: 'We map your whole funnel and find where budget and users leak.' },
  { name: 'Strategy', text: 'A prioritised channel plan built around your ICP and unit economics.' },
  { name: 'Execute', text: 'Campaigns, pages, and flows live in weeks, not quarters.' },
  { name: 'Scale', text: "We double down on what wins and cut what doesn't, every week." },
];

export default async function Home() {
  const [caseStudies, testimonials] = await Promise.all([getCaseStudies(), getTestimonials()]);

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="wrap hero__inner">
          <div className="hero__copy">
            <p className="hero__kicker">Your loyal digital marketing companion.</p>
            <h1 className="hero__title">The digital marketing experts for B2B brands</h1>
            <p className="hero__lede">
              Struggling to generate SaaS leads? We’re guaranteed to sniff out any leaks in your marketing funnel
              and get your website firing.
            </p>
            <div className="hero__actions">
              <Link href="#audit" className="btn btn--fluro btn--lg">
                Free funnel audit
              </Link>
              <p className="hero__note">Free. No call required. Back in 48 hours.</p>
            </div>
          </div>
          <div className="hero__art">
            <HeroMedia />
          </div>
        </div>
      </section>

      {/* READY TO GROW */}
      <section className="section grow">
        <div className="wrap grow__inner">
          <div>
            <h2 className="h2">Ready to grow?</h2>
            <p className="grow__lede">Are you ready to unleash your brand’s full potential?</p>
          </div>
          <div className="grow__panel">
            <p>Webdog is the trusted companion of scale-ups the world over.</p>
            <div className="grow__actions">
              <Link href={site.strategyCallHref} className="btn btn--ink btn--lg">
                Book a strategy call
              </Link>
              <Link href="#how-we-work" className="link">
                or see how we work
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* HOW WE WORK */}
      <section className="section how" id="how-we-work">
        <div className="wrap">
          <div className="section__head">
            <h2 className="h2">How we work</h2>
            <p>A funnel audit, then a system.</p>
          </div>
          <ol className="steps">
            {steps.map((s, i) => (
              <li key={s.name} className="step">
                <span className="step__n" aria-hidden="true">
                  {i + 1}
                </span>
                <h3 className="step__name">{s.name}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
          <div className="how__about">
            <p>
              Webdog is a specialist B2B SaaS marketing team. We’re small by choice: every client gets sharp
              thinking and direct access to the people doing the work, not an account manager relaying messages.
            </p>
            <p>
              We don’t bolt on tactics and hope something sticks. We audit your entire funnel, from the moment a
              prospect lands on your site to the point they become a paying customer, and we fix what’s leaking.
            </p>
            <Link href="/about" className="link">
              Learn more about Webdog
            </Link>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section offer" id="services">
        <div className="wrap">
          <div className="section__head">
            <h2 className="h2">What we offer</h2>
            <p>We don’t do fluff. We do growth.</p>
          </div>

          <div className="offer__grid">
            <article className="service service--convert">
              <div className="service__copy">
                <h3 className="h3">Convert more visitors</h3>
                <p className="service__lede">Turn anonymous traffic into qualified pipeline.</p>
                <p>
                  We redesign and optimise your pre-registration experience so the right people sign up, and fewer
                  of the wrong ones do.
                </p>
                <Link href="/services#ux-ui-design" className="link">
                  Learn more about conversion
                </Link>
              </div>
              <div className="service__art" aria-hidden="true">
                <div className="mini-form">
                  <span className="mini-form__field" />
                  <span className="mini-form__field mini-form__field--short" />
                  <span className="mini-form__btn">Start free trial</span>
                  <span className="mini-form__badge">✓ Qualified lead</span>
                </div>
              </div>
            </article>

            <article className="service service--borders">
              <div className="service__copy">
                <h3 className="h3">Scale without borders</h3>
                <p className="service__lede">Ready to move into new markets?</p>
                <p>
                  We build the strategy, localise the messaging, and run the execution. Growth doesn’t stop at your
                  home market.
                </p>
                <Link href={site.strategyCallHref} className="link">
                  Book a demo
                </Link>
              </div>
              <div className="service__art" aria-hidden="true">
                <ul className="markets">
                  <li>
                    <Flag code="GB" /> UK
                  </li>
                  <li>
                    <Flag code="US" /> US
                  </li>
                  <li>
                    <Flag code="DE" /> DE
                  </li>
                  <li>
                    <Flag code="FR" /> FR
                  </li>
                  <li>
                    <Flag code="ES" /> ES
                  </li>
                  <li>
                    <Flag code="NL" /> NL
                  </li>
                </ul>
              </div>
            </article>

            <article className="service service--activate">
              <div className="service__copy">
                <h3 className="h3">Accelerate activation</h3>
                <p className="service__lede">Most SaaS companies lose users in the first 72 hours.</p>
                <p>
                  We map and improve your post-registration journey so new users reach their “aha moment” faster,
                  and stick around.
                </p>
                <Link href="/services#communications" className="link">
                  Learn more about activation
                </Link>
              </div>
              <div className="service__art" aria-hidden="true">
                <div className="timeline">
                  <span className="timeline__bar" />
                  <span className="timeline__pt" style={{ left: '0%' }}>
                    Sign-up
                  </span>
                  <span className="timeline__pt" style={{ left: '38%' }}>
                    Day 1
                  </span>
                  <span className="timeline__pt timeline__pt--aha" style={{ left: '72%' }}>
                    Aha moment
                  </span>
                  <span className="timeline__end">72h</span>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* RESULTS */}
      <section className="section results">
        <div className="wrap">
          <div className="section__head section__head--split">
            <div>
              <h2 className="h2">Results</h2>
              <p>Case studies</p>
            </div>
            <Link href="/case-studies" className="btn btn--outline">
              All case studies
            </Link>
          </div>
          <div className="cases">
            {caseStudies.slice(0, 3).map((cs) => (
              <CaseStudyCard key={cs.id} cs={cs} />
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      {testimonials.length > 0 && (
        <section className="section clients">
          <div className="wrap">
            <div className="section__head section__head--split">
              <div>
                <h2 className="h2">Our clients</h2>
                <p>Why companies love Webdog</p>
              </div>
              <a href={site.googleReviews.url} className="gbadge" target="_blank" rel="noopener">
                <GoogleG />
                <strong>{site.googleReviews.rating}</strong>
                <Stars n={Number(site.googleReviews.rating)} />
                <span>
                  {site.googleReviews.count} Google review{site.googleReviews.count === 1 ? '' : 's'}
                </span>
              </a>
            </div>
          </div>
          <div className="wrap wrap--bleed">
            <Testimonials items={testimonials} />
          </div>
        </section>
      )}

      {/* AUDIT CTA */}
      <section className="audit" id="audit">
        <div className="wrap audit__inner">
          <div className="audit__copy">
            <h2 className="h2">Get your free funnel audit</h2>
            <p className="audit__lede">
              Tell us where to look. We’ll map your funnel and show you exactly where budget and users are leaking.
            </p>
            <ul className="audit__points">
              <li>Free</li>
              <li>No call required</li>
              <li>Back in 48 hours</li>
            </ul>
            <p className="audit__alt">
              Rather talk it through? Open office hours run every Thursday, 1–5pm, in person at Generator Hub on
              Exeter Quayside or online.{' '}
              <a href={site.officeHoursUrl} target="_blank" rel="noopener">
                Book a free hour
              </a>
            </p>
          </div>
          <div className="audit__card">
            <AuditForm />
          </div>
        </div>
      </section>
    </>
  );
}
