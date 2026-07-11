# Premium Painting Contractor Website — Master Build Prompt

> Prediction basis: our Meta funnel targets home services owner-operators (EN + ES).
> Painting has the largest owner-operator pool, the least agency saturation, the
> strongest overlap with our Spanish ad set, and we already hold painting proof in
> the portfolio. First client is most likely a painting contractor; landscaping and
> remodeling are runners-up. This site is built for painting but fully re-skinnable
> via a single config object.

---

## THE PROMPT

Build a complete, production-ready, single-page marketing website for a **residential & commercial painting company**. This must feel like a $15,000 custom agency build — premium, editorial, confident — not a template. It will later be rebranded for a real client, so **every niche-specific value (name, colors, city, phone, services, testimonials, stats) must live in one `SITE_CONFIG` object / CSS custom-property block at the top of the code**. Swapping the business must never require touching layout code.

### Tech constraints
- Static site: semantic HTML + CSS + vanilla JS (GSAP + ScrollTrigger allowed for animation). No build step required to view it.
- Self-hosted fonts (no Google Fonts CDN in the critical path). Mobile-first, Lighthouse 90+ mindset: lazy-load all below-fold images, `prefers-reduced-motion` respected everywhere, no layout shift.
- SEO baked in: unique title/meta, Open Graph, `LocalBusiness` + `Service` JSON-LD schema with NAP, FAQ schema matching the FAQ section.
- Accessibility: real focus states, aria labels on interactive widgets, 4.5:1 contrast minimum, keyboard-operable slider and accordion.

### Brand direction (placeholder brand: "Veranda Painting Co.")
- **Palette:** warm off-white/ivory canvas (`#FAF8F4`), deep ink charcoal (`#16181D`) for text and dark sections, and ONE signature accent — a deep heritage green (`#1F4D3A`) with a muted brass/gold secondary (`#B08D57`) used only for micro-details (rules, icon strokes, hover states). No gradients-as-decoration, no purple, nothing that reads "SaaS."
- **Type:** editorial serif for display headlines (Playfair Display or Fraunces — large, tight leading, occasional *italic* accent word), clean grotesque sans (Inter) for UI and body. Uppercase letter-spaced eyebrow labels above every section heading.
- **Texture & depth:** subtle paper-grain overlay on light sections, generous whitespace, hairline 1px borders, large rounded-but-not-bubbly radii (12–16px), soft layered shadows only on elevated cards. Premium comes from restraint.

### Iconography
Hand-drawn-feel **custom inline SVG line icons** (1.5px stroke, consistent grid) — never emoji, never mixed icon sets. Set needed: roller, brush, spray gun, color swatch fan, tape & drop cloth, shield/warranty, sparkle/clean, calendar, clock, badge/license, star, map pin, phone, paint bucket, ladder. Icons animate: stroke draw-in (`stroke-dashoffset`) on scroll into view.

### Animation system (GSAP + ScrollTrigger)
- Global: elements rise 24–32px + fade on scroll entry, staggered 80ms within groups, 0.8s expo-out. Once, not scrub-jittery.
- Hero: cinematic load sequence — headline lines mask-reveal upward one by one, then subcopy, then CTAs, then trust chips (total < 1.6s).
- Signature moment: a thin "paint stroke" SVG line that draws itself alongside the process timeline as you scroll.
- Before/after slider: draggable divider with spring feel.
- Stats: count-up when in view. Buttons: subtle magnetic hover + arrow nudge. Section transitions light→dark: background color morph via ScrollTrigger.
- Everything disabled under `prefers-reduced-motion`.

### Sections (in order)

1. **Announcement bar** — thin, dark: "Now booking [Month] — 2 project slots left in [City]" + phone link.
2. **Sticky nav** — logo wordmark, 5 anchor links, phone number, solid CTA button ("Get My Free Estimate"). Transparent over hero → glass/blur + hairline border after scroll. Mobile: full-screen overlay menu with staggered link reveal + persistent bottom "Call Now" bar.
3. **Hero** — full-bleed photograph (freshly painted bright interior, natural light) with soft ivory scrim. Eyebrow: "Residential & Commercial Painting — [City], [State]". H1 with italic accent: "A flawless finish, *guaranteed*." Sub: crews, prep obsession, on-time promise. Dual CTA: primary "Get My Free Estimate", ghost "See Our Work ↓". Trust chip row: ★ 4.9 Google (238 reviews) · Licensed & Insured · 12+ Years · 2-Year Warranty.
4. **Social proof strip** — quiet marquee of badge logos: Google, BBB A+, Nextdoor Favorite, Angi Super Service, lead-safe EPA certified.
5. **Services grid** — 6 cards with the custom icons: Interior Painting, Exterior Painting, Cabinet Refinishing, Commercial, Drywall Repair & Texture, Staining & Sealing. Each: icon, 1-line promise, "Learn more →" hover state where the accent line under the card draws in.
6. **Before / After showcase** — section header "Proof, not promises." 3 draggable before/after sliders (kitchen cabinets, exterior curb appeal, interior living room) with project meta (scope · duration · city). Keyboard accessible.
7. **Process timeline** — "From estimate to walkthrough in 4 steps": 01 Free color consult & written quote (24h) → 02 Meticulous prep & protection → 03 Paint (background-checked crew, daily tidy) → 04 Final walkthrough + 2-year warranty. Vertical on mobile, horizontal on desktop, paint-stroke line draws through as you scroll.
8. **Why-us split section (dark)** — ink background, serif headline "Why homeowners choose [Name]". 4 differentiators with icons: 2-Year Written Warranty · Background-Checked W-2 Crews · Spotless Job Sites Daily · On-Time or We Pay You. Right side: portrait-style photo of the owner with a pull-quote signature block (humanizes the brand — critical for home services trust).
9. **Stats band** — count-up: 1,400+ Projects · 12 Years · 4.9★ Avg · 98% On-Time.
10. **Testimonials** — editorial layout: one large featured quote (serif, oversized quotation mark in brass) + carousel of Google-review-styled cards (avatar initial, 5 stars, date, neighborhood). Auto-advance, pause on hover, swipeable.
11. **Service area** — stylized map graphic or elegant list of 8–10 neighborhoods/suburbs as pill chips + "Don't see your area? Call us." (Local SEO section.)
12. **Guarantee band** — accent-green panel, shield icon, "The [Name] Promise": if you're not thrilled with any wall, we repaint it free. Financing available line.
13. **FAQ** — 6 questions (cost ranges, timeline, do I need to move furniture, paint brands used, insurance, warranty terms), smooth-height accordion, one open at a time.
14. **Final CTA + estimate form** — dark section, serif headline "Let's get you a straight answer and a fair price." **Multi-step form** (this converts — do not simplify to a flat form): Step 1 project type (icon radio cards) → Step 2 rooms/size + timeline → Step 3 name, phone, email, address. Progress indicator, one question block per step, big friendly buttons, success state with animated check + "We'll call you within 1 business hour." Wire submit to a placeholder `WEBHOOK_URL` const with the gtag/fbq event calls stubbed in.
15. **Footer** — 4 columns: brand + license #s, services links, service areas, contact NAP + hours. Hairline top border, tiny "Website by High Stakes AI" credit line, privacy/terms links.
16. **Mobile floating action** — persistent bottom bar on mobile only: "Call" + "Free Estimate" split buttons.

### Copy voice
Confident tradesman-craftsman, zero agency fluff. Short sentences. Specifics over adjectives ("We tape, mask, and sand — then we paint," not "quality you can trust"). Every section header pairs an uppercase eyebrow with a serif headline containing one italic accent word.

### Images
Use tasteful placeholder `<img>` tags with descriptive alt text and neutral solid-tone placeholders (or free stock references) — flagged clearly with `<!-- REPLACE -->` comments so real client photos drop in later.

### Deliverable
`index.html`, `styles.css`, `app.js` (+ short README listing exactly what to change in `SITE_CONFIG` to rebrand for the real client — including the runner-up scenario: relabeling services/icons for a landscaping or remodeling company).

---

## Re-skin plan for client #1
When the first client signs: edit `SITE_CONFIG` (name, city, phone, palette hue, services array, stats, testimonials), swap `<!-- REPLACE -->` images with their photos, update JSON-LD NAP, re-run through their actual license/warranty facts. Nothing structural changes.
