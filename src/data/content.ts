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
  { q: 'How much does it cost?', a: 'Plans start from $499 a month. Your exact price depends on the plan and your goals, and we quote it on a 30-minute walkthrough after we’ve seen your brand. Every plan starts with a 60-day pilot, then runs month to month. Prepay three months and save 10%.' },
  { q: 'Isn’t seeding just awareness? How do I measure ROI?', a: 'At three levels: posts against target (guaranteed), creator code and link sales, and the performance of the posts we turn into ads. All three are in your report.' },
  { q: 'What are UGC assets with usage rights?', a: 'Creator videos you’re allowed to run in your own ads. Every plan includes them, equal to at least 30% of its guaranteed posts. The exact usage terms are written into your proposal before anything starts.' },
  { q: 'What happens if you miss the post count?', a: 'First posts go live within 21 days, and your plan’s monthly post count is hit by day 60, counted from when you ship product. If we miss it, we keep working at no charge until we hit it.' },
  { q: 'You have one case study. Isn’t that thin?', a: 'It’s one brand for {months} months: 2,000+ collaborations and 50 to 200 posts every month. That proves the operation holds up month after month, which a list of one-off campaigns can’t.' },
  { q: 'Your team is in Pakistan. How does that work on US time?', a: 'Your live tracker updates in real time, so you never wait on a status email. We reply within one business day over email, Slack or WhatsApp, and it’s written into the engagement.' },
  { q: 'We already have a coordinator. What happens to them?', a: 'We import your roster and tracker and take the operational load off them. Their creator relationships stay in place, and volume grows from where it is.' },
  { q: 'Are your creators only in the US?', a: 'No. We source creators wherever your customers are, and have run seeding with creators across the US, Southeast Asia, the UK, Australia and the UAE.' },
  { q: 'What do we handle on our side?', a: 'Three things: shipping gifted product from your own warehouse, your own Spark Ads spend, and paying creators directly on any paid collabs. We handle everything else.' },
  { q: 'Who chooses the creators?', a: 'We hand-vet them against the brief you approve. You see every confirmed creator in the tracker before anything ships.' },
  { q: 'How are posts disclosed?', a: 'Every creator is briefed to use FTC-compliant disclosure such as #gifted or #ad, or the platform’s branded-content tools.' },
  { q: 'Can we start small and upgrade?', a: 'Yes. Many brands start on Liftoff. If you move up to Orbit within 60 days, what you paid for Liftoff counts toward it.' },
  { q: 'What if we want to leave?', a: 'After the 60-day pilot it’s month to month. You leave with every creator contact, content link and the tracker.' }
];

// Homepage FAQ: question-led for search and AI answers.
export const HOME_FAQS: Faq[] = [
  SERVICE_FAQS[0],
  { q: 'How fast do the first creator posts go live?', a: 'Outreach starts within the first week, and first creator posts go live within 21 days. Your plan’s monthly post count is guaranteed by day 60, counted from when you ship product.' },
  SERVICE_FAQS[2],
  SERVICE_FAQS[1],
  SERVICE_FAQS[5],
  SERVICE_FAQS[8]
];

export const CASE_FAQS: Faq[] = [
  { q: 'What does Influencer Orbit do for Esther Formula?', a: 'We run Esther Formula’s creator seeding operation end to end: creator research, hand-vetting, outreach, confirmation before shipping, shipment coordination and follow-up until every post is live. The brand approves briefs and ships product.' },
  { q: 'How long has Esther Formula worked with Influencer Orbit?', a: 'Since January 2024 ({months} months), with 50 to 200 creator posts going live every month and no in-house influencer manager hired.' },
  { q: 'Can I see the real tracker?', a: 'Yes. On the walkthrough we open the real Esther Formula tracker (redacted) and the report you would receive.' }
];

// Comparison: us vs the two options a founder actually weighs. true = yes, false = no, string = detail.
export const HOME_COMPARE = {
  cols: ['Influencer Orbit', 'Typical agency or freelancer', 'In-house hire'],
  rows: [
    { label: 'Post count guaranteed', cells: ['Yes, by day 60', 'Rarely. Reach estimates instead', 'No'] },
    { label: 'Every creator confirms before you ship', cells: [true, false, 'Depends on the person'] },
    { label: 'UGC with usage rights for your ads', cells: ['Included in every plan', 'Usually extra', 'Extra negotiation'] },
    { label: 'Spark Ads pipeline', cells: ['Included', 'Often extra', 'Extra work'] },
    { label: 'Creators picked for your customer', cells: ['Hand-vetted', 'Often from their own pool', true] },
    { label: 'You own the creator relationships', cells: [true, false, 'Until they leave'] },
    { label: 'Live tracker you can open any time', cells: [true, 'Monthly slides', 'A spreadsheet'] },
    { label: 'Cost', cells: ['One monthly plan, from $499', 'Retainer plus campaign fees', '~$61K a year plus software'] }
  ] as { label: string; cells: (string | boolean)[] }[]
};
