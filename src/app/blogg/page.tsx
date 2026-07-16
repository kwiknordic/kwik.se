import type { Metadata } from 'next'
import { getAllPosts } from '../../lib/posts'
import BlogList, { type BlogListItem } from '../../components/blog/BlogList'

export const metadata: Metadata = {
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
