import React, { useState } from 'react'
import Navlinks from "./Navlinks"
import { Link } from "react-router-dom"

const Header = ({skewed}) => {
  const [isOpen, setIsOpen] = useState(false)
  const skewedClass = "content unskewed-content"

  return (
    <div className='container'>
      <div className={skewed ? skewedClass : "content"}>

        <div>
          <Link to="/"><span className='logo'>kwik</span></Link>
        </div>

        <nav className={isOpen ? "nav-visible" : "nav-invisible" }>
          <ul><Navlinks /></ul>
        </nav>

        {!isOpen ? 
          <i className="mobile-nav fa-solid fa-bars" onClick={() => setIsOpen(!isOpen)}></i>
        : <i className="mobile-nav fa-solid fa-rectangle-xmark" onClick={() => setIsOpen(!isOpen)}></i>
        }
      </div>
    </div>
  )
}

export default Header