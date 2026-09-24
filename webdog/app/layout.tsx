import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { site } from '@/lib/site';
import { GtmHead, GtmNoScript } from '@/components/Analytics';
import CookieBanner from '@/components/CookieBanner';
import { GSC_VERIFICATION } from '@/lib/analytics';

const ADOBE_KIT = process.env.NEXT_PUBLIC_ADOBE_FONTS_KIT; // e.g. abc1def
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: 'Webdog Marketing | B2B SaaS marketing that finds the leaks', template: '%s | Webdog Marketing' },
  description:
    "The digital marketing experts for B2B brands. We audit your whole funnel, find where budget and users leak, and fix it.",
  openGraph: { siteName: site.name, type: 'website' },
  ...(GSC_VERIFICATION ? { verification: { google: GSC_VERIFICATION } } : {}),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB">
      <head>
        <GtmHead />
        {ADOBE_KIT && <link rel="stylesheet" href={`https://use.typekit.net/${ADOBE_KIT}.css`} />}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Familjen+Grotesk:wght@500;600;700&family=Figtree:wght@300;400;500;600&display=swap"
        />
      </head>
      <body>
        <GtmNoScript />
        <a className="skip" href="#main">Skip to content</a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
