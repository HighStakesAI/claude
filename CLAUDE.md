# High Stakes AI

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
