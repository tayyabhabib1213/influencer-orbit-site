# Launch checklist (Hostinger)

## Go live
- [ ] Back up the current `public_html` (File Manager → select all → Compress → Download)
- [ ] Delete the old files, upload `influencer-orbit-public_html.zip` into `public_html`, Extract
- [ ] SSL active for influencerorbit.com and www (Hostinger → Security → SSL)
- [ ] Change the FTP password (it was shared in chat)
- [ ] If the old site still shows: the domain is linked to Hostinger Website Builder; disconnect it there

## Check the live site
- [ ] `influencerorbit.com` redirects to `https://www.influencerorbit.com/`
- [ ] Every nav link works; `/services` → `/creator-seeding`; a made-up URL shows the 404 page
- [ ] Submit the contact form with your own email → the lead email arrives at tayyab@influencerorbit.com (check spam the first time and mark “not spam”)
- [ ] Book and cancel a test slot from `/book` on desktop and phone

## Connect
- [ ] MailerLite token → `public_html/api/config.php` (copy from `config.sample.php`)
- [ ] Submit one test lead per form → the three groups appear in MailerLite
- [ ] Build automations: Audit requests (5 emails), Playbook downloads (3 emails) from the copy deck
- [ ] Calendly: add the 3 booking questions; set the confirmation redirect to `https://www.influencerorbit.com/thank-you` if you want booking conversions tracked
- [ ] Google Search Console: add `https://www.influencerorbit.com`, verify, submit `/sitemap.xml`
- [ ] Bing Webmaster Tools: import from Search Console
- [ ] GA4 / Meta Pixel / LinkedIn Insight: paste IDs into `src/data/site.ts`, rebuild, re-upload
- [ ] Rich Results Test on Home, Seeding Engine, Case studies
- [ ] PageSpeed Insights (mobile): LCP < 2.5 s, CLS < 0.1, INP < 200 ms

## Later
- [ ] Esther testimonial → `PENDING.estherTestimonial`, rebuild, re-upload the changed HTML files
- [ ] Founder story → `PENDING.founderStory`
- [ ] Playbook PDF → attach in MailerLite, then `PENDING.playbookReady = true`
- [ ] Rebuild monthly so the sitemap and llms.txt stay current
