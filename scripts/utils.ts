import path from 'node:path'
import fs from 'node:fs/promises'

export function dataPath(filePath: string) {
  return path.join(process.cwd(), 'src/data', filePath)
}

export async function writeJson(filePath: string, data: unknown) {
  await fs.writeFile(filePath, `${JSON.stringify(data, null, 2)}\n`, 'utf8')
}

export async function writeText(filePath: string, data: string) {
  await fs.writeFile(filePath, data, 'utf8')
}
