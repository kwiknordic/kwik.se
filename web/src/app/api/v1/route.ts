import { apiJson, API_VERSION, enforcePublicRateLimit, optionsResponse } from '@/src/lib/public-api/http'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const rateLimitResponse = await enforcePublicRateLimit(request)
  if (rateLimitResponse) return rateLimitResponse

  return apiJson({
    data: {
      version: API_VERSION,
      endpoints: {
        background: '/api/v1/profile/background',
        expertise: '/api/v1/expertise',
        projects: '/api/v1/projects',
        blogPosts: '/api/v1/blog/posts',
        tips: '/api/v1/tips/{movies|books|podcasts|articles}',
        openapi: '/api/v1/openapi.json',
      },
    },
    meta: { version: API_VERSION },
  })
}

export const OPTIONS = optionsResponse
