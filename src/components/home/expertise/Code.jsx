import React from 'react'
import Wheel from "../../../assets/expertise/wheel.svg?react"
import Arrow from "../../../assets/expertise/arrow.svg?react"
import '../../../css/codeBlocks.css';

function code(props) {
  const { title, code } = props

  const formattedBlock = code.map((line, i) => {
    const { string, css, newLine } = line

    return newLine ? (
      <React.Fragment key={i}><span className={css}>{string}</span><br/></React.Fragment>)
      : <span key={i} className={css}>{string}</span>
  })

  return (
    <div className="code code">
      <header>
        <Wheel />
        <h3>{title}</h3>
        <Arrow />
      </header>
      <div className="code-content">
        <code>
          {formattedBlock}
        </code>
      </div>
  </div>
  )
}

export default code