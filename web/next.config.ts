import type { NextConfig } from 'next'
import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare'
import path from 'node:path'

initOpenNextCloudflareForDev()

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Legacy URLs used `/blog` and included the publication date in the slug.
      // Redirect these directly to the canonical, date-free `/blogg` URL.
      {
        source: '/blog/:slug(.+)-:year(\\d{4})-:month(\\d{2})-:day(\\d{2})',
        destination: '/blogg/:slug',
        permanent: true,
      },
      // Support previously indexed dated URLs that already used `/blogg`.
      {
        source: '/blogg/:slug(.+)-:year(\\d{4})-:month(\\d{2})-:day(\\d{2})',
        destination: '/blogg/:slug',
        permanent: true,
      },
      {
        source: '/blog',
        destination: '/blogg',
        permanent: true,
      },
      {
        source: '/blog/:path*',
        destination: '/blogg/:path*',
        permanent: true,
      },
    ]
  },
  turbopack: {
    root: path.join(__dirname, '..'),
  },
  devIndicators: false,
  images: {
    unoptimized: true,
  },
}

export default nextConfig
