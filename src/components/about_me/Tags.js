import React from 'react'

function Tags(props) {
  const { title, data, structure } = props

  // data is either Array or Object
  let template;

  if (structure === "object") {
    template = data.map(tag => {
      return (
        <li key={tag.name}>
          <span>
            <i class={tag.icon} />
            {tag.name}
          </span>
        </li>
      )
    })
  }

  if (structure === "array") {
    template = data.map(tag => {
      return (
        <li key={tag}>
          <span>{tag}</span>
        </li>
      )
    })
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