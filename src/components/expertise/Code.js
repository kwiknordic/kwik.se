import React from 'react'
import { ReactComponent as Wheel } from "../../assets/expertise/wheel.svg"
import { ReactComponent as Arrow } from "../../assets/expertise/arrow.svg"
import '../../css/codeBlocks.css';

function code(props) {
  const { title, code } = props

  const formattedBlock = code.map(line => {
    const { string, css, newLine } = line

    return newLine ? (
      <><span className={css}>{string}</span><br/></>) 
      : <span className={css}>{string}</span>
  })

  return (
    <div class="code code">
      <header>
        <Wheel />
        <h3>{title}</h3>
        <Arrow />
      </header>
      <div class="code-content">
        <code>
          {formattedBlock}
        </code>
      </div>
  </div>
  )
}

export default code