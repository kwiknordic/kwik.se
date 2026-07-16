/* Types + stats helper for the Activities page. The data itself
   lives in src/data/activities.js. */

export type Speaker = { name: string; position?: string | null; employer?: string | null }

export type ActivityEvent = {
  eventId: string | number
  title: string
  date: string
  at: string
  attendees: number
  summary: string | null
  speakers: Speaker[]
}

export type ActivityStats = {
  events: number
  speakers: number
  venues: number
  attendees: number
  minYear: number
  maxYear: number
  years: number
}

/** Aggregate headline numbers for the stats band. */
export function computeActivityStats(activities: ActivityEvent[]): ActivityStats {
  const speakers = new Set<string>()
  const venues = new Set<string>()
  let attendees = 0
  let minYear = 9999
  let maxYear = 0

  for (const a of activities) {
    for (const s of a.speakers || []) if (s.name) speakers.add(s.name)
    if (a.at) venues.add(a.at)
    attendees += a.attendees || 0
    const y = new Date(a.date).getUTCFullYear()
    if (!isNaN(y)) {
      minYear = Math.min(minYear, y)
      maxYear = Math.max(maxYear, y)
    }
  }

  return {
    events: activities.length,
    speakers: speakers.size,
    venues: venues.size,
    attendees,
    minYear,
    maxYear,
    years: maxYear - minYear + 1,
  }
}
