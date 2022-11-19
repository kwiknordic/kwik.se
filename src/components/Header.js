import React from 'react'
import Navlinks from "./universal/Navlinks"

const Header = () => {
  return (
    <div className='container min-height'>
      <div className='content unskewed-content'>
        <a href="/"><span className='logo'>kwik</span></a>
        <nav>
          <ul><Navlinks /></ul>
        </nav>    
      </div>
    </div>
  )
}

export default Header