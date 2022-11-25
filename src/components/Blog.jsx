import React, { useState } from 'react'
import Header from './universal/Header';
import Title from './universal/Title';
import Posts from './blog/Posts';
import { blogPosts } from '../util/postsFormatter';
import { ReactComponent as Triangle } from "../assets/portfolio/triangle.svg"
import { ReactComponent as Circle } from "../assets/portfolio/circle.svg"
import { ReactComponent as Square } from "../assets/portfolio/square.svg"

function Blog() {
  const [posts, setPosts] = useState(blogPosts)

  return (
    <>
      <header id="header">
        <Header />
      </header>

      <main id="blog" className='align-container-center'>
        <div className="title-section">
          <Title title="Artiklar" subTitle={[<Circle />, <Square />, <Triangle />]} />
        </div>

        <Posts posts={posts} setPosts={setPosts} />
      </main>
    </>
  )
}

export default Blog