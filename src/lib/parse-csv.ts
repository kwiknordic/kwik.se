import fs from 'node:fs/promises'
import { parse } from 'csv-parse/sync'

export async function parseCsv(filePath: string) {
  const csv = await fs.readFile(filePath, 'utf8')

  return parse(csv, {
    columns: true,
    skip_empty_lines: true,
  })
}
