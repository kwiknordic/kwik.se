'use client'

import type { ColumnDef, Row } from '@tanstack/react-table'
import { formatDateSv } from '../../lib/format'
import { COLLECTION_CONFIG, type CollectionItem } from '../../lib/collection'
import TipsDataTable from './TipsDataTable'
import { truncateTitle } from '@/src/lib/truncateTitle'

function dateValue(date: string | undefined) {
  const value = date ? Date.parse(date) : 0
  return Number.isNaN(value) ? 0 : value
}

type RowType = { row: Row<CollectionItem> }

function TitleColumn({ row }: RowType) {
  const { title, creators } = row.original
  return (
    <div>
      <span className="tbl-title" title={title}>{truncateTitle(title)}</span>
      <div className='flex min-w-0 gap-2 items-center'>
        <i className="fa-regular fa-circle-play accent" aria-hidden="true"></i>
        <span className="min-w-0 truncate" title={creators}>{creators}</span>
      </div>
    </div>
  )
}

function SourceColumn({ row }: RowType) {
  const { title, audioUrl } = row.original
  return (
    <>
      {audioUrl && <a className="tbl-source-link" href={audioUrl} target="_blank" rel="noreferrer" aria-label={`Öppna artikeln: ${title}`}><i className="pi pi-external-link" aria-hidden="true" /></a>}
    </>)
}

function DateColumn({ row }: RowType) {
  return formatDateSv(row.original.date)
}

const columns: ColumnDef<CollectionItem>[] = [
  { accessorKey: 'title', header: 'Titel', cell: ({ row }) => <TitleColumn row={row} />, meta: { cellClassName: 'tbl-title-cell' } },
  { accessorKey: 'source', header: 'Länk', cell: ({ row }) => <SourceColumn row={row} /> },
  { accessorKey: 'date', header: 'Publicerad', cell: ({ row }) => <DateColumn row={row} />, meta: { cellClassName: 'tbl-date-cell', headerClassName: 'tbl-date-cell' } },
]

export default function PodcastTable({ items }: { items: CollectionItem[] }) {
  const config = COLLECTION_CONFIG.podcasts
  return <TipsDataTable columns={columns} items={items} {...config} compactColumnVisibility={{ date: false }} getSearchText={(item) => `${item.title} ${item.creators || ''}`} compareItems={(a, b) => dateValue(b.date) - dateValue(a.date) || a.title.localeCompare(b.title, 'sv')} />
}
