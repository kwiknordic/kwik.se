import React from 'react'
import { Link } from "react-router-dom"

function ReadMore({icon, slug, date}) {
  return (
    <div className="read-more">
      <ul className='list-items-inline'>
        <li>{icon}</li>
        <span className='divider'>|</span>
        <li>{date}</li>
      </ul>
      <Link to={slug}>Läs mer</Link>
    </div>
  )
}

export default ReadMore