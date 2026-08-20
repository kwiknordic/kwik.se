import type { Metadata } from 'next'
import booksData from '../../data/books'
import movieRatings from '@/src/data/movies/movielens-ratings.json'
import movieWishlist from '@/src/data/movies/movielens-wishlist.json'
import { fetchCachedLatestPodcastFile, type RawPodcast } from '@/src/lib/podcasts'
import { normalizePodcastEpisodeTitle, normalizePodcastTitle, splitMovieTitle, type ArticleItem, type CollectionItem, type CollectionType } from '../../lib/collection'
import TipsExplorer from '@/src/components/tips/TipsExplorer'
import StructuredData from '@/src/components/seo/StructuredData'
import { fetchInstapaperArticles } from '@/src/lib/instapaper'
import type { TipsFilters } from '@/src/components/tips/TipsDataTable'

export const metadata: Metadata = {
  alternates: { canonical: '/tips' },
  title: 'Tips',
  description: 'Filmerna, böckerna och artiklarna som fastnat.',
}

type RawBook = { title: string; author: string | string[]; rating: number; wishlist?: boolean }
type RawMovie = { movie_id: string; title: string; rating: string | null; imdb_id: string }
type RawWishlistMovie = { movie_id: string; title: string; imdb_id: string }

export type TipsSearchParams = Record<string, string | string[] | undefined>

function paramValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value
}

export default async function TipsPage({ initialKind = 'movies', basePath = '/tips', searchParams = {} }: { initialKind?: CollectionType; basePath?: string; searchParams?: TipsSearchParams }) {
  let articles: ArticleItem[] = []
  if (initialKind === 'articles') {
    try {
      const fetchedArticles = await fetchInstapaperArticles()
      articles = fetchedArticles.map((article) => ({ ...article, time: article.time ?? 0 }))
    } catch {
      // Keep the page available when Instapaper is unavailable or unconfigured.
    }
  }

  const books: CollectionItem[] = (booksData as RawBook[]).map((book) => ({
    title: book.title,
    author: Array.isArray(book.author) ? book.author.join(', ') : book.author,
    rating: book.rating,
    wishlist: book.wishlist,
  }))

  const moviesById = new Map<string, CollectionItem>()
  for (const movie of movieRatings as RawMovie[]) {
    const { title, year } = splitMovieTitle(movie.title)
    moviesById.set(movie.movie_id, { title, year, imdb: movie.imdb_id, rating: Number(movie.rating) })
  }
  for (const movie of movieWishlist as RawWishlistMovie[]) {
    const existing = moviesById.get(movie.movie_id)
    if (existing) existing.wishlist = true
    else {
      const { title, year } = splitMovieTitle(movie.title)
      moviesById.set(movie.movie_id, { title, year, imdb: movie.imdb_id, rating: 0, wishlist: true })
    }
  }

  let remotePodcasts: RawPodcast[] = []
  if (initialKind === 'podcasts') {
    try {
      const latest = await fetchCachedLatestPodcastFile()
      remotePodcasts = latest.data
    } catch {
      // Keep the page available when the bucket is unavailable or unconfigured.
    }
  }

  const podcastEpisodes: CollectionItem[] = remotePodcasts.map((podcast) => ({
    title: normalizePodcastEpisodeTitle(podcast.title),
    creators: podcast.podcastTitle ? normalizePodcastTitle(podcast.podcastTitle) : undefined,
    date: podcast.publishedAt,
    audioUrl: podcast.audioUrl,
    rating: 0,
  }))

  const filters: TipsFilters = {
    q: paramValue(searchParams.q),
    status: paramValue(searchParams.status),
    stars: paramValue(searchParams.stars),
    page: paramValue(searchParams.page),
  }

  return (
    <main className="page">
      <StructuredData id="kwik-tips" data={{
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Tips – Kwik',
        description: 'Mervin Bratics samling av filmer, böcker, poddar och artiklar.',
        url: 'https://kwik.se/tips',
        inLanguage: 'sv-SE',
        author: { '@type': 'Person', name: 'Mervin Bratic' },
      }} />
      <div className="page-head reveal">
        <span className="eyebrow">Bläddra i hyllan</span>
        <h1 className="page-title">Tips</h1>
        <p className="page-sub">Filmerna, böckerna och artiklarna som fastnat.</p>
      </div>
      <TipsExplorer movies={[...moviesById.values()]} books={books} podcasts={podcastEpisodes} articles={articles} initialKind={initialKind} basePath={basePath} filters={filters} />
    </main>
  )
}