# QA report (build of 31 Oct 2026)

| Check | How | Result |
|---|---|---|
| Titles ≤ 60, descriptions ≤ 155, one unique pair per page | `scripts/check-links.mjs` | Pass (longest title 60, longest description 149) |
| Exactly one H1 per page, no skipped heading levels | same script | Pass on all 9 pages |
| Internal links and `#anchors` resolve | same script | Pass (0 broken) |
| Images have alt text, width and height; files exist | same script | Pass |
| JSON-LD parses on every page | same script | Pass. Run Google’s Rich Results Test after launch for eligibility |
| WCAG 2.2 AA (automated) | axe-core 4, all pages at 1440px and 390px | 0 violations after fixes (added a label to the platform icon group, made the tracker table keyboard-scrollable) |
| Colour contrast of the palette | manual calculation | Body text ≥ 7:1, navy on white 11.6:1; orange only at 24px+ or on dark |
| Horizontal overflow | Playwright at 360, 390, 768, 1024, 1440 | None on any page |
| Desktop nav at mid widths | screenshots | Fixed: full nav from 1200px, button + menu below |
| Core Web Vitals (local, mobile viewport) | Playwright PerformanceObserver | LCP 0.18 s (the H1), CLS 0.003, 2.6 KB of JavaScript, home HTML 22 KB gzipped. Re-measure on the live domain with PageSpeed Insights |
| Reduced motion | CSS | Reveal animation, smooth scroll and sticky-bar slide are off when the visitor asks for reduced motion |
| Invented claims | manual read of every page against the brief’s proof points | Only approved numbers appear. The sample tracker is labelled as a sample. Market figures are from your copy; see sources and flags in `COPY-CHANGES.md` |
| CTAs | manual | Primary CTA in the header (sticky), hero, after “Who it’s for”, guarantee, founder block and final CTA; mobile sticky bottom bar after the hero. Every primary CTA goes to `/book` |
| Forms | manual, without MailerLite configured | Required fields validate; honeypot field present; thank-you panel shows and takes focus |

## Not testable here
- Calendly embed loads (blocked in this environment); test on the live domain
- MailerLite submission (needs your form URLs)
- Real-device Safari rendering
