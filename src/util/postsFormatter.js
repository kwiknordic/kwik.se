const getJsonFiles = import.meta.glob('../data/_posts/*.json', { eager: true })

function replaceSwedishCharacters(string) {
  return string      
    .replaceAll(/[ä-å]/g, "a")
    .replaceAll("ö", "o")
}

const createStructuredPosts = Object.entries(getJsonFiles)
  .map(entry => {
    const file = entry[0]
    const data = entry[1].default

    let slug;
    slug = file.slice(
      file.lastIndexOf("/") +1, 
      file.lastIndexOf("."))
    slug = replaceSwedishCharacters(slug)

    let langIcon;
    if (data.language === "en") langIcon = String.fromCodePoint(0x1F1EC, 0x1F1E7)
    if (data.language === "sv") langIcon = String.fromCodePoint(0x1F1F8, 0x1F1EA)

    return {
      ...data,
      slug,
      langIcon,
      date: new Date(data.date).toLocaleString('sv-SE', { dateStyle: "long"}),
      unmodifiedDate: data.date
      }
  })
  
  const groupedPostsByMonth = createStructuredPosts
    .reduce((Map, current) => {
      const date = new Date(current.unmodifiedDate)
      const year = date.getFullYear()
      const month = date.getMonth()
      const monthName = date.toLocaleString('sv-SE', { month: 'long' });
      const key = `${year}-${month}-${monthName}`

      Map.has(key) ? Map.get(key).push(current) : Map.set(key, [current])
      return Map
    }, new Map())

  export {
    createStructuredPosts as blogPosts,
    groupedPostsByMonth,
    replaceSwedishCharacters
  }

  // if need to sort
  /*   .sort((a,b) => new Date(a.date) < new Date(b.date) ? 1 : -1) */