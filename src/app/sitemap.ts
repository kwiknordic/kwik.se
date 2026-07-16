import type { MetadataRoute } from 'next'
import { getAllPosts } from '@/src/lib/posts'
import { NAV_TABS } from '@/src/lib/nav'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://kwik.se'

  const staticRoutes = [
    { url: baseUrl },
    ...NAV_TABS.map((tab) => ({
      url: `${baseUrl}${tab.href}`,
    })),
  ]

  const blogRoutes = getAllPosts().map((post) => ({
    url: `${baseUrl}/blogg/${post.slug}`,
    lastModified: new Date(post.date),
  }))

  return [...staticRoutes, ...blogRoutes]
}
