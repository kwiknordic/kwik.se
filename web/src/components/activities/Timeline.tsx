import Link from 'next/link'
import EventCard from './EventCard'
import type { ActivityEvent } from '../../lib/activities'
import styles from './Timeline.module.css'
import pagerStyles from '../ui/Pager.module.css'

const PAGE_SIZE = 8

/* Paginated, year-grouped timeline of events (newest first). */
export default function Timeline({ activities, page }: { activities: ActivityEvent[]; page: number }) {
  const sorted = [...activities].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  // Total events per year (independent of paging) for the year marker count.
  const yearTotals = new Map<number, number>()
  for (const a of sorted) {
    const y = new Date(a.date).getUTCFullYear()
    yearTotals.set(y, (yearTotals.get(y) || 0) + 1)
  }

  const pageCount = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE))
  const safePage = Math.min(Math.max(page, 1), pageCount)
  const pageItems = sorted.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE)

  // Group just the current page's events by year, newest first.
  const groups = new Map<number, ActivityEvent[]>()
  for (const a of pageItems) {
    const y = new Date(a.date).getUTCFullYear()
    if (!groups.has(y)) groups.set(y, [])
    groups.get(y)!.push(a)
  }
  const orderedGroups = [...groups.entries()].sort((a, b) => b[0] - a[0])

  const pageHref = (p: number) => (p === 1 ? '/aktiviteter' : `/aktiviteter?page=${p}`)

  const nums: (number | '…')[] = []
  for (let i = 1; i <= pageCount; i++) {
    if (i === 1 || i === pageCount || (i >= safePage - 1 && i <= safePage + 1)) {
      nums.push(i)
    } else if (nums[nums.length - 1] !== '…') {
      nums.push('…')
    }
  }

  return (
    <>
      <div className={styles.timeline} id="timeline">
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
      {pageCount > 1 && (
        <nav className={pagerStyles.pager} aria-label="Sidnavigering">
          {safePage === 1 ? (
            <span className={pagerStyles['pager-arrow']} aria-disabled="true">
              <i className="pi pi-chevron-left" aria-hidden="true" />
            </span>
          ) : (
            <Link className={pagerStyles['pager-arrow']} href={`${pageHref(safePage - 1)}#timeline`} aria-label="Föregående sida">
              <i className="pi pi-chevron-left" aria-hidden="true" />
            </Link>
          )}
          <div className={pagerStyles['pager-nums']}>
            {nums.map((n, i) =>
              n === '…' ? (
                <span className={pagerStyles['pager-gap']} key={`gap-${i}`}>…</span>
              ) : n === safePage ? (
                <span className={`${pagerStyles['pager-num']} ${pagerStyles.active}`} aria-current="page" key={n}>{n}</span>
              ) : (
                <Link className={pagerStyles['pager-num']} href={`${pageHref(n)}#timeline`} key={n}>{n}</Link>
              ),
            )}
          </div>
          {safePage === pageCount ? (
            <span className={pagerStyles['pager-arrow']} aria-disabled="true">
              <i className="pi pi-chevron-right" aria-hidden="true" />
            </span>
          ) : (
            <Link className={pagerStyles['pager-arrow']} href={`${pageHref(safePage + 1)}#timeline`} aria-label="Nästa sida">
              <i className="pi pi-chevron-right" aria-hidden="true" />
            </Link>
          )}
        </nav>
      )}
    </>
  )
}
