import { notFound } from 'next/navigation'
import TipsPage, { type TipsSearchParams } from '../page'
import type { CollectionType } from '@/src/lib/collection'

const tabKinds: Record<string, CollectionType> = {
  filmer: 'movies',
  bocker: 'books',
  artiklar: 'articles',
  podcasts: 'podcasts',
}

export default async function TipsTabPage({ params, searchParams }: { params: Promise<{ tab: string }>; searchParams: Promise<TipsSearchParams> }) {
  const { tab } = await params
  const initialKind = tabKinds[tab]
  if (!initialKind) notFound()
  return <TipsPage initialKind={initialKind} basePath={`/tips/${tab}`} searchParams={await searchParams} />
}