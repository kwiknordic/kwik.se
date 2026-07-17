import type { Metadata } from 'next'
import booksData from '../../data/books'
import movieRatings from '@/src/data/movies/movielens-ratings.json'
import movieWishlist from '@/src/data/movies/movielens-wishlist.json'
import podcasts from '@/src/data/podcasts/overcast.json'
import { normalizePodcastEpisodeTitle, normalizePodcastTitle, splitMovieTitle, type CollectionItem } from '../../lib/collection'
import TipsExplorer from '@/src/components/tips/TipsExplorer'
import StructuredData from '@/src/components/seo/StructuredData'

export const metadata: Metadata = {
  alternates: { canonical: '/tips' },
  title: 'Tips',
  description: 'Filmerna, böckerna och artiklarna som fastnat.',
}

type RawBook = { title: string; author: string | string[]; rating: number; wishlist?: boolean }
type RawMovie = { movie_id: string; title: string; rating: string | null, imdb_id: string }
type RawWishlistMovie = { movie_id: string; title: string, imdb_id: string }
type RawPodcast = {
  title: string
  podcastTitle?: string
  publishedAt?: string
  audioUrl?: string
  deleted?: boolean
}
export default async function TipsPage() {
  const books: CollectionItem[] = (booksData as RawBook[]).map((b) => ({
    title: b.title,
    author: Array.isArray(b.author) ? b.author.join(", ") : b.author,
    rating: b.rating,
    wishlist: b.wishlist,
  }))

  const moviesById = new Map<string, CollectionItem>()

  for (const m of movieRatings as RawMovie[]) {
    const { title, year } = splitMovieTitle(m.title)
    moviesById.set(m.movie_id, {
      title,
      year,
      imdb: m.imdb_id,
      rating: Number(m.rating),
    })
  }

  for (const m of movieWishlist as RawWishlistMovie[]) {
    const existing = moviesById.get(m.movie_id)
    if (existing) {
      existing.wishlist = true
    } else {
      const { title, year } = splitMovieTitle(m.title)
      moviesById.set(m.movie_id, { title, year, imdb: m.imdb_id, rating: 0, wishlist: true })
    }
  }

  const movies = [...moviesById.values()]

  const podcastEpisodes: CollectionItem[] = (podcasts as RawPodcast[]).map((p) => ({
    title: normalizePodcastEpisodeTitle(p.title),
    creators: p.podcastTitle ? normalizePodcastTitle(p.podcastTitle) : undefined,
    date: p.publishedAt,
    audioUrl: p.audioUrl,
    rating: 0,
  }))

  return (
    <main className="page">
      <StructuredData
        id="kwik-tips"
        data={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Tips – Kwik',
          description: 'Mervin Bratics samling av filmer, böcker, poddar och artiklar.',
          url: 'https://kwik.se/tips',
          inLanguage: 'sv-SE',
          author: { '@type': 'Person', name: 'Mervin Bratic' },
        }}
      />
      <div className="page-head reveal">
        <span className="eyebrow">Bläddra i hyllan</span>
        <h1 className="page-title">
          Tips
        </h1>
        <p className="page-sub">
          Filmerna, böckerna och artiklarna som fastnat.
        </p>
      </div>

      <TipsExplorer movies={movies} books={books} podcasts={podcastEpisodes} articles={[]} />
    </main>
  )
}
