'use client'

import type { ColumnDef, Row } from '@tanstack/react-table'
import { formatDateSv } from '../../lib/format'
import { COLLECTION_CONFIG, type ArticleItem } from '../../lib/collection'
import TipsDataTable from './TipsDataTable'
import { truncateTitle } from '@/src/lib/truncateTitle'

type RowType = { row: Row<ArticleItem> }

function TitleColumn({ row }: RowType) {
  const { title } = row.original
  return <span className="tbl-title" title={title}>{truncateTitle(title)}</span>
}

function SourceColumn({ row }: RowType) {
  const { title, url } = row.original
  return (
    <>
      {url && <a className="tbl-source-link" href={url} target="_blank" rel="noreferrer" aria-label={`Öppna artikeln: ${title}`}><i className="pi pi-external-link" aria-hidden="true" /></a>}
    </>)
}

function DateColumn({ row }: RowType) {
  const { time } = row.original
  return formatDateSv(time ? new Date(time * 1000).toISOString() : undefined)
}

const columns: ColumnDef<ArticleItem>[] = [
  { accessorKey: 'title', header: 'Titel', cell: ({ row }) => <TitleColumn row={row} />, meta: { cellClassName: 'tbl-title-cell' } },
  { accessorKey: 'source', header: 'Länk', cell: ({ row }) => <SourceColumn row={row} /> },
  { accessorKey: 'time', header: 'Datum', cell: ({ row }) => <DateColumn row={row}></DateColumn>, meta: { cellClassName: 'tbl-date-cell', headerClassName: 'tbl-date-cell' } },
]

export default function ArticleTable({ items }: { items: ArticleItem[] }) {
  const config = COLLECTION_CONFIG.articles
  return <TipsDataTable columns={columns} items={items} {...config} compactColumnVisibility={{ time: false }} getSearchText={(item) => `${item.title} ${item.source} ${item.category || ''}`} compareItems={(a, b) => b.time - a.time || a.title.localeCompare(b.title, 'sv')} />
}
