import React from 'react'
import renderIcons from '../../universal/Icons'

function Tags(props) {
  const { title, data, structure } = props

  let template

  if (structure === 'object') {
    template = renderIcons(data)
  }

  if (structure === 'array') {
    template = data.map(tag => (
      <li key={tag}>
        <span>{tag}</span>
      </li>
    ))
  }

  return (
    <>
      <h3>{title}</h3>
      <ul className='list-items-inline list-padding'>
        {template}
      </ul>
    </>
  )
}

export default Tags
