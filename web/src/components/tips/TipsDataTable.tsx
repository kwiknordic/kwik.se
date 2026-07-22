'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  type ColumnDef,
  type PaginationState,
  type VisibilityState,
} from '@tanstack/react-table'
import { StarGlyph } from '../ui/Stars'
import Pager from '../ui/Pager'
import SearchBox from '../ui/SearchBox'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { scrollToRef } from '../../lib/scroll'

const PAGE_SIZE = 25
const ALL_COLUMNS_VISIBLE: VisibilityState = {}
type TipItem = { title: string; wishlist?: boolean }
type ColumnStyles = { cellClassName?: string; headerClassName?: string }

function useViewportQuery(query: string) {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia(query)
    const updateMatches = () => setMatches(mediaQuery.matches)

    updateMatches()
    mediaQuery.addEventListener('change', updateMatches)
    return () => mediaQuery.removeEventListener('change', updateMatches)
  }, [query])

  return matches
}

function columnWidth(id: string) {
  if (id === 'rating') return '15ch'
  if (id === 'source') return '6rem'
  if (id === 'time' || id === 'date') return '16ch'
  return undefined
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
  compactColumnVisibility?: VisibilityState
}

/**
 * Shared table behavior used by the Tips collections. Collection components
 * keep their own columns and data rules; this contains only identical UI.
 */
export default function TipsDataTable<T extends TipItem>({
  columns,
  items,
  unit,
  viewLabel,
  searchPlaceholder,
  getSearchText,
  compareItems,
  getRating,
  compactColumnVisibility = ALL_COLUMNS_VISIBLE,
}: TipsDataTableProps<T>) {
  const [search, setSearch] = useState('')
  const [view, setView] = useState<'rated' | 'wishlist'>('rated')
  const [stars, setStars] = useState<Set<number>>(new Set())
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: PAGE_SIZE })
  const listTop = useRef<HTMLDivElement>(null)
  const isCompactViewport = useViewportQuery('(max-width: 700px)')
  const hasWishlist = items.some((item) => item.wishlist)
  const ratedItems = items.filter((item) => !item.wishlist)
  const wishlistItems = items.filter((item) => item.wishlist)

  const filteredItems = useMemo(() => {
    const query = search.trim().toLowerCase()
    return items
      .filter((item) => {
        if (view === 'wishlist' && !item.wishlist) return false
        if (view === 'rated' && item.wishlist) return false
        if (getRating && view === 'rated' && stars.size > 0 && !stars.has(Math.round(getRating(item)))) return false
        return !query || getSearchText(item).toLowerCase().includes(query)
      })
      .sort(compareItems)
  }, [compareItems, getRating, getSearchText, items, search, stars, view])

  const pageCount = Math.max(1, Math.ceil(filteredItems.length / PAGE_SIZE))
  const safePageIndex = Math.min(pagination.pageIndex, pageCount - 1)
  const columnVisibility = isCompactViewport ? compactColumnVisibility : ALL_COLUMNS_VISIBLE
  const table = useReactTable({
    data: filteredItems,
    columns,
    state: {
      columnVisibility,
      pagination: { ...pagination, pageIndex: safePageIndex },
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  function resetPage() {
    setPagination((current) => ({ ...current, pageIndex: 0 }))
  }

  function switchView(nextView: 'rated' | 'wishlist') {
    setView(nextView)
    setStars(new Set())
    resetPage()
  }

  function toggleStar(star: number) {
    setStars((current) => {
      const next = new Set(current)
      if (next.has(star)) next.delete(star)
      else next.add(star)
      return next
    })
    resetPage()
  }

  function goToPage(page: number) {
    table.setPageIndex(page - 1)
    scrollToRef(listTop)
  }

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap', alignItems: 'flex-start', marginBottom: '1rem' }}>
        <div className="filter-row" style={{ margin: 0 }}>
          <span className="filter-label">Status</span>
          <button className={'chip' + (view === 'rated' ? ' active' : '')} onClick={() => switchView('rated')}>
            {viewLabel} <span className="chip-count">{ratedItems.length}</span>
          </button>
          {hasWishlist && <button className={'chip chip--wishlist' + (view === 'wishlist' ? ' active' : '')} onClick={() => switchView('wishlist')}>
            På önskelistan <span className="chip-count">{wishlistItems.length}</span>
          </button>}
        </div>
        {getRating && view === 'rated' && <div className="filter-row" style={{ margin: 0 }}>
          <span className="filter-label">Betyg</span>
          <button className={'chip' + (stars.size === 0 ? ' active' : '')} onClick={() => { setStars(new Set()); resetPage() }}>Alla <span className="chip-count">{ratedItems.length}</span></button>
          {[5, 4, 3, 2, 1].map((star) => <button key={star} className={'chip' + (stars.has(star) ? ' active' : '')} onClick={() => toggleStar(star)}>
            {star} <StarGlyph filled={!stars.has(star)} /> <span className="chip-count">{ratedItems.filter((item) => Math.round(getRating(item)) === star).length}</span>
          </button>)}
        </div>}
      </div>

      <div className="controls"><SearchBox value={search} onChange={(value) => { setSearch(value); resetPage() }} placeholder={searchPlaceholder} ariaLabel={searchPlaceholder} /></div>
      <div className="result-count" ref={listTop}>
        Visar <b>{filteredItems.length}</b> {view === 'wishlist' ? <span className="result-wishlist">på önskelistan</span> : unit}
        {view === 'rated' && stars.size > 0 && <> · {[...stars].sort((a, b) => b - a).join(', ')}★</>}
        {search && <> - &quot;{search}&quot;</>}
      </div>

      {filteredItems.length === 0 ? <div className="empty-state"><p className="hand">Inga träffar här…</p><p>Prova en annan sökning.</p></div> : <>
        <div className="items-table-wrap">
          <Table className="items-table">
            <colgroup>
              {table.getVisibleLeafColumns().map((column) => <col key={column.id} style={{ width: columnWidth(column.id) }} />)}
            </colgroup>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const styles = header.column.columnDef.meta as ColumnStyles | undefined
                  return <TableHead key={header.id} className={'tbl-th ' + (styles?.headerClassName || '')}>
                    {header.isPlaceholder ? null : <span className="tbl-th-inner">{flexRender(header.column.columnDef.header, header.getContext())}</span>}
                  </TableHead>
                })}
              </TableRow>)}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.map((row) => <TableRow key={row.id} className={'tbl-row' + (row.original.wishlist ? ' tbl-row--wishlist' : '')}>
                {row.getVisibleCells().map((cell) => {
                  const styles = cell.column.columnDef.meta as ColumnStyles | undefined
                  return <TableCell key={cell.id} className={styles?.cellClassName}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                })}
              </TableRow>)}
            </TableBody>
          </Table>
        </div>
        <Pager page={safePageIndex + 1} pageCount={pageCount} onChange={goToPage} />
      </>}
    </>
  )
}
