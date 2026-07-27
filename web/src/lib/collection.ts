/* Shared types + config for the Tips collections.
   Data lives in src/data/; pages normalise it before handing
   to the (client) table components. */

export type CollectionType = 'movies' | 'books' | 'podcasts' | 'articles'

/** Items rendered by the movie, book, and podcast tables. */
export type CollectionItem = {
  title: string
  rating: number
  author?: string // books
	year?: number // movies
  imdb?: string // movies
  creators?: string // podcasts
  date?: string // podcasts
  audioUrl?: string // podcasts
	wishlist?: boolean
}

export type ArticleItem = {
  title: string
  creators: string
  source: string
  time: number
  url?: string
  category?: string
  wishlist?: boolean
}

export type CollectionConfig = {
  unit: string
  viewLabel: string
  searchPlaceholder: string
}

export const COLLECTION_CONFIG: Record<CollectionType, CollectionConfig> = {
  movies: {
    unit: 'filmer',
    viewLabel: 'Sett',
    searchPlaceholder: 'Sök filmtitel…',
  },
  books: {
    unit: 'böcker',
    viewLabel: 'Läst',
    searchPlaceholder: 'Sök titel eller författare…',
  },
  podcasts: {
    unit: 'poddar',
    viewLabel: 'Lyssnat',
    searchPlaceholder: 'Sök podd eller skapare…',
  },
  articles: {
    unit: 'artiklar',
    viewLabel: 'Läst',
    searchPlaceholder: 'Sök titel eller källa…',
  },
}

/** Movie titles arrive as "Heat (1995)" — split the trailing year out. */
export function splitMovieTitle(raw: string): { title: string; year?: number } {
  const m = raw.match(/^(.*?)\s*\((\d{4})\)\s*$/)
  if (m) return { title: m[1], year: Number(m[2]) }
  return { title: raw }
}

/** Normalize Overcast episode titles such as "123: 01 - Episode name". */
export function normalizePodcastEpisodeTitle(raw: string): string {
  const prefix = raw.match(
    /^\s*(?:avsnitt\s+\d+\s*[:.,-]|ep\s*:\s*\d+\s*[:.,-]|#\s*\d+\s*[:.,\-–—]|\d+\s*[:.,\-–—])\s*/iu,
  )
  if (!prefix) return raw

  const remainder = raw.slice(prefix[0].length)
  const firstLetter = remainder.search(/\p{L}/u)
  return firstLetter === -1 ? remainder.trim() : remainder.slice(firstLetter).trim()
}

/** Remove standalone article/format words from a podcast title. */
export function normalizePodcastTitle(raw: string): string {
  return raw
    .replace(/\b(?:the|podcast)\b/gi, '')
    .replace(/\s{2,}/g, ' ')
    .replace(/\s+([:,.!?])/g, '$1')
    .trim()
}
