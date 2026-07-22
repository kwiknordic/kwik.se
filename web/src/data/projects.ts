import { formatter } from '@/src/lib/listFormatter'
import kwikScreenshot from '@/src/assets/portfolio/kwik.jpg'
import flixScreenshot from '@/src/assets/portfolio/kwikflix.jpg'
import meetupMCP from '@/src/assets/portfolio/meetup-mcp.jpg'
import { assertUniqueSlugs, slugify } from '@/src/lib/slug'
import { StaticImageData } from 'next/image'

export type ProjectInput = {
  name: string
  summary: string[]
  demo: string | null
  github: string | null
  tools: string[]
  screenshot: StaticImageData | null
}

const projectInputs: ProjectInput[] = [
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
    demo: null,
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
    screenshot: null,
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
type Project = Omit<ProjectInput, 'tools'> & { tools: string }
const formattedProjects: Project[] = projectInputs.map((project) => {
  return {
    ...project,
    tools: formatter.format(project.tools),
  }
})

export const apiProjects = projectInputs.map((project) => ({
  id: slugify(project.name),
  slug: slugify(project.name),
  name: project.name,
  summary: project.summary,
  tools: project.tools,
  demoUrl: project.demo,
  githubUrl: project.github,
  screenshotUrl: project.screenshot?.src ?? null,
}))

assertUniqueSlugs(apiProjects)

export { formattedProjects as projects }
