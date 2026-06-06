import React from 'react'
import Header from './universal/Header'
import HeroSection, { PdfSize } from './home/HeroSection'
import MyExpertise from './home/MyExpertise'
import Portfolio from './home/Portfolio'
import AboutMe from './home/AboutMe'
import Title from './universal/Title'
import portrait from '../assets/hero-portrait-cartoon.png'
import Code from './home/expertise/Code'
import { tools, paradigms } from './home/expertise/Mentions'
import { codeContent } from '../data/expertise.js'
import arrow from '../assets/down-arrow.png'
import Triangle from '../assets/portfolio/triangle.svg?react'
import Circle from '../assets/portfolio/circle.svg?react'
import Square from '../assets/portfolio/square.svg?react'
import Hamburger from '../assets/about/hamburger.svg?react'
import { interests, languages, softSkills, synopsis } from '../data/about.js'
import Infobox from './home/about_me/Infobox'
import Tags from './home/about_me/Tags'

const heroSynopsis = `Stark på ehandel och interna verktyg. Erfarenhet som egenföretagare inom tekniska lösningar för cirkulär ekonomi av hemelektronik.`
const { ts, react, mongo } = codeContent()

function Home() {
  return (
    <>
      <header id="header" className="skewed-container">
        <Header skewed="true" />
        <HeroSection>
          <div id="hero-section" className="unskewed-content">
            <div className="title-section">
              <span className="sub-title">Hej, jag heter</span>
              <h1 className="title">Mervin Bratic</h1>
              <span className="post-title">Fullstack-utvecklare</span>
            </div>

            <p>{heroSynopsis}</p>

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
        </HeroSection>
      </header>

      <main>
        <MyExpertise>
          <div className="title-section">
            <Title title="Kompetensområden" subTitle={'★'.repeat(5)} priority="header" />
            <img className="arrow" src={arrow} alt="Se nedan" />
          </div>

          <div className="grid">
            <Code title="TypeScript" code={ts} />
            <Code title="React" code={react} />
            <Code title="MongoDB" code={mongo} />
          </div>

          <div className="mentions">
            <h3>Övriga verktygslådan</h3>
            <ul className="list-items-inline list-padding">{tools}</ul>
          </div>

          <div className="mentions">
            <h3>Optimal paradigm</h3>
            <ul className="list-items-inline list-padding">{paradigms}</ul>
          </div>
        </MyExpertise>

        <Portfolio>
          <Title
            title="Fritidsprojekt"
            subTitle={[<Triangle key="triangle" />, <Circle key="circle" />, <Square key="square" />]}
            priority="subtitle"
          />
        </Portfolio>

        <AboutMe>
          <div className="title-section">
            <Title
              title="Min bakgrund"
              subTitle={<i className="fa-solid fa-backward" />}
              priority="subtitle"
            />
          </div>

          <div className="sub-main-grid">
            <div>
              {synopsis.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
              <Infobox />
            </div>
            <div className="tags-container">
              <Tags title="Språkkunskaper" data={languages} structure={'array'} />
              <Tags title="Mjuka kompetenser" data={softSkills} structure={'array'} />
              <Tags title="Intressen" data={interests} structure={'object'} />
              <Hamburger className="hamburger-svg" />
            </div>
          </div>
        </AboutMe>
      </main>
    </>
  )
}

export default Home
