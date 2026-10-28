import type { CaseStudy, Insight, Job, TeamMember, Testimonial } from './airtable';

// Mirrors the current live content. Used only when Airtable isn't connected.

export const fallbackTestimonials: Testimonial[] = [
  {
    id: 'g-matt-h',
    source: 'Google',
    rating: 5,
    name: 'Matt H.',
    role: 'Director, Construction',
    company: '',
    services: ['SEO'],
    quote: 'Best decision we’ve made for our business this year!',
    review: `I can't recommend WebDog highly enough. From the very first meeting, Matt came in with a clear, well thought out digital marketing strategy and a proper presentation setting out exactly what he was going to do and why. Since then he's delivered on every target he set, and then some.

What really sets him apart is how available he is. Nothing is ever too much trouble, whether it's a quick question or a proper deep dive into something on the site. We've built a genuinely strong working relationship over the past few months, and it shows in the results, our website optimisation has come on leaps and bounds.

If you're after an SEO guru who actually does what he says he'll do, and keeps you in the loop the whole way through, Matt's your man. My website's been on steroids since we started working together.`,
  },
  {
    id: 'g-jake-r',
    source: 'Google',
    rating: 5,
    name: 'Jake R.',
    role: 'Founder, Service Industry',
    company: '',
    services: ['Website Design', 'Graphic Design', 'SEO'],
    quote: 'The website we’ve created is something I’m genuinely so proud of.',
    review: `I’ve been working with Webdog over the last few months, and it’s been brilliant having someone with real knowledge and experience to help shape the direction of my business.

Matt has been a huge help when it comes to digital strategy, marketing ideas and website creation, always offering honest advice and helping turn my ideas into something that actually works for the business.

The website we’ve created is something I’m genuinely so proud of, and I know I wouldn’t have been able to bring it to life without Matt’s expertise, patience and guidance.

If you’re looking for someone who understands both the creative and strategic side of building your business online, I couldn’t recommend Webdog enough.`,
  },
  {
    id: 'g-becky-f',
    source: 'Google',
    rating: 5,
    name: 'Becky F.',
    role: 'Founder, Sports Club',
    company: '',
    services: ['Website Design'],
    quote: 'What has really stood out is the support that goes far beyond simply building a website.',
    review: `I honestly can’t recommend Webdog highly enough! From start to finish, the whole experience has been fantastic.

The website design has been brilliant and exactly what we needed, but what has really stood out is the support that goes far beyond simply building a website. The digital advice, guidance and ideas have been incredibly helpful, and everything is always explained clearly without making things complicated.

Nothing ever feels like too much trouble, and you genuinely feel like you’re working with someone who cares about your business and wants to help it succeed.

Professional, knowledgeable, creative, approachable and, quite simply, generally fantastic.

If you’re looking for someone to help with your website or give you trustworthy digital advice, I wouldn’t hesitate to recommend Webdog.`,
  },
  {
    id: 'g-elliot-s',
    source: 'Google',
    rating: 5,
    name: 'Elliot S.',
    role: 'Founder, Charity',
    company: '',
    services: ['UX/UI Consultation'],
    quote: 'His digital marketing knowledge is incredible.',
    review: `I recently consulted Matt on a new website I was working on. He carried out a very thorough UX review, identifying numerous improvements I could make. His digital marketing knowledge is incredible, he gave me so many pointers on how to market my product as well as an added extra. I’m really happy with how the site turned out post-review and am already seeing the benefits of the digital marketing advice he shared with me. Can’t recommend him enough.`,
  },
  {
    id: 'g-kara-s',
    source: 'Google',
    rating: 5,
    name: 'Kara S.',
    role: 'COO, Charity',
    company: '',
    services: ['Digital Consulting'],
    quote: 'Hugely beneficial to our charity and had massive impact across our work.',
    review: `Matt did a lot of work for our charity and provided us with excellent digital advice and support. This was hugely beneficial to our charity and had massive impact across our work.`,
  },
  {
    id: 'g-oliver-f',
    source: 'Google',
    rating: 5,
    name: 'Oliver F.',
    role: 'Director, Construction',
    company: '',
    services: ['Website Design', 'SEO'],
    quote: 'Top bloke. Would highly recommend.',
    review: `Matt helped me out with my website for my grounds maintenance business. Went through everything step by step. Easy to talk to and will even come and meet you face to face if needed. Top bloke. Would highly recommend and will continue using matt for all digital marketing needs.`,
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

/*
 * Headshots stored in the code (public/team/). Used whenever a person's Airtable
 * row has no Headshot. To add one: save a square photo as public/team/<name>.jpg
 * and add the person's name here.
 */
export const localHeadshots: Record<string, string> = {
  'Matt Webb': '/team/matt-webb.jpg',
  'Quinn Duong': '/team/quinn-duong.jpg',
};

export const fallbackTeam: TeamMember[] = [
  { id: 'fallback-matt', name: 'Matt Webb', role: 'Founder', headshot: localHeadshots['Matt Webb'] },
  { id: 'fallback-jatin', name: 'Jatin Kallamundkur', role: 'Paid Media Specialist' },
  { id: 'fallback-quinn', name: 'Quinn Duong', role: 'Digital Marketing Executive', headshot: localHeadshots['Quinn Duong'] },
];
