const synopsis = [
  'Fullstack-utvecklare som, bland annat, är stark på ehandel och interna verktyg. Min första e-handel blev vägen in i webbutveckling.',
  'Har tidigare varit egenföretagare inom cirkulär ekonomi av hemelektronik. Innan dess har jag samlat på erfarenhet av projektledning, försäljning och kundhantering.',
  'Talar och skriver felfri svenska, engelska och bosniska. Tillbringat också perioder i jobbet utomlands och är van att jobba i olika dynamiska, sociala och kulturella miljöer.',
  'Jag trivs i roller där teknik och människor möts.',
]

const languages = {
  label: 'Språkkunskaper',
  slug: 'lang',
  skills: [{ name: 'Svenska' }, { name: 'Engelska' }, { name: 'Bosniska' }],
}

const softSkills = {
  label: 'Mjuka kompetenser',
  slug: 'soft',
  skills: [
    { name: 'Fyndig' },
    { name: 'Resursfull' },
    { name: 'Kommunikativ' },
    { name: 'Social' },
    { name: 'Allmänbildad' },
    { name: 'Driftig' },
    { name: 'Nyfiken' },
    { name: 'Detaljorienterad' },
    { name: 'Anpassningsbar' },
    { name: 'Organiserad' },
  ],
}

const interests = {
  label: 'Intressen',
  slug: 'interests',
  skills: [
    { name: 'JavaScript', icon: 'fa-brands fa-js' },
    { name: 'IMDB TOP250', icon: 'fa-solid fa-film' },
    { name: 'Raspberry Pi', icon: 'fa-solid fa-microchip' },
    { name: 'Makroekonomi', icon: 'fa-solid fa-coins' },
    { name: 'Filosofi', icon: 'fa-solid fa-lightbulb' },
    { name: 'Styrkelyft', icon: 'fa-solid fa-dumbbell' },
    { name: 'Ståuppkomik', icon: 'fa-solid fa-masks-theater' },
    { name: 'Stadsturism', icon: 'fa-solid fa-museum' },
    { name: 'Fotboll', icon: 'fa-solid fa-futbol' },
    { name: 'Right to Repair', icon: 'fa-solid fa-screwdriver-wrench' },
    { name: 'Motown', icon: 'fa-solid fa-music' },
    { name: 'Volleyboll', icon: 'fa-solid fa-volleyball' },
    { name: 'På spåret', icon: 'fa-solid fa-train' },
    { name: 'Shack', icon: 'fa-solid fa-chess' },
    { name: 'Badminton', icon: 'fa-solid fa-table-tennis-paddle-ball' },
    { name: 'Läsplatta', icon: 'fa-solid fa-tablet-screen-button' },
    { name: 'Podcast', icon: 'fa-solid fa-podcast' },
  ],
}

export { synopsis, interests, languages, softSkills }
