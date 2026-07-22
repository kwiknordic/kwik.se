import type { RefObject } from 'react'

/* Smoothly scroll the window so the top of `ref` sits just below the
   sticky header (~90px). Used when paging through long lists.
   Browser-only — call it from event handlers in client components. */
export function scrollToRef(ref: RefObject<HTMLElement | null>) {
  const el = ref.current
  const y = el ? el.getBoundingClientRect().top + window.scrollY - 90 : 0
  window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' })
}
