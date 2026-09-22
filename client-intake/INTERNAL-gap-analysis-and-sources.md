# INTERNAL — Why the intake form changed, and the sources behind it

Not for client eyes. Companion to `Universal-Client-Intake-Form.md`.

---

## 1. What the old form was, and what it was missing

The form in use through September 2026 (`Onboarding Brief` / `High Stakes AI Client
Brief.docx`, copied into Miller Heating & Cooling, Hemken Construction, Magnolia,
Northwest Florida Tree Care, and Lovelee Interiors) had 5 sections and roughly 35
questions. It was built as a *sales-qualification* document — budget, revenue, services
of interest — not as a *production* document.

That is the root cause of the follow-up emails. The old form told us whether to take the
client. It did not tell us enough to build anything.

### Concrete gaps, by consequence

| Missing from the old form | What it cost us |
|---|---|
| Any licensing question at all | Cannot legally publish a contractor site in FL (see §3 below). Chased by email every time. |
| Insurance / COI | No trust badges, no Local Services Ads eligibility. |
| Exact physical address | GBP verification blocked; NAP inconsistency across citations. |
| Storefront vs. service-area vs. hybrid | Wrong GBP setup → suspension risk. |
| Business hours, holiday hours | GBP left incomplete for weeks. |
| Domain registrar + who controls it | Discovered at launch, every time. Worst offender. |
| Email provider / MX | Risk of killing client email during DNS cutover. |
| Hosting + CMS + platform | Cannot scope a rebuild without it. |
| GBP ownership + verification state | We assumed "yes I have Google" meant claimed. It usually didn't. |
| GBP primary category | Strongest local ranking lever, never captured. |
| Duplicate/stale listings | Found late, after citations were already built. |
| Analytics / Search Console access | Baseline data lost; no before/after proof. |
| Prior SEO / backlink history | Inherited toxic links discovered months in. |
| Structured access-granting instructions | Clients emailed us passwords. Unacceptable. |
| Who else has access (old web guy) | The #1 way clients lose their assets. |
| Service list with pricing and avg. ticket | No basis for which service pages to build. |
| Review profile inventory | Reputation work started blind. |
| Photo/video rights and ownership | Copyright exposure on assets from prior agencies. |
| Approver + backup approver | Review cycles stalled on one unreachable person. |
| Lead routing + after-hours handling | Leads generated and then dropped. |
| Close rate / job value | No way to prove ROI. |
| Consent language / A2P 10DLC | Compliance risk on every texting automation. |

### What we deliberately kept from the old form

Sections 6, 11.5, 15.4, 15.7 and 15.9 carry over the parts that worked — the positioning
questions, the "where do customers come from" checklist, budget, the agency-baggage
question, and attribution. Miller's responses show those fields actually got filled in,
in detail. Don't lose them.

### What we dropped

- **"Approximate monthly revenue"** as a standalone question. It got a bare number
  ("8500") with no context, it makes clients defensive, and 12.7/12.8 (job value × close
  rate) give us the same economics with far better production value.
- The five-way "services requested" checkbox at the top. The new form scopes by section
  instead, which is what we actually needed.

---

## 2. Design decisions worth defending

**Two-stage structure.** Sections 1–13 and 15 are things only the client knows. Section 14
is access, which is a 15-minute screenshare, not a typing exercise. Do not let them
conflate the two — the access checklist is where onboarding actually dies.

**No passwords, ever.** Every platform in §14 supports delegated, revocable, role-scoped
access. Asking a client to type a password into a Word document they email to us is
indefensible on our side and a liability on theirs. The form now says so in bold twice.

**"DON'T KNOW" is an accepted answer.** Blanks are ambiguous — did they skip it or not know
it? An explicit "don't know" is a work item for us. This one change should cut follow-up
volume noticeably.

**[REQUIRED TO START] markers.** 12 fields. Everything else can arrive within 7 days.
Without this, a long form gets abandoned; with it, a client can unblock us in ten minutes
and finish the rest over the weekend.

**Honesty-forcing questions.** 4.10 (real speed-to-lead), 11.7 (can you staff the work),
15.6 (biggest fear). These predict churn better than anything in the old form.

**The blunt warnings are intentional.** 9.5 (domain control), 14.12 (former web guy),
11.9 (prior link building), 8.8 (photo rights). Each one is a real failure mode we have
hit or will hit. Clients respond to specifics, not to a polite "please provide access."

### Known trade-off

This form is roughly 4× the length of the old one. That is a real cost and we should watch
it. Mitigations already built in: required-field markers, N/A and DON'T KNOW as valid
answers, section-level skip instructions (§12), and the fact that §14 is a call, not
homework. **If completion rate drops, the fix is to run §§1–5 + 9.5 + 10.1 + 13.6 + 14 as
a guided kickoff call and let them fill the rest afterward — not to delete the questions.**

---

## 3. Sources — check these before anyone edits the form

Every factual claim in the client-facing form traces to one of these.

**Contractor license numbers in advertising (Section 2 of the form)**
Florida Statutes §489.119(5)(b): "The registration or certification number of each
contractor … shall appear in each offer of services, business proposal, bid, contract, or
advertisement, regardless of medium, as defined by board rule, used by that contractor or
business organization in the practice of contracting." The statute also provides for a
notice of noncompliance on first offense, and fines or a citation for failure to correct
within 30 days or for subsequent offenses. Business stationery and promotional novelties
are excluded from "advertisement"; a website is not.
→ https://www.flsenate.gov/laws/statutes/2024/489.119

Note: this is the Florida rule and most of our clients are in Florida panhandle counties.
Other states have comparable but not identical requirements — confirm per state before
promising a client the site is compliant.

**Google Business Profile — name, address, eligibility (Sections 1 and 3)**
Guidelines for representing your business on Google: a business must be represented as it
is consistently represented and recognized in the real world; P.O. boxes and mailboxes at
remote locations are not acceptable; a virtual office the business does not operate from
is not eligible; a co-working office qualifies only with clear signage, customers received
during business hours, and staffing by that business's own staff during those hours.
→ https://support.google.com/business/answer/3038177

**GBP categories (10.7)** — one primary category plus up to nine additional. Choose
categories describing what the business *is*, not what it *has*.
→ https://support.google.com/business/answer/7249669

**GBP service areas (3.4)** — up to 20 service areas, set by city, postal code, or region.
→ https://support.google.com/business/answer/9157481

**GBP access roles (14.1)** — Owner and Manager. Managers (formerly "site managers") have
nearly the same access as owners but cannot add or remove users or delete the profile.
Only owners can change roles or remove other users. Manager is the correct ask for us: it
is everything we need and nothing that lets us lock a client out.
→ https://support.google.com/business/answer/3403100

**Search Console permissions (14.2)** — Owner (verified or delegated), Full user, and
Restricted user. Only a property owner can add or remove users. Domain-property
verification uses a DNS TXT record that must stay in place after verification succeeds.
→ https://support.google.com/webmasters/answer/7687615
→ https://support.google.com/webmasters/answer/9008080

**Accessibility (9.18)** — WCAG 2.2 is the current W3C Recommendation (October 2023). The
DOJ's Title II final rule of 24 April 2024 incorporates WCAG 2.1 Level AA by reference for
state and local government entities; an interim final rule published 20 April 2026
extended the compliance dates to 26 April 2027 (population ≥ 50,000) and 26 April 2028
(population < 50,000 and special districts). **Title II covers public entities, not our
private-sector clients** — do not tell a contractor they are legally required to meet
WCAG. It matters to them only through public-sector contracts and commercial flow-down
requirements, which is exactly how 9.18 is worded.
→ https://www.w3.org/TR/WCAG22/
→ https://www.ada.gov/resources/2024-03-08-web-rule/
→ https://www.federalregister.gov/documents/2024/04/24/2024-07758/nondiscrimination-on-the-basis-of-disability-accessibility-of-web-information-and-services-of-state
→ https://www.federalregister.gov/documents/2026/04/20/2026-07663/extension-of-compliance-dates-for-nondiscrimination-on-the-basis-of-disability-accessibility-of-web

**Marketing calls and texts (13.1)** — 47 C.F.R. §64.1200 requires prior express written
consent for telemarketing calls and texts delivered by autodialer or prerecorded voice.
The written agreement must clearly and conspicuously disclose that the signer authorizes
such messages, and that signing is not a condition of purchase. A text sent by autodialer
is a "call" under the TCPA.
→ https://www.ecfr.gov/current/title-47/chapter-I/subchapter-B/part-64/subpart-L/section-64.1200

⚠️ **Do not reference the FCC's "one-to-one consent" amendment as current law.** It was
adopted in December 2023 and vacated by the Eleventh Circuit before taking effect. The
baseline written-consent requirement in §64.1200(f)(9) is what stands, and it is all the
form claims. If anyone rewrites 13.1, verify the current state of the rule first.

---

## 4. Maintenance

Re-verify the Google support pages every 6 months — GBP changes roles, category counts,
and service-area limits without notice, and the form quotes specific numbers (9 additional
categories, 20 service areas). Re-check the ADA compliance dates; they have already been
extended once.

Owner of this document: High Stakes AI. Last verified: 22 September 2026.
