import { fetchCachedLatestPodcastFile } from '@/src/lib/podcasts'
import {
  apiError,
  apiJson,
  API_VERSION,
  enforcePublicRateLimit,
  optionsResponse,
} from '@/src/lib/public-api/http'
import { includesQuery, paginate, parseQuery } from '@/src/lib/public-api/query'
import { TipsQuerySchema } from '@/src/lib/public-api/schemas'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const rateLimitResponse = await enforcePublicRateLimit(request)
  if (rateLimitResponse) return rateLimitResponse

  const query = parseQuery(TipsQuerySchema, request)
  if (query instanceof Response) return query

  try {
    const latest = await fetchCachedLatestPodcastFile()
    const data = latest.data
      .filter((podcast) => {
        return includesQuery(podcast, query.q)
      })
      .map((podcast) => {
        const { id, podcastTitle, title, audioUrl } = podcast
        return { id, podcastTitle, title, audioUrl }
      })

    return apiJson({
      ...paginate(data, query),
      modifiedAt: latest.modifiedAt,
      meta: { version: API_VERSION, category: 'podcasts' },
    })
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Latest podcast file could not be read.'
    return apiError(404, message)
  }
}

export const OPTIONS = optionsResponse
