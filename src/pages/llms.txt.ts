import { SITE, PROOF, TIERS, PRICE_FROM, ADDONS, estherMonths } from '../data/site';
import { ABOUT_FACT } from '../data/schema';

export function GET() {
  const u = SITE.url;
  const body = `# Influencer Orbit

> ${ABOUT_FACT}

## Key facts
- What: done-for-you creator seeding (gifted product seeding, UGC with usage rights for ads, paid creator collabs, Spark Ads and whitelisting setup)
- Who for: DTC skincare, cosmetics and beauty brands, from brands new to seeding to brands running 100+ creator posts a month in-house
- Platforms: Instagram, TikTok, YouTube
- Founder: ${SITE.founder.name} (${SITE.founder.linkedin})
- Team: ${SITE.teamSize} people, fully remote, operating since ${SITE.foundingYear}
- Proof: ${PROOF.collaborations} creator collaborations, ${PROOF.creators} creators in network, ${PROOF.brands} brands served, ${PROOF.shipmentsPerMonth} product shipments a month, clients across the US, UK and EU
- Creators: sourced worldwide for US brands, mostly in ${PROOF.creatorMarkets}
- Post rate: ${PROOF.postRate} of confirmed creators post, against ${PROOF.coldGiftingPostRate} for typical cold gifting (HypeAuditor)
- Case study: Esther Formula (Korean skincare and supplement brand), client since ${PROOF.estherSince} (${estherMonths()} months), ${PROOF.estherPostsPerMonth} creator posts a month (${PROOF.totalPosts} posts live in total), no in-house influencer manager hired
- Contact: ${SITE.email}

## Offer
Plans start from ${PRICE_FROM} a month. Exact pricing is quoted on a ${SITE.callLength} walkthrough.
${TIERS.map((t) => `- ${t.name}: ${t.posts} guaranteed creator posts a month, ${t.ugc} UGC assets with usage rights for ads, ${t.spark.toLowerCase()}, ${t.calls.toLowerCase()}, ${t.reporting.toLowerCase()}. Best for: ${t.bestFor}`).join('\n')}
- Every plan starts with a 60-day pilot, then runs month to month. Prepaying 3 months saves 10%.
- Guarantees: first creator posts live within 21 days; the plan's monthly post count is hit by day 60 (counted from when the brand ships product), or the team keeps working at no charge until it is
- The brand ships gifted product from its own warehouse, pays its own Spark Ads spend, and pays creators directly on paid collabs
- Add-ons: ${ADDONS.map((a) => a.name.toLowerCase()).join(', ')}
- Method: confirm-first seeding. No creator receives product until they confirm.

## Pages
- [Home](${u}/): outcome, how it works, proof, plans overview, guarantee, FAQ
- [Orbit Seeding Engine: plans and process](${u}/creator-seeding): plans, what's included, 60-day timeline, guarantees, comparison, FAQ
- [Case studies](${u}/case-studies): the Esther Formula program
- [About](${u}/about): point of view, founder, operating rules, team
- [Book a walkthrough](${u}/book): ${SITE.callLength} call, see the live tracker
- [Free Competitor Creator Audit](${u}/competitor-audit): free audit of the creators posting for a brand's top 3 competitors
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
