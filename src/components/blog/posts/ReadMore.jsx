import React from 'react'
import { Link } from "react-router-dom"

function ReadMore({icon, slug, date}) {
  return (
    <div className="read-more">
      <div className='rm-left'>
        <span>{icon}</span>
        <span className='divider'>|</span>
        <span>{date}</span>
      </div>
      <Link to={slug}>Läs mer</Link>
    </div>
  )
}

export default ReadMore