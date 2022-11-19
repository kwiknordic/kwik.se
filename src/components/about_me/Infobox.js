import React from 'react'
import { contactInfo }from "../../data/about.js"

const contact = contactInfo.map( (contact, index) => {
  const { icon, username, link } = contact

  return (
    <li key={index}>
      <i className={icon} />
      <a href={link} target="_blank" rel="noreferrer">{username}</a>
    </li>
  )
})

function Infobox() {
  return (
    <div className='info-box'>
      <h3>Kontaktuppgifter</h3>
      <ul className='list-items-block'>
        {contact}
      </ul>
    </div>
  )
}

export default Infobox