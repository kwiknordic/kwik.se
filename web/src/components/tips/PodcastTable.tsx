import { formatDateSv } from '../../lib/format'
import { COLLECTION_CONFIG, type CollectionItem } from '../../lib/collection'
import { truncateTitle } from '@/src/lib/truncateTitle'
import TipsDataTable, { type TipsColumn, type TipsFilters } from './TipsDataTable'

function dateValue(date: string | undefined) {
  const value = date ? Date.parse(date) : 0
  return Number.isNaN(value) ? 0 : value
}

const columns: TipsColumn<CollectionItem>[] = [
  { id: 'title', header: 'Titel', render: (item) => <div><span className="tbl-title" title={item.title}>{truncateTitle(item.title)}</span><div className="flex min-w-0 gap-2 items-center"><i className="fa-regular fa-circle-play accent" aria-hidden="true" /><span className="min-w-0 truncate" title={item.creators}>{item.creators}</span></div></div>, cellClassName: 'tbl-title-cell' },
  { id: 'source', header: 'Länk', render: (item) => item.audioUrl ? <a className="tbl-source-link" href={item.audioUrl} target="_blank" rel="noreferrer" aria-label={`Öppna artikeln: ${item.title}`}><i className="pi pi-external-link" aria-hidden="true" /></a> : null, width: '6rem' },
  { id: 'date', header: 'Publicerad', render: (item) => formatDateSv(item.date), cellClassName: 'tbl-date-cell text-sm', headerClassName: 'tbl-date-cell', compactHidden: true, width: '16ch' },
]

export default function PodcastTable({ items, filters, basePath }: { items: CollectionItem[]; filters: TipsFilters; basePath: string }) {
  return <TipsDataTable columns={columns} items={items} {...COLLECTION_CONFIG.podcasts} filters={filters} basePath={basePath} getSearchText={(item) => `${item.title} ${item.creators || ''}`} compareItems={(a, b) => dateValue(b.date) - dateValue(a.date) || a.title.localeCompare(b.title, 'sv')} />
}