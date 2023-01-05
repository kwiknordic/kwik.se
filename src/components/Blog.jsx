import Header from './universal/Header';
import Title from './universal/Title';
import Posts from './blog/Posts';
import { groupedPostsByMonth } from '../util/postsFormatter';
import { ReactComponent as Triangle } from "../assets/portfolio/triangle.svg"
import { ReactComponent as Circle } from "../assets/portfolio/circle.svg"
import { ReactComponent as Square } from "../assets/portfolio/square.svg"
import arrow from "../assets/down-arrow.png"

function Blog() {
  const posts = [...groupedPostsByMonth].sort((a,b) => a[0] < b[0])

  return (
    <>
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
            <>
              <div className="monthly-title-section title-section">
                <Title 
                  title={`${monthName} ${year}`}
                  subTitle={[<Circle />, <Square />, <Triangle />]}
                  priority="header" />
              </div>
              <Posts posts={entries} />
            </>
          )

        })}
      </main>
    </>
  )
}

export default Blog