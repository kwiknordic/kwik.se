'use client'

import { useMemo, useRef, useState } from 'react'
import EventCard from './EventCard'
import Pager from '../ui/Pager'
import { scrollToRef } from '../../lib/scroll'
import type { ActivityEvent } from '../../lib/activities'
import styles from './Timeline.module.css'

const PAGE_SIZE = 8

/* Paginated, year-grouped timeline of events (newest first).
   Pagination is the only interactive bit, so this is a client island. */
export default function Timeline({ activities }: { activities: ActivityEvent[] }) {
  const [page, setPage] = useState(1)
  const topRef = useRef<HTMLDivElement>(null)

  const sorted = useMemo(
    () => [...activities].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    [activities],
  )

  // Total events per year (independent of paging) for the year marker count.
  const yearTotals = useMemo(() => {
    const m = new Map<number, number>()
    for (const a of sorted) {
      const y = new Date(a.date).getUTCFullYear()
      m.set(y, (m.get(y) || 0) + 1)
    }
    return m
  }, [sorted])

  const pageCount = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE))
  const safePage = Math.min(page, pageCount)
  const pageItems = sorted.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE)

  // Group just the current page's events by year, newest first.
  const groups = new Map<number, ActivityEvent[]>()
  for (const a of pageItems) {
    const y = new Date(a.date).getUTCFullYear()
    if (!groups.has(y)) groups.set(y, [])
    groups.get(y)!.push(a)
  }
  const orderedGroups = [...groups.entries()].sort((a, b) => b[0] - a[0])

  const goPage = (p: number) => {
    setPage(p)
    scrollToRef(topRef)
  }

  return (
    <>
      <div className={styles.timeline} ref={topRef}>
        {orderedGroups.map(([year, evs]) => {
          const total = yearTotals.get(year) ?? evs.length
          return (
            <div className={styles['year-group']} key={year}>
              <div className={styles['year-marker']}>
                <span className={styles['year-dot']} />
                <span className={styles['year-label']}>
                  {year}
                  <span>
                    {total} {total === 1 ? 'tillfälle' : 'tillfällen'}
                  </span>
                </span>
              </div>
              <div className={styles['event-list']}>
                {evs.map((ev) => (
                  <EventCard key={String(ev.eventId) + ev.date} ev={ev} />
                ))}
              </div>
            </div>
          )
        })}
      </div>
      <Pager page={safePage} pageCount={pageCount} onChange={goPage} />
    </>
  )
}
