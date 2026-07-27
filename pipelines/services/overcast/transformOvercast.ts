import { XMLParser } from 'fast-xml-parser'

const xmlParser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '',
})

export type Opml = {
  opml: {
    head: {
      title: string
    }
    body: {
      outline?: Outline | Outline[]
    }
  }
}

type Outline = {
  type?: string
  overcastId?: string
  text?: string
  title?: string
  xmlUrl?: string
  htmlUrl?: string
  pubDate?: string
  url?: string
  overcastUrl?: string
  enclosureUrl?: string
  userUpdatedDate?: string
  progress?: string
  played?: string
  userDeleted?: string
  outline?: Outline | Outline[]
}

type PlayedEpisode = {
  id?: string
  podcastId?: string
  podcastTitle?: string
  title?: string
  publishedAt?: string
  audioUrl?: string
  progress: number
  playedAt?: string
  deleted: boolean
}

function asArray<T>(value: T | T[] | undefined): T[] {
  return value === undefined ? [] : Array.isArray(value) ? value : [value]
}

function decodeXmlEntities(value: unknown): unknown {
  if (typeof value === 'string') {
    return value.replace(
      /&(?:#x([\da-f]+)|#(\d+)|amp|lt|gt|quot|apos);/gi,
      (entity, hex, decimal) => {
        if (hex !== undefined) return String.fromCodePoint(Number.parseInt(hex, 16))
        if (decimal !== undefined) return String.fromCodePoint(Number.parseInt(decimal, 10))

        return (
          {
            '&amp;': '&',
            '&lt;': '<',
            '&gt;': '>',
            '&quot;': '"',
            '&apos;': "'",
          }[entity.toLowerCase()] ?? entity
        )
      },
    )
  }

  if (Array.isArray(value)) return value.map((item) => decodeXmlEntities(item))

  if (value !== null && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, decodeXmlEntities(item)]),
    )
  }

  return value
}

function collect(outline: Outline, podcast?: Outline): PlayedEpisode[] {
  const currentPodcast = outline.type === 'rss' ? outline : podcast
  const episodes: PlayedEpisode[] =
    outline.type === 'podcast-episode' && outline.played === '1'
      ? [
          {
            id: outline.overcastId,
            podcastId: currentPodcast?.overcastId,
            podcastTitle: currentPodcast?.title ?? currentPodcast?.text,
            title: outline.title ?? outline.text,
            publishedAt: outline.pubDate,
            audioUrl: outline.enclosureUrl,
            progress: Number(outline.progress ?? 0),
            playedAt: outline.userUpdatedDate,
            // Deliberately retain deleted episodes in this export.
            deleted: outline.userDeleted === '1',
          },
        ]
      : []

  return episodes.concat(
    asArray(outline.outline).flatMap((child) => collect(child, currentPodcast)),
  )
}

export function extract(opml: Opml) {
  const outlines = asArray(opml.opml?.body?.outline)

  return outlines.flatMap((outline) => collect(outline))
}

export function transformOvercast(xml: string) {
  return extract(decodeXmlEntities(xmlParser.parse(xml)) as Opml)
}

export function parseXml(xml: string) {
  return decodeXmlEntities(xmlParser.parse(xml))
}
