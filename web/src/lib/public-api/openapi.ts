import { OpenAPIRegistry, OpenApiGeneratorV31 } from '@asteasolutions/zod-to-openapi'
import { z } from 'zod'
import {
  BlogPostsQuerySchema,
  BlogSlugParamsSchema,
  ProjectSlugParamsSchema,
  ProjectsQuerySchema,
  TipsCategoryParamsSchema,
  TipsQuerySchema,
} from './schemas'

const registry = new OpenAPIRegistry()

const MetaSchema = registry.register(
  'Meta',
  z.object({
    version: z.literal('v1'),
  }),
)

const PaginationSchema = registry.register(
  'Pagination',
  z.object({
    limit: z.number().int().positive(),
    nextCursor: z.string().nullable(),
    total: z.number().int().nonnegative(),
  }),
)

const ErrorSchema = registry.register(
  'Error',
  z.object({
    error: z.object({
      status: z.number().int(),
      message: z.string(),
    }),
  }),
)

const SkillSchema = registry.register(
  'Skill',
  z.object({
    id: z.string(),
    name: z.string(),
  }),
)

const SkillGroupSchema = registry.register(
  'SkillGroup',
  z.object({
    id: z.string(),
    label: z.string(),
    skills: z.array(SkillSchema),
  }),
)

const BackgroundSchema = registry.register(
  'Background',
  z.object({
    synopsis: z.array(z.string()),
    groups: z.array(SkillGroupSchema),
  }),
)

const ProjectSchema = registry.register(
  'Project',
  z.object({
    id: z.string(),
    slug: z.string(),
    name: z.string(),
    summary: z.array(z.string()),
    tools: z.array(z.string()),
    demoUrl: z.string().nullable(),
    githubUrl: z.string().nullable(),
    screenshotUrl: z.string().nullable(),
  }),
)

const BlogPostSummarySchema = registry.register(
  'BlogPostSummary',
  z.object({
    id: z.string(),
    slug: z.string(),
    title: z.string(),
    language: z.enum(['sv', 'en']),
    date: z.string(),
    excerpt: z.string(),
    readingMinutes: z.number().int().positive(),
  }),
)

const BlogPostSchema = registry.register(
  'BlogPost',
  BlogPostSummarySchema.extend({
    content: z.string(),
    contentType: z.literal('text/markdown'),
  }),
)

const TipsItemSchema = registry.register(
  'TipsItem',
  z
    .object({
      id: z.string(),
      title: z.string(),
    })
    .passthrough()
    .openapi({
      description: 'A category-specific tip. Fields vary by category.',
    }),
)

function dataResponse(schema: z.ZodType) {
  return z.object({ data: schema, meta: MetaSchema })
}

function listResponse(schema: z.ZodType) {
  return z.object({ data: z.array(schema), pagination: PaginationSchema, meta: MetaSchema })
}

const errorResponses = {
  400: {
    description: 'Invalid request parameters.',
    content: { 'application/json': { schema: ErrorSchema } },
  },
  429: {
    description: 'Rate limit exceeded.',
    content: { 'application/json': { schema: ErrorSchema } },
  },
}

registry.registerPath({
  method: 'get',
  path: '/api/v1',
  tags: ['Discovery'],
  summary: 'Discover the Kwik public API.',
  responses: {
    200: {
      description: 'Available API endpoints.',
      content: {
        'application/json': {
          schema: dataResponse(
            z.object({ version: z.literal('v1'), endpoints: z.record(z.string(), z.string()) }),
          ),
        },
      },
    },
    ...errorResponses,
  },
})

registry.registerPath({
  method: 'get',
  path: '/api/v1/profile/background',
  tags: ['Profile'],
  summary: 'Get the profile background, interests, languages, and soft skills.',
  responses: {
    200: {
      description: 'Profile background.',
      content: { 'application/json': { schema: dataResponse(BackgroundSchema) } },
    },
    429: errorResponses[429],
  },
})

registry.registerPath({
  method: 'get',
  path: '/api/v1/expertise',
  tags: ['Profile'],
  summary: 'Get technical expertise grouped by area.',
  responses: {
    200: {
      description: 'Expertise groups.',
      content: { 'application/json': { schema: dataResponse(z.array(SkillGroupSchema)) } },
    },
    429: errorResponses[429],
  },
})

registry.registerPath({
  method: 'get',
  path: '/api/v1/projects',
  tags: ['Projects'],
  summary: 'List projects.',
  request: { query: ProjectsQuerySchema },
  responses: {
    200: {
      description: 'Projects.',
      content: { 'application/json': { schema: listResponse(ProjectSchema) } },
    },
    ...errorResponses,
  },
})

registry.registerPath({
  method: 'get',
  path: '/api/v1/projects/{slug}',
  tags: ['Projects'],
  summary: 'Get a project by generated slug.',
  request: { params: ProjectSlugParamsSchema },
  responses: {
    200: {
      description: 'Project.',
      content: { 'application/json': { schema: dataResponse(ProjectSchema) } },
    },
    404: {
      description: 'Project not found.',
      content: { 'application/json': { schema: ErrorSchema } },
    },
    429: errorResponses[429],
  },
})

registry.registerPath({
  method: 'get',
  path: '/api/v1/blog/posts',
  tags: ['Blog'],
  summary: 'List blog posts without their Markdown bodies.',
  request: { query: BlogPostsQuerySchema },
  responses: {
    200: {
      description: 'Blog posts.',
      content: { 'application/json': { schema: listResponse(BlogPostSummarySchema) } },
    },
    ...errorResponses,
  },
})

registry.registerPath({
  method: 'get',
  path: '/api/v1/blog/posts/{slug}',
  tags: ['Blog'],
  summary: 'Get a blog post and its Markdown body.',
  request: { params: BlogSlugParamsSchema },
  responses: {
    200: {
      description: 'Blog post.',
      content: { 'application/json': { schema: dataResponse(BlogPostSchema) } },
    },
    404: {
      description: 'Blog post not found.',
      content: { 'application/json': { schema: ErrorSchema } },
    },
    429: errorResponses[429],
  },
})

registry.registerPath({
  method: 'get',
  path: '/api/v1/tips/{category}',
  tags: ['Tips'],
  summary: 'List tips in a category.',
  request: { params: TipsCategoryParamsSchema, query: TipsQuerySchema },
  responses: {
    200: {
      description: 'Tips.',
      content: { 'application/json': { schema: listResponse(TipsItemSchema) } },
    },
    400: errorResponses[400],
    404: {
      description: 'Tips category not found.',
      content: { 'application/json': { schema: ErrorSchema } },
    },
    429: errorResponses[429],
  },
})

registry.registerPath({
  method: 'get',
  path: '/api/v1/openapi.json',
  tags: ['Discovery'],
  summary: 'Get the OpenAPI 3.1 document for this API.',
  responses: {
    200: {
      description: 'OpenAPI document.',
      content: { 'application/json': { schema: z.record(z.string(), z.unknown()) } },
    },
  },
})

const generator = new OpenApiGeneratorV31(registry.definitions)

export const openApiDocument = generator.generateDocument({
  openapi: '3.1.0',
  info: {
    title: 'Kwik Public API',
    version: '1.0.0',
    description: 'Read-only access to Kwik profile, projects, blog posts, and tips.',
  },
  servers: [{ url: 'https://kwik.se', description: 'Production' }],
})
