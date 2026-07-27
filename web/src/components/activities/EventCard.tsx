import { formatDateSv } from '@/src/lib/format'
import type { ActivityEvent, Speaker } from '@/src/lib/activities'
import styles from './EventCard.module.css'

function SpeakerChip({ speaker }: { speaker: Speaker }) {
  const hasRole = speaker.position || speaker.employer
  return (
    <span className={styles['speaker-chip']}>
      <span className={styles['speaker-text']}>
        <span className={styles['speaker-name']}>{speaker.name}</span>
        {hasRole && (
          <span className={styles['speaker-role']}>
            {speaker.position}
            {speaker.position && speaker.employer ? ' · ' : ''}
            {speaker.employer && <b>{speaker.employer}</b>}
          </span>
        )}
      </span>
    </span>
  )
}

/* One event in the activities timeline. */
export default function EventCard({ ev }: { ev: ActivityEvent }) {
  return (
    <article className={styles['event-card']}>
      <div className={styles['event-top']}>
        <h2 className={styles['event-title']}>{ev.title}</h2>
        <span className={styles['event-date']}>{formatDateSv(ev.date)}</span>
      </div>
      <div className={styles['event-meta']}>
        {ev.at && (
          <span className={styles['venue-badge']}>
            <i className="pi pi-map-marker" aria-hidden="true" /> {ev.at}
          </span>
        )}
        {ev.attendees > 0 && (
          <span className={styles['attendee-badge']}>
            <i className="pi pi-users" aria-hidden="true" /> {ev.attendees.toLocaleString('sv-SE')} deltagare
          </span>
        )}
      </div>
      {ev.summary && <p className={styles['event-summary']}>{ev.summary}</p>}
      {ev.speakers && ev.speakers.length > 0 ? (
        <div className={styles['speaker-chips']}>
          {ev.speakers.map((s, i) => (
            <SpeakerChip key={i} speaker={s} />
          ))}
        </div>
      ) : (
        <span className={styles['no-speaker']}>
          <i className="pi pi-microphone" aria-hidden="true" /> Mingel &amp; nätverkande
        </span>
      )}
    </article>
  )
}
