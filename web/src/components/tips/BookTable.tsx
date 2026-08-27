import Stars from '../ui/Stars'
import { COLLECTION_CONFIG, type CollectionItem } from '../../lib/collection'
import TipsDataTable, { type TipsTableColumn } from './TipsDataTable'
import type { PreparedTipsTable, TipsFilters } from './tipsTable.server'

const columns: TipsTableColumn<CollectionItem>[] = [
  {
    id: 'title', header: 'Titel', className: 'tbl-title-cell',
    render: (book) => <div className="flex flex-col"><span className="tbl-title" title={book.title}>{book.title}</span><div className="flex min-w-0 gap-2 items-center"><i className="pi pi-user accent" aria-hidden="true" /><span className="min-w-0 truncate" title={book.author}>{book.author}</span></div></div>,
  },
  {
    id: 'rating', header: 'Betyg', width: '15ch', className: 'tbl-rating-cell', hideOnCompact: true,
    render: (book) => <Stars rating={book.rating} size={13} />,
  },
]

export default function BookTable({ filters, basePath, prepared }: { filters: TipsFilters; basePath: string; prepared: PreparedTipsTable<CollectionItem> }) {
  return <TipsDataTable columns={columns} {...COLLECTION_CONFIG.books} showRatingFilter filters={filters} basePath={basePath} prepared={prepared} />
}
