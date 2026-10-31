# Content still to add

The site is launch-safe: blocks that are still waiting for content are hidden, not shown as placeholders.
Fill a value in `src/data/site.ts` → `PENDING` and the block appears on the next build.

| Content | Where it appears once added | How to add it |
|---|---|---|
| Esther Formula testimonial (expected in 1 to 3 weeks) | Home → Results card; Case studies → full-width quote | `PENDING.estherTestimonial = { quote: '…', name: '…', title: '…' }` (get written permission to publish) |
| Founder story, 2 to 3 sentences | About → “Built from execution, not a pitch deck” | `PENDING.founderStory = '…'` |
| “The 100-Post Month” playbook PDF | Competitor Audit page → “Not ready to share your brand?” section with its own form | Attach the PDF to the MailerLite playbook email, then `PENDING.playbookReady = true` |
| MailerLite form links | All three forms | `FORMS` in `src/data/site.ts`. Until then, submitting opens the visitor's email app addressed to tayyab@influencerorbit.com with their details filled in, so no lead is lost |
| Analytics IDs (optional) | Every page | `ANALYTICS` in `src/data/site.ts` |
| War story 3 numbers (optional) | Case studies → war story 3 chips | VIP roster size, repeat collabs, posts used as ads; send them over and they replace the descriptive chips |

## Legal
The Privacy and Terms pages are plain-language templates. The on-page review notice has been removed for launch; get them reviewed when you can.

## Stand-ins
- **Sample tracker** (Home hero, Case studies): illustrative data, always labelled “Illustrative sample”.
- **Esther Formula logo**: made transparent from the JPG you sent. An SVG from the brand would be sharper.
- **Creator photos (12)**: cropped from your screenshots, photos only. Full-resolution originals would look sharper.
