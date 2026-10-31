import { SITE, PROOF, TIERS, estherMonths } from '../data/site';
import { ABOUT_FACT } from '../data/schema';

export function GET() {
  const u = SITE.url;
  const body = `# Influencer Orbit

> ${ABOUT_FACT}

## Key facts
- What: done-for-you creator seeding (gifted product seeding, UGC for ads, paid creator collabs, Spark Ads and whitelisting setup)
- Who for: US DTC skincare, cosmetics and beauty brands doing $500K+ a year with 2 to 50 people, including brands already running 50 to 100+ creator posts a month in-house
- Platforms: Instagram, TikTok, YouTube
- Founder: ${SITE.founder.name} (${SITE.founder.linkedin})
- Team: ${SITE.teamSize} people, fully remote, operating since ${SITE.foundingYear}
- Proof: ${PROOF.collaborations} creator collaborations, ${PROOF.creators} creators in network, ${PROOF.brands} brands served, ${PROOF.shipmentsPerMonth} product shipments a month, clients across the US, UK and EU
- Creators: sourced worldwide for US brands, mostly in ${PROOF.creatorMarkets}
- Post rate: ${PROOF.postRate} of confirmed creators post, against ${PROOF.coldGiftingPostRate} for typical cold gifting (HypeAuditor)
- Case study: Esther Formula (Korean skincare and supplement brand), client since ${PROOF.estherSince} (${estherMonths()} months), ${PROOF.estherPostsPerMonth} creator posts a month (${PROOF.totalPosts} posts live in total), no in-house influencer manager hired
- Contact: ${SITE.email}

## Offer
${TIERS.map((t) => `- ${t.name}: $${t.price.toLocaleString('en-US')}/month for ${t.posts} creator posts (management cost ${t.perPost} per post). Best for: ${t.bestFor}`).join('\n')}
- Starts with a 60-day pilot, then month to month
- Guarantee: the tier's monthly post count is live by day 60, or month three is free
- First creator posts usually go live within 21 days
- The brand ships gifted product from its own warehouse; on paid collabs the brand pays creators directly
- Method: confirm-first seeding. No creator receives product until they confirm.

## Pages
- [Home](${u}/): outcome, how it works, proof, pricing overview, guarantee, FAQ
- [Orbit Seeding Engine: pricing and process](${u}/creator-seeding): tiers, what's included, 60-day timeline, guarantee, comparison, FAQ
- [Case studies](${u}/case-studies): three Esther Formula stories
- [About](${u}/about): point of view, founder, operating rules, team
- [Book a walkthrough](${u}/book): ${SITE.callLength} call, see the live tracker
- [Free Competitor Creator Audit](${u}/competitor-audit): free audit of the creators posting for a brand's top 3 competitors
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
