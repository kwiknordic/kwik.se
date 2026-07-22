import { getProjects } from '@/src/lib/public-api/content'
import { apiJson, API_VERSION, enforcePublicRateLimit, optionsResponse } from '@/src/lib/public-api/http'
import { includesQuery, paginate, parseQuery } from '@/src/lib/public-api/query'
import { ProjectsQuerySchema } from '@/src/lib/public-api/schemas'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const rateLimitResponse = await enforcePublicRateLimit(request)
  if (rateLimitResponse) return rateLimitResponse

  const query = parseQuery(ProjectsQuerySchema, request)
  if (query instanceof Response) return query

  const tool = query.tool?.toLocaleLowerCase()
  const projects = getProjects().filter((project) =>
    includesQuery(project, query.q) && (!tool || project.tools.some((item) => item.toLocaleLowerCase() === tool)),
  )

  return apiJson({ ...paginate(projects, query), meta: { version: API_VERSION } })
}

export const OPTIONS = optionsResponse
