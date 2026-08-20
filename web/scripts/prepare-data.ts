import { writeText, dataPath } from './utils'
import { generatePostIndex } from './generate-post-index'

const blogPosts = await generatePostIndex()
await writeText(dataPath('/posts-index.ts'), blogPosts)
console.log(`Indexed ${blogPosts.length} post chars`)
