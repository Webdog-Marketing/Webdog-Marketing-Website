import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Webdog is a small, specialist marketing team for B2B SaaS companies. Small team. Big results. Absolutely no fluff.',
};

export default function AboutPage() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <h1 className="page-hero__title">Small team. Big results. Absolutely no fluff.</h1>
        </div>
      </section>

      <section className="section">
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
                We’re not a factory. We take on a focused roster of clients and give each one serious attention. When
                you work with Webdog, you talk to the people actually doing the work.
              </p>
            </div>
          </div>

          <blockquote className="pull">Not a skills problem. A focus problem.</blockquote>

          <div className="story__row">
            <h2 className="h2">Our story</h2>
            <div className="story__text">
              <p>
                Our founder Matt has spent over 15 years working in-house and agency-side across a wide range of
                businesses. The one thing they all had in common? Marketing teams pulled in every direction: asked to
                do everything, accountable for everything, but rarely given the space to focus on what actually moves
                the needle.
              </p>
              <p>
                Webdog exists to fix that. We embed as an extension of your team, handling the day-to-day whilst
                keeping one eye firmly on the strategic goals that drive real growth. You get the bandwidth of an
                agency with the investment of someone who actually cares about your bottom line.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="audit" id="contact">
        <div className="wrap audit__inner">
          <div className="audit__copy">
            <h2 className="h2">Contact Webdog</h2>
            <p className="audit__lede">Drop us a line with any questions, enquiries or business proposals.</p>
            <p className="audit__alt">
              Email <a href={`mailto:${site.email}`}>{site.email}</a>
            </p>
            <p className="audit__alt">
              Or come and see us. Open office hours run every Thursday, 1–5pm, in person at Generator Hub on Exeter
              Quayside or online.{' '}
              <a href={site.bookingUrl} target="_blank" rel="noopener">
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
