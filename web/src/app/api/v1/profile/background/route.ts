import { getBackground } from '@/src/lib/public-api/content'
import { apiJson, API_VERSION, enforcePublicRateLimit, optionsResponse } from '@/src/lib/public-api/http'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const rateLimitResponse = await enforcePublicRateLimit(request)
  if (rateLimitResponse) return rateLimitResponse

  return apiJson({ data: getBackground(), meta: { version: API_VERSION } })
}

export const OPTIONS = optionsResponse
