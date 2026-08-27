import { formatDateSv } from '../../lib/format'
import { COLLECTION_CONFIG, type ArticleItem } from '../../lib/collection'
import { truncateTitle } from '@/src/lib/truncateTitle'
import TipsDataTable, { type TipsTableColumn } from './TipsDataTable'
import type { PreparedTipsTable, TipsFilters } from './tipsTable.server'

const columns: TipsTableColumn<ArticleItem>[] = [
  { id: 'title', header: 'Titel', className: 'tbl-title-cell', render: (article) => <span className="tbl-title" title={article.title}>{truncateTitle(article.title)}</span> },
  { id: 'source', header: 'Länk', width: '4rem', render: (article) => article.url ? <a className="tbl-source-link" href={article.url} target="_blank" rel="noreferrer"><i className="pi pi-external-link" aria-hidden="true" /></a> : null },
  { id: 'time', header: 'Datum', width: '16ch', className: 'tbl-date-cell', hideOnCompact: true, render: (article) => formatDateSv(article.time ? new Date(article.time * 1000).toISOString() : undefined) },
]

export default function ArticleTable({ filters, basePath, prepared }: { filters: TipsFilters; basePath: string; prepared: PreparedTipsTable<ArticleItem> }) {
  return <TipsDataTable columns={columns} {...COLLECTION_CONFIG.articles} filters={filters} basePath={basePath} prepared={prepared} />
}
