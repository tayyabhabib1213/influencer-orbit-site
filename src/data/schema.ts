// JSON-LD builders. Every page passes the blocks it needs to BaseLayout.
import { SITE, TIERS, PROOF } from './site';
import { fill, type Faq } from './content';

const ORG_ID = `${SITE.url}/#organization`;
const PERSON_ID = `${SITE.url}/#founder`;
const SITE_ID = `${SITE.url}/#website`;

export const ABOUT_FACT =
  `Influencer Orbit is a creator seeding operation for US DTC skincare, cosmetics and beauty brands. ` +
  `Founded by ${SITE.founder.name}, it runs confirm-first gifted product seeding, UGC for ads, paid creator collabs and Spark Ads setup ` +
  `on Instagram, TikTok and YouTube. A ${SITE.teamSize}-person remote team has run ${PROOF.collaborations} creator collaborations (${PROOF.totalPosts} posts live for one brand since January 2024) ` +
  `and coordinates ${PROOF.shipmentsPerMonth} product shipments a month, with clients across the US, UK and EU and creators across ${PROOF.creatorMarkets}. ` +
  `Its confirm-first method gets ${PROOF.postRate} of gifted creators to post, against ${PROOF.coldGiftingPostRate} for typical cold gifting.`;

// Short version for the footer of every page (same wording everywhere).
export const ABOUT_SHORT =
  `Influencer Orbit is a creator seeding operation for US DTC skincare, cosmetics and beauty brands, founded by ${SITE.founder.name}. ` +
  `It runs confirm-first gifted seeding, UGC for ads, paid creator collabs and Spark Ads on Instagram, TikTok and YouTube.`;

export function organization() {
  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'ProfessionalService'],
    '@id': ORG_ID,
    name: SITE.name,
    url: SITE.url,
    logo: `${SITE.url}/images/brand/app-icon-512.png`,
    image: `${SITE.url}/images/og/default.png`,
    description: ABOUT_FACT,
    email: SITE.email,
    foundingDate: String(SITE.foundingYear),
    founder: { '@id': PERSON_ID },
    numberOfEmployees: { '@type': 'QuantitativeValue', value: SITE.teamSize },
    areaServed: SITE.areaServed.map((name) => ({ '@type': 'Place', name })),
    knowsAbout: ['Influencer marketing', 'Product seeding', 'Gifted influencer campaigns', 'UGC for ads', 'TikTok Spark Ads', 'Beauty and skincare marketing'],
    priceRange: '$1,500 to $3,500 per month',
    sameAs: [SITE.social.instagram, SITE.social.linkedin],
    contactPoint: { '@type': 'ContactPoint', contactType: 'sales', email: SITE.email, availableLanguage: ['English'] }
  };
}

export function website() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': SITE_ID,
    url: SITE.url,
    name: SITE.name,
    publisher: { '@id': ORG_ID },
    inLanguage: 'en-US'
  };
}

export function person() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': PERSON_ID,
    name: SITE.founder.name,
    jobTitle: 'Founder',
    image: `${SITE.url}${SITE.founder.image}`,
    worksFor: { '@id': ORG_ID },
    sameAs: [SITE.founder.linkedin],
    knowsAbout: ['Creator seeding', 'Influencer marketing for beauty brands', 'Gifted product campaigns']
  };
}

export function services() {
  return TIERS.map((t) => ({
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE.url}/creator-seeding#${t.id}`,
    name: `Orbit Seeding Engine: ${t.name}`,
    serviceType: 'Creator seeding and influencer marketing',
    description: `${t.posts} confirmed creator posts a month for US skincare, cosmetics and beauty brands. Starts with a 60-day pilot, then month to month. Post count guaranteed by day 60.`,
    provider: { '@id': ORG_ID },
    areaServed: { '@type': 'Country', name: 'United States' },
    audience: { '@type': 'BusinessAudience', audienceType: 'DTC skincare, cosmetics and beauty brands' },
    offers: {
      '@type': 'Offer',
      price: t.price,
      priceCurrency: 'USD',
      priceSpecification: { '@type': 'UnitPriceSpecification', price: t.price, priceCurrency: 'USD', unitText: 'MONTH' },
      url: `${SITE.url}/creator-seeding#pricing`
    }
  }));
}

export function faqPage(faqs: Faq[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({ '@type': 'Question', name: fill(f.q), acceptedAnswer: { '@type': 'Answer', text: fill(f.a) } }))
  };
}

export function breadcrumb(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [{ name: 'Home', path: '/' }, ...items].map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: `${SITE.url}${it.path === '/' ? '' : it.path}`
    }))
  };
}

export function article(opts: { headline: string; description: string; path: string; datePublished: string; dateModified: string; image: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: opts.headline,
    description: opts.description,
    url: `${SITE.url}${opts.path}`,
    mainEntityOfPage: `${SITE.url}${opts.path}`,
    image: `${SITE.url}${opts.image}`,
    datePublished: opts.datePublished,
    dateModified: opts.dateModified,
    author: { '@id': PERSON_ID },
    publisher: { '@id': ORG_ID },
    about: { '@type': 'Organization', name: 'Esther Formula' }
  };
}
