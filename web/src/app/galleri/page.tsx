import type { Metadata } from 'next'
import GalleryGrid from '@/src/components/gallery/GalleryGrid'
import galleryUrls from '@/src/data/gallery.json'
import StructuredData from '@/src/components/seo/StructuredData'

export const metadata: Metadata = {
  alternates: { canonical: '/galleri' },
  title: 'Ögonblick',
  description: 'Ögonblick från resor, träffar, stan och skrivbordet.',
}

export default function GalleryPage() {
  return (
    <main className="page">
      <StructuredData
        id="kwik-galleri"
        data={{
          '@context': 'https://schema.org',
          '@type': 'ImageGallery',
          name: 'Ögonblick – Kwik',
          description: 'Bilder från resor, träffar, Stockholm och skrivbordet.',
          url: 'https://kwik.se/galleri',
          inLanguage: 'sv-SE',
          numberOfItems: galleryUrls.length,
          author: { '@type': 'Person', name: 'Mervin Bratic' },
        }}
      />
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
