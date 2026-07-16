import { formatter } from '@/src/lib/listFormatter'
import kwikScreenshot from '@/src/assets/portfolio/kwik.jpg'
import flixScreenshot from '@/src/assets/portfolio/kwikflix.jpg'
import meetupMCP from '@/src/assets/portfolio/meetup-mcp.jpg'

let projects = [
  {
    name: 'kwik.se (omdesign)',
    summary: [
      'Personlig hemsida för kontaktinformation med ny omdesign.',
      'Innehållet är lagrat i egna datastrukturer som React renderar genom självständiga komponenter. Bloggen är gjord på en huvudlös CMS.',
    ],
    demo: 'https://kwik.se',
    github: 'https://github.com/kwiknordic/kwik.se',
    tools: ['React', 'TypeScript', 'Tailwind', 'Claude'],
    screenshot: null,
  },
  {
    name: 'MCP-server: Meetup Events Scraper',
    summary: [
      'An MCP server for automating Meetup event tracking with an AI agent. It equips the agent with tools to browse Meetup.com, detect new events since the last known record, and return structured event data.',
      'I use it to populate kwik.se/aktiviteter',
    ],
    github: 'https://www.npmjs.com/package/@kwiknordic/meetup-events-scraper-mcp',
    screenshot: meetupMCP,
    tools: ['node', 'stdio'],
  },
  {
    name: 'Ivy Tendril',
    summary: ['Bidragit med förslag på förbättringar, skapat och fått merge:at PRs.'],
    demo: 'https://ivy.app/',
    github: 'https://github.com/Ivy-Interactive/Ivy-Tendril',
    tools: ['.NET'],
  },
  {
    name: 'kwik.se',
    summary: [
      'Personlig hemsida för kontaktinformation.',
      "Innehållet är lagrat i egna datastrukturer som React renderar genom självständiga komponenter. Bloggen är gjord på Netlify's huvudlösa CMS.",
    ],
    demo: 'https://kwik.se',
    github: 'https://github.com/kwiknordic/kwik.se',
    tools: ['React', 'JavaScript', 'CSS', 'HTML'],
    screenshot: kwikScreenshot,
  },
  {
    name: 'Kwikflix',
    summary: [
      'Håll koll på senaste filmer & serier. Uppdateras kontinuerligt genom API-förfrågningar mot TMDB-databasen. Kwikflix ger möjlighet att söka efter, och spara resultat; allt lagras lokalt i localStorage.',
      'Applikationen är helt byggt utan ett framework(!); använder webbkomponenter med Shadom DOM, slots, och en j*vla massa getQuerySelectors...',
    ],
    demo: 'https://flix.kwik.se',
    github: 'https://github.com/kwiknordic/Kwikflix',
    tools: ['JavaScript', 'HTML', 'CSS'],
    screenshot: flixScreenshot,
  },
  {
    name: 'HTML till PDF',
    summary: [
      'Jag behövde ett aktuellt CV för framtida jobbansökan och kom till insikt att jag ville skapa layouten med CSS, och fylla innehållet med HTML. Lösningen är byggd med Node.js och använder Puppeteer för konverteringen till PDF.',
    ],
    demo: `/assets/CV-Mervin-Bratic.pdf`,
    github: 'https://github.com/kwiknordic/html-to-pdf',
    tools: ['JavaScript', 'Node.js', 'Puppeteer', 'HTML', 'CSS'],
    screenshot: null,
  },
  {
    name: 'YouTube till .mp3-filer',
    summary: [
      "Skapade för några vänner möjlighet att skapa och beställa CD-skivor med egna motiv av bifogade YouTube-länkar. Trenden med 'Personalized CDs' is back, I tell you!",
    ],
    demo: `https://print.kwik.se/`,
    github: 'https://github.com/kwiknordic/kwikprint',
    tools: ['TypeScript', 'Nuxt', 'Webassembly', 'RestAPI'],
    screenshot: null,
  },
]

// Make tools-array into string with punctuations
projects = projects.map((project) => {
  project.tools = formatter.format(project.tools)
  return project
})

export { projects }
