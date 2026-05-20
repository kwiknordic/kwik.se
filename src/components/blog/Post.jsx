import Header from '../universal/Header'
import SchemaMarkup from '../universal/SchemaMarkup'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import javascript from 'react-syntax-highlighter/dist/esm/languages/prism/javascript'
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx'
import css from 'react-syntax-highlighter/dist/esm/languages/prism/css'
import bash from 'react-syntax-highlighter/dist/esm/languages/prism/bash'
import json from 'react-syntax-highlighter/dist/esm/languages/prism/json'
import markup from 'react-syntax-highlighter/dist/esm/languages/prism/markup'
import { useParams } from 'react-router-dom'
import { blogPosts, replaceSwedishCharacters } from '../../util/postsFormatter.js'
import '../../css/blog-post.css'

SyntaxHighlighter.registerLanguage('javascript', javascript)
SyntaxHighlighter.registerLanguage('jsx', jsx)
SyntaxHighlighter.registerLanguage('css', css)
SyntaxHighlighter.registerLanguage('bash', bash)
SyntaxHighlighter.registerLanguage('json', json)
SyntaxHighlighter.registerLanguage('markup', markup)

function getExcerpt(markdownBody) {
  return markdownBody
    .replace(/```[\s\S]*?```/g, '')
    .replace(/[#*`_[\]()!]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 200)
}

function Post() {
  let { slug } = useParams()
  slug = replaceSwedishCharacters(slug)

  let post = blogPosts.filter((post) => post.slug === slug).at(0)
  if (!post) return

  const { title, body, langIcon, date, unmodifiedDate, language } = post
  const postUrl = `https://kwik.se/blog/${slug}`

  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description: getExcerpt(body),
    url: postUrl,
    datePublished: unmodifiedDate,
    inLanguage: language === 'en' ? 'en-GB' : 'sv-SE',
    author: {
      '@type': 'Person',
      name: 'Mervin Bratic',
      url: 'https://kwik.se',
    },
    publisher: {
      '@type': 'Person',
      name: 'Mervin Bratic',
      url: 'https://kwik.se',
    },
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Hem', item: 'https://kwik.se' },
      { '@type': 'ListItem', position: 2, name: 'Artiklar', item: 'https://kwik.se/blog' },
      { '@type': 'ListItem', position: 3, name: title, item: postUrl },
    ],
  }

  return (
    <>
      <SchemaMarkup schema={blogPostingSchema} />
      <SchemaMarkup schema={breadcrumbSchema} />
      <header id="header">
        <Header />
      </header>

      <main id="post" className="align-container-center blog-single-entry">
        <div className="">
          <h1>{title}</h1>
          <ReactMarkdown
            components={{
              a({ href, children }) {
                return <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>
              },
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '')
                return match ? (
                  <SyntaxHighlighter style={oneDark} language={match[1]} PreTag="div">
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                )
              },
            }}>
            {body}
          </ReactMarkdown>
          <hr />
          <em>{date}</em>
        </div>
      </main>
    </>
  )
}

export default Post
