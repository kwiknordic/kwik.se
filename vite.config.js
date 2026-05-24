import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import sitemap from 'vite-plugin-sitemap'
import { readdirSync } from 'fs'
import { join } from 'path'

// Generate blog post routes dynamically
function generateBlogRoutes() {
  const postsDir = join(process.cwd(), 'src/data/posts')
  try {
    const files = readdirSync(postsDir).filter((file) => file.endsWith('.json'))
    return files.map((file) => {
      let slug = file.slice(0, file.lastIndexOf('.'))
      // Apply Swedish character replacements (same logic as postsFormatter)
      slug = slug.replaceAll('ä', 'a').replaceAll('å', 'a').replaceAll('ö', 'o')
      return `/blog/${slug}`
    })
  } catch (error) {
    console.warn('Could not read blog posts:', error)
    return []
  }
}

const blogRoutes = generateBlogRoutes()
console.log('Generated blog routes:', blogRoutes.length, blogRoutes)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svgr(),
    react(),
    sitemap({
      hostname: 'https://www.kwik.se',
      dynamicRoutes: ['/blog', '/books', '/movies', ...generateBlogRoutes()],
      exclude: ['/admin'],
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('/react/') || id.includes('/react-dom/') || id.includes('/react-router')) {
            return 'vendor-react'
          }
          if (id.includes('/react-markdown/') || id.includes('/react-syntax-highlighter/')) {
            return 'markdown'
          }
          if (id.includes('/@tanstack/react-table/')) {
            return 'table'
          }
        },
      },
    },
  },
})
