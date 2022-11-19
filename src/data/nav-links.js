const menu = [
  { name: "Kompetens",
    url: "#expertise-container"
  },
  { name: "Portfolio",
    url: "#portfolio-container"
  },
  { name: "Bakgrund",
    url: "#about-me"
  },
]

const listMenu = menu.map(link => <li><a href={link.url}>{link.name}</a></li>)

export {
  listMenu
}