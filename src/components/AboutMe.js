import React from 'react'
import { synopsis, interests, languages, softSkills } from "../data/about.js"
import Title from "./universal/Title.js"
import Tags from "./about_me/Tags.js"
import Infobox from './about_me/Infobox.js'
import { ReactComponent as Telephone } from "../assets/about/telephone.svg"
import { ReactComponent as Heart } from "../assets/about/heart.svg"
import { ReactComponent as Flower } from "../assets/about/flower.svg"
import { ReactComponent as Hamburger } from "../assets/about/hamburger.svg"

function AboutMe() {
  return (
    <div id="about-me" className="sub-main align-container-center">
      <div className="title-section">
        <Title title="Min bakgrund" subTitle={<i class="fa-solid fa-backward" />} priority="subtitle" />
      </div>

      <div className='sub-main-grid'>
        <div>
          {synopsis.map(paragraph => <p>{paragraph}</p>)}
          <Infobox />
        </div>
        <div>
          <Tags title="Språkkunskaper" data={languages} structure={"array"} />
          <Tags title="Mjuka kompetenser" data={softSkills} structure={"array"} />
          <Tags title="Intressen" data={interests} structure={"object"} />
        </div>
      </div>

      <Telephone className="telephone-svg" />
      <Heart className="heart-svg" />
      <Flower className="flower-svg" />
      <Hamburger className="hamburger-svg" />
    </div>
  )
}

export default AboutMe