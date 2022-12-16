import React from 'react'
import Lightbox from "./Lightbox"

function readMore({screenshot, demo, github, tools}) {
  
  return (
    <div className="read-more">
      <h4>Läs mer om projektet</h4>
      <ul className='list-items-inline'>
        { screenshot ? 
          <>
            <Lightbox src={screenshot}/>
            <span className='divider'>|</span>
          </>
        : null }
        { demo ?
          <>
            <li><a href={demo} target="_blank" rel="noreferrer"><i className="fa-solid fa-arrow-up-right-from-square"></i> Live-demo</a></li>
            <span className='divider'>|</span>
          </>
        : null }
        <li><a href={github} target="_blank" rel="noreferrer">
          <i className="fa-brands fa-github"></i> GitHub
        </a></li>
      </ul>
    </div>
  )
}

export default readMore