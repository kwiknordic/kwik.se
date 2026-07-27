export function createFileNameByDate(date: Date): string {
  const now = date ?? new Date()

  const year = now.getUTCFullYear()
  const month = String(now.getUTCMonth() + 1).padStart(2, '0')
  const day = String(now.getUTCDate()).padStart(2, '0')

  return [`year=${year}`, `month=${month}`, `day=${day}`].join('/')
}
