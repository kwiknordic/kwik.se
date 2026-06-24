import { formatter } from '../util/listFormatter.js'
import { getImageUrl } from '../util/getImageUrl.js'

let projects = [
  {
    name: 'meetup-mcp',
    summary: [
      'En MCP-server för att skrapa Meetup-events du varit på.',
      'Den ger AI-agenten verktyg att hitta dina tidigare events, att begränsa från ett visst datum/event; att returnera färdig strukturerad data.',
      'Jag använder den till att uppdatera kwik.se med mina aktiviteter.',
    ],
    demo: 'https://www.npmjs.com/package/@kwiknordic/meetup-events-scraper-mcp#meetup-mcp-server',
    github: 'https://github.com/kwiknordic/meetup-events-scraper-mcp',
    tools: ['MCP', 'TypeScript', 'npm.js', 'node'],
    screenshot: getImageUrl('meetup-mcp.jpg'),
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
    screenshot: getImageUrl('kwik.jpg'),
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
    screenshot: getImageUrl('kwikflix.jpg'),
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
