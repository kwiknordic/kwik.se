'use client'

import type { ColumnDef, Row } from '@tanstack/react-table'
import Stars from '../ui/Stars'
import { COLLECTION_CONFIG, type CollectionItem } from '../../lib/collection'
import TipsDataTable from './TipsDataTable'

const getImdbLink = (imdbId: string) => `https://www.imdb.com/title/tt${imdbId}`

type RowType = { row: Row<CollectionItem> }

function TitleColumn({ row }: RowType) {
  const { title, year } = row.original
  return (
    <div className='flex flex-col'>
      <span className="tbl-title" title={title}>{title}</span>
      <div className='flex min-w-0 gap-2 items-center'>
        <i className="pi pi-calendar accent" aria-hidden="true"></i>
        <span className="min-w-0 truncate">{year}</span>
      </div>
    </div>
  )
}

function SourceColumn({ row }: RowType) {
  const { imdb, title } = row.original
  return (
    <>
      {imdb && <a className="tbl-source-link" href={getImdbLink(imdb)} target="_blank" rel="noreferrer" aria-label={`Läs mer om ${title}`}><i className="pi pi-external-link" aria-hidden="true" /></a>}
    </>)
}

const columns: ColumnDef<CollectionItem>[] = [
  { accessorKey: 'title', header: 'Titel', cell: ({ row }) => <TitleColumn row={row} />, meta: { cellClassName: 'tbl-title-cell' } },
  { accessorKey: 'source', header: 'Länk', cell: ({ row }) => <SourceColumn row={row} /> },
  { id: 'rating', header: 'Betyg', cell: ({ row }) => <Stars rating={row.original.rating} size={13} />, meta: { cellClassName: 'tbl-rating-cell' } },
]

export default function MovieTable({ items }: { items: CollectionItem[] }) {
  const config = COLLECTION_CONFIG.movies
  return <TipsDataTable columns={columns} items={items} {...config} compactColumnVisibility={{ rating: false }} getSearchText={(item) => item.title} getRating={(item) => item.rating} compareItems={(a, b) => b.rating - a.rating || a.title.localeCompare(b.title, 'sv')} />
}
