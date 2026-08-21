"use client"
import type { ColumnDef } from '@tanstack/react-table'
import { formatDateSv } from '../../lib/format'
import { COLLECTION_CONFIG, type CollectionItem } from '../../lib/collection'
import { truncateTitle } from '@/src/lib/truncateTitle'
import TipsDataTable, { type TipsFilters } from './TipsDataTable'
import type { PreparedTipsTable } from './tipsTable.server'
const columns: ColumnDef<CollectionItem>[] = [
 { accessorKey: 'title', header: 'Titel', cell: ({row}) => <div><span className="tbl-title" title={row.original.title}>{truncateTitle(row.original.title)}</span><div className="flex min-w-0 gap-2 items-center"><i className="fa-regular fa-circle-play accent" aria-hidden="true" /><span className="min-w-0 truncate" title={row.original.creators}>{row.original.creators}</span></div></div>, meta:{cellClassName:'tbl-title-cell'} },
 { id:'source', header:'Länk', cell:({row})=>row.original.audioUrl ? <a className="tbl-source-link" href={row.original.audioUrl} target="_blank" rel="noreferrer"><i className="pi pi-external-link" aria-hidden="true" /></a>:null },
 { id:'date', header:'Publicerad', cell:({row})=>formatDateSv(row.original.date), meta:{cellClassName:'tbl-date-cell',headerClassName:'tbl-date-cell'} },
]
export default function PodcastTable({items,filters,basePath,prepared}:{items:CollectionItem[];filters:TipsFilters;basePath:string;prepared:PreparedTipsTable<CollectionItem>}){return <TipsDataTable columns={columns} items={items} {...COLLECTION_CONFIG.podcasts} filters={filters} basePath={basePath} prepared={prepared} compactColumnVisibility={{date:false}} getSearchText={i=>`${i.title} ${i.creators||''}`} compareItems={()=>0}/>} 
