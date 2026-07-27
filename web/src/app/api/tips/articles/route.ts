import { fetchInstapaperArticles } from '@/src/lib/instapaper'

export async function GET() {
  try {
    return Response.json(await fetchInstapaperArticles())
  } catch {
    return Response.json({ error: 'Unable to load Instapaper articles.' }, { status: 502 })
  }
}
