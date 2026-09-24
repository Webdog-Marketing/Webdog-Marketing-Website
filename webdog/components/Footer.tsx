import Link from 'next/link';
import Logo from './Logo';
import NewsletterForm from './NewsletterForm';
import { site } from '@/lib/site';
import CookieSettingsLink from './CookieSettingsLink';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <section className="news" aria-labelledby="news-title">
          <div>
            <h2 id="news-title" className="news__title">Subscribe to our newsletter</h2>
            <p>Get all the updates and news from Webdog.</p>
          </div>
          <NewsletterForm />
        </section>

        <div className="footer__grid">
          <div>
            <Logo />
            <p className="footer__tag">Your loyal digital marketing companion.</p>
          </div>
          <nav aria-label="Footer">
            <Link href="/#services">Services</Link>
            <Link href="/pricing">Pricing</Link>
            <Link href="/case-studies">Case studies</Link>
            <Link href="/#audit">Contact</Link>
          </nav>
          <div>
            <p className="footer__h">Contact</p>
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <p className="footer__h">
              <Link href="/about">About Webdog</Link>
            </p>
          </div>
          <div>
            <p className="footer__h">Join the pack</p>
            <p>We’re looking for talented, passionate people to join our pack.</p>
            <Link href="/jobs">Jobs at Webdog</Link>
          </div>
        </div>

        <div className="footer__legal">
          <p>
            © Webdog Marketing {new Date().getFullYear()}. {site.legal}
          </p>
          <p className="footer__social">
            <CookieSettingsLink />
            <a href={site.social.instagram}>Instagram</a>
            <a href={site.social.linkedin}>LinkedIn</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
