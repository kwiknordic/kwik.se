import React from 'react'
import { ReactComponent as Hamburger } from '../../assets/about/hamburger.svg'
import { interests, languages, softSkills, synopsis } from '../../data/about.js'
import Title from '../universal/Title'
import Infobox from './about_me/Infobox'
import Tags from './about_me/Tags'

function AboutMe() {
  return (
    <div id="about-me" className="sub-main align-container-center">
      <div className="title-section">
        <Title
          title="Min bakgrund"
          subTitle={<i className="fa-solid fa-backward" />}
          priority="subtitle"
        />
      </div>

      <div className="sub-main-grid">
        <div>
          {synopsis.map((paragraph) => (
            <p>{paragraph}</p>
          ))}
          <Infobox />
        </div>
        <div className="tags-container">
          <Tags title="Språkkunskaper" data={languages} structure={'array'} />
          <Tags
            title="Mjuka kompetenser"
            data={softSkills}
            structure={'array'}
          />
          <Tags title="Intressen" data={interests} structure={'object'} />
          <Hamburger className="hamburger-svg" />
        </div>
      </div>
    </div>
  )
}

export default AboutMe
