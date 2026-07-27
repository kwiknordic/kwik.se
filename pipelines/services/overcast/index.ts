import { fetchOvercast, OvercastAuthError } from '@overcast/fetchOvercast'
import { extract, parseXml, type Opml } from '@overcast/transformOvercast'
import { createChecksum } from '@shared/utils/createChecksum'

interface OvercastJob {
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
      OVERCAST_EXPORT_URL: url,
      OVERCAST_COOKIE_KEY: cookieKey,
      OVERCAST_COOKIE_VALUE: cookieValue,
    } = env

    if (!cookieKey || !cookieValue)
      throw new OvercastAuthError('OVERCAST_COOKIE is not configured.')

    for (const message of batch.messages) {
      try {
        // raw step
        const xml = await fetchOvercast({ url, key: cookieKey, value: cookieValue })
        const { checksum: rawFileName, checksumBuffer: rawBuffer } = await createChecksum(xml)
        const existing = await env.BUCKET.head(rawFileName)

        if (existing) {
          console.log(`Previously ingested: ${rawFileName}. Skipping.`)
          return
        }

        const raw = await env.BUCKET.put(`raw/overcast/${rawFileName}.opml`, xml, {
          httpMetadata: {
            contentType: 'application/xml; charset=utf-8',
          },
          customMetadata: {
            source: 'overcast',
            source_endpoint: env.OVERCAST_EXPORT_URL,
            ingested_at: message.timestamp.toISOString(),
            ChecksumSHA256: rawFileName,
          },
          sha256: rawBuffer,
        })

        console.log('Success: ' + raw.key)

        // stage step
        const parsed = parseXml(xml)
        const json = JSON.stringify(parsed)
        const { checksum: stagingFileName, checksumBuffer: stagingBuffer } =
          await createChecksum(json)
        const staging = await env.BUCKET.put(`staging/overcast/${stagingFileName}.json`, json, {
          httpMetadata: {
            contentType: 'application/json; charset=utf-8',
          },
          customMetadata: {
            source: 'overcast',
            source_endpoint: env.OVERCAST_EXPORT_URL,
            ChecksumSHA256: stagingFileName,
          },
          sha256: stagingBuffer,
        })

        console.log('Success: ' + staging.key)

        // transform step
        const episodes = JSON.stringify(extract(parsed as Opml))
        const { checksum: transformFileName, checksumBuffer: transformBuffer } =
          await createChecksum(episodes)
        const transform = await env.BUCKET.put(
          `transform/overcast/${transformFileName}.json`,
          episodes,
          {
            httpMetadata: {
              contentType: 'application/json; charset=utf-8',
            },
            customMetadata: {
              source: 'overcast',
              source_endpoint: staging.key,
              ChecksumSHA256: transformFileName,
            },
            sha256: transformBuffer,
          },
        )

        console.log('Success: ' + transform.key)

        message.ack()
      } catch (error) {
        console.error('Overcast queue message failed', error)
        message.retry()
      }
    }
  },
} satisfies ExportedHandler<Env, Queue<OvercastJob>>
