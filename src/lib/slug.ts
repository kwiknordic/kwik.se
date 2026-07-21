export function slugify(value: string): string {
  return value
    .normalize('NFKD')
    .replace(/\p{Diacritic}/gu, '')
    .toLocaleLowerCase('sv-SE')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function assertUniqueSlugs(items: readonly { slug: string; name: string }[]): void {
  const seen = new Set<string>()

  for (const item of items) {
    if (!item.slug) throw new Error(`Cannot create a slug for "${item.name}".`)
    if (seen.has(item.slug)) throw new Error(`Duplicate generated slug: "${item.slug}".`)
    seen.add(item.slug)
  }
}
