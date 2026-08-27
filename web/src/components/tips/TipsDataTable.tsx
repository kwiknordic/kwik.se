import Link from 'next/link'
import type { ReactNode } from 'react'
import { StarGlyph } from '../ui/Stars'
import ServerPager from '../ui/ServerPager'
import type { PreparedTipsTable, TipsFilters } from './tipsTable.server'

type TipItem = { title: string; wishlist?: boolean }

export type TipsTableColumn<T> = {
  id: string
  header: string
  render: (item: T) => ReactNode
  width?: string
  className?: string
  hideOnCompact?: boolean
}

type TipsDataTableProps<T extends TipItem> = {
  columns: TipsTableColumn<T>[]
  unit: string
  viewLabel: string
  searchPlaceholder: string
  showRatingFilter?: boolean
  filters?: TipsFilters
  basePath: string
  prepared: PreparedTipsTable<T>
}

function selectedStars(value?: string) {
  const star = Number((value || '').split(',')[0])
  return Number.isInteger(star) && star >= 1 && star <= 5 ? new Set([star]) : new Set<number>()
}

function classNames(...values: (string | false | undefined)[]) {
  return values.filter(Boolean).join(' ')
}

/** Server-rendered table shell. Query-string navigation owns filtering and pagination. */
export default function TipsDataTable<T extends TipItem>({
  columns, unit, viewLabel, searchPlaceholder, showRatingFilter = false,
  filters = {}, basePath, prepared,
}: TipsDataTableProps<T>) {
  const search = filters.q?.trim() || ''
  const view = filters.status === 'wishlist' ? 'wishlist' : 'rated'
  const stars = selectedStars(filters.stars)

  function hrefFor(next: Partial<TipsFilters> = {}) {
    const values = {
      q: search,
      status: view === 'wishlist' ? 'wishlist' : '',
      stars: [...stars].sort((a, b) => b - a).join(','),
      page: String(prepared.page),
      ...next,
    }
    const params = new URLSearchParams()
    if (values.q) params.set('q', values.q)
    if (values.status) params.set('status', values.status)
    if (values.stars) params.set('stars', values.stars)
    if (values.page !== '1') params.set('page', values.page)
    const query = params.toString()
    return query ? `${basePath}?${query}` : basePath
  }

  const starHref = (star: number) => hrefFor({ status: '', stars: stars.has(star) ? '' : String(star), page: '1' })

  return <>
    <div className="tips-filter-groups">
      <div className="filter-row tips-filter-row">
        <span className="filter-label">Status</span>
        <Link className={classNames('chip', view === 'rated' && 'active')} href={hrefFor({ status: '', stars: '', page: '1' })} aria-current={view === 'rated' ? 'page' : undefined}>
          {viewLabel} <span className="chip-count">{prepared.ratedCount}</span>
        </Link>
        {prepared.wishlistCount > 0 && <Link className={classNames('chip chip--wishlist', view === 'wishlist' && 'active')} href={hrefFor({ status: 'wishlist', stars: '', page: '1' })} aria-current={view === 'wishlist' ? 'page' : undefined}>
          På önskelistan <span className="chip-count">{prepared.wishlistCount}</span>
        </Link>}
      </div>
      {showRatingFilter && view === 'rated' && <div className="filter-row tips-filter-row">
        <span className="filter-label">Betyg</span>
        <Link className={classNames('chip', stars.size === 0 && 'active')} href={hrefFor({ stars: '', page: '1' })} aria-current={stars.size === 0 ? 'page' : undefined}>Alla <span className="chip-count">{prepared.ratedCount}</span></Link>
        {[5, 4, 3, 2, 1].map((star) => <Link key={star} className={classNames('chip', stars.has(star) && 'active')} href={starHref(star)} aria-current={stars.has(star) ? 'page' : undefined}>
          {star} <StarGlyph filled={!stars.has(star)} /> <span className="chip-count">{prepared.starCounts[star] || 0}</span>
        </Link>)}
      </div>}
    </div>

    <form className="controls" action={basePath} role="search">
      <div className="search-box"><i className="pi pi-search search-ic" aria-hidden="true" /><input className="search-input" name="q" defaultValue={search} placeholder={searchPlaceholder} aria-label={searchPlaceholder} /></div>
      {view === 'wishlist' && <input type="hidden" name="status" value="wishlist" />}
      {stars.size > 0 && <input type="hidden" name="stars" value={[...stars].sort((a, b) => b - a).join(',')} />}
    </form>
    <div className="result-count">
      Visar <b>{prepared.total}</b> {view === 'wishlist' ? <span className="result-wishlist">på önskelistan</span> : unit}
      {view === 'rated' && stars.size > 0 && <> · {[...stars].sort((a, b) => b - a).join(', ')}★</>}
      {search && <> - &quot;{search}&quot;</>}
    </div>

    {prepared.items.length === 0 ? <div className="empty-state"><p className="hand">Inget hittades</p><p>Prova att ändra dina filter.</p></div> : <>
      <div className="items-table-wrap">
        <table className="items-table text-sm">
          <thead><tr>{columns.map((column) => <th key={column.id} className={classNames('tbl-th text-left', column.className, column.hideOnCompact && 'tbl-compact-hidden')} style={{ width: column.width, boxSizing: column.width ? 'content-box' : undefined }}><span className="tbl-th-inner">{column.header}</span></th>)}</tr></thead>
          <tbody>{prepared.items.map((item, index) => <tr key={`${item.title}-${index}`} className={classNames('tbl-row', item.wishlist && 'tbl-row--wishlist')}>
            {columns.map((column) => <td key={column.id} className={classNames(column.className, column.hideOnCompact && 'tbl-compact-hidden')}>{column.render(item)}</td>)}
          </tr>)}</tbody>
        </table>
      </div>
      <ServerPager page={prepared.page} pageCount={prepared.pageCount} hrefForPage={(page) => hrefFor({ page: String(page) })} />
    </>}
  </>
}
