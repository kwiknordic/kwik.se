/* ============================================================
   Blog posts loader.

   The posts live as individual JSON files in src/data/posts.
   We read them on the server with the filesystem (this module is
   only ever imported from Server Components), derive a URL slug
   from the filename, and add a few presentation helpers (excerpt,
   reading time, language flag).

   Note: the prototype's src/util/postsFormatter.js used Vite's
   import.meta.glob, which Next/Turbopack does not support — so we
   read the directory with node:fs instead.
   ============================================================ */
import fs from 'node:fs'
import path from 'node:path'
import { readingTime } from './format'

const POSTS_DIR = path.join(process.cwd(), 'src', 'data', 'posts')

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

function readPost(fileName: string): Post {
  const raw = fs.readFileSync(path.join(POSTS_DIR, fileName), 'utf-8')
  const data = JSON.parse(raw) as {
    title: string
    language: 'sv' | 'en'
    date: string
    body: string
  }
  return {
    slug: fileToSlug(fileName),
    title: data.title,
    language: data.language,
    langFlag: data.language === 'en' ? '🇬🇧' : '🇸🇪',
    date: data.date,
    body: data.body,
    excerpt: makeExcerpt(data.body),
    readingMinutes: readingTime(data.body),
  }
}

/** All posts, newest first. */
export function getAllPosts(): Post[] {
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith('.json'))
  return files
    .map(readPost)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.slug === slug)
}
