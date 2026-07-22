'use client'

import { useEffect, useState } from 'react'
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

export default function TipsExplorer({
  movies,
  books,
  podcasts,
  articles,
}: {
  movies: CollectionItem[]
  books: CollectionItem[]
  podcasts: CollectionItem[]
  articles: ArticleItem[]
}) {
  const [kind, setKind] = useState<CollectionType>('movies')
  const [loadedArticles, setLoadedArticles] = useState(articles)

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const response = await fetch('/api/tips/articles')
        if (!response.ok) return
        const data = await response.json()
        if (Array.isArray(data)) setLoadedArticles(data)
      } catch {
        /* Articles remain empty if the prefetch fails. */
      }
    }

    const timer = window.setTimeout(loadArticles, 0)
    return () => window.clearTimeout(timer)
  }, [])

  const pick = (k: CollectionType) => {
    setKind(k)
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
      {kind === 'articles' && <ArticleTable items={loadedArticles} />}
      {kind === 'podcasts' && <PodcastTable items={podcasts} />}
    </>
  )
}
