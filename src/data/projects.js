import { formatter } from "../util/listFormatter.js"
import { getImageUrl } from "../util/getImageUrl.js"

let projects = [
  {
    name: "Localize (under utveckling)",
    summary: [
      "En mobile-first aggregator utav lokala händelser.",
      "Missa inte ett event, nyhet eller uppmaning i din omgivning (enbart Stockholm just nu) med Localize. Localize samlar allt det roliga och intressanta på ett och samma ställe!"
    ],
    demo: null,
    github: "https://github.com/kwiknordic/localize-prototype1",
    tools: ["HTML", "SCSS", "Tailwind CSS", "JavaScript", "React"],
    screenshot: null,
  },
  {
    name: "HTML till PDF",
    summary: [
      "Jag behövde ett aktuellt CV för framtida jobbansökan och kom till insikt att jag ville skapa layouten med CSS, och fylla innehållet med HTML. Lösningen är byggd med Node.js och använder npm-paketet Puppeteer för konverteringen till PDF."
    ],
    demo: `/assets/CV-Mervin-Bratic.pdf`,
    github: "https://github.com/kwiknordic/html-to-pdf",
    tools: ["HTML", "CSS", "JavaScript", "Node.js"],
    screenshot: null,
  },
  {
    name: "kwik.se",
    summary: [
      "Personlig hemsida för uppvisning av portfolio, kompetensområden och kontaktinformation.",
      "Innehållet är lagrat i egna datastrukturer som React renderar genom självständiga komponenter. Bloggen är gjord på Netlify's huvudlösa CMS."
    ],
    demo: "https://kwik.se",
    github: "https://github.com/kwiknordic/kwik.se",
    tools: ["HTML", "CSS", "JavaScript", "React"],
    screenshot: getImageUrl("kwik.jpg"),
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
    screenshot: getImageUrl("kwikflix.jpg"),
  },
  {
    name: "Become a frontend-developer",
    summary: [
      "Använd pilarna för att navigera till närmaste delmål. Delmålen ändrar regelbundet position och spelaren har vunnit när alla delmål är tagna."
    ],
    demo: "https://frontend-dev-game.netlify.app/",
    github: "https://github.com/kwiknordic/frontend-developer-game",
    tools: ["HTML", "CSS", "JavaScript", "Canvas"],
    screenshot: getImageUrl("frontend-game.jpg"),
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