import Stars from '../ui/Stars'
import { COLLECTION_CONFIG, type CollectionItem } from '../../lib/collection'
import TipsDataTable, { type TipsTableColumn } from './TipsDataTable'
import type { PreparedTipsTable, TipsFilters } from './tipsTable.server'

const columns: TipsTableColumn<CollectionItem>[] = [
  {
    id: 'title', header: 'Titel', className: 'tbl-title-cell',
    render: (movie) => <div className="flex flex-col"><span className="tbl-title" title={movie.title}>{movie.title}</span><div className="flex min-w-0 gap-2 items-center"><i className="pi pi-calendar accent" aria-hidden="true" /><span className="min-w-0 truncate">{movie.year}</span></div></div>,
  },
  {
    id: 'source', header: 'Länk', width: '4rem',
    render: (movie) => movie.imdb ? <a className="tbl-source-link" href={`https://www.imdb.com/title/tt${movie.imdb}`} target="_blank" rel="noreferrer" aria-label={`Läs mer om ${movie.title}`}><i className="pi pi-external-link" aria-hidden="true" /></a> : null,
  },
  {
    id: 'rating', header: 'Betyg', width: '15ch', className: 'tbl-rating-cell', hideOnCompact: true,
    render: (movie) => <Stars rating={movie.rating} size={13} />,
  },
]

export default function MovieTable({ filters, basePath, prepared }: { filters: TipsFilters; basePath: string; prepared: PreparedTipsTable<CollectionItem> }) {
  return <TipsDataTable columns={columns} {...COLLECTION_CONFIG.movies} showRatingFilter filters={filters} basePath={basePath} prepared={prepared} />
}
