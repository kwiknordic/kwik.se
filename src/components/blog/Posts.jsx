import React from 'react'
import ReactMarkdown from 'react-markdown'
import '../../css/blog.css';

function Posts({posts, setPosts}) {
  const swedish = String.fromCodePoint(0x1F1F8, 0x1F1EA)
  const english = String.fromCodePoint(0x1F1EC, 0x1F1E7)

  return (
      <div className='blog-overview'>
        {posts.map(post => (
          <>
            <div className='blog-overview-post'>
              <h2>{post.title}</h2>
              <div className='blog-overview-subheader'>
                <span>{post.language === "sv" ? swedish : english }</span>
                <span>{new Date(post.date).toLocaleString('sv-SE', { dateStyle: "long"})}</span>
              </div>
              <ReactMarkdown>{post.body}</ReactMarkdown>
            </div>
          </>
        ))}
      </div>
  )
}

export default Posts