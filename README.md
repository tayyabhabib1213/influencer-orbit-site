# Influencer Orbit website

Static marketing site for Influencer Orbit, built with [Astro](https://astro.build) 5. It ships plain HTML and CSS with one small script (about 3 KB), so it is fast by default and easy to host anywhere.

## Run it

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # outputs the static site to dist/
npm run check:links  # QA: titles, descriptions, headings, images, links, anchors, JSON-LD
```

Node 18.17+ (Node 20 or 22 recommended).

## Where things live

| Path | What |
|---|---|
| `src/data/site.ts` | **Edit this first.** Contact details, Calendly link, proof numbers, pricing tiers, form endpoints, analytics IDs, nav |
| `src/data/content.ts` | Creator images, Fiverr reviews, FAQs, comparison table |
| `src/data/schema.ts` | JSON-LD (Organization, ProfessionalService, WebSite, Person, Service ×3, FAQPage, BreadcrumbList, Article) and the “About Influencer Orbit” fact block |
| `src/data/icons.ts` | Lucide UI icons (1.75 stroke) and Simple Icons platform logos |
| `src/styles/tokens.css` | Design tokens (colour, type, spacing, radius, shadow). Mirrors the Influencer Orbit design system |
| `src/styles/global.css` | All component and page styles |
| `src/scripts/main.ts` | Sticky header, mobile menu, mobile sticky CTA, reveal on scroll, form submit, Calendly lazy-load, CTA tracking |
| `src/components/` | Header, Footer, Tracker, StatBar, ReviewCard, Faq, CreatorGrid, CtaButtons, FinalCta, Breadcrumbs, Icon, Brand |
| `src/pages/` | One file per page, plus `sitemap.xml.ts` and `llms.txt.ts` (generated from `site.ts` so they never drift) |
| `public/` | Fonts, images, favicons, `robots.txt`, `_redirects`, `_headers`, `site.webmanifest` |
| `docs/` | SEO table, placeholders, copy changes, launch checklist, QA report |

## Deploy to Hostinger (current setup)

1. `npm run build`, then zip the **contents** of `dist/` (including the hidden `.htaccess` files), or use the ready-made `influencer-orbit-public_html.zip`.
2. Hostinger → Websites → influencerorbit.com → File Manager → `public_html`.
3. Back up what's there (select all → Compress → download the archive), then delete the old files.
4. Upload the zip into `public_html` and Extract it there, so `index.html` sits directly inside `public_html`.
5. Hostinger → Security → SSL: make sure SSL is active for `influencerorbit.com` and `www.influencerorbit.com`.

`public/.htaccess` handles https + www, clean URLs (`/about` serves `about.html`), old-URL redirects, the 404 page, compression, caching and security headers. It was tested on Apache.

## Forms (public/api/lead.php)

All three forms post to `/api/lead.php`, which works as soon as it's uploaded:
- emails each lead to `tayyab@influencerorbit.com` (Reply-To is the visitor),
- appends it to `io-leads.csv` one folder above `public_html` (not reachable from the web),
- blocks spam (honeypot, 3-second minimum, 5 per IP per 10 minutes, same-site only),
- if the server can't be reached, the visitor's email app opens with their details instead, so no lead is lost.

**Connect MailerLite:** MailerLite → Integrations → API → Generate new token. In File Manager, copy `public_html/api/config.sample.php` to `config.php` in the same folder and paste the token into `MAILERLITE_API_KEY`. On the first lead of each type the handler creates the groups `Audit requests`, `Playbook downloads` and `Website enquiries` and the custom fields it needs. Build your MailerLite automations with “joins group” as the trigger. Failures are logged to `io-mailerlite-errors.log` next to the CSV.

## Alternative host: Cloudflare Pages

Build command `npm run build`, output `dist`, `NODE_VERSION=20`. `public/_redirects` and `public/_headers` cover redirects and headers there. The PHP form handler does not run on Cloudflare; point `FORMS` at MailerLite embedded-form URLs instead.

## Calendly

The booking page embeds `SITE.calendly` (the 20-minute event). In Calendly add the three booking questions from the copy deck: brand website, creator posts per month now, who runs seeding today.

## Analytics

Fill `ANALYTICS.ga4`, `metaPixel` and `linkedinPartnerId` in `site.ts`. Each loads only when its ID is set. Every CTA carries `data-cta="…"`, sent to GA4 as a `cta_click` event; form submits send `generate_lead` (GA4) and `Lead` (Meta).

## Monthly upkeep

The Esther Formula month count is calculated from January 2024 at build time and refreshed in the browser, so it never goes stale. Rebuild at least monthly so `sitemap.xml` and `llms.txt` stay current (a Cloudflare deploy hook on a schedule works).
