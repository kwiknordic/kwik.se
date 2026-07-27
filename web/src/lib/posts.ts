/* ============================================================
   Blog posts loader.

   The posts live as individual JSON files in src/data/posts.
   The build script generates src/data/posts-index.ts, which imports
   the JSON files into the application bundle. This keeps the loader
   compatible with runtimes that do not provide a project filesystem,
   such as Cloudflare Workers.

   ============================================================ */
import { POST_SOURCES } from '../data/posts-index'
import { readingTime } from './format'

export type Post = {
  slug: string
  title: string
  language: 'sv' | 'en'
  langFlag: string
  date: string // original ISO string
  body: string
  excerpt: string
  readingMinutes: number
}

/** ä/å → a, ö → o so slugs stay URL-clean (mirrors the original site). */
function replaceSwedishCharacters(s: string): string {
  return s.replaceAll(/[ä-å]/g, 'a').replaceAll('ö', 'o')
}

/** filename → slug: drop ".json", strip a trailing -YYYY-MM-DD, de-Swedish. */
function fileToSlug(fileName: string): string {
  const base = fileName.replace(/\.json$/, '').replace(/-\d{4}-\d{2}-\d{2}$/, '')
  return replaceSwedishCharacters(base)
}

/** First ~30 words of the body as plain text, markdown stripped. */
function makeExcerpt(body: string): string {
  const plain = body
    .replace(/```[\s\S]*?```/g, ' ') // code fences
    .replace(/`[^`]*`/g, ' ') // inline code
    .replace(/^#+\s*/gm, '') // heading hashes
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1') // links → text
    .replace(/[*_>#-]/g, ' ') // leftover markdown punctuation
    .replace(/\s+/g, ' ')
    .trim()
  const words = plain.split(' ')
  const short = words.slice(0, 32).join(' ')
  return words.length > 32 ? short + '…' : short
}

function readPost(source: (typeof POST_SOURCES)[number]): Post {
  const { fileName, data } = source
  const typedData = data as {
    title: string
    language: 'sv' | 'en'
    date: string
    body: string
  }
  return {
    slug: fileToSlug(fileName),
    title: typedData.title,
    language: typedData.language,
    langFlag: typedData.language === 'en' ? '🇬🇧' : '🇸🇪',
    date: typedData.date,
    body: typedData.body,
    excerpt: makeExcerpt(typedData.body),
    readingMinutes: readingTime(typedData.body),
  }
}

/** All posts, newest first. */
export function getAllPosts(): Post[] {
  return POST_SOURCES
    .map(readPost)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.slug === slug)
}
