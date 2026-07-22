import { createHmac } from 'node:crypto'
import OAuth from 'oauth-1.0a'

type InstapaperBookmark = {
  bookmark_id?: string
  title?: string
  url?: string
  time?: number
  starred?: string | number
  progress?: number
}

type InstapaperResponse = InstapaperBookmark[] | { bookmarks?: InstapaperBookmark[] }

export type InstapaperArticle = {
  title: string
  creators: string
  source: string
  time?: number
  url: string
  wishlist?: boolean
}

const BASE_URL = 'https://www.instapaper.com/api/1/bookmarks/list'

function authorizationHeader(endpoint: string, body: URLSearchParams): string {
  const consumerKey = process.env.INSTAPAPER_CONSUMER_KEY
  const consumerSecret = process.env.INSTAPAPER_SECRET
  const tokenKey = process.env.INSTAPAPER_ACCESS_TOKEN
  const tokenSecret = process.env.INSTAPAPER_ACCESS_TOKEN_SECRET

  if (!consumerKey || !consumerSecret || !tokenKey || !tokenSecret) {
    throw new Error(
      'Instapaper OAuth credentials are incomplete. Set INSTAPAPER_CONSUMER_KEY, INSTAPAPER_SECRET, INSTAPAPER_ACCESS_TOKEN, and INSTAPAPER_ACCESS_TOKEN_SECRET.',
    )
  }

  const oauth = new OAuth({
    consumer: { key: consumerKey, secret: consumerSecret },
    signature_method: 'HMAC-SHA1',
    hash_function(baseString, key) {
      return createHmac('sha1', key).update(baseString).digest('base64')
    },
  })

  return oauth.toHeader(oauth.authorize(
    { url: endpoint, method: 'POST', data: Object.fromEntries(body) },
    { key: tokenKey, secret: tokenSecret },
  )).Authorization
}

async function fetchFolder(folderId: 'unread' | 'archive'): Promise<InstapaperBookmark[]> {
  const endpoint = BASE_URL
  const body = new URLSearchParams({ limit: '500', folder_id: folderId })
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Authorization: authorizationHeader(endpoint, body),
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
    cache: 'no-store',
  })

  if (!response.ok) {
    throw new Error(`Instapaper request failed with ${response.status}`)
  }

  const data = (await response.json()) as InstapaperResponse

  // The bookmarks/list endpoint returns an array of bookmark records. Keep the
  // object form as well so a compatible proxy can continue to return
  // `{ bookmarks: [...] }`.
  if (Array.isArray(data)) return data
  return Array.isArray(data.bookmarks) ? data.bookmarks : []
}

export async function fetchInstapaperArticles(): Promise<InstapaperArticle[]> {
  const [unread, archive] = await Promise.all([fetchFolder('unread'), fetchFolder('archive')])
  const bookmarks = new Map<string, { bookmark: InstapaperBookmark; isArchived: boolean }>()

  for (const bookmark of unread) {
    if (!bookmark.url && !bookmark.bookmark_id) continue
    const key = bookmark.bookmark_id || bookmark.url!
    bookmarks.set(key, { bookmark, isArchived: false })
  }

  // Archive is authoritative if a bookmark appears in both folder responses.
  for (const bookmark of archive) {
    if (!bookmark.url && !bookmark.bookmark_id) continue
    const key = bookmark.bookmark_id || bookmark.url!
    bookmarks.set(key, { bookmark, isArchived: true })
  }

  return [...bookmarks.values()].flatMap(({ bookmark, isArchived }) => {
    if (!bookmark.url || !bookmark.title) return []

    let source = 'Instapaper'
    try {
      source = new URL(bookmark.url).hostname.replace(/^www\./, '')
    } catch {
      // Keep the fallback source for malformed URLs.
    }

    return [{
      title: bookmark.title,
      creators: '',
      source,
      time: bookmark.time,
      url: bookmark.url,
      wishlist: !isArchived,
    }]
  })
}
