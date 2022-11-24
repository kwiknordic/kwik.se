import React from 'react'
import Header from './universal/Header';
import Title from './universal/Title';
import { ReactComponent as Triangle } from "../assets/portfolio/triangle.svg"
import { ReactComponent as Circle } from "../assets/portfolio/circle.svg"
import { ReactComponent as Square } from "../assets/portfolio/square.svg"

function PageNotFound() {
  return (
    <>
    <header id="header">
      <Header />
    </header>

    <main id="404" className='sub-main align-container-center'>
      <div className="title-section">
        <Title title="404: Sidan kunde inte hittas" subTitle={[<Circle />, <Square />, <Triangle />]} />
      </div>
    </main>
  </>
  )
}

export default PageNotFound