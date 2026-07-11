# Veranda Painting Co. — premium demo site

Static, no build step. Open `index.html` in a browser, or serve the folder from
any static host (Cloudflare Pages / Workers assets, Netlify, plain nginx).

Placeholder brand for the **first Meta-funnel client** (predicted niche:
painting contractor). Everything business-specific is centralized so
rebranding is a config edit, not a rebuild.

## Files

| File | Role |
|---|---|
| `index.html` | All 16 sections, custom SVG icon set, JSON-LD schema |
| `styles.css` | Design system — brand tokens live in the `:root` block at the top |
| `app.js` | `SITE_CONFIG` (data half of the brand) + all behavior (GSAP, sliders, form) |
| `fonts/`, `vendor/` | Self-hosted Inter + Playfair Display, GSAP + ScrollTrigger |

## Rebrand for the real client — checklist

1. **`app.js` → `SITE_CONFIG`** — name, owner, city/state/zip, address, phone
   (display + E.164), email, license numbers, rating/review count, years,
   `serviceAreas` array. Every `data-bind` element on the page hydrates from it.
2. **`app.js` → `WEBHOOK_URL`** — paste the client's GHL/LeadConnector inbound
   webhook. Uncomment the `fbq`/`gtag` lines in the submit handler once the
   Pixel/gtag snippets are installed in `index.html`.
3. **`styles.css` → `:root`** — swap `--accent` (and optionally `--brass`) to
   the client's palette. Nothing else in the CSS needs touching.
4. **Photos** — search `index.html` for `REPLACE` comments: hero, 3 before/after
   pairs, owner portrait, OG image. The hero, owner portrait, and the first two
   before/after pairs currently use **AI-generated placeholders** (Higgsfield
   `soul_2`; the "after" shots are same-angle `nano_banana_pro` repaint edits)
   hot-linked from Higgsfield's CDN, layered over `.ph` tone divs that show if
   an image fails to load. Before launch, replace every one with the client's
   real photos — download local copies rather than hot-linking, and never pass
   AI imagery off as real project work. The third slider (living room) is still
   a tone placeholder.
5. **`index.html` head** — title, meta description, canonical URL, OG tags, and
   the JSON-LD block (NAP must match `SITE_CONFIG`, plus real geo coordinates,
   hours, and FAQ answers verified against the client's actual pricing/warranty).
6. **Copy facts** — warranty length, on-time guarantee, stats band numbers, and
   testimonials must be replaced with the client's real, permissioned data
   before launch.

## If client #1 isn't a painter (runner-up niches)

The layout is niche-agnostic; only vocabulary and icons are painting-specific:

- **Landscaping:** services grid → Lawn Care / Landscape Design / Irrigation /
  Hardscapes / Tree Service / Sod & Turf; swap roller/brush/spray icons for
  leaf/mower/droplet equivalents in the `<defs>` block (same 24px grid, 1.5px
  stroke, `pathLength="80"` on every shape so the draw-in animation keeps
  working); before/after sliders become yard transformations; "walls" language
  in guarantee/FAQ becomes "beds/lawns".
- **Remodeling:** services → Kitchens / Baths / Flooring / Drywall / Trim &
  Doors / Painting; process step 1 becomes "design consult"; keep everything else.

## Notes

- Animations are fully disabled under `prefers-reduced-motion`, and the page is
  complete without JS (`no-js` class guards all hidden-by-default states).
- The FAQ section text and the FAQ JSON-LD in `<head>` must be kept in sync.
- Fonts and GSAP are self-hosted copies from `production-site/` — no CDN calls.
