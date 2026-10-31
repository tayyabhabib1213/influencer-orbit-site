# SEO table

| Page | URL | Title (≤60) | Meta description (≤155) | H1 | Primary keyword | Supporting keywords |
|---|---|---|---|---|---|---|
| Home | `/` | Creator Seeding for Beauty Brands · Influencer Orbit (52) | Beauty influencer marketing agency: 50 to 150+ real creator posts a month for US skincare brands, guaranteed by day 60. Done for you. (133) | We help US skincare and beauty brands get 50 to 150+ real creator posts every month, guaranteed by day 60, without hiring an influencer team. | beauty influencer marketing agency | skincare influencer marketing agency, creator seeding for DTC brands, what is product seeding |
| Seeding Engine | `/creator-seeding` | Product Seeding Agency: Pricing & Process · Influencer Orbit (60) | Done-for-you creator seeding from $1,500/month. 60-day pilot, post-count guarantee by day 60, and you own every creator relationship. (133) | 50 to 150+ real creator posts every month, without hiring an influencer team. | product seeding agency | gifted influencer campaigns, influencer seeding cost, UGC for beauty brands, Spark Ads |
| Case studies | `/case-studies` | Esther Formula Case Study · 2,000+ Creator Collabs (50) | Skincare influencer marketing case study: 50 to 200 creator posts a month for Esther Formula since January 2024, with no in-house influencer manager. (149) | One beauty brand. [n] months. 2,000+ creator collaborations. | skincare influencer marketing case study | Esther Formula creators, creator seeding results |
| About | `/about` | About Influencer Orbit · The Creator Seeding Operation (54) | Not an influencer agency. A confirm-first creator seeding operation built only for US beauty brands, founded by Tayyab Habib. (125) | We’re not an influencer agency. We’re a creator seeding operation. | Influencer Orbit | Tayyab Habib, creator seeding operation |
| Book | `/book` | Book a Walkthrough · Influencer Orbit (37) | See the live tracker and a real monthly report in 20 minutes, before you commit. Creator seeding for US skincare and beauty brands. (131) | See the live tracker before you commit to anything. | Influencer Orbit walkthrough (brand) | book influencer marketing call |
| Lead magnet | `/competitor-audit` | Free Competitor Creator Audit for Beauty Brands (47) | See which creators post for your top 3 competitors, which hooks win, and your TikTok search gap. Free for US beauty brands doing $500K+. (136) | See exactly which creators are posting for your top 3 competitors. | competitor influencer analysis | TikTok creator audit for beauty brands |
| Privacy | `/privacy` | Privacy Policy · Influencer Orbit (33) | How Influencer Orbit collects, uses and protects the information you share through our website, forms and booking calendar. (123) | Privacy policy | — | — |
| Terms | `/terms` | Terms of Use · Influencer Orbit (31) | The terms that apply when you use the Influencer Orbit website, free audit and downloads. (89) | Terms of use | — | — |
| 404 | (any missing URL) | Page not found · Influencer Orbit | — (noindex) | This post never went live. | — | — |

Targeting: United States, no city pages. Keyword volumes were not measured; check them in Google Search Console after 4 to 6 weeks of data and adjust titles.

## Schema by page

| Page | JSON-LD |
|---|---|
| Every page | Organization + ProfessionalService (with sameAs LinkedIn and Instagram), WebSite |
| Home | FAQPage, Person (founder), Service ×3 with Offer and price |
| Seeding Engine | BreadcrumbList, FAQPage, Service ×3 with Offer and price |
| Case studies | BreadcrumbList, FAQPage, Article (author: Tayyab Habib) |
| About | BreadcrumbList, Person |
| Book, Audit, Privacy, Terms | BreadcrumbList |

No Review or AggregateRating markup: Google ignores star ratings a business publishes about itself and may treat them as spam.

## AEO / GEO features

- Question-led FAQs on Home, Seeding Engine and Case studies, each answer leading with the direct answer.
- “What is product seeding?” definition block on Home.
- The same “About Influencer Orbit” fact block in every footer (`ABOUT_FACT` in `schema.ts`), also used in Organization schema and `llms.txt`.
- `/llms.txt` summarising the business, offer, proof and pages.
- `robots.txt` allows GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, Claude-User, PerplexityBot, Perplexity-User, Google-Extended, Applebot-Extended, CCBot and Bingbot.
- Internal links: Home → Seeding Engine (process, pricing, FAQ, comparison), Case studies, Book, Audit; every page → Book; Case studies ↔ Seeding Engine.
