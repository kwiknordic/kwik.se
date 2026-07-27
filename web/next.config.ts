import path from 'node:path'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
  outputFileTracingRoot: path.resolve(__dirname, '..'),
  turbopack: {
    root: path.resolve(__dirname, '..'),
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
