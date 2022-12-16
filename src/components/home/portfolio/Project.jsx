import React from 'react'
import ReadMore from "./ReadMore"

function Project(props) {
  const { name, summary, screenshot, demo, github, tools } = props.project;

  return (
      <div className="portfolio-content">
        <h3 className='title'>{name}</h3>
        <em>Byggd med {tools}.</em>
        <div className='project-summary'>{summary.map(paragraph => <p>{paragraph}</p>)}</div>
        <ReadMore 
          screenshot={screenshot}
          demo={demo}
          github={github}
        />
      </div>
  )
}

export default Project