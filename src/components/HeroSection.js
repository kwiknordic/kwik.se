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

          <div className='call-to-action'>
            <a href={`${process.env.PUBLIC_URL}/assets/CV-Mervin-Bratic.pdf`} target="_blank" rel="noreferrer" className="btn btn-primary">Ladda ned mitt CV</a>
            <a href="#info-box" className="btn btn-secondary">Kontakta mig
            </a>
          </div>
          
        </div>
        <img className='portrait' src={portrait} alt="" />
      </div>
    </div>
  )
}

export default HeroSection