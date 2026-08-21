"use client"
import type { ColumnDef } from '@tanstack/react-table'
import Stars from '../ui/Stars'
import { COLLECTION_CONFIG, type CollectionItem } from '../../lib/collection'
import TipsDataTable, { type TipsFilters } from './TipsDataTable'
import type { PreparedTipsTable } from './tipsTable.server'
const columns: ColumnDef<CollectionItem>[] = [
  { accessorKey: 'title', header: 'Titel', cell: ({ row }) => <div className="flex flex-col"><span className="tbl-title" title={row.original.title}>{row.original.title}</span><div className="flex min-w-0 gap-2 items-center"><i className="pi pi-user accent" aria-hidden="true" /><span className="min-w-0 truncate" title={row.original.author}>{row.original.author}</span></div></div>, meta: { cellClassName: 'tbl-title-cell' } },
  { id: 'rating', header: 'Betyg', cell: ({ row }) => <Stars rating={row.original.rating} size={13} />, meta: { cellClassName: 'tbl-rating-cell' } },
]
export default function BookTable({ items, filters, basePath, prepared }: { items: CollectionItem[]; filters: TipsFilters; basePath: string; prepared: PreparedTipsTable<CollectionItem> }) { return <TipsDataTable columns={columns} items={items} {...COLLECTION_CONFIG.books} filters={filters} basePath={basePath} prepared={prepared} compactColumnVisibility={{ rating: false }} getSearchText={(item) => `${item.title} ${item.author || ''}`} getRating={(item) => item.rating} compareItems={(a, b) => b.rating - a.rating || a.title.localeCompare(b.title, 'sv')} /> }
