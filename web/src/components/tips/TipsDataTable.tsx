"use client"

import Link from 'next/link'
import { StarGlyph } from '../ui/Stars'
import ServerPager from '../ui/ServerPager'
import { useEffect, useState } from 'react'
import { flexRender, getCoreRowModel, useReactTable, type ColumnDef, type PaginationState, type VisibilityState } from '@tanstack/react-table'
import type { PreparedTipsTable } from './tipsTable.server'

const PAGE_SIZE = 25

type TipItem = { title: string; wishlist?: boolean }
type ColumnStyles = { cellClassName?: string; headerClassName?: string }

export type TipsFilters = {
  q?: string
  status?: string
  stars?: string
  page?: string
}

type TipsDataTableProps<T extends TipItem> = {
  columns: ColumnDef<T>[]
  items: T[]
  unit: string
  viewLabel: string
  searchPlaceholder: string
  getSearchText: (item: T) => string
  compareItems: (left: T, right: T) => number
  getRating?: (item: T) => number
  filters?: TipsFilters
  basePath: string
  prepared: PreparedTipsTable<any>
  compactColumnVisibility?: VisibilityState
}

function useViewportQuery(query: string) {
  const [matches, setMatches] = useState(false)
  useEffect(() => {
    const media = window.matchMedia(query)
    const update = () => setMatches(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [query])
  return matches
}

function columnWidth(id: string) {
  if (id === 'rating') return '15ch'
  if (id === 'source') return '6rem'
  if (id === 'date' || id === 'time') return '16ch'
  return undefined
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

/** Shared client table shell. Filtering, sorting and pagination are prepared by the server. */
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
  prepared,
  compactColumnVisibility = {},
}: TipsDataTableProps<T>) {
  const search = filters.q?.trim() || ''
  const view = filters.status === 'wishlist' ? 'wishlist' : 'rated'
  const stars = selectedStars(filters.stars)
  const hasWishlist = prepared.wishlistCount > 0
  const page = prepared.page
  const pageCount = prepared.pageCount
  const pageItems = prepared.items
  const filteredItems = prepared.total === 0 ? [] : pageItems
  const isCompactViewport = useViewportQuery('(max-width: 700px)')
  const columnVisibility = isCompactViewport ? compactColumnVisibility : {}

  const table = useReactTable({
    data: pageItems,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualSorting: true,
    manualPagination: true,
    pageCount,
    state: { columnVisibility, pagination: { pageIndex: page - 1, pageSize: PAGE_SIZE } satisfies PaginationState },
  })

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
            {viewLabel} <span className="chip-count">{prepared.ratedCount}</span>
          </Link>
          {hasWishlist && <Link className={'chip chip--wishlist' + (view === 'wishlist' ? ' active' : '')} href={hrefFor({ status: 'wishlist', stars: '', page: '1' })} aria-current={view === 'wishlist' ? 'page' : undefined}>
            På önskelistan <span className="chip-count">{prepared.wishlistCount}</span>
          </Link>}
        </div>
        {getRating && view === 'rated' && <div className="filter-row" style={{ margin: 0 }}>
          <span className="filter-label">Betyg</span>
          <Link className={'chip' + (stars.size === 0 ? ' active' : '')} href={hrefFor({ stars: '', page: '1' })} aria-current={stars.size === 0 ? 'page' : undefined}>Alla <span className="chip-count">{prepared.ratedCount}</span></Link>
          {[5, 4, 3, 2, 1].map((star) => <Link key={star} className={'chip' + (stars.has(star) ? ' active' : '')} href={starHref(star)} aria-current={stars.has(star) ? 'page' : undefined}>
            {star} <StarGlyph filled={!stars.has(star)} /> <span className="chip-count">{prepared.starCounts[star] || 0}</span>
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
        Visar <b>{prepared.total}</b> {view === 'wishlist' ? <span className="result-wishlist">på önskelistan</span> : unit}
        {view === 'rated' && stars.size > 0 && <> · {[...stars].sort((a, b) => b - a).join(', ')}★</>}
        {search && <> - &quot;{search}&quot;</>}
      </div>

      {filteredItems.length === 0 ? <div className="empty-state"><p className="hand">Inget hittades</p><p>Prova att ändra dina filter.</p></div> : <>
        <div className="items-table-wrap">
          <table className="items-table text-sm">
            <colgroup>{table.getVisibleLeafColumns().map((column) => <col key={column.id} style={{ width: columnWidth(column.id) }} />)}</colgroup>
            <thead><tr>{table.getHeaderGroups()[0].headers.map((header) => { const styles = header.column.columnDef.meta as ColumnStyles | undefined; return <th key={header.id} className={classNames('tbl-th text-left', styles?.headerClassName)}><span className="tbl-th-inner">{flexRender(header.column.columnDef.header, header.getContext())}</span></th> })}</tr></thead>
            <tbody>{table.getRowModel().rows.map((row) => <tr key={row.id} className={'tbl-row' + (row.original.wishlist ? ' tbl-row--wishlist' : '')}>
              {row.getVisibleCells().map((cell) => { const styles = cell.column.columnDef.meta as ColumnStyles | undefined; return <td key={cell.id} className={styles?.cellClassName}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td> })}
            </tr>)}</tbody>
          </table>
        </div>
        <ServerPager page={page} pageCount={pageCount} hrefForPage={(nextPage) => hrefFor({ page: String(nextPage) })} />
      </>}
    </>
  )
}
