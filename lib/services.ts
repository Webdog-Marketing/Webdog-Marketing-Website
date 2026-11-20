/*
 * Service pages: /services/<slug>
 * Edit the words here; the page layout picks everything up automatically.
 *
 * Proof rules: past-employer results use the company names already on the
 * site's case studies. Current clients are described by sector only; add a
 * name once the client is happy to be named.
 */

export type ServiceProof = {
  label: string; // who: e.g. "HR Tech SaaS" or "Wood flooring company, Somerset"
  title: string;
  text: string;
  stats?: { emoji: string; value: string; label: string }[];
  href?: string; // link to a full case study
};

export type Service = {
  slug: string;
  name: string;
  metaTitle: string;
  metaDescription: string;
  tagline: string;
  intro: string[];
  bestFor: string[];
  included: { title: string; text: string }[];
  steps: { title: string; text: string }[];
  proof: ServiceProof[];
  reviewTags: string[]; // shows Google reviews whose Services include any of these
  package?: { name: string; price: string; text: string };
  fromPrice?: string; // e.g. 'From £1,500' or 'From £600/month'. Leave out to hide.
  faqs: { q: string; a: string }[];
  related: string[]; // slugs
  icon: string; // SVG path, 24x24
};

export const services: Service[] = [
  {
    slug: 'conversion-rate-optimisation',
    name: 'Conversion rate optimisation',
    metaTitle: 'Conversion Rate Optimisation (CRO) & UX',
    metaDescription:
      'Turn more of your existing website visitors into sign-ups and enquiries. Funnel audits, UX reviews, landing page redesigns and A/B testing.',
    tagline: 'More sign-ups from the traffic you already have.',
    intro: [
      'Buying more traffic is expensive. Getting more of the visitors you already have to sign up, enquire or buy usually isn’t.',
      'We find exactly where people drop out of your website and sign-up journey, then redesign the pages and steps that are costing you customers.',
    ],
    bestFor: [
      'Software products with steady traffic but too few trial or demo sign-ups',
      'Businesses paying for ads that don’t turn into enquiries',
      'Teams planning a redesign who want decisions backed by data',
    ],
    included: [
      { title: 'Funnel and analytics audit', text: 'We map every step from landing page to sign-up, find where people drop out, and check your tracking is telling the truth.' },
      { title: 'UX review', text: 'A page-by-page review of your key pages, forms and sign-up flow, with a prioritised list of fixes.' },
      { title: 'Landing page and sign-up redesign', text: 'Wireframes and designs focused on clarity, trust and fewer steps to sign up.' },
      { title: 'A/B testing', text: 'Where your traffic allows, we test changes against the original so decisions are based on evidence, not opinion.' },
      { title: 'Tracking and reporting', text: 'Google Analytics and Tag Manager events set up properly, with a simple dashboard showing conversion rate over time.' },
    ],
    steps: [
      { title: 'Audit', text: 'We map your funnel and find where visitors and budget are leaking.' },
      { title: 'Fix', text: 'We redesign the pages and journeys with the biggest drop-off first.' },
      { title: 'Measure', text: 'We test, track and keep improving what works.' },
    ],
    proof: [
      {
        label: 'HR Tech SaaS',
        title: 'Lower acquisition costs, twice the pipeline',
        text: 'At Applaud, Matt helped cut customer acquisition cost by 35% while doubling marketing and sales qualified leads.',
        stats: [
          { emoji: '📉', value: '35%', label: 'lower acquisition cost' },
          { emoji: '🚀', value: '2×', label: 'MQLs and SQLs' },
        ],
        href: '/case-studies/applaud',
      },
    ],
    reviewTags: ['UX/UI Consultation', 'UX/UI Design'],
    faqs: [
      { q: 'How much traffic do I need for A/B testing?', a: 'Testing needs enough visitors to reach a reliable result. If your traffic is lower, we rely on UX best practice, user feedback and before-and-after comparisons instead, which still deliver clear improvements.' },
      { q: 'How soon will I see results?', a: 'Quick fixes from the audit can usually go live within a few weeks. Bigger redesigns take longer, and we review results with you every month.' },
      { q: 'Do you need access to our website?', a: 'We need access to your analytics and ideally your website or developer. If you don’t have a developer, we can build the changes ourselves.' },
    ],
    related: ['website-design', 'paid-media-management', 'seo'],
    icon: 'M3 5h18v12H3zM3 9h18M13 13l5 2-2 1-1 2z',
  },
  {
    slug: 'internationalisation',
    name: 'Internationalisation',
    metaTitle: 'International Marketing & Localisation',
    metaDescription:
      'Enter new markets with messaging that sounds local. Market research, localised messaging, international SEO and campaigns adapted for each country.',
    tagline: 'Enter new markets with messaging that sounds local.',
    intro: [
      'Expanding abroad isn’t just translating your website. Buyers in each market search differently, trust different things and expect different proof.',
      'We work with local experts to adapt your positioning, website and campaigns for each market, so you launch with messaging that lands from day one.',
    ],
    bestFor: [
      'UK businesses launching in the US or Europe',
      'Companies whose growth abroad has stalled',
      'Teams translating content without seeing results',
    ],
    included: [
      { title: 'Market research', text: 'How buyers in each market search, compare and buy, who you’re up against, and which channels work there.' },
      { title: 'Localised messaging', text: 'Local experts adapt your positioning, copy and proof points so they read naturally, not like a translation.' },
      { title: 'International SEO', text: 'Local keyword research and country-specific pages, set up so the right version of your site ranks in the right country.' },
      { title: 'Regional campaigns', text: 'Email, paid and content adapted for each market, including separate versions where rules or regulations differ.' },
      { title: 'Launch plan and reporting', text: 'A clear plan for each market and reporting that shows what’s working country by country.' },
    ],
    steps: [
      { title: 'Research', text: 'We learn how your new market buys and who you’re competing with.' },
      { title: 'Localise', text: 'Local experts adapt your messaging, website and campaigns.' },
      { title: 'Launch and learn', text: 'We go live, measure each market and double down on what works.' },
    ],
    proof: [
      {
        label: 'HR Tech SaaS',
        title: 'Growing organic presence in the US',
        text: 'Applaud had strong organic growth in the UK but was struggling to replicate it in the US. Fixing the foundations and building a content programme for US buyers changed that.',
        href: '/case-studies/applaud',
      },
      {
        label: 'Ventilation specialist, England and Wales',
        title: 'One campaign, two sets of rules',
        text: 'Housing regulations differ between England and Wales, so we write separate versions of campaign emails for customers in each nation.',
      },
    ],
    reviewTags: [],
    faqs: [
      { q: 'Do you just translate our content?', a: 'No. Translation is only part of it. We work with local experts who adapt your messaging, examples and proof points so they make sense to buyers in that market.' },
      { q: 'Which markets have you worked in?', a: 'We’ve supported growth from the UK into the US, and run campaigns that adapt to regional differences within the UK. For each new market, we bring in local expertise.' },
      { q: 'Do we need a separate website for each country?', a: 'Not always. Often a set of country-specific pages on your existing site works well. We’ll recommend the simplest setup that ranks properly in each market.' },
    ],
    related: ['seo', 'communications', 'paid-media-management'],
    icon: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z',
  },
  {
    slug: 'website-design',
    name: 'Website design',
    metaTitle: 'Website Design & Development',
    metaDescription:
      'Fast, modern websites built to win customers, with SEO and analytics set up from day one and easy editing so you can keep content up to date.',
    tagline: 'Fast, clear websites built to win customers.',
    intro: [
      'Your website is usually the first conversation a customer has with you. If it’s slow, confusing or out of date, they leave.',
      'We design and build fast, modern websites around what your customers need to know and do, then give you an easy way to keep them up to date yourself.',
    ],
    bestFor: [
      'Businesses whose website looks dated or doesn’t bring in enquiries',
      'New businesses and launches that need to look established from day one',
      'Anyone stuck with a slow site or a developer they can’t reach',
    ],
    included: [
      { title: 'Discovery and structure', text: 'We agree your goals, your customers’ key questions and the pages you need before any design starts.' },
      { title: 'Design', text: 'Mobile-first designs in your brand, built around clear calls to action.' },
      { title: 'Build', text: 'Fast, secure websites, custom-built or on a platform you can manage, depending on what suits you best.' },
      { title: 'Easy editing', text: 'Update text, images, team photos and reviews yourself, without touching code.' },
      { title: 'SEO and analytics from day one', text: 'Google Analytics, Search Console and Tag Manager set up at launch, with old pages redirected so you keep your rankings.' },
      { title: 'Hosting and support', text: 'We set up hosting, domains and DNS, and stay on hand for changes after launch.' },
    ],
    steps: [
      { title: 'Plan', text: 'We agree goals, pages and content before designing anything.' },
      { title: 'Design and build', text: 'You see designs early and give feedback as the site takes shape.' },
      { title: 'Launch and grow', text: 'We go live with tracking in place and keep improving from real data.' },
    ],
    proof: [
      {
        label: 'PropTech',
        title: 'A direct booking engine that saved £500k',
        text: 'Pass the Keys had 3,000 properties and a growing commission bill. A direct booking website built around underserved traveller niches changed the economics of the business.',
        stats: [
          { emoji: '💸', value: '£500k', label: 'saved in commission' },
          { emoji: '🏡', value: '3,000', label: 'properties' },
        ],
        href: '/case-studies/pass-the-keys',
      },
      {
        label: 'Barbershop, Exeter',
        title: 'From Wix to a fast custom site, ready for launch day',
        text: 'A holding page live before opening, then a fast new website with online booking built in and analytics set up from the start.',
      },
    ],
    reviewTags: ['Website Design'],
    faqs: [
      { q: 'How long does a new website take?', a: 'It depends on the size of the site and how ready your content is. We agree a timeline with you before we start, and you’ll see designs early on.' },
      { q: 'Can I update the website myself?', a: 'Yes. Every site comes with an easy way to edit text and images, so you’re not reliant on us for everyday changes.' },
      { q: 'Will I lose my Google rankings if I move to a new site?', a: 'Not if it’s done properly. We redirect your old pages to the new ones so links and rankings carry over, and set up Search Console to keep an eye on it.' },
      { q: 'Do you look after hosting and domains?', a: 'Yes. We can set up and manage hosting, your domain and DNS, taking care not to disrupt your email.' },
    ],
    related: ['seo', 'conversion-rate-optimisation', 'content-marketing'],
    icon: 'M8 8l-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14',
  },
  {
    slug: 'communications',
    name: 'Communications',
    metaTitle: 'Email Marketing & Communication Mapping',
    metaDescription:
      'Know exactly what your customers hear from you, and when. Communication mapping, 12-month email plans, copywriting, segmentation and reporting.',
    tagline: 'Know exactly what your customers hear from you, and when.',
    intro: [
      'Most businesses send emails when someone remembers to. Customers get too much one month, nothing the next, and no one is quite sure what went out.',
      'We map every message your customers receive, from first enquiry to loyal customer, then plan, write and schedule it so the right message goes out at the right time.',
    ],
    bestFor: [
      'Businesses with a customer list they rarely use',
      'Teams sending ad-hoc newsletters with no plan behind them',
      'Sales teams who need consistent, personal follow-up across regions',
    ],
    included: [
      { title: 'Communication mapping', text: 'Every email and touchpoint your customers receive, mapped in one place so you can see the gaps and overlaps.' },
      { title: '12-month email plan', text: 'Themes, dates and audiences for the whole year, so nothing is left to the last minute.' },
      { title: 'Copy and design', text: 'Every email written and designed in your brand, ready to send.' },
      { title: 'Segmentation and personalisation', text: 'Audiences split by region, customer type or account manager, so each email feels personal.' },
      { title: 'Scheduling and previews', text: 'Built and scheduled in your email platform, with previews for you to approve before anything goes out.' },
      { title: 'Reporting', text: 'Opens, clicks and enquiries reported every month, so you can see what’s working.' },
    ],
    steps: [
      { title: 'Map', text: 'We map what your customers receive today and where the gaps are.' },
      { title: 'Plan and write', text: 'We build a 12-month plan and write every message.' },
      { title: 'Send and report', text: 'We schedule, send and report on results every month.' },
    ],
    package: {
      name: 'Communication mapping package',
      price: 'From £3,000',
      text: 'A full map of your customer communications, a 12-month email plan, copy and images for each email, and scheduling in your email platform.',
    },
    proof: [
      {
        label: 'Ventilation specialist, South of England and Wales',
        title: 'A year of trade emails, personalised for every territory',
        text: 'A 12-month email programme to letting agents, with a personalised version of every email for each of three territory managers, audiences segmented by postcode, and separate versions where regulations differ in Wales.',
      },
    ],
    reviewTags: [],
    faqs: [
      { q: 'Which email platforms do you work with?', a: 'We work in Mailchimp and ActiveCampaign, and can usually work in whichever platform you already use.' },
      { q: 'Do I get to approve emails before they’re sent?', a: 'Yes. You’ll see previews before anything goes out, monthly or quarterly depending on what suits you.' },
      { q: 'What does communication mapping include?', a: 'A clear picture of every message your customers receive, from enquiry to loyal customer, plus a 12-month plan to fill the gaps. It’s available as a standalone package.' },
    ],
    related: ['content-marketing', 'conversion-rate-optimisation', 'seo'],
    icon: 'M4 5h16v11H9l-5 4zM8 9h8M8 12h5',
  },
  {
    slug: 'seo',
    name: 'SEO',
    metaTitle: 'SEO & AI Search Optimisation',
    metaDescription:
      'Get found on Google and in AI search. Technical SEO, keyword research, service and location pages, content and monthly reporting.',
    tagline: 'Get found on Google, and in AI search.',
    intro: [
      'Your customers search before they buy, and more and more of them now ask AI tools like ChatGPT and Google’s AI Overviews too.',
      'We make sure your business shows up in both, with solid technical foundations, content that answers real questions, and pages built for the services and places you want to win.',
    ],
    bestFor: [
      'Local businesses that want to rank in their town and county',
      'Businesses relying too heavily on paid ads',
      'Websites that have lost rankings after a redesign',
    ],
    included: [
      { title: 'Technical SEO audit', text: 'Site speed, structure, indexing and errors fixed, so Google can find and understand every page.' },
      { title: 'Keyword and competitor research', text: 'The searches your customers actually use, and what it will take to beat the businesses ranking above you.' },
      { title: 'Service and location pages', text: 'Dedicated pages for each service and area you want to win, written for customers first.' },
      { title: 'Case studies and content', text: 'Real jobs and helpful content that build trust and give Google more reasons to rank you.' },
      { title: 'AI search optimisation', text: 'Clear answers, FAQs, structured data and consistent business details so AI tools can understand and recommend you.' },
      { title: 'Monthly reporting', text: 'A live dashboard combining Google Analytics and Search Console, so you can see rankings and enquiries grow.' },
    ],
    steps: [
      { title: 'Audit', text: 'We fix the technical foundations and find your best opportunities.' },
      { title: 'Build', text: 'We create the pages and content that target the searches that matter.' },
      { title: 'Grow', text: 'We track rankings and enquiries monthly and keep building.' },
    ],
    proof: [
      {
        label: 'MarTech SaaS',
        title: 'Less reliance on paid, organic growth back on track',
        text: 'Stannp had a decade of experience but a website that was holding it back. A full redesign and content overhaul changed its conversion picture, during a period of growth from £10m to £20m ARR.',
        stats: [{ emoji: '📈', value: '£10m → £20m', label: 'ARR' }],
        href: '/case-studies/stannp',
      },
      {
        label: 'Wood flooring company, Somerset',
        title: 'Ranking job by job, town by town',
        text: 'Ongoing SEO since the company’s new website launched, including case studies for real jobs in each town they want to win work in.',
      },
    ],
    reviewTags: ['SEO'],
    faqs: [
      { q: 'How long does SEO take to work?', a: 'SEO builds over time. Technical fixes can help quickly, but most businesses see meaningful movement over a few months, and results keep compounding after that.' },
      { q: 'What is AI search optimisation?', a: 'Making sure tools like ChatGPT and Google’s AI Overviews can understand your business and recommend it. That means clear answers, FAQs, structured data and consistent details across the web.' },
      { q: 'Can you guarantee a number one ranking?', a: 'No one can honestly guarantee rankings, because Google decides. What we can promise is a clear plan, steady work every month and honest reporting on progress.' },
    ],
    related: ['website-design', 'content-marketing', 'paid-media-management'],
    icon: 'M10.5 17a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13zM20 20l-4.8-4.8M8 12l2-2 1.5 1.5L14 9',
  },
  {
    slug: 'content-marketing',
    name: 'Content marketing',
    metaTitle: 'Content Marketing, Photography & Video',
    metaDescription:
      'Campaign ideas, photography and video that people stop for. Creative concepts, shoot planning, filming, editing and launch plans.',
    tagline: 'Campaign ideas, photos and video that people actually stop for.',
    intro: [
      'Good content starts with a good idea. Stock photos and generic posts blend into the scroll.',
      'We come up with campaign concepts, then plan and produce the photography, video and graphics to bring them to life across your website, social channels and ads.',
    ],
    bestFor: [
      'Brands with little original photo or video of their own',
      'Businesses planning a launch or seasonal campaign',
      'Sponsors who want more from a sports partnership',
    ],
    included: [
      { title: 'Campaign ideas', text: 'Creative concepts built around your audience and goals, not just what’s trending.' },
      { title: 'Video production', text: 'Shoot planning, filming and editing, cut for social, ads and your website, working with trusted videographers.' },
      { title: 'Photography', text: 'Original photos of your people, products and work.' },
      { title: 'Graphic design', text: 'Social posts, ads and campaign graphics in your brand.' },
      { title: 'Launch and content plans', text: 'Month-by-month plans so content goes out consistently, from pre-launch to launch day and beyond.' },
    ],
    steps: [
      { title: 'Idea', text: 'We develop a campaign concept and plan for it.' },
      { title: 'Create', text: 'We shoot, edit and design everything you need.' },
      { title: 'Launch', text: 'We publish, promote and learn what resonates.' },
    ],
    proof: [
      {
        label: 'Ventilation specialist and sports sponsorship',
        title: 'Turning a sponsorship into a paid social campaign',
        text: 'Concept, planning and a video shoot with the professional rugby player the brand sponsors, filmed at the club’s stadium and edited for paid social.',
      },
      {
        label: 'Independent publisher, Exeter',
        title: 'Launch plans for new novels',
        text: 'Month-by-month marketing plans taking new books from pre-launch to publication, with practical next steps for each author.',
      },
    ],
    reviewTags: ['Graphic Design'],
    faqs: [
      { q: 'Do you film on location?', a: 'Yes. We come to you, whether that’s your premises, a client’s site or a stadium.' },
      { q: 'Can you work with our brand guidelines?', a: 'Absolutely. Everything we create follows your fonts, colours and tone of voice.' },
      { q: 'What do we get at the end of a shoot?', a: 'Edited videos and photos sized for each channel you plan to use, ready to post or run as ads.' },
    ],
    related: ['paid-media-management', 'communications', 'website-design'],
    icon: 'M4 7h3l2-3h6l2 3h3v12H4zM12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
  },
  {
    slug: 'paid-media-management',
    name: 'Paid media management',
    metaTitle: 'Google Ads & Pinterest Ads Management',
    metaDescription:
      'Ads that pay their way. Google Ads and Pinterest campaign management, landing pages, conversion tracking and clear weekly reporting.',
    tagline: 'Ads that pay their way, on Google and Pinterest.',
    intro: [
      'Paid ads can grow a business fast, or burn through budget with little to show for it.',
      'We plan, build and manage campaigns on Google Ads and Pinterest, with landing pages and tracking set up properly, so every pound can be traced back to results.',
    ],
    bestFor: [
      'Online shops wanting more sales from Google Shopping or Pinterest',
      'Local businesses wanting enquiries from Google search',
      'Advertisers who aren’t sure what their ads actually deliver',
    ],
    included: [
      { title: 'Account audit', text: 'A clear look at what your current ads spend, what they deliver and where money is being wasted.' },
      { title: 'Google Ads', text: 'Search and Shopping campaigns built around the searches that bring in customers.' },
      { title: 'Pinterest Ads', text: 'Product catalogue campaigns built from your shop’s product feed, plus campaigns that build interest before people buy.' },
      { title: 'Landing pages', text: 'Dedicated pages that match each ad, so clicks turn into enquiries and sales.' },
      { title: 'Conversion tracking', text: 'Sales and enquiries tracked properly, so we optimise for results, not clicks.' },
      { title: 'Clear reporting', text: 'Spend, sales and conversions in a simple weekly or monthly view.' },
    ],
    steps: [
      { title: 'Audit and plan', text: 'We review your accounts and agree goals and budget.' },
      { title: 'Launch', text: 'We build campaigns, landing pages and tracking.' },
      { title: 'Optimise', text: 'We test, adjust and scale what’s working.' },
    ],
    proof: [
      {
        label: 'Homeware retailer',
        title: 'A phased Pinterest launch',
        text: 'Product catalogue ads built from the retailer’s online shop feed, launched in phases, with a week-by-week view of spend, sales and conversions so the team can decide where to invest next.',
      },
      {
        label: 'Double glazing company, Exeter',
        title: 'Google Ads with a landing page to match',
        text: 'Ongoing Google Ads management alongside a rebuilt landing page for the company’s main offer.',
      },
    ],
    reviewTags: [],
    faqs: [
      { q: 'Is there a minimum ad budget?', a: 'There’s no fixed minimum. We recommend a budget based on your market and goals, and often start small to prove what works before scaling up.' },
      { q: 'Who owns the ad accounts?', a: 'You do. We work inside your accounts, so you keep full access and history if you ever move on.' },
      { q: 'How quickly will I see results?', a: 'Ads can start bringing in traffic within days. It usually takes a few weeks of data to optimise properly, and we report on progress throughout.' },
    ],
    related: ['conversion-rate-optimisation', 'content-marketing', 'seo'],
    icon: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM12 12h.01',
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
