import type { Metadata } from 'next'
import GalleryGrid from '@/src/components/gallery/GalleryGrid'

export const metadata: Metadata = {
  title: 'Ögonblick',
  description: 'Ögonblick från resor, träffar, stan och skrivbordet.',
}

export default function GalleryPage() {
  return (
    <main className="page">
      <div className="page-head reveal">
        <span className="eyebrow">Mellan raderna</span>
        <h1 className="page-title">
          Ögonblick
        </h1>
        <p className="page-sub">
          Något från resor, träffar, stan och skrivbordet.
        </p>
      </div>

      <GalleryGrid />
    </main >
  )
}
