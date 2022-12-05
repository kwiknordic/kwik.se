const getJsonFiles = import.meta.glob('../data/_posts/*.json', { eager: true })

/* console.log(getJsonFiles) */

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
      }
  })
  .sort((a,b) => new Date(a.date) < new Date(b.date) ? 1 : -1)

  export {
    createStructuredPosts as blogPosts,
    replaceSwedishCharacters
  }