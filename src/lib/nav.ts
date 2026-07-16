/* ============================================================
   Site navigation + contact details, shared by the Header and
   Footer so the two never drift apart. Contact URLs mirror
   src/data/about.js (the single source of truth for content).
   ============================================================ */

export type NavTab = { href: string; label: string }

/** Top navigation — order matters, it's reused in the footer too. */
export const NAV_TABS: NavTab[] = [
  { href: '/', label: 'Hem' },
  { href: '/aktiviteter', label: 'Aktiviteter' },
  { href: '/tips', label: 'Tips' },
  { href: '/galleri', label: 'Ögonblick' },
  { href: '/blogg', label: 'Blogg' },
]

/** Resolve the active tab for a pathname (longest matching href wins). */
export function isActiveTab(tab: NavTab, pathname: string): boolean {
  if (tab.href === '/') return pathname === '/'
  return pathname === tab.href || pathname.startsWith(tab.href + '/')
}
