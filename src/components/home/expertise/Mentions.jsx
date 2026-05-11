import * as data from "../../../data/expertise.js"
import renderIcons from '../../universal/Icons'

const tools = renderIcons(data.tools)

const paradigms = data.paradigms.map(paradigm => <li key={paradigm}><span>{paradigm}</span></li>)

export {
  tools,
  paradigms
}
