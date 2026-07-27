import type { Metadata } from 'next'
import activities from '@/src/data/activities'
import { computeActivityStats, type ActivityEvent } from '@/src/lib/activities'
import StatsBand from '@/src/components/activities/StatsBand'
import Timeline from '@/src/components/activities/Timeline'
import StructuredData from '@/src/components/seo/StructuredData'

export const metadata: Metadata = {
  alternates: { canonical: '/aktiviteter' },
  title: 'Aktiviteter',
  description: 'Meetups, mässor och hackkvällar runt om i Stockholm.',
}

export default function ActivitiesPage() {
  const list = activities as ActivityEvent[]
  const stats = computeActivityStats(list)

  return (
    <main className="page">
      <StructuredData
        id="kwik-aktiviteter"
        data={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Aktiviteter – Kwik',
          description: 'Meetups, mässor och hackkvällar som Mervin Bratic har deltagit i runt om i Stockholm.',
          url: 'https://kwik.se/aktiviteter',
          inLanguage: 'sv-SE',
          numberOfItems: list.length,
          about: list.map((activity) => ({
            '@type': 'Event',
            name: activity.title,
            startDate: activity.date,
            location: { '@type': 'Place', name: activity.at, address: { '@type': 'PostalAddress', addressLocality: 'Stockholm', addressCountry: 'SE' } },
          })),
        }}
      />
      <div className="page-head reveal">
        <span className="eyebrow">Se vart jag varit</span>
        <h1 className="page-title">
          Aktiviteter
        </h1>
        <p className="page-sub">
          Meetups, mässor och hackkvällar runt om i Stockholm.
        </p>
      </div>

      <StatsBand stats={stats} />
      <Timeline activities={list} />
    </main>
  )
}
