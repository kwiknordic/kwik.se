import React from 'react'
import { Link } from "react-router-dom"

function ReadMore({language, slug, date}) {
  const swedish = String.fromCodePoint(0x1F1F8, 0x1F1EA)
  const english = String.fromCodePoint(0x1F1EC, 0x1F1E7)
  
  return (
    <div className="read-more">
      <ul className='list-items-inline'>
        <li>{language === "sv" ? swedish : english }</li>
        <span className='divider'>|</span>
        <li>{new Date(date).toLocaleString('sv-SE', { dateStyle: "long"})}</li>
      </ul>
      <Link to={`blog/${slug}`}>Läs mer</Link>
    </div>
  )
}

export default ReadMore