import type { MetadataRoute } from 'next'
import { getAllPosts } from '@/src/lib/posts'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://kwik.se'

  const staticRoutes = ['', '/aktiviteter', '/blogg', '/galleri', '/tips'].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
  }))

  const blogRoutes = getAllPosts().map((post) => ({
    url: `${baseUrl}/blogg/${post.slug}`,
    lastModified: new Date(post.date),
  }))

  return [...staticRoutes, ...blogRoutes]
}
