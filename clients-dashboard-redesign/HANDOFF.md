# Clients Dashboard Redesign: working handoff

Status as of 2026-07-12: the plan below is user-approved ("go ahead"), but the
session that produced it could not reach the app's code because the cloud
environment's network policy blocks the Higgsfield hosts. Everything needed to
execute is captured here so any session (this one after unblock, or a fresh
one) can proceed immediately.

## Target

- App: clients dashboard at https://peach-koi-985.higgsfield.app
- Higgsfield website_id: `93144181-61c4-4d9d-9e8f-69d6b65df212`
- Code access: `mcp__Higgsfield__website_repo_access` returns repo URL + scoped
  token; clone, edit, push to its `main`, then `mcp__Higgsfield__deploy_website`.
- Git host that MUST be network-allowed: `apps-repos.higgsfield.ai`.
  Live-app host for end-to-end verification: `*.higgsfield.app`.

## Production data audit (read via website_db, 2026-07-12)

Tables: `clients`, `client_locations`, `revenue_entries`, `subscriptions`.

- clients (3): 1 The Golden Plumber / Cade Howell / "Pensacola, FL";
  2 Professional Painting Services / Weston Guice / "Pensacola, FL";
  3 Built By Deel / Logan Deel / "Molino, FL". Columns: id, company, contact,
  created_at, location (legacy free text). NO trade column yet.
- client_locations (22): client 1 has 10 cities (Pensacola, East Pensacola
  Heights, Ferry Pass, Cantonment, Bellview, Brent, West Pensacola, Ensley,
  Pace, Midway); client 2 has 11 (Pensacola, Gulf Breeze, Pensacola Beach,
  Navarre, Navarre Beach, Crestview, Fort Walton Beach, Cantonment, Molino,
  Milton, Pace); client 3 has 1 (Molino). Cities stored capitalized.
- revenue_entries (5): client 1: Website $97 (prepaid via bundle),
  Automations $47 (bundled full-year prepay $1,728 collected, paid through
  2026-09-14), SEO $200 (bills monthly); clients 2 and 3: Website + Basic SEO
  $97 each ($1,000 package, $1,097 collected each). Nominal total MRR $538.
  Notes column carries real business context; surface it in the UI.
- subscriptions (6): the agency expense ledger. Highlevel $297 + Claude $100
  are the only non-zero amounts, so monthly expenses $397; net monthly $141.
  Others: Webflow, Figma, Client Photographer, Vista Print (0 or null).
- Foreign keys use ON DELETE CASCADE: deleting a client removes its locations
  and revenue entries. Delete confirms in the UI must state the cascade counts.

Do NOT delete or overwrite existing rows beyond the trade backfill below.

## Approved plan (user approved 2026-07-12)

1. Overview strip: animated count-up stat tiles for Total MRR, client count,
   monthly expenses, net monthly; secondary line for collected-to-date and
   next prepay expiry.
2. Card sections: Clients, Locations, Revenue/MRR, Expenses (subscriptions
   grouped by department with monthly total), Subscriptions. Desktop
   two-column grid, phone single column with sticky pill-tab section nav.
3. Client cards as hub: company, contact, trade chip, per-client MRR rollup,
   inline city chips.
4. OxygenOS-inspired tokens: 8pt spacing, 16-20px radius cards, soft layered
   shadows, large light numerals, one accent color, light/dark via
   prefers-color-scheme. (Avoid the platform-banned palette families: dark +
   orange/amber, dark + neon cyan/green, beige + brass, AI purple.)
5. Motion: transform/opacity only, 150-250ms ease-out, hover lift, press
   scale, FLIP list add/remove, count-ups via requestAnimationFrame,
   prefers-reduced-motion fallbacks everywhere (platform-mandated).
6. One-tap add: inline chip input for cities; modal (desktop) / bottom sheet
   (phone) for clients, revenue, subscriptions; optimistic UI.
7. Two-step delete with cascade counts spelled out.
8. Revenue cards show MRR badge, paid-through indicator, expandable notes.
9. `trade` column + dropdown with EXACTLY these lowercase keys: hvac,
   plumbing, painting, roofing, electrical, landscaping, construction, other.
   Backfill: The Golden Plumber = plumbing, Professional Painting Services =
   painting, Built By Deel = construction.
10. Public GET /api/availability, no auth, `Access-Control-Allow-Origin: *`,
    body EXACTLY `{"taken":[{"trade":"plumbing","city":"pensacola"}, ...]}`
    from `SELECT lower(c.trade) AS trade, lower(cl.city) AS city FROM clients
    c JOIN client_locations cl ON cl.client_id = c.id WHERE c.trade IS NOT
    NULL;`. Never expose names, contacts, or revenue. Ad landing pages
    already poll this exact URL and shape.
11. Retire legacy clients.location free-text from the UI; keep the column and
    its data untouched.
12. Fully responsive; verify add/delete flows and the endpoint (JSON + CORS)
    end to end; deploy with deploy_website; report the live URL.

## Platform conventions (from get_website_creation_instructions bundle)

- Stack: React 19 + TanStack Start SSR on one Cloudflare Worker; project in
  `app/`; bun toolchain; Tailwind v4 in `app/src/styles.css`.
- Routes: file-based under `app/src/routes/`; API endpoints are TanStack
  server routes under `app/src/routes/api/**` (no Hono/Express).
- `app/src/routeTree.gen.ts` is generated. CI typechecks the COMMITTED tree,
  so after adding a route either run `bun run dev`/`build` to regenerate and
  commit it, or hand-register the route exactly mirroring an existing one.
- D1 binding `env.DB` via `app/src/lib/bindings.server.ts`; infra declared in
  `app/app.manifest.json` ("db": true). wrangler.jsonc is build/dev input only.
- Migrations: `app/migrations/000N_*.sql`, additive only; the platform CI
  applies them against LIVE production data at deploy. One DB, no staging.
- Every response passes through `applySecurityHeaders()` in `app/src/server.ts`
  (it adds headers, so per-route CORS headers survive). Never set
  X-Frame-Options; keep the CSP frame-ancestors allowlist intact.
- Worker rules: no module-level mutable state, crypto.randomUUID not
  Math.random on server, parameterized `.bind()` for every query, validate
  all createServerFn inputs, no secrets in props.
- SSR safety: no window/document/localStorage at module top or during render.
- Craft gates: no em/en dashes in visible copy, one accent color, h-dvh not
  h-screen, :active tactile feedback, no placeholders at ship time.
- deploy_website ships live immediately (no preview stage). Do not run
  bun install/build reflexively; CI builds on deploy. Do NOT call
  publish_website (that lists on the community feed; user did not ask).

## Staged artifacts (this directory)

- `migration_add_trade.sql`: the additive trade migration + 3-row backfill.
  Copy into `app/migrations/` with the next 000N prefix.
- `availability.route.ts`: draft for `app/src/routes/api/availability.ts`.
  Adapt the DB access to the repo's actual bindings accessor and register the
  route in routeTree.gen.ts.

## Execution checklist

1. Verify `curl -sS https://apps-repos.higgsfield.ai/` does not 403 at the
   proxy; if it does, the environment still lacks the allowlist entries.
2. website_repo_access -> clone -> read the whole codebase (audit against the
   plan; adjust and note deviations).
3. Implement plan items 1-11 plus the migration and endpoint.
4. Regenerate or hand-register routeTree.gen.ts; run bun typecheck if quick.
5. Commit + push to the Higgsfield repo main; deploy_website; poll
   website_status if pending.
6. Verify live: availability endpoint JSON shape + CORS header (curl -i and
   an Origin-header request), add/delete flows in the UI, responsive layout,
   trade backfill via website_db (read-only check of the three rows).
7. Report live URL + what changed + verification evidence.
