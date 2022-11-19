function importAll(r) {
  let images = {};
  r.keys().forEach(item => { images[item.replace('./', '')] = r(item); });
  return images
}

export {
  importAll
}