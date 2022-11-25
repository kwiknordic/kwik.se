import Header from "../universal/Header";
import React from 'react'
import ReactMarkdown from 'react-markdown'
import { useParams } from "react-router-dom"
import { blogPosts, replaceSwedishCharacters } from "../../util/postsFormatter.js"

function Post() {
  let { slug } = useParams()
  slug = replaceSwedishCharacters(slug)

  let post = blogPosts.filter(post => post.slug === slug).at(0)
  if (!post) return

  const { title, body, langIcon, date } = post

  return (
    <>
      <header id="header">
        <Header />
      </header>

      <main id="post" className='align-container-center blog-single-entry'>
        <div className=''>
          <h1>{title}</h1>
          <ReactMarkdown>{body}</ReactMarkdown>
          <hr />
          <em>Uppdaterad: {date}</em>
        </div>
      </main>
    </>
  )
}

export default Post