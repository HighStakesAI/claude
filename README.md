# HighStakes.AI — Meta Funnel Pages

Bilingual (EN + ES) VSL funnel for Meta (Facebook/Instagram) cold traffic. Targets **home services business owners** (HVAC, plumbing, painting, roofing) and converts them into booked strategy calls.

---

## Funnel flow

```
Meta Ads (Cold Traffic)
├── English audience  →  landing-en.html  →  [form submit]  →  thankyou-en.html  →  histakesai.com
└── Spanish audience  →  landing-es.html  →  [form submit]  →  thankyou-es.html  →  histakesai.com

Non-converters on landing pages  →  Meta retargeting audience (via Pixel)
```

---

## Files

| File | Purpose |
|---|---|
| `landing-en.html` | English VSL landing page — leads fill form → scroll to calendar |
| `landing-es.html` | Spanish version (same structure, fully translated) |
| `thankyou-en.html` | English confirmation page — animated check, 3 next steps, 10-min countdown → histakesai.com |
| `thankyou-es.html` | Spanish confirmation page |

---

## Before you launch — required replacements

### 1. Meta Pixel
Uncomment the Pixel block in **all 4 files** and replace `YOUR_PIXEL_ID`:
```html
fbq('init','YOUR_PIXEL_ID');
```

### 2. VSL video
In both landing pages, set your YouTube video ID on the `vsl-wrap` element:
```html
<div class="vsl-wrap" id="vslWrap" data-type="youtube" data-id="YOUR_YOUTUBE_VIDEO_ID">
```
- For Vimeo: change `data-type="vimeo"` and set the Vimeo video ID
- Video auto-plays muted on load · tap-to-unmute button appears automatically

### 3. Testimonial videos
Set real YouTube IDs on each `.tvid` card:
```html
<div class="tvid" data-id="REAL_YOUTUBE_ID">
```

### 4. Calendar embed — done
Both landing pages now load the live Calendly inline widget for `https://calendly.com/byrerben/introcall` in the `#schedEmbed` container at the end of the booking step. It's initialized via `initCalendly()` (in the page `<script>`, near `CALENDLY_URL`) right after the lead submits the form, so the widget opens pre-filled with the lead's name and email.

The page also listens for the `calendly.event_scheduled` postMessage and redirects the visitor as soon as they book:
- English page → `thankyou-en.html`
- Spanish page → `thankyou-es.html`

As a backup, also set the same redirect in the Calendly event type's own **Confirmation Page** settings (Event type → Advanced → Confirmation Page), in case the visitor books from a context where postMessage isn't delivered.

If you ever swap to a different Calendly event or GoHighLevel instead, update `CALENDLY_URL` (or swap `initCalendly()` for a GHL booking iframe pointed at `#schedEmbed`).

### 5. CRM / webhook
In both landing pages, uncomment and fill the fetch call in the form submit handler:
```js
fetch('YOUR_WEBHOOK_URL', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
});
```
GoHighLevel inbound webhook URL works here directly.

### 6. Phone & email placeholders
Find and replace across all files:
| Find | Replace with |
|---|---|
| `(555) 123-4567` | Real phone / call-tracking number |
| `+15551234567` | Same, digits only |
| `hello@histakesai.com` | Real email |

### 7. Stats & testimonials
Replace placeholder numbers and names with real data:
- `4.9`, `120+`, `38,000+` → your real numbers
- Mike R. / Carlos D. / Jenna P. → real client quotes (with permission)

---

## Conversion tracking setup (recommended)

Add these events in addition to the base Pixel PageView:

| Page | Event | Where |
|---|---|---|
| `landing-en/es` | `Lead` | Form submit handler (already commented in) |
| `landing-en/es` | `trackCustom('VSLUnmute')` | Unmute button click (commented in) |
| `thankyou-en/es` | `Schedule` | Already in Pixel block — fires on page load |

---

## Deployment

Drop the entire folder on any static host — no build step needed.

- **Netlify / Cloudflare Pages / Vercel:** drag the folder or connect a Git repo
- **Your own server:** upload all 4 HTML files to the same directory

Keep all 4 files in the same folder so relative links (`thankyou-en.html`, `landing-es.html`) resolve correctly.

---

## Meta Ads setup

- Run separate ad sets for EN and ES audiences (language targeting in Meta)
- Set the landing page URL for each ad set accordingly
- Use **Broad + Interest** audiences for cold traffic; retarget **Landing Page Views** who didn't submit
- Recommended video formats: 9:16 (Stories/Reels) and 1:1 (Feed) — same VSL, different crops
