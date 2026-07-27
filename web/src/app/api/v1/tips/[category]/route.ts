import { getPublicTips, isTipsCategory } from '@/src/lib/public-api/content'
import { apiError, apiJson, API_VERSION, enforcePublicRateLimit, optionsResponse } from '@/src/lib/public-api/http'
import { includesQuery, paginate, parseQuery } from '@/src/lib/public-api/query'
import { TipsQuerySchema } from '@/src/lib/public-api/schemas'

export const dynamic = 'force-dynamic'

export async function GET(request: Request, context: RouteContext<'/api/v1/tips/[category]'>) {
  const rateLimitResponse = await enforcePublicRateLimit(request)
  if (rateLimitResponse) return rateLimitResponse

  const { category } = await context.params
  if (!isTipsCategory(category)) return apiError(404, 'Tips category not found.')

  const query = parseQuery(TipsQuerySchema, request)
  if (query instanceof Response) return query

  const tips = (await getPublicTips(category)).filter((tip) => includesQuery(tip, query.q))

  return apiJson({
    ...paginate(tips, query),
    meta: { version: API_VERSION, category },
  })
}

export const OPTIONS = optionsResponse
