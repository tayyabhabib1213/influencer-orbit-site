// Single source of truth for facts, links and integrations.
// Change a value here and it updates on every page, in schema and in llms.txt.

export const SITE = {
  name: 'Influencer Orbit',
  url: 'https://influencerorbit.com',
  tagline: 'Creator seeding for DTC beauty brands. Your best creator posts become ads.',
  email: 'tayyab@influencerorbit.com',
  founder: {
    name: 'Tayyab Habib',
    role: 'Founder',
    linkedin: 'https://www.linkedin.com/in/tayyab-habib-418a20220/',
    image: '/images/brand/tayyab-habib-800.jpg'
  },
  social: {
    instagram: 'https://www.instagram.com/influencersorbit/',
    linkedin: 'https://www.linkedin.com/in/tayyab-habib-418a20220/'
  },
  // Booking: the 30-minute Calendly event.
  calendly: 'https://calendly.com/tayyabhabib1213/walkthrough',
  callLength: '30-minute',
  responseTime: 'We reply within one business day.',
  foundingYear: 2023,
  teamSize: 4,
  areaServed: ['United States', 'United Kingdom', 'European Union']
};

// Approved proof points. Only these numbers may appear on the site.
export const PROOF = {
  collaborations: '2,000+',
  creators: '1,000+',
  brands: '100+',
  shipmentsPerMonth: '200+',
  estherPostsPerMonth: '50 to 200',
  estherSince: 'January 2024',
  totalPosts: '2,483',
  postRate: '70%+',
  coldGiftingPostRate: '30% to 50%',
  creatorMarkets: 'the US, Southeast Asia, the UK, Australia and the UAE'
};

// Months Esther Formula has run with us, counted inclusively from January 2024.
// Recomputed at every build; /scripts/main.js refreshes it in the browser too.
export function estherMonths(now = new Date()): number {
  return (now.getFullYear() - 2024) * 12 + now.getMonth() + 1;
}

// Content that is still being collected. Leave empty and the block stays hidden;
// fill it in and the block appears on the next build.
export const PENDING = {
  // e.g. { quote: '...', name: 'Jane Doe', title: 'Head of Growth' }
  estherTestimonial: null as null | { quote: string; name: string; title: string },
  // 2 to 3 sentences in your own words for the About page
  founderStory: '',
  // set to true once the "100-Post Month" PDF is attached to the MailerLite email
  playbookReady: false,
  // Esther Formula video testimonial: put the file in public/videos/ and fill this in
  // e.g. { src: '/videos/esther-testimonial.mp4', poster: '/images/esther-video-poster.jpg', name: 'Name', title: 'Role' }
  estherVideo: null as null | { src: string; poster: string; name: string; title: string }
};

// Plans. Prices are not shown on the site except the single "from" price;
// each plan's button leads to a call where the quote is given.
export const PRICE_FROM = '$499';

export type Tier = {
  id: string; name: string; tagline: string; bestFor: string; posts: string; ugc: string;
  spark: string; calls: string; reporting: string; popular?: boolean; custom?: boolean; cta: string;
};

export const TIERS: Tier[] = [
  { id: 'liftoff', name: 'Liftoff', tagline: 'Start seeding the right way', bestFor: 'Brands new to influencer seeding', posts: '12', ugc: '4', spark: 'Top 2 posts flagged, with Spark Ads codes', calls: 'Kickoff call', reporting: 'Monthly summary', cta: 'Get Liftoff pricing' },
  { id: 'orbit', name: 'Orbit', tagline: 'A steady creator engine', bestFor: 'Growing DTC brands doing $500K to $3M a year', posts: '50', ugc: '15', spark: 'Top 5 posts, Spark Ads codes secured and set up', calls: 'Monthly strategy call', reporting: 'Monthly report with top creators', popular: true, cta: 'Get Orbit pricing' },
  { id: 'galaxy', name: 'Galaxy', tagline: 'Volume plus a full ad pipeline', bestFor: 'Brands at $3M+ a year, or running seeding in-house', posts: '100+', ugc: '30+', spark: 'Top 10 posts, codes plus whitelisting on TikTok and Meta', calls: 'Strategy call every two weeks', reporting: 'Creator-level results every two weeks', cta: 'Get Galaxy pricing' },
  { id: 'mission-control', name: 'Mission Control', tagline: 'Built around your brand', bestFor: 'Brands that need 150+ posts a month or several markets', posts: '150+', ugc: '45+', spark: 'Every strong post, run as a continuous ad pipeline', calls: 'Weekly call with a dedicated lead', reporting: 'Custom dashboard', custom: true, cta: 'Talk to us' }
];

// What every plan includes.
export const INCLUDED_ALL = [
  'Competitor Creator Audit and a brief you approve',
  'Creator research and hand vetting',
  'Outreach, negotiation and confirmation before shipping',
  'Shipping coordination with your warehouse',
  'Follow-up until every post is live',
  'Live shared tracker you own'
];

export const ADDONS = [
  { name: 'Paid creator collab management', text: 'We source, negotiate and manage paid creators. Priced as a share of your creator budget.' },
  { name: 'Extra creator posts', text: 'Add posts in blocks of 25 for launches, holidays or new markets.' },
  { name: 'Extra UGC assets', text: 'More creator videos with usage rights for your ad account, per asset.' }
];

// Form endpoints. All three post to the PHP handler on Hostinger (public/api/lead.php),
// which emails each lead, keeps a private CSV backup and, once configured, adds it to MailerLite.
// If the handler can't be reached, submitting opens the visitor's email app addressed to SITE.email.
export const FORMS = {
  audit: '/api/lead.php',
  playbook: '/api/lead.php',
  contact: '/api/lead.php',
  newsletter: '/api/lead.php'
};

// Analytics. Leave empty to load nothing.
export const ANALYTICS = {
  ga4: '', // e.g. G-XXXXXXXXXX
  metaPixel: '', // e.g. 123456789012345
  linkedinPartnerId: '' // e.g. 1234567
};

export const NAV = [
  { label: 'How it works', href: '/creator-seeding' },
  { label: 'Pricing', href: '/creator-seeding#pricing' },
  { label: 'Case study', href: '/case-studies' },
  { label: 'About', href: '/about' },
  { label: 'Free audit', href: '/competitor-audit' }
];

export const CTA = {
  primary: `Book a ${SITE.callLength} walkthrough`,
  secondary: 'Get your free Competitor Creator Audit',
  microcopy: 'See the live tracker and a real monthly report before you commit to anything.'
};
