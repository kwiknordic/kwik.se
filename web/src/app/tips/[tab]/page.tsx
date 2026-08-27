import { notFound } from 'next/navigation'
import TipsPage, { type TipsSearchParams } from '../page'
import type { CollectionType } from '@/src/lib/collection'

const tabKinds = {
  filmer: 'movies',
  bocker: 'books',
  artiklar: 'articles',
  podcasts: 'podcasts',
} satisfies Record<string, CollectionType>

function isTipsTab(tab: string): tab is keyof typeof tabKinds {
  return Object.hasOwn(tabKinds, tab)
}

export default async function TipsTabPage({ params, searchParams }: { params: Promise<{ tab: string }>; searchParams: Promise<TipsSearchParams> }) {
  const { tab } = await params
  if (!isTipsTab(tab)) notFound()
  const initialKind = tabKinds[tab]
  return <TipsPage initialKind={initialKind} basePath={`/tips/${tab}`} searchParams={await searchParams} />
}
