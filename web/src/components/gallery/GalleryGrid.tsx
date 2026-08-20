import Image from 'next/image'
import Link from 'next/link'
import galleryUrls from '../../data/gallery.json'
import ServerPager from '../ui/ServerPager'
import styles from './GalleryGrid.module.css'

type GalleryImage = { src: string; tag: string }
const GALLERY = galleryUrls as GalleryImage[]
const PAGE_SIZE = 12

export default function GalleryGrid({ tag = 'Alla', page = 1 }: { tag?: string; page?: number }) {
  const tags = ['Alla', ...Array.from(new Set(GALLERY.map((shot) => shot.tag)))]
  const activeTag = tags.includes(tag) ? tag : 'Alla'
  const filtered = activeTag === 'Alla' ? GALLERY : GALLERY.filter((shot) => shot.tag === activeTag)
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const safePage = Math.min(Math.max(page, 1), pageCount)
  const shown = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE)
  const hrefFor = (nextPage: number, nextTag = activeTag) => {
    const params = new URLSearchParams()
    if (nextTag !== 'Alla') params.set('tag', nextTag)
    if (nextPage > 1) params.set('page', String(nextPage))
    const query = params.toString()
    return `/galleri${query ? `?${query}` : ''}`
  }
  return <>
    <div className="filter-row reveal"><span className="filter-label">Motiv</span>{tags.map((item) => <Link key={item} className={'chip' + (activeTag === item ? ' active' : '')} href={hrefFor(1, item)} aria-current={activeTag === item ? 'page' : undefined}>{item}{item !== 'Alla' && <span className="chip-count">{GALLERY.filter((shot) => shot.tag === item).length}</span>}</Link>)}</div>
    {activeTag !== 'Alla' && <p className="result-count reveal"><b>{filtered.length}</b> {filtered.length === 1 ? 'bild' : 'bilder'}</p>}
    <div className={`${styles['gallery-grid']} reveal`}>{shown.map((shot) => <figure className={styles.card} key={shot.src}><div className={styles['image-frame']}><Image src={shot.src} alt="Ögonblick från Mervin Bratic" fill loading="lazy" className={styles.image} /></div></figure>)}</div>
    <ServerPager page={safePage} pageCount={pageCount} hrefForPage={(nextPage) => hrefFor(nextPage)} />
  </>
}
