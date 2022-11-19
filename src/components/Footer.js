import React from 'react'
import Navlinks from "./universal/Navlinks"

function Footer() {
  return (
    <>
      <div className='container min-height'>
        <div className='content'>
          <a href="/"><span className='logo'>kwik</span></a>
          <nav>
            <ul><Navlinks /></ul>
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