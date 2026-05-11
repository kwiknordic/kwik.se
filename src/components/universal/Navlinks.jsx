import React from 'react'
import { Link } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'

function Navlinks() {
  return (
    <>
      <li>
        <Link to="/books">Boktips</Link>
      </li>
      <li>
        <Link to="/movies">Filmtips</Link>
      </li>
      <li>
        <Link to="/blog">Blogg</Link>
      </li>
    </>
  )
}

export default Navlinks
