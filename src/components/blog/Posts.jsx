import React from 'react'
import ReactMarkdown from 'react-markdown'
/* import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs'; */
import ReadMore from './posts/ReadMore';
import '../../css/blog.css';

function Posts({posts, setPosts}) {
  return (
    <div className='blog-overview'>
      {posts.map(post => {
        const { title, body, langIcon, date, slug} = post
        return (
          <>
            <div className='blog-overview-post'>
              <h2>{title}</h2>
              <ReactMarkdown className='text-area'>{body}</ReactMarkdown>
              <ReadMore icon={langIcon} date={date} slug={slug}></ReadMore>
            </div>
          </>
        )}
      )}
    </div>
  )
}

export default Posts