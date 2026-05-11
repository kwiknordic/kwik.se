import React from 'react'
import { Icon } from '@iconify/react'

export default function renderIcons(items) {
  return items.map(({ name, icon, iconify }) => (
    <li key={name}>
      <span>
        {icon && iconify ? <Icon icon={icon} /> : icon ? <i className={icon} /> : null}
        {name}
      </span>
    </li>
  ))
}
