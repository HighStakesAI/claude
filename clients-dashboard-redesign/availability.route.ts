// Draft: app/src/routes/api/availability.ts
// Public, no-auth endpoint consumed cross-origin by the ad landing pages.
// Returns ONLY trade + city pairs. Never client names, contacts, or revenue.
// NOTE: adapt the DB-binding import to the repo's bindings.server.ts accessor
// and hand-register/regenerate routeTree.gen.ts (CI typechecks the committed tree).
import { createFileRoute } from '@tanstack/react-router'

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Cache-Control': 'no-store',
} as const

export const Route = createFileRoute('/api/availability')({
  server: {
    handlers: {
      GET: async () => {
        const { env } = await import('cloudflare:workers')
        const db = (env as { DB?: D1Database }).DB
        if (!db) {
          return Response.json({ taken: [] }, { headers: CORS_HEADERS })
        }
        const { results } = await db
          .prepare(
            'SELECT lower(c.trade) AS trade, lower(cl.city) AS city ' +
              'FROM clients c JOIN client_locations cl ON cl.client_id = c.id ' +
              'WHERE c.trade IS NOT NULL',
          )
          .all<{ trade: string; city: string }>()
        return Response.json({ taken: results }, { headers: CORS_HEADERS })
      },
      OPTIONS: async () => new Response(null, { status: 204, headers: CORS_HEADERS }),
    },
  },
})
