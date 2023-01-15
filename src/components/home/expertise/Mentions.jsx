import * as data from "../../../data/expertise.js"
import { Icon } from '@iconify/react';

const tools = data.tools.map(tool => {
  const { icon, name, iconify } = tool

  // if icons are via iconify
  if (icon && iconify) return <li key={name}><span><Icon icon={icon} />{name}</span></li>

  // if icons are from FontAwesome-lib
  if (icon) return <li key={name}><span><i className={icon} />{name}</span></li>

  // if there are no icons available
  return <li key={name}><span>{name}</span></li>
})

const paradigms = data.paradigms.map(paradigm => <li key={paradigm}><span>{paradigm}</span></li>)

export {
  tools,
  paradigms
}