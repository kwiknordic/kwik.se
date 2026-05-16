import React from 'react'
import { useEffect, useState } from 'react'
import portrait from '../../assets/hero-portrait.png'

const synopsis = `Stark på ehandel och interna verktyg. Erfarenhet som egenföretagare inom tekniska lösningar för cirkulär ekonomi av hemelektronik.`

function HeroSection() {
  return (
    <div id="hero-container">
      <div className="hero-grid">
        <div id="hero-section" className="unskewed-content">
          <div className="title-section">
            <span className="sub-title">Hej, jag heter</span>
            <h1 className="title">Mervin Bratic</h1>
            <span className="post-title">Fullstack-utvecklare</span>
          </div>

          <p>{synopsis}</p>

          <div className="call-to-action">
            <a
              href={`/assets/CV-Mervin-Bratic.pdf`}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary btn-cv">
              Ladda ned mitt CV
              <PdfSize />
            </a>
            <a href="#info-box" className="btn btn-secondary">
              Kontakta mig
            </a>
          </div>
        </div>
        <img className="portrait" src={portrait} alt="Porträtt av Mervin Bratic" />
      </div>
    </div>
  )
}

function PdfSize() {
  const [fileSize, setFileSize] = useState('')

  useEffect(() => {
    async function getPdfSize() {
      try {
        const response = await fetch('/assets/CV-Mervin-Bratic.pdf', {
          method: 'HEAD',
        })

        const size = response.headers.get('content-length')

        if (size) {
          const sizeInMB = (Number(size) / (1024 * 1024)).toFixed(1)
          setFileSize(`${sizeInMB} MB`)
        }
      } catch (error) {
        console.error('Failed to get PDF size', error)
      }
    }

    getPdfSize()
  }, [])

  return <span>{fileSize ? `PDF (${fileSize})` : 'PDF (0.2 MB)'}</span>
}

export default HeroSection
