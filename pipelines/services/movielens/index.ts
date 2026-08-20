import { fetchMovielens, MovielensAuthError } from '@movielens/fetchMovielens'
import { createChecksum } from '@shared/utils/createChecksum'
import { parse as parseCsvFile } from 'csv-parse/sync'

interface MovielensJob {
  windowStart: string
  windowEnd: string
}

export default {
  async fetch() {
    return Response.json({ status: 'ok' })
  },

  async scheduled(controller: ScheduledController, env: Env) {
    const windowEnd = new Date(controller.scheduledTime)
    const windowStart = new Date(controller.scheduledTime)
    await env.QUEUE.send({ windowStart: windowStart.toISOString(), windowEnd: windowEnd.toISOString() })
  },

  async queue(batch, env: Env) {
    const {
      MOVIELENS_RATINGS_EXPORT_URL: ratingUrl,
      MOVIELENS_WISHLIST_EXPORT_URL: wishlistUrl,
      MOVIELENS_COOKIE_KEY: cookieKey,
      MOVIELENS_COOKIE_VALUE: cookieValue,
    } = env

    if (!cookieKey || !cookieValue)
      throw new MovielensAuthError('MOVIELENS_COOKIE is not configured.')

    for (const message of batch.messages) {
      try {
        const [csvRatings, csvWishlist] = await Promise.all([
          fetchMovielens({ url: ratingUrl, key: cookieKey, value: cookieValue }),
          fetchMovielens({ url: wishlistUrl, key: cookieKey, value: cookieValue }),
        ])

        await ingestMovieList({
          bucket: env.BUCKET,
          csv: csvRatings,
          kind: 'ratings',
          sourceEndpoint: env.MOVIELENS_RATINGS_EXPORT_URL,
          ingestedAt: message.timestamp.toISOString(),
        })
        await ingestMovieList({
          bucket: env.BUCKET,
          csv: csvWishlist,
          kind: 'wishlist',
          sourceEndpoint: env.MOVIELENS_WISHLIST_EXPORT_URL,
          ingestedAt: message.timestamp.toISOString(),
        })
        message.ack()
      } catch (error) {
        console.error('Movielens queue message failed', error)
        message.retry()
      }
    }
  },
} satisfies ExportedHandler<Env, Queue<MovielensJob>>

async function ingestMovieList({
  bucket,
  csv,
  kind,
  sourceEndpoint,
  ingestedAt,
}: {
  bucket: R2Bucket
  csv: string
  kind: 'ratings' | 'wishlist'
  sourceEndpoint: string
  ingestedAt: string
}) {
  const { checksum: rawChecksum, checksumBuffer: rawBuffer } = await createChecksum(csv)
  const rawKey = `raw/movielens/${kind}/${rawChecksum}.csv`
  const existingRaw = await bucket.head(rawKey)

  if (!existingRaw) {
    const raw = await bucket.put(rawKey, csv, {
      httpMetadata: { contentType: 'text/csv; charset=utf-8' },
      customMetadata: {
        source: 'movielens',
        source_endpoint: sourceEndpoint,
        ingested_at: ingestedAt,
        ChecksumSHA256: rawChecksum,
      },
      sha256: rawBuffer,
    })
    console.log('Success: ' + raw.key)
  } else {
    console.log(`Skipping previously ingested ${kind}: ${rawKey}.`)
  }

  const parsed = parseCsvFile(csv, { columns: true, skip_empty_lines: true })
  const json = JSON.stringify(parsed)
  const { checksum: transformChecksum, checksumBuffer: transformBuffer } = await createChecksum(json)
  const stagingKey = 'staging/movielens/' + kind + '/' + transformChecksum + '.json'
  if (!(await bucket.head(stagingKey))) {
    const staging = await bucket.put(stagingKey, json, {
      httpMetadata: { contentType: 'application/json; charset=utf-8' },
      customMetadata: {
        source: 'movielens',
        source_endpoint: sourceEndpoint,
        ChecksumSHA256: transformChecksum,
      },
      sha256: transformBuffer,
    })
    console.log('Success: ' + staging.key)
  }  const transformKey = `transform/movielens/${kind}/${transformChecksum}.json`
  let transform = await bucket.head(transformKey)

  if (!transform) {
    transform = await bucket.put(transformKey, json, {
      httpMetadata: { contentType: 'application/json; charset=utf-8' },
      customMetadata: {
        source: 'movielens',
        source_endpoint: sourceEndpoint,
        ChecksumSHA256: transformChecksum,
      },
      sha256: transformBuffer,
    })
    console.log('Success: ' + transform.key)
  } else {
    console.log(`Skipping previously transformed ${kind}: ${transformKey}.`)
  }

  const latestKey = `transform/movielens/${kind}/latest.json`
  await bucket.put(
    latestKey,
    JSON.stringify({ key: transformKey, modifiedAt: transform.uploaded.toISOString() }),
    { httpMetadata: { contentType: 'application/json; charset=utf-8' } },
  )
  console.log(`Published ${latestKey} -> ${transformKey}`)
}
