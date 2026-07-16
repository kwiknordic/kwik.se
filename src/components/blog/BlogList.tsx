'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import Pager from '../ui/Pager'
import SearchBox from '../ui/SearchBox'
import { scrollToRef } from '../../lib/scroll'
import { formatDateSv } from '../../lib/format'
import styles from './BlogList.module.css'

export type BlogListItem = {
  slug: string
  title: string
  language: 'sv' | 'en'
  langFlag: string
  date: string
  excerpt: string
  readingMinutes: number
  num: string
}

const PAGE_SIZE = 5
const LANGS: [string, string][] = [
  ['alle', 'Alla'],
  ['sv', 'Svenska'],
  ['en', 'English'],
]

/* Blog index: search + language filter + pagination, all client-side
   over the post list (bodies are not sent — just metadata + excerpt).
   Category chips from the prototype are omitted because src/data has
   no category field; language IS in the data, so that filter stays. */
export default function BlogList({ posts }: { posts: BlogListItem[] }) {
  const [activeLang, setActiveLang] = useState('alle')
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const listTop = useRef<HTMLDivElement>(null)

  const q = query.trim().toLowerCase()
  const filtered = posts.filter((p) => {
    if (activeLang !== 'alle' && p.language !== activeLang) return false
    if (q && !p.title.toLowerCase().includes(q) && !p.excerpt.toLowerCase().includes(q)) return false
    return true
  })

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const safePage = Math.min(page, pageCount)
  const shown = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE)
  const goPage = (p: number) => {
    setPage(p)
    scrollToRef(listTop)
  }

  const isFiltering = q !== '' || activeLang !== 'alle'

  return (
    <>
      <div className={`${styles['blog-controls']} reveal`}>
        <SearchBox value={query} onChange={(v) => { setQuery(v); setPage(1) }} placeholder="Sök inlägg…" ariaLabel="Sök inlägg" />

        <div className={styles['blog-filter-bar']}>
          <div className="filter-row" style={{ marginBottom: 0 }}>
            <span className="filter-label">Språk</span>
            {LANGS.map(([val, label]) => (
              <button
                key={val}
                className={'chip' + (activeLang === val ? ' active' : '')}
                onClick={() => { setActiveLang(val); setPage(1) }}
              >
                {label}
                {val !== 'alle' && <span className="chip-count">{posts.filter((p) => p.language === val).length}</span>}
              </button>
            ))}
          </div>
        </div>
      </div>

      {isFiltering && (
        <p className="result-count reveal">
          <b>{filtered.length}</b> inlägg hittades
        </p>
      )}

      {filtered.length === 0 ? (
        <div className="empty-state reveal">
          <p className="hand">Inga inlägg hittades.</p>
        </div>
      ) : (
        <div className={styles['blog-list']} ref={listTop}>
          {shown.map((p) => (
            <Link className={styles['blog-row']} key={p.slug} href={`/blogg/${p.slug}`}>
              <span className={styles['blog-num']}>{p.num}</span>
              <div>
                <h3>{p.title}</h3>
                <p>{p.excerpt}</p>
                <div className={styles['blog-meta']}>
                  <span className={styles['blog-lang-badge']}>{p.langFlag}</span>
                  <span>{formatDateSv(p.date)}</span>
                  <span className={styles['blog-dot']} />
                  <span>{p.readingMinutes} min</span>
                </div>
              </div>
              <span className={styles['blog-arrow']}>
                <i className="pi pi-arrow-right" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      )}

      <Pager page={safePage} pageCount={pageCount} onChange={goPage} />
    </>
  )
}
