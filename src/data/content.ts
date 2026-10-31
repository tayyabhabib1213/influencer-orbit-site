// Reusable content blocks: creator posts, reviews, FAQs, comparison rows.

export type CreatorImage = { file: string; width: number; alt: string };

// Creator posts from the Esther Formula program (2024 to 2025). Photos only, captions not shown.
export const CREATORS: CreatorImage[] = [
  { file: 'creator-01', width: 480, alt: 'Creator in a garden holding a yellow box of Esther Formula Glu1C2 glow masks' },
  { file: 'creator-02', width: 480, alt: 'Creator at a cafe table holding Esther Formula skin probiotics' },
  { file: 'creator-03', width: 480, alt: 'Creator holding two boxes of Esther Formula Liposome Glutathione film strips' },
  { file: 'creator-04', width: 480, alt: 'Smiling creator in glasses with two packs of Esther Formula glutathione strips' },
  { file: 'creator-05', width: 387, alt: 'Creator blowing a kiss while holding a red Esther Formula box' },
  { file: 'creator-06', width: 480, alt: 'Creator in a car holding a red Esther Formula box' },
  { file: 'creator-07', width: 256, alt: 'Creator holding an Esther Formula pack beside her face' },
  { file: 'creator-08', width: 256, alt: 'Creator showing a gold glutathione film strip to camera' },
  { file: 'creator-09', width: 256, alt: 'Creator fanning a handful of Esther Formula sachets' },
  { file: 'creator-10', width: 256, alt: 'Creator holding a film strip close to camera' },
  { file: 'creator-11', width: 256, alt: 'Smiling creator fanning red Esther Formula sachets' },
  { file: 'creator-12', width: 232, alt: 'Creator in a bright room holding Esther Formula sachets' }
];

// Verified Fiverr reviews, quoted verbatim (emoji removed). No prices shown.
export const REVIEWS = [
  {
    quote: 'Tayyab and his team did an amazing job! Super easy to work with, quick to respond, and nailed exactly what I wanted. I was so happy with the first project that I went ahead and ordered again right away. Totally recommend them!',
    name: 'jing_yoon',
    note: 'Repeat client',
    country: 'United States'
  },
  {
    quote: 'Tayyab did an excellent job. Because of his expertise, Everything was done on time and professionally. I highly recommend him to anyone!',
    name: 'thomas5542',
    country: 'United States'
  },
  {
    quote: 'Tayyab exceeded my expectations and completed everything on time. Highly recommended!',
    name: 'techirt',
    country: 'United Kingdom'
  }
];

export type Faq = { q: string; a: string };

// Replaces {months} with the live Esther Formula month count.
import { estherMonths } from './site';
export const fill = (t: string) => t.replace(/\{months\}/g, String(estherMonths()));

export const SERVICE_FAQS: Faq[] = [
  { q: 'Isn’t seeding just awareness? How do I measure ROI?', a: 'At three levels: posts against target (guaranteed), creator code and link sales, and Spark Ad performance. All three are in your monthly report.' },
  { q: 'You have one case study. Isn’t that thin?', a: 'It’s one brand for {months} months: 2,000+ collaborations and 50 to 200 posts every month. That proves the operation holds up month after month, which a list of one-off campaigns can’t.' },
  { q: 'Your team is in Pakistan. How does that work on US time?', a: 'Your live tracker updates in real time, so you never wait on a status email. Our response commitment is one business day over email, Slack or WhatsApp, and it’s written into the engagement.' },
  { q: 'A marketplace charges about $30 a post. Why pay a retainer?', a: 'Marketplace creators come from a shared opt-in pool, with no brief built for your brand, no competitor audit, no VIP roster and no Spark Ads pipeline. And you don’t own the relationships. At Growth tier you pay about $25 a post for all of it.' },
  { q: 'We already have a coordinator. What happens to them?', a: 'We import your roster and tracker and absorb the operational load. Their creator relationships stay in place, and volume grows from where it is.' },
  { q: 'Are your creators only in the US?', a: 'No. We serve US brands and source creators wherever your customers are. We’ve run seeding with creators across the US, Southeast Asia, the UK, Australia and the UAE.' },
  { q: 'How much product do we need?', a: 'It depends on your tier and product cost. We size it with you on the walkthrough so you never short customer orders.' },
  { q: 'Who chooses the creators?', a: 'We hand-vet them against the brief you approve. You see every confirmed creator in the tracker before anything ships.' },
  { q: 'How are posts disclosed?', a: 'Every creator is briefed to use FTC-compliant disclosure such as #gifted or #ad, or the platform’s branded-content tools.' },
  { q: 'What if we want to leave?', a: 'After the 60-day pilot it’s month to month. You leave with every contact, content link and the tracker.' }
];

// Homepage FAQ: question-led for search and AI answers (answers drawn from the copy deck).
export const HOME_FAQS: Faq[] = [
  { q: 'How much does creator seeding cost for a skincare brand?', a: 'Influencer Orbit runs on three monthly tiers: $1,500 for 50+ creator posts, $2,500 for 100+ and $3,500 for 150+. That works out to about $23 to $30 in management cost per post. You pay product, shipping and any creator fees directly, with no markup.' },
  { q: 'How fast do the first creator posts go live?', a: 'Outreach goes live by day 5, and first creator posts usually go live within 21 days. Your tier’s monthly post count is guaranteed by day 60, or month three is free.' },
  SERVICE_FAQS[0],
  SERVICE_FAQS[2],
  SERVICE_FAQS[8]
];

export const CASE_FAQS: Faq[] = [
  { q: 'What does Influencer Orbit do for Esther Formula?', a: 'We run Esther Formula’s creator seeding operation end to end: creator research, hand-vetting, outreach, confirmation before shipping, shipment coordination and follow-up until every post is live. The brand approves briefs and ships product.' },
  { q: 'How long has Esther Formula worked with Influencer Orbit?', a: 'Since January 2024 ({months} months), with 50 to 200 creator posts going live every month and no in-house influencer manager hired.' },
  { q: 'Can I see the real tracker?', a: 'Yes. On the walkthrough we open the real Esther Formula tracker (redacted) and the monthly report you would receive.' }
];

// Homepage comparison: three options a founder actually weighs.
export const HOME_COMPARE = {
  cols: ['Influencer Orbit', 'In-house coordinator', 'Typical agency'],
  rows: [
    ['What you pay', '$1,500 to $3,500 a month', '~$61K a year plus software', 'Retainer plus campaign fees'],
    ['Who does the work', 'We do', 'Your hire', 'Their account team'],
    ['Post count guaranteed', 'Yes, by day 60', 'No', 'Rarely. Reach estimates instead'],
    ['Creators picked for your customer', 'Hand-vetted', 'Yes', 'Often from their own pool'],
    ['You own the creator relationships', 'Yes', 'Until they leave', 'Usually not'],
    ['Spark Ads pipeline', 'Included', 'Extra work', 'Often extra']
  ]
};
