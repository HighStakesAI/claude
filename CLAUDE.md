# High Stakes — working notes for Claude

## Business contact details (use these everywhere)

- **Email:** ben@histakesai.com — use this for all contact info, legal pages, forms, and accounts. Do not use any other address.
- **Phone:** (850) 943-2040 (`tel:8509432040`, schema `+18509432040`)
- **Location:** Pensacola, FL

## Where the site lives (hosting and domain)

Visitors reach the site through GoHighLevel, which wraps the Cloudflare site in an iframe:

```
histakesai.com  (A 162.159.140.166, GoHighLevel)
   └─ 301 redirect ─▶ www.histakesai.com  (CNAME sites.ludicrous.cloud, GoHighLevel)
                         └─ GHL page embeds an <iframe> ─▶ Cloudflare Worker "highstakesai"
                                                              └─ serves production-site/ from this repo
```

- **Domain:** histakesai.com was purchased through **GoHighLevel**. Its DNS is managed in GHL (Settings → Domains), not in our Cloudflare account. Nameservers are GHL's Cloudflare pair (`love`/`braden.ns.cloudflare.com`), so it does not appear in our Cloudflare dashboard.
- **Site code:** this repo (`HighStakesAI/claude`), folder `production-site/`. Static HTML/CSS/JS, no build step.
- **Hosting:** Cloudflare Worker `highstakesai` in the Ben@webdevs.info Cloudflare account. It builds and deploys automatically on every push to `main` (`npx wrangler deploy`, config in `wrangler.jsonc`).
- **What this means in practice:**
  - Design and content changes pushed here appear on histakesai.com automatically, through the iframe.
  - Anything that must be seen *on the domain itself* — Meta Pixel detection, Meta domain verification, Google indexing/SEO tags — does **not** count when it only exists inside the iframe. It has to go in GHL's site-level Head tracking code, or the domain has to be pointed directly at the Worker.
  - Direct deep links (e.g. an ad's privacy-policy URL) hit GHL first; confirm a URL loads by typing it directly, not by clicking inside the site.
- **Long-term fix (not done yet):** move histakesai.com's DNS into our Cloudflare account and attach `histakesai.com` + `www` to the Worker as Custom Domains. Carry over the email records first (SPF `v=spf1 include:spf.leadconnectorhq.com include:mailgun.org ~all`, plus any MX/DKIM in GHL) or GHL email sending breaks.
- `HighStakesAI/high-stakes-ai` holds a mirror of this site (`High Stakes AI production website/`). The Worker does **not** deploy from it — changes must land here to go live.

## Marketing and tracking

- **Meta Pixel:** `1971813787556582`, installed on every page of `production-site/` (inside the iframe). Do not change pixel or conversion events without the owner's explicit approval.
- **Meta domain verification code:** `gy9tuch3vipymwi4xz8usvlcf3nwll` (meta tag is on the homepage; for verification to pass it must also be in GHL's Head code or as a DNS TXT record in GHL).
- **Google Ads tag:** `AW-17881834711`; the contact form fires `generate_lead` on success.
- **Contact form:** posts to the GHL/LeadConnector webhook with fields name, email, phone, service, message, sms_consent.
- **Privacy policy URL for ads:** https://www.histakesai.com/privacy-policy (`/privacy` is an alias).

## Brand

- HSA Brand Guidelines v1.1 — Stakes Gold `#C9A84C` on Obsidian `#0E0F12`, Caladea Bold display + Poppins body/labels.

---

# High Stakes AI: agency work

## Clients

| Client | Hosting | Repo |
|---|---|---|
| The Golden Plumber | **GoHighLevel** (only GHL client) | `HighStakesAI/thegoldenplumber-audit` |
| everyone else | **Cloudflare** | — |

## Local SEO work

Read **`SEO-PROCESS.md`** before starting SEO work on any client. It covers the audit → fix →
baseline → deploy → wait → re-audit cycle, how to read Search Console's indexing reports, the
per-site checklist, and the GoHighLevel-specific mechanics.

## Standing rules

These came out of real mistakes, not hypotheticals:

1. **Verification must not share code with the fix.** A parser that wrote bad data also validated
   it as correct. Check through a different mechanism than the one that made the change.
2. **Never assert live-site facts from repo state.** The repo is not the deployed site.
3. **Sandbox network failures are not evidence about the target.** "I can't reach it" is not
   "it's broken."
4. **Match the artifact to the deployment target.** GHL needs self-contained files; a build with
   root-relative assets renders unstyled.
5. **Check for uncommitted work before destructive git commands.**
6. **Parse nested HTML with a depth counter, not a regex.**
7. **Don't guess third-party UIs.** Ask for a screenshot or look it up.
8. **Never invent data that gets published** — rankings, review text, ZIPs, coordinates. Leave it
   out and ask.

## Working preferences

- **After any change request:** log it with `highstakes-automation/reaudit/changes.py` (baseline, expected result, window), and if it needs Jonathan's browser, file it as a `browser-task` issue on highstakes-automation so the PC session does it. End the reply with: whether it was queued, what changed, expected impact, and when to expect it.
- **Google Business Profile edits:** if a client's profile isn't in Jonathan's Google account, switch the account (avatar, top right of business.google.com) to **Ben Byrer (byrerben@gmail.com)**. Ben manages most or all client profiles. Put that step in every extension prompt that edits a profile.
- Keep replies short. Lead with what they need to know or do; skip the reasoning unless asked.
- After shipping something that needs time to take effect, schedule a reminder and say the date.
- Deliver files via the repo (raw view → copy), not pasted into chat.
- Client-facing documents describe work done. They are not post-mortems — don't frame improvements
  as corrections of earlier mistakes.
