import booksData from '@/src/data/books'
import { apiProjects } from '@/src/data/projects'
import expertise from '@/src/data/expertise'
import { interests, languages, softSkills, synopsis } from '@/src/data/about'
import movieRatings from '@/src/data/movies/movielens-ratings.json'
import movieWishlist from '@/src/data/movies/movielens-wishlist.json'
import podcasts from '@/src/data/podcasts/overcast.json'
import { fetchInstapaperArticles, type InstapaperArticle } from '@/src/lib/instapaper'
import {
  normalizePodcastEpisodeTitle,
  normalizePodcastTitle,
  splitMovieTitle,
  type CollectionItem,
} from '@/src/lib/collection'
import { getAllPosts, getPostBySlug } from '@/src/lib/posts'
import { assertUniqueSlugs, slugify } from '@/src/lib/slug'

export const tipsCategories = ['movies', 'books', 'podcasts', 'articles'] as const
export type TipsCategory = (typeof tipsCategories)[number]

type Skill = { name: string }
type SkillGroup = { label: string; slug?: string; skills: Skill[] }
type RawBook = { title: string; author: string | string[]; rating: number; wishlist?: boolean }
type RawMovie = { movie_id: string; title: string; rating: string | null; imdb_id: string }
type RawWishlistMovie = { movie_id: string; title: string; imdb_id: string }
type RawPodcast = {
  title: string
  podcastTitle?: string
  publishedAt?: string
  audioUrl?: string
}

export function getBackground() {
  const groups = [interests, languages, softSkills] as SkillGroup[]

  return {
    synopsis,
    groups: groups.map((group) => ({
      id: group.slug ?? slugify(group.label),
      label: group.label,
      skills: group.skills.map((skill) => ({
        id: slugify(skill.name),
        name: skill.name,
      })),
    })),
  }
}

export function getExpertise() {
  const groups = expertise as SkillGroup[]
  const result = groups.map((group) => ({
    id: slugify(group.label),
    label: group.label,
    skills: group.skills.map((skill) => ({
      id: slugify(skill.name),
      name: skill.name,
    })),
  }))

  assertUniqueSlugs(result.map((group) => ({ slug: group.id, name: group.label })))
  return result
}

export function getProjects() {
  return apiProjects
}

export function getProjectBySlug(slug: string) {
  return apiProjects.find((project) => project.slug === slug)
}

export function getBlogPosts() {
  return getAllPosts().map((post) => ({
    id: post.slug,
    slug: post.slug,
    title: post.title,
    language: post.language,
    date: post.date,
    excerpt: post.excerpt,
    readingMinutes: post.readingMinutes,
  }))
}

export function getBlogPost(slug: string) {
  const post = getPostBySlug(slug)
  if (!post) return undefined

  return {
    id: post.slug,
    slug: post.slug,
    title: post.title,
    language: post.language,
    date: post.date,
    excerpt: post.excerpt,
    readingMinutes: post.readingMinutes,
    content: post.body,
    contentType: 'text/markdown' as const,
  }
}

export function isTipsCategory(value: string): value is TipsCategory {
  return tipsCategories.includes(value as TipsCategory)
}

function getMovies(): CollectionItem[] {
  const moviesById = new Map<string, CollectionItem>()

  for (const movie of movieRatings as RawMovie[]) {
    const { title, year } = splitMovieTitle(movie.title)
    moviesById.set(movie.movie_id, {
      title,
      year,
      imdb: movie.imdb_id,
      rating: Number(movie.rating),
    })
  }

  for (const movie of movieWishlist as RawWishlistMovie[]) {
    const existing = moviesById.get(movie.movie_id)
    if (existing) {
      existing.wishlist = true
      continue
    }

    const { title, year } = splitMovieTitle(movie.title)
    moviesById.set(movie.movie_id, { title, year, imdb: movie.imdb_id, rating: 0, wishlist: true })
  }

  return [...moviesById.values()]
}

function getBooks(): CollectionItem[] {
  return (booksData as RawBook[]).map((book) => ({
    title: book.title,
    author: Array.isArray(book.author) ? book.author.join(', ') : book.author,
    rating: book.rating,
    wishlist: book.wishlist,
  }))
}

function getPodcasts(): CollectionItem[] {
  return (podcasts as RawPodcast[]).map((podcast) => ({
    title: normalizePodcastEpisodeTitle(podcast.title),
    creators: podcast.podcastTitle ? normalizePodcastTitle(podcast.podcastTitle) : undefined,
    date: podcast.publishedAt,
    audioUrl: podcast.audioUrl,
    rating: 0,
  }))
}

export async function getTips(
  category: TipsCategory,
): Promise<(CollectionItem | InstapaperArticle)[]> {
  switch (category) {
    case 'movies':
      return getMovies()
    case 'books':
      return getBooks()
    case 'podcasts':
      return getPodcasts()
    case 'articles':
      return fetchInstapaperArticles()
  }
}

function shortHash(value: string): string {
  let hash = 5381
  for (const character of value) hash = (hash * 33) ^ character.codePointAt(0)!
  return (hash >>> 0).toString(36)
}

export async function getPublicTips(category: TipsCategory) {
  const items = await getTips(category)
  const result = items.map((item) => {
    const identity = [
      item.title,
      'imdb' in item ? item.imdb : undefined,
      'author' in item ? item.author : undefined,
      'audioUrl' in item ? item.audioUrl : undefined,
      'url' in item ? item.url : undefined,
      'date' in item ? item.date : undefined,
      'time' in item ? item.time : undefined,
    ]
      .filter(Boolean)
      .join(':')

    return {
      id: `${slugify(item.title)}-${shortHash(identity)}`,
      ...item,
    }
  })

  assertUniqueSlugs(result.map((item) => ({ slug: item.id, name: item.title })))
  return result
}
