import React from 'react'
import ReadMore from "../../components/portfolio/ReadMore.js"

function Project(props) {
  const { name, summary, screenshot, demo, github, tools } = props.project;

  return (
      <div className="portfolio-content">
        <h3 className='title'>{name}</h3>
        <div className='project-summary'>{summary.map(paragraph => <p>{paragraph}</p>)}</div>
        <ReadMore 
          screenshot={screenshot}
          demo={demo}
          github={github}
          tools={tools}
        />
      </div>
  )
}

export default Project