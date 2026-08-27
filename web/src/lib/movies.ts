import { getCloudflareContext } from '@opennextjs/cloudflare'
import { unstable_cache } from 'next/cache'

export const MOVIE_OBJECT_PREFIX = 'transform/movielens/'
export const MOVIE_RATINGS_LATEST_KEY = `${MOVIE_OBJECT_PREFIX}ratings/latest.json`
export const MOVIE_WISHLIST_LATEST_KEY = `${MOVIE_OBJECT_PREFIX}wishlist/latest.json`

export type RawMovie = {
  movie_id: string
  title: string
  rating: string | null
  imdb_id: string
}

export type RawWishlistMovie = {
  movie_id: string
  title: string
  imdb_id: string
}

type LatestMovieFile<T> = {
  key: string
  modifiedAt: string
  data: T
}

type AppCloudflareEnv = CloudflareEnv & Pick<Cloudflare.Env, 'BUCKET'>

async function fetchLatestMovieFile<T>(bucket: R2Bucket, latestKey: string): Promise<LatestMovieFile<T>> {
  const pointer = await bucket.get(latestKey)
  if (!pointer) throw new Error(`No MovieLens file found at ${latestKey}.`)

  const { key, modifiedAt } = await pointer.json<{ key: string; modifiedAt: string }>()
  const object = await fetchCachedMovieTransform<T>(key)
  if (!object) throw new Error(`MovieLens file could not be read: ${key}.`)

  return { key, modifiedAt, data: object }
}

const fetchCachedMovieTransform = unstable_cache(
  async <T>(key: string): Promise<T | null> => {
    const { env } = await getCloudflareContext({ async: true })
    // SAFETY: OpenNext supplies the project's Cloudflare bindings at runtime.
    const object = await (env as AppCloudflareEnv).BUCKET.get(key)
    return object ? object.json<T>() : null
  },
  ['movielens-transform'],
  { revalidate: 43200 },
)

export async function fetchCachedLatestMovieFiles() {
  const { env } = await getCloudflareContext({ async: true })
  // SAFETY: OpenNext supplies the project's Cloudflare bindings at runtime.
  const bucket = (env as AppCloudflareEnv).BUCKET
  const [ratings, wishlist] = await Promise.all([
    fetchLatestMovieFile<RawMovie[]>(bucket, MOVIE_RATINGS_LATEST_KEY),
    fetchLatestMovieFile<RawWishlistMovie[]>(bucket, MOVIE_WISHLIST_LATEST_KEY),
  ])
  return { ratings, wishlist }
}
