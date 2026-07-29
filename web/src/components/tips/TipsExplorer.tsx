'use client'

import { usePathname, useRouter } from 'next/navigation'
import ArticleTable from './ArticleTable'
import BookTable from './BookTable'
import MovieTable from './MovieTable'
import PodcastTable from './PodcastTable'
import type { ArticleItem, CollectionItem, CollectionType } from '../../lib/collection'
import styles from './TipsExplorer.module.css'

const collectionTabs: { kind: CollectionType; label: string; icon: string }[] = [
  { kind: 'movies', label: 'Filmer', icon: 'pi-video' },
  { kind: 'books', label: 'Böcker', icon: 'pi-book' },
  { kind: 'articles', label: 'Artiklar', icon: 'pi-pen-to-square' },
  { kind: 'podcasts', label: 'Poddar', icon: 'pi-headphones' },
]

const tabSlugs: Record<CollectionType, string> = {
  movies: 'filmer',
  books: 'bocker',
  articles: 'artiklar',
  podcasts: 'podcasts',
}

export default function TipsExplorer({
  movies,
  books,
  podcasts,
  articles,
  initialKind = 'movies',
}: {
  movies: CollectionItem[]
  books: CollectionItem[]
  podcasts: CollectionItem[]
  articles: ArticleItem[]
  initialKind?: CollectionType
}) {
  const pathname = usePathname()
  const router = useRouter()
  const kind = collectionTabs.find((tab) => `/tips/${tabSlugs[tab.kind]}` === pathname)?.kind ?? initialKind

  const pick = (k: CollectionType) => {
    router.push(`/tips/${tabSlugs[k]}`)
  }

  return (
    <>
      <div className={styles['tips-toggle']} role="tablist">
        {collectionTabs.map((tab) => {
          return <button
            key={tab.kind}
            className={kind === tab.kind ? styles.on : ''}
            onClick={() => pick(tab.kind)}
            role="tab"
            aria-selected={kind === tab.kind}
          >
            <i className={`pi ${tab.icon}`} aria-hidden="true" /> {tab.label}
          </button>
        })}
      </div>

      {kind === 'movies' && <MovieTable items={movies} />}
      {kind === 'books' && <BookTable items={books} />}
      {kind === 'articles' && <ArticleTable items={articles} />}
      {kind === 'podcasts' && <PodcastTable items={podcasts} />}
    </>
  )
}
