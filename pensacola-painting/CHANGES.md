# Professional Painting Services — rebuilt site

Static rebuild of propaintingpensacola's React SPA. Same brand (red, Oswald +
Inter, client's own photos), zero build step — drop the folder on any static
host. All content is now real HTML (crawlable), the JS bundle went from
~350 KB of React to ~9 KB of vanilla JS, and every gap from the audit is
addressed.

## What changed vs. the live site

**Tracking (was: none)**
- Meta Pixel + Google tag bootstrap in `app.js` — activates when `PIXEL_ID` /
  `GA_ID` are filled in `SITE_CONFIG`; until then events are console-logged.
- `fbq('track','Lead')` + `gtag generate_lead` fire on BOTH form submits.
- `fbq('trackCustom','PhoneClick')` on every phone link.
- UTM/fbclid/gclid captured from the URL (persisted per session) and included
  in every GHL webhook payload for campaign attribution.

**SEO (was: empty body, no schema)**
- Full pre-rendered HTML — every word visible to crawlers with JS disabled.
- `HousePainter` LocalBusiness JSON-LD (NAP, hours, areas, service catalog)
  + `FAQPage` JSON-LD synced to the visible FAQ.
- Open Graph/Twitter tags, canonical, favicon, robots.txt, sitemap.xml.
- Keyword-bearing alt text and width/height on all images (no layout shift).

**Conversion**
- 3-second popup replaced with exit-intent (desktop) / 45 s or 60 % scroll
  (mobile), once per session, name + phone only.
- Main form is now 3 steps (service → timeline + zip → contact) with progress
  bar and animated success state. Posts to the same live GHL webhook.
- Hero CTA is a real `tel:` link labeled with the number.
- New testimonials section (sample copy — see REPLACE list).
- New guarantee band featuring the 2-year workmanship warranty + license slot.
- Privacy policy and terms pages exist and are linked from both forms
  (required for Meta lead ads compliance).

**Performance**
- Self-hosted Oswald + Inter woff2 (Google Fonts CDN removed).
- Hero image preloaded; everything below the fold lazy-loaded.
- Google Map deferred: loads on scroll-near or tap.
- No React/framer-motion; animations are CSS/WAAPI and fully disabled under
  `prefers-reduced-motion`. Decorative blur-blob loops removed.

**Accessibility**
- Visible focus styles everywhere; `aria-expanded` on FAQ; ARIA slider with
  keyboard support on the before/after; labels on all icon buttons.
- Side-dot mobile nav removed — one bottom call/estimate bar + back-to-top.

## REPLACE checklist (before launch)

| Where | What |
|---|---|
| `app.js` → `SITE_CONFIG.PIXEL_ID` | Real Meta Pixel ID (events are console-only until set) |
| `app.js` → `SITE_CONFIG.GA_ID` | Google tag ID, if used |
| `index.html` head + `sitemap.xml` + `robots.txt` | Real domain (search for `propaintingpensacola.example.com`) |
| `index.html` guarantee band + footer | Real FL license number (search `REPLACE-LICENSE-NUMBER`) |
| `index.html` reviews section | Client's real Google reviews, with permission; keep schema `aggregateRating` honest |
| `index.html` about section | Real crew photo replacing the Unsplash stock image |
| `index.html` footer + schema `sameAs` | Real Facebook page URL |
| `index.html` portfolio | Two more before/after pairs when photos exist |
| `privacy.html` / `terms.html` | Set the "Last updated" date; have the client read them once |

## Notes
- Images are hot-linked from the client's existing GHL media library
  (assets.cdn.filesafe.space) — same source the live site uses. If the site
  moves off GHL, download local copies.
- The old site's single before/after pair is kept; the slider supports adding
  more `.ba` blocks without JS changes.
