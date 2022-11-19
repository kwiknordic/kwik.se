import React from 'react'
import { listMenu } from '../data/nav-links'

const Header = () => {
  return (
    <div className='container min-height'>
      <div className='content unskewed-content'>
        <span className='logo'>kwik</span>
        <nav>
          <ul>{listMenu}</ul>
        </nav>    
      </div>
    </div>
  )
}

export default Header