import { formatDateSv } from '../../lib/format'
import { COLLECTION_CONFIG, type CollectionItem } from '../../lib/collection'
import { truncateTitle } from '@/src/lib/truncateTitle'
import TipsDataTable, { type TipsTableColumn } from './TipsDataTable'
import type { PreparedTipsTable, TipsFilters } from './tipsTable.server'

const columns: TipsTableColumn<CollectionItem>[] = [
  {
    id: 'title', header: 'Titel', className: 'tbl-title-cell',
    render: (episode) => <div><span className="tbl-title" title={episode.title}>{truncateTitle(episode.title)}</span><div className="flex min-w-0 gap-2 items-center"><i className="fa-regular fa-circle-play accent" aria-hidden="true" /><span className="min-w-0 truncate" title={episode.creators}>{episode.creators}</span></div></div>,
  },
  { id: 'source', header: 'Länk', width: '4rem', render: (episode) => episode.audioUrl ? <a className="tbl-source-link" href={episode.audioUrl} target="_blank" rel="noreferrer"><i className="pi pi-external-link" aria-hidden="true" /></a> : null },
  { id: 'date', header: 'Publicerad', width: '16ch', className: 'tbl-date-cell', hideOnCompact: true, render: (episode) => formatDateSv(episode.date) },
]

export default function PodcastTable({ filters, basePath, prepared }: { filters: TipsFilters; basePath: string; prepared: PreparedTipsTable<CollectionItem> }) {
  return <TipsDataTable columns={columns} {...COLLECTION_CONFIG.podcasts} filters={filters} basePath={basePath} prepared={prepared} />
}
