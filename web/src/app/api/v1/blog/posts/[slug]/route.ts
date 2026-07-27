import { getBlogPost } from '@/src/lib/public-api/content'
import { apiError, apiJson, API_VERSION, enforcePublicRateLimit, optionsResponse } from '@/src/lib/public-api/http'

export const dynamic = 'force-dynamic'

export async function GET(request: Request, context: RouteContext<'/api/v1/blog/posts/[slug]'>) {
  const rateLimitResponse = await enforcePublicRateLimit(request)
  if (rateLimitResponse) return rateLimitResponse

  const { slug } = await context.params
  const post = getBlogPost(slug)
  if (!post) return apiError(404, 'Blog post not found.')

  return apiJson({ data: post, meta: { version: API_VERSION } })
}

export const OPTIONS = optionsResponse
