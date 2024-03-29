import React, { useState } from 'react'
import Title from "../universal/Title"
import Project from './portfolio/Project'
import { projects as initialProjects } from '../../data/projects.js'
import { ReactComponent as Triangle } from "../../assets/portfolio/triangle.svg"
import { ReactComponent as Circle } from "../../assets/portfolio/circle.svg"
import { ReactComponent as Square } from "../../assets/portfolio/square.svg"

const Portfolio = () => {
  const [projects, setProjects] = useState(initialProjects)
  let coord;

  const moveSliderRight = () => setProjects([...projects.slice(1), projects.at(0)])
  const moveSliderLeft = () => setProjects([projects.at(-1), ...projects.slice(0,-1)])

  const dragStart = (start) => {
    if (start.target.id === "lightbox-li") return;
    coord = start.clientX
  }
  const dragEnd = (end) => {
    if (end.target.id === "lightbox-li") return;
    if (coord === end.clientX) return;
    coord > end.clientX ? moveSliderLeft() : moveSliderRight()
  }

  return (
    <div id="portfolio-container" className="sub-main">
      <div className="title-section">
        <Title title="Portfolio" subTitle={[<Triangle />, <Circle />, <Square />]} priority="subtitle" />
      </div>

      <div className="slider-grid" onPointerDown={dragStart} onPointerUp={dragEnd}>
        <i className="arrows fa-solid fa-chevron-left" onClick={moveSliderLeft}></i>
        <div className="sub-main-grid">
          {projects.map((project) => <Project project={project} />)}
        </div>
        <i className="arrows fa-solid fa-chevron-right" onClick={moveSliderRight}></i>
      </div>
    </div>
  )
}

export default Portfolio