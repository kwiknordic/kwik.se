import { formatter } from "../util/formatter.js"
import { importAll } from "../util/importAll.js"

const images = importAll(require.context('../assets/portfolio', false, /\.(png|jpe?g|svg)$/));

let projects = [
  {
    name: "HTML till PDF",
    summary: [
      "Jag behövde ett CV vid jobbansökan och ansåg att ville då skapa hela CV:et med kod."
    ],
    demo: `${process.env.PUBLIC_URL}/assets/CV-Mervin-Bratic.pdf`,
    github: "https://github.com/kwiknordic/html-to-pdf",
    tools: ["HTML", "CSS", "JavaScript", "React"],
    screenshot: `${process.env.PUBLIC_URL}/assets/CV-Mervin-Bratic.pdf`,
  },
  {
    name: "kwik.se",
    summary: [
      "Personlig hemsida för att visa upp mig själv, min kompetens och mina projekt."
    ],
    demo: "https://kwik.se",
    github: "https://github.com/kwiknordic/",
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
    demo: "https://astounding-cajeta-a7c578.netlify.app/",
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