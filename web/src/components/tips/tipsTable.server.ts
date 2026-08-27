import type { ArticleItem, CollectionItem, CollectionType } from '@/src/lib/collection'

export const TIPS_PAGE_SIZE = 25
type TipItem = CollectionItem | ArticleItem

export type TipsFilters = { q?: string; status?: string; stars?: string; page?: string }

export type PreparedTipsTable<T = TipItem> = {
  items: T[]
  total: number
  page: number
  pageCount: number
  ratedCount: number
  wishlistCount: number
  starCounts: Record<number, number>
}

function pageNumber(value?: string) {
  const page = Number(value)
  return Number.isInteger(page) && page > 0 ? page : 1
}

function selectedStar(value?: string) {
  const star = Number((value || '').split(',')[0])
  return Number.isInteger(star) && star >= 1 && star <= 5 ? star : undefined
}

function searchableText(item: TipItem) {
  return 'source' in item
    ? `${item.title} ${item.source} ${item.category || ''}`
    : `${item.title} ${item.author || ''} ${item.creators || ''}`
}

function rating(item: TipItem) {
  return 'rating' in item ? item.rating : 0
}

function timestamp(item: TipItem) {
  if ('time' in item) return item.time
  return item.date ? Date.parse(item.date) || 0 : 0
}

export function prepareTipsTable<T extends TipItem>(kind: CollectionType, source: T[], filters: TipsFilters): PreparedTipsTable<T> {
  const search = filters.q?.trim().toLowerCase() || ''
  const wishlist = filters.status === 'wishlist'
  const star = selectedStar(filters.stars)
  const filtered = source.filter((item) => {
    if (wishlist !== Boolean(item.wishlist)) return false
    if (star && Math.round(rating(item)) !== star) return false
    return !search || searchableText(item).toLowerCase().includes(search)
  }).sort((left, right) => {
    if (kind === 'podcasts' || kind === 'articles') return timestamp(right) - timestamp(left) || left.title.localeCompare(right.title, 'sv')
    return rating(right) - rating(left) || left.title.localeCompare(right.title, 'sv')
  })

  const pageCount = Math.max(1, Math.ceil(filtered.length / TIPS_PAGE_SIZE))
  const page = Math.min(pageNumber(filters.page), pageCount)
  const rated = source.filter((item) => !item.wishlist)
  const starCounts = Object.fromEntries(
    [1, 2, 3, 4, 5].map((starValue) => [starValue, rated.filter((item) => Math.round(rating(item)) === starValue).length]),
  )

  return {
    items: filtered.slice((page - 1) * TIPS_PAGE_SIZE, page * TIPS_PAGE_SIZE),
    total: filtered.length,
    page,
    pageCount,
    ratedCount: rated.length,
    wishlistCount: source.filter((item) => item.wishlist).length,
    starCounts,
  }
}
