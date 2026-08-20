import { formatDateSv } from '../../lib/format'
import { COLLECTION_CONFIG, type ArticleItem } from '../../lib/collection'
import { truncateTitle } from '@/src/lib/truncateTitle'
import TipsDataTable, { type TipsColumn, type TipsFilters } from './TipsDataTable'

const columns: TipsColumn<ArticleItem>[] = [
  { id: 'title', header: 'Titel', render: (item) => <span className="tbl-title" title={item.title}>{truncateTitle(item.title)}</span>, cellClassName: 'tbl-title-cell' },
  { id: 'source', header: 'Länk', render: (item) => item.url ? <a className="tbl-source-link" href={item.url} target="_blank" rel="noreferrer" aria-label={`Öppna artikeln: ${item.title}`}><i className="pi pi-external-link" aria-hidden="true" /></a> : null, width: '6rem' },
  { id: 'time', header: 'Datum', render: (item) => formatDateSv(item.time ? new Date(item.time * 1000).toISOString() : undefined), cellClassName: 'tbl-date-cell text-sm', headerClassName: 'tbl-date-cell', compactHidden: true, width: '16ch' },
]

export default function ArticleTable({ items, filters, basePath }: { items: ArticleItem[]; filters: TipsFilters; basePath: string }) {
  return <TipsDataTable columns={columns} items={items} {...COLLECTION_CONFIG.articles} filters={filters} basePath={basePath} getSearchText={(item) => `${item.title} ${item.source} ${item.category || ''}`} compareItems={(a, b) => b.time - a.time || a.title.localeCompare(b.title, 'sv')} />
}