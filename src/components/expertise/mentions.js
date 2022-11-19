import * as data from "../../data/expertise.js"

const tools = data.tools.map(tool => {
  const { icon, name } = tool

  if (icon) return <li key={name}><span><i class={icon} />{name}</span></li>
  return <li key={name}><span>{name}</span></li>
})

const paradigms = data.paradigms.map(paradigm => <li key={paradigm}><span>{paradigm}</span></li>)

export {
  tools,
  paradigms
}