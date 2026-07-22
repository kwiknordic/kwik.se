import { apiError } from './http'
import { z } from 'zod'

export type Pagination = { limit: number; cursor: number }

export function parseQuery<T extends z.ZodType>(schema: T, request: Request): z.output<T> | Response {
  const input = Object.fromEntries(new URL(request.url).searchParams)
  const result = schema.safeParse(input)

  if (!result.success) return apiError(400, 'Invalid query parameters.')
  return result.data
}

export function paginate<T>(items: T[], { limit, cursor }: Pagination) {
  const page = items.slice(cursor, cursor + limit)
  const nextOffset = cursor + page.length

  return {
    data: page,
    pagination: {
      limit,
      nextCursor: nextOffset < items.length ? String(nextOffset) : null,
      total: items.length,
    },
  }
}

export function includesQuery(value: unknown, query: string | null | undefined): boolean {
  if (!query) return true
  return JSON.stringify(value).toLocaleLowerCase().includes(query.toLocaleLowerCase())
}
