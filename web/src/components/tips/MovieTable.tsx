"use client"
import type { ColumnDef } from '@tanstack/react-table'
import Stars from '../ui/Stars'
import { COLLECTION_CONFIG, type CollectionItem } from '../../lib/collection'
import TipsDataTable, { type TipsFilters } from './TipsDataTable'
import type { PreparedTipsTable } from './tipsTable.server'
const getImdbLink = (id: string) => `https://www.imdb.com/title/tt${id}`
const columns: ColumnDef<CollectionItem>[] = [
  { accessorKey: 'title', header: 'Titel', cell: ({ row }) => <div className="flex flex-col"><span className="tbl-title" title={row.original.title}>{row.original.title}</span><div className="flex min-w-0 gap-2 items-center"><i className="pi pi-calendar accent" aria-hidden="true" /><span className="min-w-0 truncate">{row.original.year}</span></div></div>, meta: { cellClassName: 'tbl-title-cell' } },
  { id: 'source', header: 'Länk', cell: ({ row }) => row.original.imdb ? <a className="tbl-source-link" href={getImdbLink(row.original.imdb)} target="_blank" rel="noreferrer" aria-label={`Läs mer om ${row.original.title}`}><i className="pi pi-external-link" aria-hidden="true" /></a> : null },
  { id: 'rating', header: 'Betyg', cell: ({ row }) => <Stars rating={row.original.rating} size={13} />, meta: { cellClassName: 'tbl-rating-cell' } },
]
export default function MovieTable({ items, filters, basePath, prepared }: { items: CollectionItem[]; filters: TipsFilters; basePath: string; prepared: PreparedTipsTable<CollectionItem> }) { return <TipsDataTable columns={columns} items={items} {...COLLECTION_CONFIG.movies} filters={filters} basePath={basePath} prepared={prepared} compactColumnVisibility={{ rating: false }} getSearchText={(item) => item.title} getRating={(item) => item.rating} compareItems={(a, b) => b.rating - a.rating || a.title.localeCompare(b.title, 'sv')} /> }
