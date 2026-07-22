import { getBlogPosts } from '@/src/lib/public-api/content'
import { apiJson, API_VERSION, enforcePublicRateLimit, optionsResponse } from '@/src/lib/public-api/http'
import { includesQuery, paginate, parseQuery } from '@/src/lib/public-api/query'
import { BlogPostsQuerySchema } from '@/src/lib/public-api/schemas'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const rateLimitResponse = await enforcePublicRateLimit(request)
  if (rateLimitResponse) return rateLimitResponse

  const query = parseQuery(BlogPostsQuerySchema, request)
  if (query instanceof Response) return query

  const posts = getBlogPosts().filter((post) =>
    includesQuery(post, query.q) && (!query.language || post.language === query.language),
  )

  return apiJson({ ...paginate(posts, query), meta: { version: API_VERSION } })
}

export const OPTIONS = optionsResponse
