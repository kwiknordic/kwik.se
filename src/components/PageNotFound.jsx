import React from 'react'
import Header from './universal/Header';
import Title from './universal/Title';
import Triangle from "../assets/portfolio/triangle.svg?react"
import Circle from "../assets/portfolio/circle.svg?react"
import Square from "../assets/portfolio/square.svg?react"

function PageNotFound() {
  return (
    <>
    <header id="header">
      <Header />
    </header>

    <main id="404" className='sub-main align-container-center'>
      <div className="title-section">
        <Title title="404: Sidan kunde inte hittas" subTitle={[<Circle key="circle" />, <Square key="square" />, <Triangle key="triangle" />]} />
      </div>
    </main>
  </>
  )
}

export default PageNotFound