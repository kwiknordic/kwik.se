import type { Metadata } from 'next'
import booksData from '../../data/books'
import { fetchCachedLatestMovieFiles } from '@/src/lib/movies'
import { fetchCachedLatestPodcastFile, type RawPodcast } from '@/src/lib/podcasts'
import { normalizePodcastEpisodeTitle, normalizePodcastTitle, splitMovieTitle, type ArticleItem, type CollectionItem, type CollectionType } from '../../lib/collection'
import TipsExplorer from '@/src/components/tips/TipsExplorer'
import StructuredData from '@/src/components/seo/StructuredData'
import { fetchInstapaperArticles } from '@/src/lib/instapaper'
import { prepareTipsTable, type TipsFilters } from '@/src/components/tips/tipsTable.server'
import MovieTable from '@/src/components/tips/MovieTable'
import BookTable from '@/src/components/tips/BookTable'
import ArticleTable from '@/src/components/tips/ArticleTable'
import PodcastTable from '@/src/components/tips/PodcastTable'

export const metadata: Metadata = {
  alternates: { canonical: '/tips' },
  title: 'Tips',
  description: 'Filmerna, böckerna och artiklarna som fastnat.',
}

type RawBook = { title: string; author: string | string[]; rating: number; wishlist?: boolean }

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

  // SAFETY: The bundled books data is authored against the RawBook contract.
  const books: CollectionItem[] = (booksData as RawBook[]).map((book) => ({
    title: book.title,
    author: Array.isArray(book.author) ? book.author.join(', ') : book.author,
    rating: book.rating,
    wishlist: book.wishlist,
  }))

  const moviesById = new Map<string, CollectionItem>()
  if (initialKind === 'movies') {
    const { ratings, wishlist } = await fetchCachedLatestMovieFiles()
    for (const movie of ratings.data) {
      const { title, year } = splitMovieTitle(movie.title)
      moviesById.set(movie.movie_id, { title, year, imdb: movie.imdb_id, rating: Number(movie.rating) })
    }
    for (const movie of wishlist.data) {
      const existing = moviesById.get(movie.movie_id)
      if (existing) existing.wishlist = true
      else {
        const { title, year } = splitMovieTitle(movie.title)
        moviesById.set(movie.movie_id, { title, year, imdb: movie.imdb_id, rating: 0, wishlist: true })
      }
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
  const table = (() => {
    switch (initialKind) {
      case 'movies': {
        const prepared = prepareTipsTable(initialKind, [...moviesById.values()], filters)
        return <MovieTable filters={filters} basePath={basePath} prepared={prepared} />
      }
      case 'books': {
        const prepared = prepareTipsTable(initialKind, books, filters)
        return <BookTable filters={filters} basePath={basePath} prepared={prepared} />
      }
      case 'articles': {
        const prepared = prepareTipsTable(initialKind, articles, filters)
        return <ArticleTable filters={filters} basePath={basePath} prepared={prepared} />
      }
      case 'podcasts': {
        const prepared = prepareTipsTable(initialKind, podcastEpisodes, filters)
        return <PodcastTable filters={filters} basePath={basePath} prepared={prepared} />
      }
    }
  })()

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
      <TipsExplorer kind={initialKind}>{table}</TipsExplorer>
    </main>
  )
}
