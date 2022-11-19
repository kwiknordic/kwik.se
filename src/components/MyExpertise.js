import React from 'react'
import Title from "./universal/Title.js"
import Code from './expertise/Code.js'
import { tools, paradigms } from "./expertise/mentions.js"
import { codeContent } from "../data/expertise.js"
import arrow from "../assets/down-arrow.png"
import '../css/myExpertise.css';

const MyExpertise = () => {
  return (
    <div id="expertise-container">
      <div className="sub-main align-container-center">
        <div className="title-section">
          <Title title="Kompetensområden" subTitle={"\u2605".repeat(5)} priority="header" />
          <img className="arrow" src={arrow} alt="" />
        </div>

        <div className='grid'>
          <Code title="HTML" code={codeContent().html} />
          <Code title="CSS" code={codeContent().css} />
          <Code title="JavaScript" code={codeContent().js} />
          <Code title="Node.js" code={codeContent().node} />
          <Code title="React" code={codeContent().react} />
          <Code title="MongoDB" code={codeContent().mongo} />
        </div>

        <div class="mentions">
          <h3>Övriga verktygslådan</h3>
          <ul className='list-items-inline list-padding'>
            {tools}
          </ul>
        </div>

        <div class="mentions">
          <h3>Graviterar mot</h3>
          <ul className='list-items-inline list-padding'>
            {paradigms}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default MyExpertise