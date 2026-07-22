import { apiJson, optionsResponse } from '@/src/lib/public-api/http'
import { openApiDocument } from '@/src/lib/public-api/openapi'

export const dynamic = 'force-static'

export function GET() {
  return apiJson(openApiDocument)
}

export const OPTIONS = optionsResponse
