import React from 'react'
const modules = import.meta.glob('../cms/_posts/*.json')

for (const path in modules) {
  modules[path]().then((mod) => {
    console.log(mod.title)
  })
}

function Blog() {
  return (
    <div>Blog</div>
  
  )
}

export default Blog