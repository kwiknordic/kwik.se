import React, { useState } from 'react'
import Title from "./universal/Title.js"
import Project from './portfolio/Project'
import { projects as initialProjects } from '../data/projects.js'
import { ReactComponent as Triangle } from "../assets/portfolio/triangle.svg"
import { ReactComponent as Circle } from "../assets/portfolio/circle.svg"
import { ReactComponent as Square } from "../assets/portfolio/square.svg"

const Portfolio = () => {
  const [projects, setProjects] = useState(initialProjects)

  const moveSliderLeft = () => setProjects([...projects.slice(1), projects.at(0)])
  const moveSliderRight = () => setProjects([projects.at(-1), ...projects.slice(0,-1)])

  return (
    <div id="portfolio-container" className="sub-main">
      <div className="title-section">
        <Title 
          title="Portfolio" 
          subTitle={[<Triangle />, <Circle />, <Square />]} 
          priority="subtitle"
        />
      </div>

      <div className="slider-grid">
        <i class="arrows fa-solid fa-chevron-left" onClick={moveSliderLeft}></i>
        <div className="sub-main-grid">
          {projects.map( (entry) => <Project project={entry} />)}
        </div>
        <i class="arrows fa-solid fa-chevron-right" onClick={moveSliderRight}></i>
      </div>
    </div>
  )
}

export default Portfolio