import React from 'react'
import { menu } from "../../data/nav-links.js"

function Navlinks() {
  return (
    menu.map(link => <li><a href={link.url}>{link.name}</a></li>)
  )
}

export default Navlinks