import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import { z } from 'zod'

extendZodWithOpenApi(z)

const queryText = z.string().trim().min(1).max(200).optional().openapi({
  description: 'Case-insensitive text search.',
})

export const PaginationQuerySchema = z.object({
  limit: z.coerce.number().int().min(1).max(100).default(20).openapi({
    description: 'Maximum number of items to return.',
    examples: [20],
  }),
  cursor: z.coerce.number().int().min(0).default(0).openapi({
    description: 'Offset cursor returned as pagination.nextCursor.',
    examples: [20],
  }),
})

export const ProjectsQuerySchema = PaginationQuerySchema.extend({
  q: queryText,
  tool: z.string().trim().min(1).max(100).optional().openapi({
    description: 'Filter by an exact tool name, case-insensitively.',
    examples: ['TypeScript'],
  }),
})

export const BlogPostsQuerySchema = PaginationQuerySchema.extend({
  q: queryText,
  language: z.enum(['sv', 'en']).optional().openapi({
    description: 'Filter posts by their language.',
  }),
})

export const TipsQuerySchema = PaginationQuerySchema.extend({
  q: queryText,
})

export const ProjectSlugParamsSchema = z.object({
  slug: z.string().min(1).openapi({ examples: ['mcp-server-meetup-events-scraper'] }),
})

export const BlogSlugParamsSchema = z.object({
  slug: z.string().min(1).openapi({ examples: ['cors-issues-use-a-proxy'] }),
})

export const TipsCategoryParamsSchema = z.object({
  category: z.enum(['movies', 'books', 'podcasts', 'articles']).openapi({ examples: ['books'] }),
})
