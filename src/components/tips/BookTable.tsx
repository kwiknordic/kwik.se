'use client'

import type { ColumnDef, Row } from '@tanstack/react-table'
import Stars from '../ui/Stars'
import { COLLECTION_CONFIG, type CollectionItem } from '../../lib/collection'
import TipsDataTable from './TipsDataTable'

type RowType = { row: Row<CollectionItem> }

function TitleColumn({ row }: RowType) {
  const { title, author } = row.original
  return (
    <div className='flex flex-col'>
      <span className="tbl-title" title={title}>{title}</span>
      <div className='flex min-w-0 gap-2 items-center'>
        <i className="pi pi-user accent" aria-hidden="true"></i>
        <span className="min-w-0 truncate" title={author}>{author}</span>
      </div>
    </div>
  )
}

const columns: ColumnDef<CollectionItem>[] = [
  { accessorKey: 'title', header: 'Titel', cell: ({ row }) => <TitleColumn row={row} />, meta: { cellClassName: 'tbl-title-cell' } },
  { id: 'rating', header: 'Betyg', cell: ({ row }) => <Stars rating={row.original.rating} size={13} />, meta: { cellClassName: 'tbl-rating-cell' } },
]

export default function BookTable({ items }: { items: CollectionItem[] }) {
  const config = COLLECTION_CONFIG.books
  return <TipsDataTable columns={columns} items={items} {...config} compactColumnVisibility={{ rating: false }} getSearchText={(item) => `${item.title} ${item.author || ''}`} getRating={(item) => item.rating} compareItems={(a, b) => b.rating - a.rating || a.title.localeCompare(b.title, 'sv')} />
}
