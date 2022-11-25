import React from 'react'
import ReactMarkdown from 'react-markdown'
import { useParams } from "react-router-dom"

const blogStorage = import.meta.glob('../../cms/_posts/*.json', { eager: true })

function Post() {
  const { slug } = useParams()

  const postFound = Object.entries(blogStorage)
    .filter(entry => entry[0].includes(slug))
    .pop()

  return (
    <div className='blog-single-entry'>
    {postFound.map(post => {
      console.log(post)
      const { title, body, language, date, slug} = post
      return (
        <>
          <div className=''>
            <h1>{title}</h1>
            <ReactMarkdown>{body}</ReactMarkdown>
          </div>
        </>
      )}
    )}
  </div>
  )
}

export default Post