export const site = {
  name: 'Webdog Marketing',
  url: 'https://www.webdog.marketing',
  email: 'hello@webdog.marketing',
  // Open office hours only (Thursdays 1–5pm). Strategy calls go through the contact form instead.
  officeHoursUrl: process.env.NEXT_PUBLIC_BOOKING_URL || 'https://calendar.app.google/LmR1G38ijZCFZFLa9',
  legal:
    'Webdog Marketing is the trading name of OneTerra Consulting. Registered in England and Wales 15020732.',
  sportsSite: 'https://www.webdogsports.marketing',
  social: {
    instagram: 'https://www.instagram.com/webdog_marketing/',
    linkedin: 'https://www.linkedin.com/company/webdog-marketing/',
  },
  /*
   * Hero animation. Leave as null to show the built-in funnel illustration.
   * To use your own: put the files in /public/hero/ and fill this in, e.g.
   * heroVideo: { mp4: '/hero/hero.mp4', webm: '/hero/hero.webm', poster: '/hero/hero-poster.jpg', alt: 'Short description' },
   */
  // Contact form links. ?topic= preselects the enquiry type on the About page form.
  strategyCallHref: '/about?topic=strategy#contact',
  // Update rating/count by hand as reviews come in. Swap url for your full Google Maps link if you prefer.
  googleReviews: { url: 'https://share.google/H9gvs56tbkIaKzxXh', rating: '5.0', count: 5 },
  // About page photo of Matt. Put the file in /public/about/ and set the path, e.g. '/about/matt-working.jpg'
  aboutPhoto: '/about/matt-webb-webdog-marketing.jpg' as null | string,
  heroVideo: null as null | { mp4: string; webm?: string; poster: string; alt: string },
  nav: [
    { label: 'Services', href: '/#services' },
    { label: 'Case studies', href: '/case-studies' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Insights', href: '/insights' },
    { label: 'About', href: '/about' },
    { label: 'Jobs', href: '/jobs' },
    { label: 'Contact', href: '/about#contact' },
  ],
};
