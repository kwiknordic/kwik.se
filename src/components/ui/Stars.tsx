'use client'

import { useId } from 'react'
import styles from './Stars.module.css'

/* ============================================================
   Read-only star rating (supports halves), ported from the
   design. A single SVG star path filled gold / half-gold / faint.
   Used inside the (client) Tips tables, so it lives client-side.
   ============================================================ */

const STAR_PATH = 'M12 2.4l2.95 5.98 6.6.96-4.78 4.66 1.13 6.57L12 17.5l-5.9 3.1 1.13-6.57L2.45 9.34l6.6-.96L12 2.4z'
const GOLD = 'var(--gold)'
const EMPTY = 'rgba(33,30,26,0.13)'

type Fill = 'full' | 'half' | 'empty'

function Star({ fill, size }: { fill: Fill; size: number }) {
  // Unique gradient id per half-star (useId avoids SSR collisions).
  const gradientId = 'star-half-' + useId().replace(/:/g, '')
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      {fill === 'half' && (
        <defs>
          <linearGradient id={gradientId}>
            <stop offset="50%" stopColor={GOLD} />
            <stop offset="50%" stopColor={EMPTY} />
          </linearGradient>
        </defs>
      )}
      <path d={STAR_PATH} fill={fill === 'full' ? GOLD : fill === 'half' ? `url(#${gradientId})` : EMPTY} />
    </svg>
  )
}

/** A single star glyph (filled gold or hollow) — used in rating filter chips. */
export function StarGlyph({ filled = true, size = 12 }: { filled?: boolean; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path d={STAR_PATH} fill={filled ? GOLD : EMPTY} />
    </svg>
  )
}

export default function Stars({ rating, size = 15 }: { rating: number; size?: number }) {
  const stars: Fill[] = []
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) stars.push('full')
    else if (rating >= i - 0.5) stars.push('half')
    else stars.push('empty')
  }
  return (
    <span className={styles.stars} title={`${rating} av 5`}>
      {stars.map((fill, i) => (
        <Star key={i} fill={fill} size={size} />
      ))}
    </span>
  )
}
