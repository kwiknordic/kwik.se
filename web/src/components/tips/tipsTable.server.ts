import type { ArticleItem, CollectionItem, CollectionType } from '@/src/lib/collection'
import type { TipsFilters } from './TipsDataTable'

export const TIPS_PAGE_SIZE = 25
type TipItem = CollectionItem | ArticleItem

export type PreparedTipsTable<T extends TipItem = TipItem> = {
  items: T[]
  total: number
  page: number
  pageCount: number
  ratedCount: number
  wishlistCount: number
  starCounts: Record<number, number>
}

function pageNumber(value?: string) { const n = Number(value); return Number.isInteger(n) && n > 0 ? n : 1 }
function selectedStar(value?: string) { const n = Number((value || '').split(',')[0]); return Number.isInteger(n) && n >= 1 && n <= 5 ? n : undefined }

export function prepareTipsTable<T extends TipItem>(kind: CollectionType, source: T[], filters: TipsFilters): PreparedTipsTable<T> {
  const search = filters.q?.trim().toLowerCase() || ''
  const wishlist = filters.status === 'wishlist'
  const star = selectedStar(filters.stars)
  const getText = (item: TipItem) => 'source' in item ? `${item.title} ${item.source} ${item.category || ''}` : `${item.title} ${item.author || ''} ${item.creators || ''}`
  const rating = (item: TipItem) => 'rating' in item ? item.rating : 0
  const date = (item: TipItem) => 'time' in item ? item.time : item.date ? Date.parse(item.date) || 0 : 0
  const filtered = source.filter((item) => {
    if (wishlist !== Boolean(item.wishlist)) return false
    if (star && Math.round(rating(item)) !== star) return false
    return !search || getText(item).toLowerCase().includes(search)
  }).sort((a, b) => {
    if (kind === 'podcasts' || kind === 'articles') return date(b) - date(a) || a.title.localeCompare(b.title, 'sv')
    return rating(b) - rating(a) || a.title.localeCompare(b.title, 'sv')
  })
  const pageCount = Math.max(1, Math.ceil(filtered.length / TIPS_PAGE_SIZE))
  const page = Math.min(pageNumber(filters.page), pageCount)
  const rated = source.filter((item) => !item.wishlist)
  const starCounts = Object.fromEntries([1, 2, 3, 4, 5].map((n) => [n, rated.filter((item) => Math.round(rating(item)) === n).length]))
  return { items: filtered.slice((page - 1) * TIPS_PAGE_SIZE, page * TIPS_PAGE_SIZE), total: filtered.length, page, pageCount, ratedCount: rated.length, wishlistCount: source.filter((item) => item.wishlist).length, starCounts }
}
