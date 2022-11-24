import React from 'react'
import ReactMarkdown from 'react-markdown'
/* import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs'; */
import ReadMore from './posts/ReadMore';
import '../../css/blog.css';

function Posts({posts, setPosts}) {
  const swedish = String.fromCodePoint(0x1F1F8, 0x1F1EA)
  const english = String.fromCodePoint(0x1F1EC, 0x1F1E7)

  return (
    <div className='blog-overview'>
      {posts.map(post => {
        const { title, body, language, date, slug} = post
        return (
          <>
            <div className='blog-overview-post'>
              <h2>{title}</h2>
              <ReactMarkdown className='text-area'>{body}</ReactMarkdown>
              <ReadMore language={language} slug={slug} date={date}></ReadMore>
            </div>
          </>
        )}
      )}
    </div>
  )
}

export default Posts