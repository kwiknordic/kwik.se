import type { ReactNode } from 'react'
import type { ActivityStats } from '../../lib/activities'
import styles from './StatsBand.module.css'

const fmt = (n: number) => n.toLocaleString('sv-SE')

/* Headline numbers for the Activities page. Server component —
   the stats are computed once on the server. */
export default function StatsBand({ stats }: { stats: ActivityStats }) {
  const items: { num: string; label: ReactNode }[] = [
    { num: fmt(stats.events), label: <>aktiviteter jag <b>deltagit på</b></> },
    { num: fmt(stats.speakers), label: <>talare jag <b>lyssnat till</b></> },
    { num: '~' + fmt(Math.round(stats.attendees / 10) * 10), label: <>utvecklare i <b>samma rum</b></> },
    { num: fmt(stats.venues), label: <>unika <b>platser</b></> },
    { num: `${stats.minYear}–${String(stats.maxYear).slice(2)}`, label: <><b>{stats.years} år</b> i rörelse</> },
  ]

  return (
    <div className={`${styles['stats-band']} reveal`}>
      {items.map((it, i) => (
        <div className={styles.stat} key={i}>
          <div className={styles['stat-num']}>{it.num}</div>
          <div className={styles['stat-label']}>{it.label}</div>
        </div>
      ))}
    </div>
  )
}
