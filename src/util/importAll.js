function getImageUrl(name) {
  return new URL(`../assets/portfolio/${name}`, import.meta.url).href
}

export {
  getImageUrl
}