import Footer from './universal/Footer';
import React from 'react'
import { Outlet } from "react-router-dom"

function Layout() {
  return (
    <>
      <Outlet />

      <footer id="footer">
        <Footer />
      </footer>
    </>
  )
}

export default Layout