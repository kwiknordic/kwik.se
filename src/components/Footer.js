import React from 'react'

function Footer() {
  return (
    <>
      <div className='footer-content'>
        <a href="/"><span className='logo'>kwik</span></a>
        <a className="mobile-scroll-up" href="#"><i class="mobile-nav fa-solid fa-circle-chevron-up"></i></a>
        <span className="copyright">Copyright &copy; {new Date().getFullYear()} Mervin Bratic</span>
      </div>
    </>
  )
}

export default Footer