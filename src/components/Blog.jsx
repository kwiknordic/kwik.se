import React, { useState } from 'react'
import Header from './universal/Header';
import Title from './universal/Title';
import Posts from './blog/Posts';
import { ReactComponent as Triangle } from "../assets/portfolio/triangle.svg"
import { ReactComponent as Circle } from "../assets/portfolio/circle.svg"
import { ReactComponent as Square } from "../assets/portfolio/square.svg"

const blogStorage = import.meta.glob('../cms/_posts/*.json', { eager: true })
const structuredPosts = Object.entries(blogStorage)
  .map(entry => {
    const fileName = entry[0]
    let file = fileName.slice(
      fileName.lastIndexOf("/") +1, 
      fileName.lastIndexOf("."))
    return { slug: file, ...entry[1] }
  })

function Blog() {
  const [posts, setPosts] = useState(structuredPosts)


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