/* ============================================================
   Small formatting helpers shared across the site.
   Swedish locale throughout (the site is in Swedish).
   ============================================================ */

const SV_MONTHS = ['jan', 'feb', 'mar', 'apr', 'maj', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec']
const SV_MONTHS_LONG = ['januari', 'februari', 'mars', 'april', 'maj', 'juni', 'juli', 'augusti', 'september', 'oktober', 'november', 'december']

/* We read dates in UTC everywhere (getUTC*) so output is identical on
   the server and in the browser regardless of timezone. This avoids
   React hydration mismatches and keeps date-only strings (parsed as
   UTC midnight, e.g. "2026-06-03") on the intended day. */

/** Format an ISO date string as e.g. "27 maj 2026" (or long month names). */
export function formatDateSv(iso: string | undefined, long = false): string {
  if (!iso) return ''
  const d = new Date(iso)
  if (isNaN(d.getTime())) return iso
  const months = long ? SV_MONTHS_LONG : SV_MONTHS
  return `${d.getUTCDate()} ${months[d.getUTCMonth()]} ${d.getUTCFullYear()}`
}

/** Year of an ISO date (UTC), or "—" when unparseable. */
export function yearOf(iso: string): number | string {
  const d = new Date(iso)
  return isNaN(d.getTime()) ? '—' : d.getUTCFullYear()
}

/** Rough reading time in minutes (~200 words/min, min 1). */
export function readingTime(text: string): number {
  const words = text.trim().split(/\s+/).length
  return Math.max(1, Math.round(words / 200))
}

/** Stable string hash → used to pick deterministic cover colours per slug. */
export function hashStr(s: string): number {
  let h = 0
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0
  return h
}

/* Cozy gradient palettes for blog covers / glyphs (from the design). */
const COVER_PALETTES: [string, string][] = [
  ['#41584d', '#28362f'], ['#c2613b', '#8f4022'], ['#3a4f63', '#243240'],
  ['#7a4b55', '#4d2f36'], ['#5c6438', '#3a3f23'], ['#2f6470', '#1d4047'],
  ['#8a5a36', '#5c3a20'], ['#564c66', '#352f41'], ['#864646', '#562d2d'],
  ['#476b6a', '#2c4443'], ['#9a7836', '#6a5224'], ['#3d4b78', '#262f4f'],
]

export function coverColors(seed: string): [string, string] {
  return COVER_PALETTES[hashStr(seed) % COVER_PALETTES.length]
}

/** Swedish "a, b och c" list joining. */
export function listFmt(arr: string[] | undefined): string {
  if (!arr || arr.length === 0) return ''
  if (arr.length === 1) return arr[0]
  return arr.slice(0, -1).join(', ') + ' och ' + arr[arr.length - 1]
}
