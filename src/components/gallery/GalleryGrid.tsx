'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'
import Pager from '../ui/Pager'
import { scrollToRef } from '../../lib/scroll'
import galleryUrls from '../../data/gallery.json'
import styles from './GalleryGrid.module.css'
import { Skeleton } from "@/src/components/ui/skeleton"

type GalleryImage = {
  src: string
  tag: string
}

type Shot = GalleryImage & {
  id: string
}

const GALLERY: Shot[] = (galleryUrls as GalleryImage[]).map((image) => ({
  ...image,
  id: image.src,
}))

const TAGS = ['Alla', ...Array.from(new Set(GALLERY.map((shot) => shot.tag)))]
const PAGE_SIZE = 12

export default function GalleryGrid() {
  const [activeTag, setActiveTag] = useState('Alla')
  const [page, setPage] = useState(1)
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set())
  const gridTop = useRef<HTMLDivElement>(null)

  const filtered = activeTag === 'Alla' ? GALLERY : GALLERY.filter((shot) => shot.tag === activeTag)
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const safePage = Math.min(page, pageCount)
  const shown = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE)

  const selectTag = (tag: string) => {
    setActiveTag(tag)
    setPage(1)
  }

  const goPage = (nextPage: number) => {
    setPage(nextPage)
    scrollToRef(gridTop)
  }

  return (
    <>
      <div className="filter-row reveal">
        <span className="filter-label">Motiv</span>
        {TAGS.map((tag) => (
          <button
            key={tag}
            className={'chip' + (activeTag === tag ? ' active' : '')}
            onClick={() => selectTag(tag)}
          >
            {tag}
            {tag !== 'Alla' && (
              <span className="chip-count">{GALLERY.filter((shot) => shot.tag === tag).length}</span>
            )}
          </button>
        ))}
      </div>

      {activeTag !== 'Alla' && (
        <p className="result-count reveal">
          <b>{filtered.length}</b> {filtered.length === 1 ? 'bild' : 'bilder'}
        </p>
      )}

      <div className={`${styles['gallery-grid']} reveal`} ref={gridTop}>
        {shown.map((shot) => (
          <figure className={styles.card} key={shot.id}>
            <div
              className={styles['image-frame']}
              aria-busy={!loadedImages.has(shot.id)}
            >
              {!loadedImages.has(shot.id) && (
                <Skeleton className={styles.skeleton} aria-hidden="true" />
              )}
              <Image
                src={shot.src}
                alt="Ögonblick från Mervin Bratic"
                fill
                loading="lazy"
                onLoad={() => {
                  setLoadedImages((current) => {
                    const next = new Set(current)
                    next.add(shot.id)
                    return next
                  })
                }}
                className={`${styles.image} ${loadedImages.has(shot.id) ? styles.visible : styles.hidden}`}
              />
            </div>
          </figure>
        ))}
      </div>

      <Pager page={safePage} pageCount={pageCount} onChange={goPage} />
    </>
  )
}
