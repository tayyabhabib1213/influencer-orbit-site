// Single source of truth for facts, links and integrations.
// Change a value here and it updates on every page, in schema and in llms.txt.

export const SITE = {
  name: 'Influencer Orbit',
  url: 'https://www.influencerorbit.com',
  tagline: 'The creator seeding operation for beauty brands',
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
  // Booking: the 20-minute Calendly event.
  calendly: 'https://calendly.com/tayyabhabib1213/20min',
  callLength: '20-minute',
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
  playbookReady: false
};

// Pricing tiers (also used for Service schema).
export const TIERS = [
  { id: 'launch', name: 'Launch', price: 1500, posts: '50+', perPost: 'about $30', bestFor: 'Founder-run brands moving off manual gifting' },
  { id: 'growth', name: 'Growth', price: 2500, posts: '100+', perPost: 'about $25', bestFor: 'Brands ready to own TikTok search in their niche', popular: true },
  { id: 'scale', name: 'Scale', price: 3500, posts: '150+, plus paid collab management', perPost: 'about $23', bestFor: 'Brands replacing or extending a coordinator' }
];

// Form endpoints. All three post to the PHP handler on Hostinger (public/api/lead.php),
// which emails each lead, keeps a private CSV backup and, once configured, adds it to MailerLite.
// If the handler can't be reached, submitting opens the visitor's email app addressed to SITE.email.
export const FORMS = {
  audit: '/api/lead.php',
  playbook: '/api/lead.php',
  contact: '/api/lead.php'
};

// Analytics. Leave empty to load nothing.
export const ANALYTICS = {
  ga4: '', // e.g. G-XXXXXXXXXX
  metaPixel: '', // e.g. 123456789012345
  linkedinPartnerId: '' // e.g. 1234567
};

export const NAV = [
  { label: 'How it works', href: '/creator-seeding#how-it-works' },
  { label: 'Pricing', href: '/creator-seeding#pricing' },
  { label: 'Case studies', href: '/case-studies' },
  { label: 'About', href: '/about' },
  { label: 'Free Competitor Audit', href: '/competitor-audit' }
];

export const CTA = {
  primary: `Book a ${SITE.callLength} walkthrough`,
  secondary: 'Get your free Competitor Creator Audit',
  microcopy: 'See the live tracker before you commit to anything.'
};
