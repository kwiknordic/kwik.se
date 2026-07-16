export function truncateTitle(title: string, maxLength = 100) {
  return title.length > maxLength ? `${title.slice(0, maxLength).trimEnd()} …` : title
}
