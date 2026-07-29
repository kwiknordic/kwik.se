import { getCloudflareContext } from '@opennextjs/cloudflare'
import { unstable_cache } from 'next/cache'

export const PODCAST_OBJECT_PREFIX = 'transform/overcast/'

export type RawPodcast = {
  id: string
  podcastId: string
  podcastTitle?: string
  title: string
  publishedAt?: string
  audioUrl?: string
  progress: number
  playedAt: string
  deleted?: boolean
}

export type LatestPodcastFile = {
  key: string
  modifiedAt: string
  data: RawPodcast[]
}

type AppCloudflareEnv = CloudflareEnv & Pick<Cloudflare.Env, 'BUCKET'>

export async function fetchLatestPodcastFile(bucket: R2Bucket): Promise<LatestPodcastFile> {
  let cursor: string | undefined
  let latest: R2Object | undefined

  do {
    const result = await bucket.list({ prefix: PODCAST_OBJECT_PREFIX, cursor })

    for (const object of result.objects) {
      if (!object.key.endsWith('.json')) continue
      if (!latest || object.uploaded > latest.uploaded) latest = object
    }

    cursor = result.truncated ? result.cursor : undefined
  } while (cursor)

  if (!latest) throw new Error('No podcast JSON files found.')

  const object = await bucket.get(latest.key)
  if (!object) throw new Error('Latest podcast file could not be read.')

  return {
    key: latest.key,
    modifiedAt: latest.uploaded.toISOString(),
    data: await object.json<RawPodcast[]>(),
  }
}

/** Cache the latest export in OpenNext's persistent incremental cache for 12h. */
export const fetchCachedLatestPodcastFile = unstable_cache(
  async (): Promise<LatestPodcastFile> => {
    const { env } = await getCloudflareContext({ async: true })
    return fetchLatestPodcastFile((env as AppCloudflareEnv).BUCKET)
  },
  ['latest-podcast-file'],
  { revalidate: 43200 },
)
