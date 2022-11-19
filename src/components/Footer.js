import React from 'react'
import { listMenu } from '../data/nav-links'

function Footer() {
  return (
    <>
      <div className='container min-height'>
        <div className='content'>
          <span className='logo'>kwik</span>
          <nav>
            <ul>{listMenu}</ul>
          </nav>    
        </div>
      </div>
      <div id="copyright" className='container'>
        <span className="content">Copyright &copy; {new Date().getFullYear()} Mervin Bratic</span>
      </div>
    </>
  )
}

export default Footer