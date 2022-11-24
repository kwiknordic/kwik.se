import React from 'react'
import { HashLink } from 'react-router-hash-link';

function Footer() {
  return (
    <>
      <div className='footer-content'>
        <div>
          <HashLink to="/#"><span className='logo'>kwik</span></HashLink>
        </div>
        <a className="mobile-scroll-up" href="#"><i className="mobile-nav fa-solid fa-circle-chevron-up"></i></a>
        <span className="copyright">Copyright &copy; {new Date().getFullYear()} Mervin Bratic</span>
      </div>
    </>
  )
}

export default Footer