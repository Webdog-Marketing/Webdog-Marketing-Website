import Link from 'next/link';
import Logo from './Logo';
import ServiceIcon from './ServiceIcon';
import { site } from '@/lib/site';
import { services } from '@/lib/services';
import './header-menu.css';

const isServices = (href: string) => href.startsWith('/services') || href === '/#services';

export default function Header() {
  return (
    <header className="header">
      <div className="wrap header__inner">
        <Link href="/" className="header__logo">
          <Logo height={30} />
        </Link>
        <nav className="header__nav" aria-label="Main">
          {site.nav.map((item) =>
            isServices(item.href) ? (
              // Opens on hover, and on keyboard focus (Tab) via :focus-within. No JavaScript needed.
              <div key={item.href} className="nav-drop">
                <Link href="/services" className="nav-drop__trigger" aria-haspopup="true">
                  {item.label}
                  <svg viewBox="0 0 12 12" width="10" height="10" aria-hidden="true">
                    <path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
                <div className="nav-drop__panel">
                  <ul>
                    {services.map((s) => (
                      <li key={s.slug}>
                        <Link href={`/services/${s.slug}`}>
                          <span className="nav-drop__icon">
                            <ServiceIcon d={s.icon} size={18} />
                          </span>
                          <span>
                            <strong>{s.name}</strong>
                            <small>{s.tagline}</small>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link href="/services" className="nav-drop__all">
                    All services
                  </Link>
                </div>
              </div>
            ) : (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ),
          )}
        </nav>
        <Link href="/#audit" className="btn btn--fluro btn--sm header__cta">
          Free audit
        </Link>
        {/* No-JS mobile menu */}
        <details className="header__menu">
          <summary aria-label="Open menu">
            <span />
            <span />
            <span />
          </summary>
          <nav aria-label="Mobile">
            {site.nav.map((item) =>
              isServices(item.href) ? (
                <details key={item.href} className="mnav-drop">
                  <summary>{item.label}</summary>
                  <ul>
                    {services.map((s) => (
                      <li key={s.slug}>
                        <Link href={`/services/${s.slug}`}>{s.name}</Link>
                      </li>
                    ))}
                    <li>
                      <Link href="/services">All services</Link>
                    </li>
                  </ul>
                </details>
              ) : (
                <Link key={item.href} href={item.href}>
                  {item.label}
                </Link>
              ),
            )}
            <Link href="/#audit" className="btn btn--fluro">
              Free funnel audit
            </Link>
          </nav>
        </details>
      </div>
    </header>
  );
}
