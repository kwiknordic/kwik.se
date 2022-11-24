import React from 'react'
import Header from './universal/Header';
import HeroSection from './home/HeroSection';
import AboutMe from './home/AboutMe'
import MyExpertise from './home/MyExpertise'
import Portfolio from './home/Portfolio'

function Home() {
  return (
    <>
      <header id="header" className='skewed-container'>
        <Header skewed="true" />
        <HeroSection />
      </header>

      <main>
        <MyExpertise />
        <Portfolio />
        <AboutMe />
      </main>
    </>
  )
}

export default Home