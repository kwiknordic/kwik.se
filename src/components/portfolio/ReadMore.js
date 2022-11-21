import React from 'react'
import Lightbox from "./Lightbox.js"

function readMore({screenshot, demo, github, tools}) {
  
  return (
    <div className="read-more">
      <h4>Läs mer om projektet</h4>
      <ul className='list-items-inline'>
        <Lightbox src={screenshot} />
        <span className='divider'>|</span>
        <li><a href={demo} target="_blank" rel="noreferrer">
          <i class="fa-solid fa-arrow-up-right-from-square"></i> Live-demo
        </a></li>
        <span className='divider'>|</span>
        <li><a href={github} target="_blank" rel="noreferrer">
          <i class="fa-brands fa-github"></i> GitHub
        </a></li>
      </ul>
      <em>Byggd med {tools}.</em>
    </div>
  )
}

export default readMore