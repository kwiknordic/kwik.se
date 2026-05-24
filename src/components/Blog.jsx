import React from 'react';
import Header from './universal/Header';
import SchemaMarkup from './universal/SchemaMarkup';
import Title from './universal/Title';
import Posts from './blog/Posts';
import { groupedPostsByMonth, blogPosts } from '../util/postsFormatter';
import Triangle from "../assets/portfolio/triangle.svg?react"
import Circle from "../assets/portfolio/circle.svg?react"
import Square from "../assets/portfolio/square.svg?react"
import arrow from "../assets/down-arrow.png"

function Blog() {
  const posts = [...groupedPostsByMonth].sort((a,b) => b[0].localeCompare(a[0]))

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Artiklar – Mervin Bratic",
    "url": "https://kwik.se/blog",
    "inLanguage": "sv-SE",
    "author": {
      "@type": "Person",
      "name": "Mervin Bratic",
      "url": "https://kwik.se"
    },
    "blogPost": blogPosts.map(post => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "url": `https://kwik.se/blog/${post.slug}`,
      "datePublished": post.unmodifiedDate,
      "inLanguage": post.language === "en" ? "en-GB" : "sv-SE"
    }))
  }

  return (
    <>
      <SchemaMarkup schema={blogSchema} />
      <header id="header">
        <Header />
      </header>

      <main id="blog" className='align-container-center'>
        <div className="title-section" style={{display: "flex"}}>
          <Title title="Artiklar" tag="h1" subTitle={""} priority="header" />
          <img className="arrow" src={arrow} alt="" style={{paddingTop: "1rem"}}/>
        </div>

        {posts.map(collection => {
          const [year, month, monthName] = collection.at(0).split("-")
          const entries = collection.at(1).sort((a,b) => new Date(a.unmodifiedDate) < new Date(b.unmodifiedDate) ? 1 : -1)

          return (
            <React.Fragment key={`${year}-${month}`}>
              <div className="monthly-title-section title-section">
                <Title
                  title={`${monthName} ${year}`}
                  subTitle={[<Circle key="circle" />, <Square key="square" />, <Triangle key="triangle" />]}
                  priority="header" />
              </div>
              <Posts posts={entries} />
            </React.Fragment>
          )

        })}
      </main>
    </>
  )
}

export default Blog