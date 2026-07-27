export class OvercastAuthError extends Error {
  constructor(message = 'Overcast session cookie is invalid or expired') {
    super(message)
    this.name = 'AuthenticationError'
  }
}

type OvercastCookie = {
  url: string
  key: string
  value: string
}

export async function fetchOvercast({ url, key, value }: OvercastCookie): Promise<string> {
  let response: Response

  try {
    response = await fetch(url, {
      headers: {
        Cookie: `${key}=${value}`,
        Accept: 'application/xml',
      },
      redirect: 'manual',
      signal: AbortSignal.timeout(15_000),
    })
  } catch (error) {
    throw new Error('Could not reach Overcast', { cause: error })
  }

  const location = response.headers.get('location')

  if (response.status >= 300 && response.status < 400 && location?.includes('/login')) {
    throw new OvercastAuthError(
      'Overcast login cookie is invalid or expired. Update OVERCAST_COOKIE_VALUE.',
    )
  }

  if (!response.ok) {
    throw new Error(`Overcast request failed: ${response.status} ${response.statusText}`)
  }

  const contentType = response.headers.get('content-type') ?? ''

  if (!contentType.includes('application/xml')) {
    throw new Error(`Unexpected Overcast response type: ${contentType || 'missing'}`)
  }

  const xml = await response.text()

  if (!xml.trim()) {
    throw new Error('Overcast returned an empty OPML document.')
  }

  return xml
}
