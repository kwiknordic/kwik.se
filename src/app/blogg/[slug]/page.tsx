import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getAllPosts, getPostBySlug } from '../../../lib/posts'
import { renderMarkdown } from '../../../lib/markdown'
import { formatDateSv } from '../../../lib/format'
import ShareBar from '../../../components/blog/ShareBar'
import PostEnhancements from '../../../components/blog/PostEnhancements'
import styles from './page.module.css'

/* Pre-render every post at build time for instant loads. */
export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: PageProps<'/blogg/[slug]'>): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}
  return { title: post.title, description: post.excerpt }
}

export default async function PostPage({ params }: PageProps<'/blogg/[slug]'>) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const html = renderMarkdown(post.body)
  const langLabel = post.language === 'sv' ? 'Svenska' : 'English'
  const readingLabel =
    post.language === 'en' ? `${post.readingMinutes} min read` : `${post.readingMinutes} min läsning`

  return (
    <main>
      <PostEnhancements />

      <section className={styles['post-hero']}>
        <div className={styles['post-hero-inner']}>
          <div className="flex justify-between content-center gap-4 flex-wrap">
            <div className={styles['post-back']}>
              <Link href="/blogg">
                <i className="pi pi-arrow-left" aria-hidden="true" /> Tillbaka till bloggen
              </Link>
            </div>
            <div className={styles['hero-meta']}>
              <span className={styles['hero-date']}>{formatDateSv(post.date)}</span>
              <span className={styles['hero-sep']}>|</span>
              <span className={styles['hero-rt']}>{readingLabel}</span>
              <span className={styles['hero-lang']}>{langLabel}</span>
            </div>
          </div>
          <h1 className='text-(--paper)'>
            {post.title}
            <span className="accent">.</span>
          </h1>
        </div>
      </section>

      <div className={styles['post-body-wrap']}>
        {/* Body is trusted local Markdown rendered to HTML on the server. */}
        <div className="prose" dangerouslySetInnerHTML={{ __html: html }} />

        <div className={styles['post-byline']}>
          <div className={styles['post-byline-author']}>
            <div className={styles['post-byline-av']}>MB</div>
            <div>
              <div className={styles['post-byline-name']}>Mervin Bratic</div>
              <div className={styles['post-byline-role']}>Fullstack-utvecklare · Stockholm</div>
            </div>
          </div>
          <div className={styles['post-byline-div']} />
          <div className={styles['post-byline-share']}>
            <ShareBar title={post.title} lang={post.language} />
          </div>
        </div>
      </div>
    </main>
  )
}
