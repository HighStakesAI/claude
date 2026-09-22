# Local SEO process — High Stakes AI

Reusable playbook. Built on The Golden Plumber (Sept 2026), meant for every client.

## Hosting: know which one you're on

| | Where the site lives | Notes |
|---|---|---|
| **The Golden Plumber** | **GoHighLevel** | the only GHL client |
| **Everyone else** | **Cloudflare** | default |

This changes a lot of the mechanics. Details in the GHL section at the bottom.

---

## The cycle

1. **Audit** — find what's wrong
2. **Fix** everything that needs no client input
3. **Baseline snapshot** — before deploying. Skipping this is the mistake that cost us provable
   before/after on Golden Plumber
4. **Deploy**
5. **Submit + request indexing** in Search Console
6. **Wait 2–3 weeks** — re-auditing sooner just re-measures the old crawl
7. **Re-audit** against the baseline

Always schedule the follow-up reminder and tell the client the date.

---

## Google Search Console — the real diagnostic

Third-party tools guess; GSC is authoritative. BrightLocal told us the index count was 1. GSC said 5.

**Indexing → Pages** is the highest-value screen. Check the not-indexed reasons:

| Reason | Means | Do |
|---|---|---|
| **Discovered – currently not indexed** | Google knows the URL, has **never crawled it** (`Last crawled: N/A`) | URL Inspection → **Request Indexing**. This was Golden Plumber's entire ranking problem — 6 money pages never fetched |
| **Crawled – currently not indexed** | Fetched, then **declined** | Quality/duplication. Check it isn't legacy junk first — on GP all 6 were old test URLs and correctly ignored |
| **Page with redirect** | Normal for www/legacy | Ignore |
| **Not found (404)** | Real 404s | Fine, or fix if it's a live page |

**Also:** Sitemaps (submit), URL Inspection → **Test Live URL** (proves whether Google can actually render the page — settles bot-blocking questions), Performance → Queries (real positions, up to 16 months = your before/after data).

Use a **Domain** property, not URL-prefix, to catch www/http in one view.

---

## Checks worth running on every site

Found on one site; most are common defaults or agency shortcuts, so expect them again.

- [ ] **FAQ schema matches the visible FAQ** — mismatched markup is a Google policy violation. GP's published invented prices that appeared nowhere on the page
- [ ] **NAP identical everywhere** and matching the Google Business Profile — name, address, phone, hours, in visible text *and* schema
- [ ] **Hero video / large media** — `autoplay` defeats `preload="none"`, so it downloads regardless and competes with LCP
- [ ] **404 page is a real 404**, not the homepage. Homepage-as-404 = every unknown URL returns a soft 200 duplicate
- [ ] **Testimonials are real people** — invented ones attributed to named customers are a liability
- [ ] **Sitemap `lastmod` is current** — a stale date tells Google not to bother recrawling
- [ ] **Only one sitemap**; `robots.txt` points at it
- [ ] **`llms.txt` exists and is current** — feeds AI crawlers; the easiest file to forget
- [ ] **Forms** — fields required, known spam numbers blocked
- [ ] **Review counts consistent** across visible text, schema and any widget

---

## Off-site — usually the bigger lever

Once the site is clean, these matter more than anything left in the HTML:

- **Citations** — NAP on directories (Yellow Pages, MapQuest, Superpages, BBB, Chamber of Commerce,
  CitySquares, Hotfrog, Cylex, Manta, DexKnows). Consistency beats volume. **Audit existing listings
  before adding new ones** — especially after an address change, or you're adding contradictions
- **Review velocity** — volume and recency beat a perfect rating. GP has 5.0 and still loses to
  competitors with 900+ reviews at 4.8

---

## GoHighLevel specifics (Golden Plumber only)

- Pages are pasted as **self-contained HTML** — CSS and icons must be inlined. A build referencing
  `/site.css` at the domain root renders completely unstyled
- **Root URL** is set in Domain Settings → *Default Page*, not on the page itself. GHL rejects `/`
  as a page path outright
- Same screen sets the **404/Error Page**, **robots.txt** and **llms.txt** — all three live there
- **XML sitemap is generated**, not uploaded: Domain Settings → XML sitemap → tick pages →
  Generate & Save. Delete the `test_path?item=123` placeholder row before saving
- A **URL redirect will intercept** a native file — the `/llms.txt` → `/llms` redirect stopped GHL
  serving llms.txt at all
- Every content change touches **two files** (source and `dist/`), then rebuild `standalone/`

Cloudflare clients: none of the above. Normal static deploys, `_redirects`, real files at real paths.
