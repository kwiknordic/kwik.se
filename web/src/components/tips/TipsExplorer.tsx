import Link from 'next/link'
import MovieTable from './MovieTable'
import BookTable from './BookTable'
import ArticleTable from './ArticleTable'
import PodcastTable from './PodcastTable'
import type { ArticleItem, CollectionItem, CollectionType } from '../../lib/collection'
import type { TipsFilters } from './TipsDataTable'
import type { PreparedTipsTable } from './tipsTable.server'
import styles from './TipsExplorer.module.css'

const collectionTabs: { kind: CollectionType; label: string; icon: string; slug: string }[] = [
  { kind: 'movies', label: 'Filmer', icon: 'pi-video', slug: 'filmer' },
  { kind: 'books', label: 'Böcker', icon: 'pi-book', slug: 'bocker' },
  { kind: 'articles', label: 'Artiklar', icon: 'pi-pen-to-square', slug: 'artiklar' },
  { kind: 'podcasts', label: 'Poddar', icon: 'pi-headphones', slug: 'podcasts' },
]

type TipsExplorerProps = {
  movies: CollectionItem[]
  books: CollectionItem[]
  podcasts: CollectionItem[]
  articles: ArticleItem[]
  initialKind?: CollectionType
  basePath: string
  filters: TipsFilters
  prepared: PreparedTipsTable
}

export default function TipsExplorer({ movies, books, podcasts, articles, initialKind = 'movies', basePath, filters, prepared }: TipsExplorerProps) {
  const kind = initialKind
  const tableProps = { filters, basePath }

  return (
    <>
      <nav className={styles['tips-toggle']} aria-label="Tipskategorier">
        {collectionTabs.map((tab) => <Link key={tab.kind} className={kind === tab.kind ? styles.on : ''} href={`/tips/${tab.slug}`} aria-current={kind === tab.kind ? 'page' : undefined}>
          <i className={`pi ${tab.icon}`} aria-hidden="true" /> {tab.label}
        </Link>)}
      </nav>
      {kind === 'movies' && <MovieTable items={prepared.items as typeof movies} {...tableProps} prepared={prepared as PreparedTipsTable<typeof movies[number]>} />}
      {kind === 'books' && <BookTable items={prepared.items as typeof books} {...tableProps} prepared={prepared as PreparedTipsTable<typeof books[number]>} />}
      {kind === 'articles' && <ArticleTable items={prepared.items as typeof articles} {...tableProps} prepared={prepared as PreparedTipsTable<typeof articles[number]>} />}
      {kind === 'podcasts' && <PodcastTable items={prepared.items as typeof podcasts} {...tableProps} prepared={prepared as PreparedTipsTable<typeof podcasts[number]>} />}
    </>
  )
}
