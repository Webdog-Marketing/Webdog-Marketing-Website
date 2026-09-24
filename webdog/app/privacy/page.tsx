import type { Metadata } from 'next';
import CookieSettingsLink from '@/components/CookieSettingsLink';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Privacy and cookie policy',
  description: 'How Webdog Marketing collects, uses and protects your personal data, and how we use cookies.',
};

// Fill these in. Lines using them only appear once they're set.
const REGISTERED_OFFICE = ''; // e.g. 'Unit 1, Example Street, Cullompton, Devon, EX15 1AA'
const ICO_NUMBER = ''; // your ICO registration number, e.g. 'ZB123456'
const LAST_UPDATED = '24 September 2026';

export default function PrivacyPage() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <h1 className="page-hero__title">Privacy and cookie policy</h1>
          <p className="page-hero__lede">Last updated {LAST_UPDATED}</p>
        </div>
      </section>

      <section className="section">
        <div className="wrap prose prose--wide">
          <h2>Who we are</h2>
          <p>
            Webdog Marketing is the trading name of OneTerra Consulting Limited, a company registered in England and
            Wales (company number 15020732)
            {REGISTERED_OFFICE ? `, with its registered office at ${REGISTERED_OFFICE}` : ''}. We are the controller
            of the personal data described in this policy.
            {ICO_NUMBER ? ` We are registered with the Information Commissioner’s Office under number ${ICO_NUMBER}.` : ''}
          </p>
          <p>
            If you have any questions about this policy or how we use your data, email{' '}
            <a href={`mailto:${site.email}`}>{site.email}</a>.
          </p>

          <h2>What we collect and why</h2>
          <p>We only collect the information you give us through this website, plus analytics data if you allow it.</p>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>When you…</th>
                  <th>We collect</th>
                  <th>We use it to</th>
                  <th>Lawful basis</th>
                  <th>We keep it for</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Request a free funnel audit</td>
                  <td>Name, work email, website, anything you tell us</td>
                  <td>Carry out the audit and send you the results</td>
                  <td>Legitimate interests (responding to your request)</td>
                  <td>2 years from our last contact</td>
                </tr>
                <tr>
                  <td>Send a contact message</td>
                  <td>Name, email, phone (optional), your message</td>
                  <td>Reply to you and discuss working together</td>
                  <td>Legitimate interests</td>
                  <td>2 years from our last contact</td>
                </tr>
                <tr>
                  <td>Subscribe to our newsletter</td>
                  <td>Email address</td>
                  <td>Send you our newsletter</td>
                  <td>Consent</td>
                  <td>Until you unsubscribe</td>
                </tr>
                <tr>
                  <td>Apply for a job</td>
                  <td>Name, email, phone, role, start date, link to your CV</td>
                  <td>Assess your application</td>
                  <td>Steps before entering a contract</td>
                  <td>6 months after the role is filled, unless you agree to us keeping it longer</td>
                </tr>
                <tr>
                  <td>Book open office hours</td>
                  <td>Name, email, anything you add to the booking</td>
                  <td>Arrange and hold the meeting</td>
                  <td>Legitimate interests</td>
                  <td>2 years from our last contact</td>
                </tr>
                <tr>
                  <td>Browse the site, if you allow analytics cookies</td>
                  <td>Pages visited, device and browser type, approximate location, how you arrived</td>
                  <td>Understand how the site is used and improve it</td>
                  <td>Consent</td>
                  <td>14 months in Google Analytics</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>We never sell your data, and we don’t use it for automated decision-making.</p>

          <h2>Who we share it with</h2>
          <p>We use a small number of trusted providers to run the site and our business. They only process your data on our instructions:</p>
          <ul>
            <li>Airtable, which stores form submissions</li>
            <li>Vercel, which hosts this website</li>
            <li>Google, for Analytics, Tag Manager and appointment booking</li>
            <li>Our email provider, which delivers our replies and newsletter</li>
          </ul>
          <p>
            Some of these providers store data outside the UK, including in the United States. Where they do, the
            transfer is protected by the UK–US data bridge (where the provider is certified) or by the UK International
            Data Transfer Addendum to standard contractual clauses.
          </p>

          <h2 id="cookies">Cookies</h2>
          <p>
            Cookies are small files a website stores on your device. We only use cookies that aren’t strictly
            necessary if you say yes. You can change your mind at any time, and turning a category off deletes the
            cookies it set.
          </p>
          <p>
            <CookieSettingsLink label="Change your cookie settings" className="btn btn--ink btn--sm" />
          </p>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Purpose</th>
                  <th>Expires</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>wd-consent</td>
                  <td>Strictly necessary</td>
                  <td>Remembers your cookie choices (stored in your browser’s local storage)</td>
                  <td>12 months</td>
                </tr>
                <tr>
                  <td>_ga</td>
                  <td>Analytics</td>
                  <td>Google Analytics: tells visitors apart</td>
                  <td>2 years</td>
                </tr>
                <tr>
                  <td>_ga_&lt;ID&gt;</td>
                  <td>Analytics</td>
                  <td>Google Analytics: keeps track of your visit</td>
                  <td>2 years</td>
                </tr>
                <tr>
                  <td>_gcl_au</td>
                  <td>Marketing</td>
                  <td>Google Ads: measures whether ads lead to enquiries (only if we run Google Ads)</td>
                  <td>3 months</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            When you book office hours you’ll be taken to Google Calendar, which sets its own cookies under{' '}
            <a href="https://policies.google.com/privacy">Google’s privacy policy</a>.
          </p>

          <h2>Your rights</h2>
          <p>Under UK data protection law you can ask us to:</p>
          <ul>
            <li>give you a copy of the personal data we hold about you</li>
            <li>correct anything that’s wrong or incomplete</li>
            <li>delete your data</li>
            <li>restrict or stop how we use it, including for marketing</li>
            <li>send your data to you or another organisation in a portable format</li>
          </ul>
          <p>
            Where we rely on your consent, you can withdraw it at any time: unsubscribe using the link in any
            newsletter, or change your cookie settings above. To use any of these rights, email{' '}
            <a href={`mailto:${site.email}`}>{site.email}</a>. We’ll respond within one month.
          </p>

          <h2>Complaints</h2>
          <p>
            If you’re unhappy with how we’ve handled your data, please tell us first so we can put it right. You can
            also complain to the Information Commissioner’s Office at <a href="https://ico.org.uk">ico.org.uk</a> or
            on 0303 123 1113.
          </p>

          <h2>Changes to this policy</h2>
          <p>We’ll update this page if anything changes. The date at the top shows when it was last revised.</p>
        </div>
      </section>
    </>
  );
}
