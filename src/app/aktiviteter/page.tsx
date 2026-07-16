import type { Metadata } from 'next'
import activities from '../../data/activities.js'
import { computeActivityStats, type ActivityEvent } from '../../lib/activities'
import StatsBand from '@/src/components/activities/StatsBand'
import Timeline from '@/src/components/activities/Timeline'

export const metadata: Metadata = {
  title: 'Aktiviteter',
  description: 'Meetups, mässor och hackkvällar runt om i Stockholm.',
}

export default function ActivitiesPage() {
  const list = activities as ActivityEvent[]
  const stats = computeActivityStats(list)

  return (
    <main className="page">
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
