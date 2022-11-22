import { formatter } from "../util/formatter.js"
import { importAll } from "../util/importAll.js"

const images = importAll(require.context('../assets/portfolio', false, /\.(png|jpe?g|svg)$/));

let projects = [
  {
    name: "HTML till PDF",
    summary: [
      "Jag behövde ett aktuellt CV för framtida jobbansökan och kom till insikt att jag ville skapa layouten med CSS, och fylla innehållet med HTML. Lösningen är byggd med Node.js och använder npm-paketet Puppeteer för konverteringen till PDF."
    ],
    demo: `${process.env.PUBLIC_URL}/assets/CV-Mervin-Bratic.pdf`,
    github: "https://github.com/kwiknordic/html-to-pdf",
    tools: ["HTML", "CSS", "JavaScript", "React"],
    screenshot: `${process.env.PUBLIC_URL}/assets/CV-Mervin-Bratic.pdf`,
  },
  {
    name: "kwik.se",
    summary: [
      "Personlig hemsida för uppvisning av portfolio, kompetensområden och kontaktinformation.",
      "Innehållet är lagrat i egna datastrukturer som React renderar genom självständiga komponenter."
    ],
    demo: "https://kwik.se",
    github: "https://github.com/kwiknordic/kwik.se",
    tools: ["HTML", "CSS", "JavaScript", "React"],
    screenshot: images["kwik.jpg"],
  },
  {
    name: "Kwikflix",
    summary: [
      "Bläddra, hitta och läs mer om de trendigaste och bästa Film- och TV-produktionerna. Uppdateras kontinuerligt genom API-förfrågningar mot TMDB-databasen. Kwikflix ger även användaren möjlighet att söka efter, och spara, egna resultat.",
      "Applikationen renderas hos användaren (client-side) och allt innehåll tillhandahålls och sparas via localStorage."
    ],
    demo: "https://flix.kwik.se",
    github: "https://github.com/kwiknordic/Kwikflix",
    tools: ["HTML", "CSS", "JavaScript"],
    screenshot: images["kwikflix.jpg"],
  },
  {
    name: "Become a frontend-developer",
    summary: [
      "Använd pilarna för att navigera till närmaste delmål. Delmålen ändrar regelbundet position och spelaren har vunnit när alla delmål är tagna."
    ],
    demo: "https://frontend-dev-game.netlify.app/",
    github: "https://github.com/kwiknordic/frontend-developer-game",
    tools: ["HTML", "CSS", "JavaScript", "Canvas"],
    screenshot: images["frontend-game.jpg"],
  }
]

// Make tools-array into string with punctuations
projects = projects.map(project => {
  project.tools = formatter.format(project.tools)
  return project
})

export {
  projects
}