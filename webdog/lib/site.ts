export const site = {
  name: 'Webdog Marketing',
  url: 'https://www.webdog.marketing',
  email: 'hello@webdog.marketing',
  // Open office hours: Thursdays 1–5pm, 1-hour slots (Google Calendar appointment schedule)
  bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL || 'https://calendar.app.google/LmR1G38ijZCFZFLa9',
  legal:
    'Webdog Marketing is the trading name of OneTerra Consulting. Registered in England and Wales 15020732.',
  social: {
    instagram: 'https://www.instagram.com/webdog_marketing/',
    linkedin: 'https://www.linkedin.com/company/webdog-marketing/',
  },
  /*
   * Hero animation. Leave as null to show the built-in funnel illustration.
   * To use your own: put the files in /public/hero/ and fill this in, e.g.
   * heroVideo: { mp4: '/hero/hero.mp4', webm: '/hero/hero.webm', poster: '/hero/hero-poster.jpg', alt: 'Short description' },
   */
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
