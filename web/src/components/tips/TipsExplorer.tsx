import Link from 'next/link'
import MovieTable from './MovieTable'
import BookTable from './BookTable'
import ArticleTable from './ArticleTable'
import PodcastTable from './PodcastTable'
import type { ArticleItem, CollectionItem, CollectionType } from '../../lib/collection'
import type { TipsFilters } from './TipsDataTable'
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
}

export default function TipsExplorer({ movies, books, podcasts, articles, initialKind = 'movies', basePath, filters }: TipsExplorerProps) {
  const kind = initialKind
  const tableProps = { filters, basePath }

  return (
    <>
      <nav className={styles['tips-toggle']} aria-label="Tipskategorier">
        {collectionTabs.map((tab) => <Link key={tab.kind} className={kind === tab.kind ? styles.on : ''} href={`/tips/${tab.slug}`} aria-current={kind === tab.kind ? 'page' : undefined}>
          <i className={`pi ${tab.icon}`} aria-hidden="true" /> {tab.label}
        </Link>)}
      </nav>
      {kind === 'movies' && <MovieTable items={movies} {...tableProps} />}
      {kind === 'books' && <BookTable items={books} {...tableProps} />}
      {kind === 'articles' && <ArticleTable items={articles} {...tableProps} />}
      {kind === 'podcasts' && <PodcastTable items={podcasts} {...tableProps} />}
    </>
  )
}