import React from 'react'
import ReactMarkdown from 'react-markdown'
/* import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs'; */
import ReadMore from './posts/ReadMore';
import '../../css/blog.css';

function Posts({posts}) {
  return (
    <div className='blog-overview'>
      {posts.map(post => {
        const { title, body, langIcon, date, slug} = post
        return (
          <div key={slug} className='blog-overview-post'>
            <h2>{title}</h2>
            <div className='text-area'><ReactMarkdown>{body}</ReactMarkdown></div>
            <ReadMore icon={langIcon} date={date} slug={slug}></ReadMore>
          </div>
        )}
      )}
    </div>
  )
}

export default Posts