import type { Metadata } from 'next'
import { getAllPosts } from '@/src/lib/posts'
import BlogList, { type BlogListItem } from '@/src/components/blog/BlogList'
import StructuredData from '@/src/components/seo/StructuredData'

export const metadata: Metadata = {
  alternates: { canonical: '/blogg' },
  title: 'Blogg',
  description: 'Tankar om kod, bygge och allt däremellan.',
}

export default function BlogPage() {
  // Only the metadata the list needs — bodies stay on the server.
  const posts: BlogListItem[] = getAllPosts().map((p, i) => ({
    slug: p.slug,
    title: p.title,
    language: p.language,
    langFlag: p.langFlag,
    date: p.date,
    excerpt: p.excerpt,
    readingMinutes: p.readingMinutes,
    num: String(i + 1).padStart(2, '0'),
  }))

  return (
    <main className="page">
      <StructuredData
        id="kwik-blogg"
        data={{
          '@context': 'https://schema.org',
          '@type': 'Blog',
          name: 'Kwik-bloggen',
          description: 'Tankar om kod, bygge och allt däremellan.',
          url: 'https://kwik.se/blogg',
          inLanguage: 'sv-SE',
          author: { '@type': 'Person', name: 'Mervin Bratic' },
          blogPost: posts.map((post) => ({
            '@type': 'BlogPosting',
            headline: post.title,
            url: `https://kwik.se/blogg/${post.slug}`,
            datePublished: post.date,
            inLanguage: post.language === 'sv' ? 'sv-SE' : 'en',
          })),
        }}
      />
      <div className="page-head reveal">
        <span className="eyebrow">Tankar & anteckningar</span>
        <h1 className="page-title">Blogg</h1>
        <p className="page-sub">
          Lite om kod, bygge och allt däremellan.
        </p>
      </div>

      <BlogList posts={posts} />
    </main>
  )
}
