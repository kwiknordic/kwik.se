export type SearchParam = string | string[] | undefined

export function firstSearchParam(value: SearchParam, fallback = '') {
  return (Array.isArray(value) ? value[0] : value) ?? fallback
}

export function positivePageParam(value: SearchParam) {
  const page = Number(firstSearchParam(value, '1'))
  return Number.isInteger(page) && page > 0 ? page : 1
}
