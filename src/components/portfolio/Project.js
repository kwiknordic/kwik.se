import React from 'react'
import ReadMore from "../../components/portfolio/ReadMore.js"

function Project(props) {
  const { name, summary, image, demo, github, tools } = props.project;

  return (
      <div className="portfolio-content">
        <h3 className='title'>{name}</h3>
        {summary.map(paragraph => <p>{paragraph}</p>)}
        <ReadMore 
          image={image}
          demo={demo}
          github={github}
          tools={tools}
        />
      </div>
  )
}

export default Project