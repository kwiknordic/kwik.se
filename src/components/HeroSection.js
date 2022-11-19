import React from 'react'
import portrait from '../assets/hero-portrait.png';

const synopsis = `En självlärd webbutvecklare med praktisk erfarenhet och stor passion i att bygga projekt med branschbeprövad teknologi som likväl med det allra senaste.`

function HeroSection() {
  return (
    <div id="hero-container">
      <div className='hero-grid'>
        <div id="hero-section" className='unskewed-content'>

          <div className="title-section">
            <span className="sub-title">Hej, jag heter</span>
            <h1 className="title">Mervin Bratic</h1>
            <span className="post-title">Frontend-utvecklare</span>        
          </div>

          <p>{synopsis}</p>

          <a href={`${process.env.PUBLIC_URL}/assets/CV-Mervin-Bratic.pdf`} target="_blank" rel="noreferrer">
            <button className="btn btn-primary">Ladda ned mitt CV</button>
          </a>
          <a href="#about-me">
            <button className="btn btn-secondary">Kontakta mig</button>
          </a>
          
        </div>
        <img src={portrait} alt="" />
      </div>
    </div>
  )
}

export default HeroSection