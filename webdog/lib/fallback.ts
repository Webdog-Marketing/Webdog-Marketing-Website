import type { CaseStudy, Insight, Job, Testimonial } from './airtable';

// Mirrors the current live content. Used only when Airtable isn't connected.

export const fallbackTestimonials: Testimonial[] = [
  {
    id: 'fallback-duncan',
    quote: "Saved us 000's by building our direct booking website.",
    context: "We helped a PropTech business reduce reliance on OTA's by building a user-friendly booking website.",
    name: 'Duncan Rooney',
    role: 'Head of Marketing',
    company: 'Pass the Keys',
  },
];

export const fallbackCaseStudies: CaseStudy[] = [
  {
    id: 'fallback-ptk',
    slug: 'pass-the-keys',
    client: 'Pass the Keys',
    title: 'How We Helped Pass the Keys Build a Direct Booking Engine That Saved £500k in Commission',
    excerpt:
      'Pass the Keys had 3,000 properties and a growing commission bill. Here is how a direct booking website, built around underserved traveller niches, changed the economics of their business.',
    stats: [
      { emoji: '💸', value: '£500k', label: 'saved in commission' },
      { emoji: '🏡', value: '3,000', label: 'properties' },
    ],
  },
  {
    id: 'fallback-applaud',
    slug: 'applaud',
    client: 'Applaud',
    title: 'How We Helped Applaud Grow Their Organic Presence in the US Market',
    excerpt:
      'Applaud had strong UK organic growth but were struggling to replicate it in the US. Here is how we fixed the foundations and built a content programme that changed that.',
    stats: [],
  },
  {
    id: 'fallback-stannp',
    slug: 'stannp',
    client: 'Stannp',
    title: 'How We Helped Stannp Reduce Paid Reliance and Win Back Organic Growth',
    excerpt:
      'Stannp had a decade of experience but a website that was holding them back. Here is how a full redesign and content overhaul changed their conversion picture.',
    stats: [],
  },
];

export const fallbackJobs: Job[] = [
  {
    id: 'fallback-seo',
    title: 'SEO specialist',
    summary:
      "We're looking for an SEO specialist who thinks beyond rankings. At Webdog, SEO isn't a checklist exercise — it's a core part of how our clients grow. You'll work across technical audits, content strategy, and on-page optimisation for B2B SaaS companies where the stakes are high and the buyers are smart. If you know your way around a funnel as well as a keyword tool, you'll fit right in.",
    requirements: [
      'Proven experience in B2B SEO, with a track record of driving measurable organic growth.',
      'Strong technical SEO skills — crawl analysis, Core Web Vitals, site architecture, schema.',
      'Ability to build and execute content strategies that target buyers, not just search volume.',
      'Comfortable working with developers to implement recommendations, not just hand them over.',
      'Analytical mindset — you live in the data and can translate it into clear next steps for clients.',
    ],
  },
  {
    id: 'fallback-ux',
    title: 'UX/UI designer',
    summary:
      "We're looking for a designer who starts with the user but never loses sight of the conversion. At Webdog, design is a growth lever — your work directly influences whether a SaaS company hits its sign-up targets, reduces onboarding drop-off, or finally stops confusing its best prospects. You'll own projects from discovery through to delivery, working closely with strategists and developers to bring sharp, purposeful design to life.",
    requirements: [
      'A strong portfolio of UX and UI work, ideally including SaaS products or B2B web projects.',
      'Confident running user research, wireframing, and prototyping — not just making things look good.',
      'Deep understanding of conversion principles and how design decisions affect funnel performance.',
      'Proficiency in Figma and comfortable handing off clean, developer-ready files.',
      'Able to take a brief, push back when needed, and present your thinking with confidence.',
    ],
  },
  {
    id: 'fallback-csm',
    title: 'Customer success manager',
    summary:
      "We're looking for a customer success manager who is as commercially minded as they are people-focused. At Webdog, client relationships aren't managed — they're built. You'll be the connective tissue between our clients and our team, making sure work lands well, results are communicated clearly, and every client feels like a priority. This isn't an account admin role. It's a strategic position for someone who genuinely cares about client outcomes.",
    requirements: [
      'Experience in a customer success or account management role, preferably within a marketing agency or SaaS environment.',
      "Strong understanding of digital marketing — you don't need to execute it, but you need to speak the language fluently.",
      "Commercially aware, with experience managing renewals, spotting growth opportunities, and having honest conversations when things aren't working.",
      'Excellent communicator — clear in writing, confident on calls, and able to manage expectations without flinching.',
      'Highly organised with the ability to juggle multiple client relationships without anything slipping through the cracks.',
    ],
  },
  {
    id: 'fallback-ppc',
    title: 'PPC manager',
    summary:
      "We're looking for a PPC manager who treats every pound of client budget like it's their own. At Webdog, paid media is precision work — we don't spray and pray, and we don't hide behind impressions when clients want pipeline. You'll plan, build, and optimise campaigns across Google and LinkedIn for B2B SaaS clients with real growth targets, working closely with the wider team to make sure paid and organic efforts pull in the same direction.",
    requirements: [
      'Proven hands-on experience managing B2B paid campaigns across Google Ads and LinkedIn, with demonstrable pipeline impact.',
      'Strong grasp of audience targeting, match types, bidding strategies, and account structure.',
      'Comfortable with conversion tracking, attribution, and making the case for budget decisions with data.',
      'Experience working with landing pages and an understanding of how post-click experience affects campaign performance.',
      'Clear, confident communicator who can explain performance to clients without drowning them in jargon.',
    ],
  },
  {
    id: 'fallback-dev',
    title: 'Fullstack developer',
    summary:
      "We're looking for a full stack developer who cares about outcomes, not just output. At Webdog, development sits at the heart of what we deliver — our clients' websites are their primary growth tool, and the quality of the build directly affects their results. You'll work across a range of projects, from performance-focused marketing sites to product onboarding flows, collaborating closely with designers and strategists to ship work that actually moves the needle.",
    requirements: [
      'Solid full stack experience with a strong frontend focus — HTML, CSS, JavaScript, and at least one modern framework such as React or Vue.',
      'Experience building and optimising marketing websites with a clear understanding of performance, accessibility, and Core Web Vitals.',
      'Comfortable integrating with third-party tools and APIs — CRMs, analytics platforms, marketing automation, and the like.',
      'A sharp eye for detail and a low tolerance for sloppy handoffs — you QA your own work before anyone else sees it.',
      'Able to communicate clearly with non-technical teammates and push back constructively when a brief isn’t buildable.',
    ],
  },
];

export const fallbackInsights: Insight[] = [
  {
    id: 'fallback-landing',
    slug: 'tips-for-designing-high-converting-landing-pages',
    title: 'Tips for Designing a High Converting Landing Page',
    excerpt: 'How to get more bang for your buck by improving on-page conversion rate.',
    date: '2026-06-08',
  },
  {
    id: 'fallback-channels',
    slug: 'most-overlooked-marketing-channels-b2b-saas-founders',
    title: 'The Most Overlooked Marketing Channels for B2B SaaS Founders',
    excerpt: 'Are you missing a trick by not investing budget into these channels?',
    date: '2026-06-02',
  },
  {
    id: 'fallback-funnel',
    slug: 'different-stages-of-the-marketing-funnel',
    title: 'What are the different stages of a marketing funnel?',
    excerpt: 'Understanding the different stages that potential customers are at is essential when planning.',
    date: '2026-05-29',
  },
];
