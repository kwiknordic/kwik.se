"use client"
import type { ColumnDef } from '@tanstack/react-table'
import { formatDateSv } from '../../lib/format'
import { COLLECTION_CONFIG, type ArticleItem } from '../../lib/collection'
import { truncateTitle } from '@/src/lib/truncateTitle'
import TipsDataTable, { type TipsFilters } from './TipsDataTable'
import type { PreparedTipsTable } from './tipsTable.server'
const columns: ColumnDef<ArticleItem>[] = [
 {accessorKey:'title',header:'Titel',cell:({row})=><span className="tbl-title" title={row.original.title}>{truncateTitle(row.original.title)}</span>,meta:{cellClassName:'tbl-title-cell'}},
 {id:'source',header:'Länk',cell:({row})=>row.original.url?<a className="tbl-source-link" href={row.original.url} target="_blank" rel="noreferrer"><i className="pi pi-external-link" aria-hidden="true" /></a>:null},
 {id:'time',header:'Datum',cell:({row})=>formatDateSv(row.original.time?new Date(row.original.time*1000).toISOString():undefined),meta:{cellClassName:'tbl-date-cell',headerClassName:'tbl-date-cell'}},
]
export default function ArticleTable({items,filters,basePath,prepared}:{items:ArticleItem[];filters:TipsFilters;basePath:string;prepared:PreparedTipsTable<ArticleItem>}){return <TipsDataTable columns={columns} items={items} {...COLLECTION_CONFIG.articles} filters={filters} basePath={basePath} prepared={prepared} compactColumnVisibility={{time:false}} getSearchText={i=>`${i.title} ${i.source} ${i.category||''}`} compareItems={()=>0}/>} 
