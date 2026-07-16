import { ListObjectsV2Command, S3Client } from '@aws-sdk/client-s3'
import { writeJson, dataPath } from './utils'

const bucket = process.env.R2_BUCKET_NAME
const accountId = process.env.R2_ACCOUNT_ID
const publicBaseUrl = process.env.R2_PUBLIC_BASE_URL

if (!bucket || !accountId || !publicBaseUrl) {
  throw new Error('Missing R2_BUCKET_NAME, R2_ACCOUNT_ID, or R2_PUBLIC_BASE_URL')
}

const client = new S3Client({
  region: 'auto',
  endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
})

type GalleryImage = { src: string; tag: string; uploadedAt: string }
const images: GalleryImage[] = []
let continuationToken: string | undefined

do {
  const result = await client.send(
    new ListObjectsV2Command({
      Bucket: bucket,
      Prefix: 'gallery/',
      ContinuationToken: continuationToken,
    }),
  )

  for (const object of result.Contents ?? []) {
    const key = object.Key
    if (!key || !/\.(jpe?g|png|webp|avif|gif)$/i.test(key)) continue

    const [, tag] = key.split('/')
    const encodedKey = key.split('/').map(encodeURIComponent).join('/')
    images.push({
      src: `${publicBaseUrl.replace(/\/$/, '')}/${encodedKey}`,
      tag: tag.at(0)?.toUpperCase() + tag.substring(1) || 'uncategorized',
      uploadedAt: object.LastModified?.toISOString() ?? '',
    })
  }

  continuationToken = result.IsTruncated ? result.NextContinuationToken : undefined
} while (continuationToken)

images.sort(
  (a, b) =>
    new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime(),
)
await writeJson(dataPath('/gallery.json'), images)
console.log(`Wrote ${images.length} image records`)
