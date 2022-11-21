import React, { useState } from 'react'
import Navlinks from "./universal/Navlinks"

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className='container'>
      <div className='content unskewed-content'>
        <a href="/"><span className='logo'>kwik</span></a>

        <nav className={isOpen ? "nav-visible" : "nav-invisible" }>
          <ul><Navlinks /></ul>
        </nav>

        {!isOpen ? 
          <i class="mobile-nav fa-solid fa-bars" onClick={() => setIsOpen(!isOpen)}></i>
        : <i class="mobile-nav fa-solid fa-rectangle-xmark" onClick={() => setIsOpen(!isOpen)}></i>
        }
      </div>
    </div>
  )
}

export default Header