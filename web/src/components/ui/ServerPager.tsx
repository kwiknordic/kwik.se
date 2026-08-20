import Link from 'next/link'
import styles from './Pager.module.css'

type ServerPagerProps = { page: number; pageCount: number; hrefForPage: (page: number) => string }

export default function ServerPager({ page, pageCount, hrefForPage }: ServerPagerProps) {
  if (pageCount <= 1) return null
  const nums: (number | '...')[] = []
  for (let i = 1; i <= pageCount; i++) {
    if (i === 1 || i === pageCount || (i >= page - 1 && i <= page + 1)) nums.push(i)
    else if (nums[nums.length - 1] !== '...') nums.push('...')
  }
  return <nav className={styles.pager} aria-label="Page navigation">
    <Link className={styles['pager-arrow']} href={hrefForPage(Math.max(1, page - 1))} aria-disabled={page === 1} tabIndex={page === 1 ? -1 : undefined} aria-label="Previous page"><i className="pi pi-chevron-left" aria-hidden="true" /></Link>
    <div className={styles['pager-nums']}>{nums.map((n, i) => n === '...' ? <span className={styles['pager-gap']} key={`gap-${i}`}>...</span> : <Link key={n} className={styles['pager-num'] + (n === page ? ` ${styles.active}` : '')} aria-current={n === page ? 'page' : undefined} href={hrefForPage(n)}>{n}</Link>)}</div>
    <Link className={styles['pager-arrow']} href={hrefForPage(Math.min(pageCount, page + 1))} aria-disabled={page === pageCount} tabIndex={page === pageCount ? -1 : undefined} aria-label="Next page"><i className="pi pi-chevron-right" aria-hidden="true" /></Link>
  </nav>
}
