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
  nav: [
    { label: 'Services', href: '/#services' },
    { label: 'Case studies', href: '/case-studies' },
    { label: 'Insights', href: '/insights' },
    { label: 'About', href: '/about' },
    { label: 'Jobs', href: '/jobs' },
    { label: 'Contact', href: '/#audit' },
  ],
};
