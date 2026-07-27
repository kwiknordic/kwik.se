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

    // check the last windowStart in db, and tell the worker to only fetch from this point
    const windowStart = new Date(controller.scheduledTime)

    await env.QUEUE.send({
      windowStart: windowStart.toISOString(),
      windowEnd: windowEnd.toISOString(),
    })
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
        // raw step
        const csvRatings = await fetchMovielens({
          url: ratingUrl,
          key: cookieKey,
          value: cookieValue,
        })
        const { checksum: rawRatingsFileName, checksumBuffer: rawRatingsBuffer } =
          await createChecksum(csvRatings)
        const existingRatings = await env.BUCKET.head(rawRatingsFileName)

        const csvWishlist = await fetchMovielens({
          url: wishlistUrl,
          key: cookieKey,
          value: cookieValue,
        })
        const { checksum: rawWishlistFileName, checksumBuffer: rawWishlistBuffer } =
          await createChecksum(csvWishlist)
        const existingWishlist = await env.BUCKET.head(rawWishlistFileName)

        if (existingRatings) {
          console.log(`Skipping previously ingested ratings: ${csvRatings}.`)
        } else {
          const raw = await env.BUCKET.put(
            `raw/movielens/ratings/${rawRatingsFileName}.csv`,
            csvRatings,
            {
              httpMetadata: {
                contentType: 'text/csv; charset=utf-8',
              },
              customMetadata: {
                source: 'movielens',
                source_endpoint: env.MOVIELENS_RATINGS_EXPORT_URL,
                ingested_at: message.timestamp.toISOString(),
                ChecksumSHA256: rawRatingsFileName,
              },
              sha256: rawRatingsBuffer,
            },
          )

          console.log('Success: ' + raw.key)

          // stage step
          const parsed = parseCsvFile(csvRatings, {
            columns: true,
            skip_empty_lines: true,
          })
          const json = JSON.stringify(parsed)
          const { checksum: stagingFileName, checksumBuffer: stagingBuffer } =
            await createChecksum(json)
          const staging = await env.BUCKET.put(
            `staging/movielens/ratings/${stagingFileName}.json`,
            json,
            {
              httpMetadata: {
                contentType: 'application/json; charset=utf-8',
              },
              customMetadata: {
                source: 'movielens',
                source_endpoint: env.MOVIELENS_RATINGS_EXPORT_URL,
                ChecksumSHA256: stagingFileName,
              },
              sha256: stagingBuffer,
            },
          )

          console.log('Success: ' + staging.key)
        }

        if (existingWishlist) {
          console.log(`Skipping previously ingested wishlist: ${csvWishlist}.`)
        } else {
          const raw = await env.BUCKET.put(
            `raw/movielens/wishlist/${rawWishlistFileName}.csv`,
            csvWishlist,
            {
              httpMetadata: {
                contentType: 'text/csv; charset=utf-8',
              },
              customMetadata: {
                source: 'movielens',
                source_endpoint: env.MOVIELENS_WISHLIST_EXPORT_URL,
                ingested_at: message.timestamp.toISOString(),
                ChecksumSHA256: rawWishlistFileName,
              },
              sha256: rawWishlistBuffer,
            },
          )

          console.log('Success: ' + raw.key)

          // stage step
          const parsed = parseCsvFile(csvWishlist, {
            columns: true,
            skip_empty_lines: true,
          })
          const json = JSON.stringify(parsed)
          const { checksum: stagingFileName, checksumBuffer: stagingBuffer } =
            await createChecksum(json)
          const staging = await env.BUCKET.put(
            `staging/movielens/wishlist/${stagingFileName}.json`,
            json,
            {
              httpMetadata: {
                contentType: 'application/json; charset=utf-8',
              },
              customMetadata: {
                source: 'movielens',
                source_endpoint: env.MOVIELENS_RATINGS_EXPORT_URL,
                ChecksumSHA256: stagingFileName,
              },
              sha256: stagingBuffer,
            },
          )

          console.log('Success: ' + staging.key)
        }
      } catch (error) {
        console.error('Movielens queue message failed', error)
        message.retry()
      }
    }
  },
} satisfies ExportedHandler<Env, Queue<MovielensJob>>
