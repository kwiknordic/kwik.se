import fs from 'node:fs/promises'
import { parse as parseCsvFile } from 'csv-parse/sync'
import { writeJson, dataPath } from './utils'

import { XMLParser } from 'fast-xml-parser'

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

const files = {
  movieRatings: {
    csv: '/movies/movielens-ratings.csv',
    json: '/movies/movielens-ratings.json',
  },
  movieWishlist: {
    csv: '/movies/movielens-wishlist.csv',
    json: '/movies/movielens-wishlist.json',
  },
  podcasts: {
    opml: '/podcasts/overcast.opml',
    json: '/podcasts/overcast.json',
  },
}

const xmlParser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '',
})

const podcastEpisodes = {
  asArray<T>(value: T | T[] | undefined): T[] {
    return value === undefined ? [] : Array.isArray(value) ? value : [value]
  },

  decodeXmlEntities(value: unknown): unknown {
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

    if (Array.isArray(value)) return value.map((item) => this.decodeXmlEntities(item))

    if (value !== null && typeof value === 'object') {
      return Object.fromEntries(
        Object.entries(value).map(([key, item]) => [key, this.decodeXmlEntities(item)]),
      )
    }

    return value
  },

  collect(outline: Outline, podcast?: Outline): PlayedEpisode[] {
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
      this.asArray(outline.outline).flatMap((child) => this.collect(child, currentPodcast)),
    )
  },

  extract(opml: { opml?: { body?: { outline?: Outline | Outline[] } } }) {
    const outlines = this.asArray(opml.opml?.body?.outline)

    return outlines.flatMap((outline) => this.collect(outline))
  },
}

const ratings = await parseCsv(dataPath(files.movieRatings.csv))
const wishlist = await parseCsv(dataPath(files.movieWishlist.csv))
const opml = await parseOPML(dataPath(files.podcasts.opml))
const podcasts = podcastEpisodes.extract(opml)

// TODO: loop through the json files and merge it with new records instead of rewriting it
await writeJson(dataPath(files.movieRatings.json), ratings)
await writeJson(dataPath(files.movieWishlist.json), wishlist)
await writeJson(dataPath(files.podcasts.json), podcasts)

console.log(`Wrote ${ratings.length} movieRatings`)
console.log(`Wrote ${wishlist.length} movieWishlists`)
console.log(`Wrote ${podcasts.length} podcasts`)

async function parseCsv(filePath: string) {
  const file = await fs.readFile(filePath, 'utf8')

  return parseCsvFile(file, {
    columns: true,
    skip_empty_lines: true,
  })
}

async function parseOPML(filePath: string) {
  const file = await fs.readFile(filePath, 'utf8')
  return podcastEpisodes.decodeXmlEntities(xmlParser.parse(file)) as {
    opml?: { body?: { outline?: Outline | Outline[] } }
  }
}
