'use client'

import styles from './Pager.module.css'

/* ============================================================
   Numbered pagination, shared by every paged list (blog, tips,
   gallery, activities). Shows first/last + a window around the
   current page, collapsing the rest into "…". Ported from the
   design's <Pager>.
   ============================================================ */

type PagerProps = {
  page: number
  pageCount: number
  onChange: (page: number) => void
}

export default function Pager({ page, pageCount, onChange }: PagerProps) {
  if (pageCount <= 1) return null

  const window = 1
  const nums: (number | '…')[] = []
  for (let i = 1; i <= pageCount; i++) {
    if (i === 1 || i === pageCount || (i >= page - window && i <= page + window)) {
      nums.push(i)
    } else if (nums[nums.length - 1] !== '…') {
      nums.push('…')
    }
  }

  const go = (p: number) => {
    if (p >= 1 && p <= pageCount && p !== page) onChange(p)
  }

  return (
    <nav className={styles.pager} aria-label="Sidnavigering">
      <button className={styles['pager-arrow']} disabled={page === 1} onClick={() => go(page - 1)} aria-label="Föregående sida">
        <i className="pi pi-chevron-left" aria-hidden="true" />
      </button>
      <div className={styles['pager-nums']}>
        {nums.map((n, i) =>
          n === '…' ? (
            <span className={styles['pager-gap']} key={'gap-' + i}>
              …
            </span>
          ) : (
            <button
              key={n}
              className={styles['pager-num'] + (n === page ? ' ' + styles.active : '')}
              aria-current={n === page ? 'page' : undefined}
              onClick={() => go(n)}
            >
              {n}
            </button>
          ),
        )}
      </div>
      <button
        className={styles['pager-arrow']}
        disabled={page === pageCount}
        onClick={() => go(page + 1)}
        aria-label="Nästa sida"
      >
        <i className="pi pi-chevron-right" aria-hidden="true" />
      </button>
    </nav>
  )
}
