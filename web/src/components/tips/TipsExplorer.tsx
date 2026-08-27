import Link from 'next/link'
import type { ReactNode } from 'react'
import type { CollectionType } from '../../lib/collection'
import styles from './TipsExplorer.module.css'

const collectionTabs: { kind: CollectionType; label: string; icon: string; slug: string }[] = [
  { kind: 'movies', label: 'Filmer', icon: 'pi-video', slug: 'filmer' },
  { kind: 'books', label: 'Böcker', icon: 'pi-book', slug: 'bocker' },
  { kind: 'articles', label: 'Artiklar', icon: 'pi-pen-to-square', slug: 'artiklar' },
  { kind: 'podcasts', label: 'Poddar', icon: 'pi-headphones', slug: 'podcasts' },
]

export default function TipsExplorer({ kind, children }: { kind: CollectionType; children: ReactNode }) {
  return <>
    <nav className={styles['tips-toggle']} aria-label="Tipskategorier">
      {collectionTabs.map((tab) => <Link key={tab.kind} className={kind === tab.kind ? styles.on : ''} href={`/tips/${tab.slug}`} aria-current={kind === tab.kind ? 'page' : undefined}>
        <i className={`pi ${tab.icon}`} aria-hidden="true" /> {tab.label}
      </Link>)}
    </nav>
    {children}
  </>
}
