import { getCloudflareContext } from '@opennextjs/cloudflare'

type RateLimitBinding = {
  limit: (options: { key: string }) => Promise<{ success: boolean }>
}

type PublicApiEnv = CloudflareEnv & { PUBLIC?: RateLimitBinding }

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Max-Age': '86400',
}

export const API_VERSION = 'v1'

export function optionsResponse(): Response {
  return new Response(null, { status: 204, headers: corsHeaders })
}

export function apiJson(data: unknown, init: ResponseInit = {}): Response {
  const headers = new Headers(init.headers)
  headers.set('Access-Control-Allow-Origin', '*')
  headers.set('Cache-Control', 'public, max-age=0, s-maxage=300, stale-while-revalidate=86400')

  return Response.json(data, { ...init, headers })
}

export function apiError(status: number, message: string): Response {
  return apiJson({ error: { status, message } }, { status })
}

async function hash(value: string): Promise<string> {
  const bytes = new TextEncoder().encode(value)
  const digest = await crypto.subtle.digest('SHA-256', bytes)
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('')
}

export async function enforcePublicRateLimit(request: Request): Promise<Response | undefined> {
  const { env } = await getCloudflareContext({ async: true })
  const limiter = (env as PublicApiEnv).PUBLIC

  // `next dev` may run without Wrangler's local bindings. Production always
  // has PUBLIC configured in wrangler.jsonc.
  if (!limiter) return undefined

  const forwardedFor = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
  const identity = request.headers.get('cf-connecting-ip') ?? forwardedFor ?? 'unknown-client'
  const key = await hash(`kwik-public-api:${identity}`)
  const { success } = await limiter.limit({ key })

  if (success) return undefined

  return apiJson(
    { error: { status: 429, message: 'Rate limit exceeded. Try again in one minute.' } },
    { status: 429, headers: { 'Retry-After': '60' } },
  )
}
