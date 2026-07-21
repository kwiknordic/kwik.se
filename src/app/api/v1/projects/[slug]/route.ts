import { getProjectBySlug } from '@/src/lib/public-api/content'
import { apiError, apiJson, API_VERSION, enforcePublicRateLimit, optionsResponse } from '@/src/lib/public-api/http'

export const dynamic = 'force-dynamic'

export async function GET(request: Request, context: RouteContext<'/api/v1/projects/[slug]'>) {
  const rateLimitResponse = await enforcePublicRateLimit(request)
  if (rateLimitResponse) return rateLimitResponse

  const { slug } = await context.params
  const project = getProjectBySlug(slug)
  if (!project) return apiError(404, 'Project not found.')

  return apiJson({ data: project, meta: { version: API_VERSION } })
}

export const OPTIONS = optionsResponse
