import React from 'react'
import { useEffect, useState } from 'react'

function HeroSection({ children }) {
  return (
    <div id="hero-container">
      <div className="hero-grid">
        {children}
      </div>
    </div>
  )
}

export function PdfSize() {
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
