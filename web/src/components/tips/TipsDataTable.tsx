import Link from 'next/link'
import { StarGlyph } from '../ui/Stars'
import ServerPager from '../ui/ServerPager'

const PAGE_SIZE = 25

type TipItem = { title: string; wishlist?: boolean }

export type TipsColumn<T> = {
  id: string
  header: string
  render: (item: T) => React.ReactNode
  cellClassName?: string
  headerClassName?: string
  width?: string
  compactHidden?: boolean
}

export type TipsFilters = {
  q?: string
  status?: string
  stars?: string
  page?: string
}

type TipsDataTableProps<T extends TipItem> = {
  columns: TipsColumn<T>[]
  items: T[]
  unit: string
  viewLabel: string
  searchPlaceholder: string
  getSearchText: (item: T) => string
  compareItems: (left: T, right: T) => number
  getRating?: (item: T) => number
  filters?: TipsFilters
  basePath: string
}

function pageNumber(value: string | undefined) {
  const parsed = Number(value)
  return Number.isInteger(parsed) && parsed > 0 ? parsed : 1
}

function selectedStars(value: string | undefined) {
  const star = Number((value || '').split(',')[0])
  return Number.isInteger(star) && star >= 1 && star <= 5 ? new Set([star]) : new Set<number>()
}

function classNames(...values: (string | false | undefined)[]) {
  return values.filter(Boolean).join(' ')
}

/** Shared server-rendered table behavior for the tips collections. */
export default function TipsDataTable<T extends TipItem>({
  columns,
  items,
  unit,
  viewLabel,
  searchPlaceholder,
  getSearchText,
  compareItems,
  getRating,
  filters = {},
  basePath,
}: TipsDataTableProps<T>) {
  const search = filters.q?.trim() || ''
  const view = filters.status === 'wishlist' ? 'wishlist' : 'rated'
  const stars = selectedStars(filters.stars)
  const hasWishlist = items.some((item) => item.wishlist)
  const ratedItems = items.filter((item) => !item.wishlist)
  const wishlistItems = items.filter((item) => item.wishlist)
  const query = search.toLowerCase()

  const filteredItems = items
    .filter((item) => {
      if (view === 'wishlist' && !item.wishlist) return false
      if (view === 'rated' && item.wishlist) return false
      if (getRating && view === 'rated' && stars.size > 0 && !stars.has(Math.round(getRating(item)))) return false
      return !query || getSearchText(item).toLowerCase().includes(query)
    })
    .sort(compareItems)

  const pageCount = Math.max(1, Math.ceil(filteredItems.length / PAGE_SIZE))
  const page = Math.min(pageNumber(filters.page), pageCount)
  const pageItems = filteredItems.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  function hrefFor(next: Partial<TipsFilters> = {}) {
    const params = new URLSearchParams()
    const values = {
      q: search,
      status: view === 'wishlist' ? 'wishlist' : '',
      stars: [...stars].sort((a, b) => b - a).join(','),
      page: String(page),
      ...next,
    }
    if (values.q) params.set('q', values.q)
    if (values.status) params.set('status', values.status)
    if (values.stars) params.set('stars', values.stars)
    if (values.page && values.page !== '1') params.set('page', values.page)
    const queryString = params.toString()
    return queryString ? `${basePath}?${queryString}` : basePath
  }

  function starHref(star: number) {
    return hrefFor({ status: '', stars: stars.has(star) ? '' : String(star), page: '1' })
  }

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap', alignItems: 'flex-start', marginBottom: '1rem' }}>
        <div className="filter-row" style={{ margin: 0 }}>
          <span className="filter-label">Status</span>
          <Link className={'chip' + (view === 'rated' ? ' active' : '')} href={hrefFor({ status: '', stars: '', page: '1' })} aria-current={view === 'rated' ? 'page' : undefined}>
            {viewLabel} <span className="chip-count">{ratedItems.length}</span>
          </Link>
          {hasWishlist && <Link className={'chip chip--wishlist' + (view === 'wishlist' ? ' active' : '')} href={hrefFor({ status: 'wishlist', stars: '', page: '1' })} aria-current={view === 'wishlist' ? 'page' : undefined}>
            På önskelistan <span className="chip-count">{wishlistItems.length}</span>
          </Link>}
        </div>
        {getRating && view === 'rated' && <div className="filter-row" style={{ margin: 0 }}>
          <span className="filter-label">Betyg</span>
          <Link className={'chip' + (stars.size === 0 ? ' active' : '')} href={hrefFor({ stars: '', page: '1' })} aria-current={stars.size === 0 ? 'page' : undefined}>Alla <span className="chip-count">{ratedItems.length}</span></Link>
          {[5, 4, 3, 2, 1].map((star) => <Link key={star} className={'chip' + (stars.has(star) ? ' active' : '')} href={starHref(star)} aria-current={stars.has(star) ? 'page' : undefined}>
            {star} <StarGlyph filled={!stars.has(star)} /> <span className="chip-count">{ratedItems.filter((item) => Math.round(getRating(item)) === star).length}</span>
          </Link>)}
        </div>}
      </div>

      <form className="controls" action={basePath} role="search">
        <div className="search-box">
          <i className="pi pi-search search-ic" aria-hidden="true" />
          <input className="search-input" name="q" defaultValue={search} placeholder={searchPlaceholder} aria-label={searchPlaceholder} />
        </div>
        {view === 'wishlist' && <input type="hidden" name="status" value="wishlist" />}
        {stars.size > 0 && <input type="hidden" name="stars" value={[...stars].sort((a, b) => b - a).join(',')} />}
      </form>
      <div className="result-count">
        Visar <b>{filteredItems.length}</b> {view === 'wishlist' ? <span className="result-wishlist">på önskelistan</span> : unit}
        {view === 'rated' && stars.size > 0 && <> · {[...stars].sort((a, b) => b - a).join(', ')}★</>}
        {search && <> - &quot;{search}&quot;</>}
      </div>

      {filteredItems.length === 0 ? <div className="empty-state"><p className="hand">Inget hittades</p><p>Prova att ändra dina filter.</p></div> : <>
        <div className="items-table-wrap">
          <table className="items-table text-sm">
            <colgroup>{columns.map((column) => <col key={column.id} style={{ width: column.width }} />)}</colgroup>
            <thead><tr>{columns.map((column) => <th key={column.id} className={classNames('tbl-th text-left', column.headerClassName, column.compactHidden && 'compact-hidden')}><span className="tbl-th-inner">{column.header}</span></th>)}</tr></thead>
            <tbody>{pageItems.map((item, index) => <tr key={`${item.title}-${index}`} className={'tbl-row' + (item.wishlist ? ' tbl-row--wishlist' : '')}>
              {columns.map((column) => <td key={column.id} className={classNames(column.cellClassName, column.compactHidden && 'compact-hidden')}>{column.render(item)}</td>)}
            </tr>)}</tbody>
          </table>
        </div>
        <ServerPager page={page} pageCount={pageCount} hrefForPage={(nextPage) => hrefFor({ page: String(nextPage) })} />
      </>}
    </>
  )
}