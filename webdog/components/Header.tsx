import Link from 'next/link';
import Logo from './Logo';
import { site } from '@/lib/site';

export default function Header() {
  return (
    <header className="header">
      <div className="wrap header__inner">
        <Link href="/" className="header__logo">
          <Logo height={30} />
        </Link>
        <nav className="header__nav" aria-label="Main">
          {site.nav.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
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
            {site.nav.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
            <Link href="/#audit" className="btn btn--fluro">
              Free funnel audit
            </Link>
          </nav>
        </details>
      </div>
    </header>
  );
}
