import { notFound } from 'next/navigation'
import TipsPage from '../page'
import type { CollectionType } from '@/src/lib/collection'

const tabKinds: Record<string, CollectionType> = {
  filmer: 'movies',
  bocker: 'books',
  artiklar: 'articles',
  podcasts: 'podcasts',
}

export default async function TipsTabPage({ params }: { params: Promise<{ tab: string }> }) {
  const { tab } = await params
  const initialKind = tabKinds[tab]

  if (!initialKind) notFound()

  return <TipsPage initialKind={initialKind} />
}
