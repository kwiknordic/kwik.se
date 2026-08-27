import { getCloudflareContext } from '@opennextjs/cloudflare'
import { unstable_cache } from 'next/cache'

export const PODCAST_OBJECT_PREFIX = 'transform/overcast/'
export const PODCAST_LATEST_KEY = `${PODCAST_OBJECT_PREFIX}latest.json`

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
  const pointer = await bucket.get(PODCAST_LATEST_KEY)
  if (!pointer) throw new Error('No podcast JSON files found.')

  const { key, modifiedAt } = await pointer.json<{ key: string; modifiedAt: string }>()
  const object = await fetchCachedPodcastTransform(key)
  if (!object) throw new Error('Latest podcast file could not be read.')

  return {
    key,
    modifiedAt,
    data: object,
  }
}

const fetchCachedPodcastTransform = unstable_cache(
  async (key: string): Promise<RawPodcast[] | null> => {
    const { env } = await getCloudflareContext({ async: true })
    // SAFETY: OpenNext supplies the project's Cloudflare bindings at runtime.
    const object = await (env as AppCloudflareEnv).BUCKET.get(key)
    return object ? object.json<RawPodcast[]>() : null
  },
  ['podcast-transform'],
  { revalidate: 43200 },
)

/** Resolve the current pointer on every request; the immutable payload is cached above. */
export async function fetchCachedLatestPodcastFile(): Promise<LatestPodcastFile> {
  const { env } = await getCloudflareContext({ async: true })
  // SAFETY: OpenNext supplies the project's Cloudflare bindings at runtime.
  return fetchLatestPodcastFile((env as AppCloudflareEnv).BUCKET)
}
