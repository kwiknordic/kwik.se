import Link from 'next/link'
import ServerPager from '../ui/ServerPager'
import { formatDateSv } from '../../lib/format'
import styles from './BlogList.module.css'

export type BlogListItem = { slug: string; title: string; language: 'sv' | 'en'; langFlag: string; date: string; excerpt: string; readingMinutes: number; num: string }
const PAGE_SIZE = 5
const LANGS: [string, string][] = [['alla', 'Alla'], ['sv', 'Svenska'], ['en', 'English']]

export default function BlogList({ posts, lang = 'alla', query = '', page = 1 }: { posts: BlogListItem[]; lang?: string; query?: string; page?: number }) {
  const activeLang = LANGS.some(([value]) => value === lang) ? lang : 'alla'
  const q = query.trim().toLowerCase()
  const filtered = posts.filter((post) => (activeLang === 'alla' || post.language === activeLang) && (!q || post.title.toLowerCase().includes(q) || post.excerpt.toLowerCase().includes(q)))
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const safePage = Math.min(Math.max(page, 1), pageCount)
  const shown = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE)
  const hrefFor = (nextPage: number, nextLang = activeLang, nextQuery = query) => {
    const params = new URLSearchParams()
    if (nextLang !== 'alla') params.set('lang', nextLang)
    if (nextQuery.trim()) params.set('q', nextQuery.trim())
    if (nextPage > 1) params.set('page', String(nextPage))
    const value = params.toString()
    return `/blogg${value ? `?${value}` : ''}`
  }
  return <>
    <div className={`${styles['blog-controls']} reveal`}><form className="search-box" action="/blogg" role="search"><i className="pi pi-search search-ic" aria-hidden="true" /><input className="search-input" name="q" defaultValue={query} placeholder="Sök inlägg…" aria-label="Sök inlägg" /></form><div className={styles['blog-filter-bar']}><div className="filter-row" style={{ marginBottom: 0 }}><span className="filter-label">Språk</span>{LANGS.map(([value, label]) => <Link key={value} className={'chip' + (activeLang === value ? ' active' : '')} href={hrefFor(1, value)} aria-current={activeLang === value ? 'page' : undefined}>{label}{value !== 'alla' && <span className="chip-count">{posts.filter((post) => post.language === value).length}</span>}</Link>)}</div></div></div>
    {(q || activeLang !== 'alla') && <p className="result-count reveal"><b>{filtered.length}</b> inlägg hittades</p>}
    {filtered.length === 0 ? <div className="empty-state reveal"><p className="hand">Inga inlägg hittades.</p></div> : <div className={styles['blog-list']}>{shown.map((post) => <Link className={styles['blog-row']} key={post.slug} href={`/blogg/${post.slug}`}><span className={styles['blog-num']}>{post.num}</span><div><h2>{post.title}</h2><p>{post.excerpt}</p><div className={styles['blog-meta']}><span className={styles['blog-lang-badge']}>{post.langFlag}</span><span>{formatDateSv(post.date)}</span><span className={styles['blog-dot']} /><span>{post.readingMinutes} min</span></div></div><span className={styles['blog-arrow']}><i className="pi pi-arrow-right" aria-hidden="true" /></span></Link>)}</div>}
    <ServerPager page={safePage} pageCount={pageCount} hrefForPage={(nextPage) => hrefFor(nextPage)} />
  </>
}
