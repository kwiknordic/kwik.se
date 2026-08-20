import Stars from '../ui/Stars'
import { COLLECTION_CONFIG, type CollectionItem } from '../../lib/collection'
import TipsDataTable, { type TipsColumn, type TipsFilters } from './TipsDataTable'

const columns: TipsColumn<CollectionItem>[] = [
  { id: 'title', header: 'Titel', render: (item) => <div className="flex flex-col"><span className="tbl-title" title={item.title}>{item.title}</span><div className="flex min-w-0 gap-2 items-center"><i className="pi pi-user accent" aria-hidden="true" /><span className="min-w-0 truncate" title={item.author}>{item.author}</span></div></div>, cellClassName: 'tbl-title-cell' },
  { id: 'rating', header: 'Betyg', render: (item) => <Stars rating={item.rating} size={13} />, cellClassName: 'tbl-rating-cell', compactHidden: true, width: '15ch' },
]

export default function BookTable({ items, filters, basePath }: { items: CollectionItem[]; filters: TipsFilters; basePath: string }) {
  return <TipsDataTable columns={columns} items={items} {...COLLECTION_CONFIG.books} filters={filters} basePath={basePath} getSearchText={(item) => `${item.title} ${item.author || ''}`} getRating={(item) => item.rating} compareItems={(a, b) => b.rating - a.rating || a.title.localeCompare(b.title, 'sv')} />
}