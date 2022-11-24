import React from 'react'
import { Link } from "react-router-dom"
import { HashLink } from 'react-router-hash-link';

function Navlinks() {
  return (
    <>
      <li><HashLink to="/#expertise-container">Kompetens</HashLink></li>
      <li><HashLink to="/#portfolio-container">Portfolio</HashLink></li>
      <li><HashLink to="/#about-me">Bakgrund</HashLink></li>
      <li><Link to="/blog">Blogg</Link></li>
    </>
  )
}

export default Navlinks