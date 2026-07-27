export class MovielensAuthError extends Error {
  constructor(message = 'Movielens session cookie is invalid or expired') {
    super(message)
    this.name = 'AuthenticationError'
  }
}

type MovielensCookie = {
  url: string
  key: string
  value: string
}

export async function fetchMovielens({ url, key, value }: MovielensCookie): Promise<string> {
  let response: Response

  try {
    response = await fetch(url, {
      headers: {
        Cookie: `${key}=${value}`,
        Accept: 'text/csv',
      },
      redirect: 'manual',
      signal: AbortSignal.timeout(15_000),
    })
  } catch (error) {
    throw new Error('Could not reach Movielens', { cause: error })
  }

  if (response.status == 401) {
    throw new MovielensAuthError(
      'Movielens login cookie is invalid or expired. Update MOVIELENS_COOKIE_VALUE.',
    )
  }

  if (!response.ok) {
    throw new Error(`Movielens request failed: ${response.status} ${response.statusText}`)
  }

  const contentType = response.headers.get('content-type') ?? ''

  if (!contentType.includes('text/csv')) {
    throw new Error(`Unexpected Movielens response type: ${contentType || 'missing'}`)
  }

  const csv = await response.text()

  if (!csv.trim()) {
    throw new Error('Movielens returned an empty OPML document.')
  }

  return csv
}
