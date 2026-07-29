import fs from 'node:fs/promises'
import { parse as parseCsvFile } from 'csv-parse/sync'
import { writeJson, dataPath, writeText } from './utils'
import { generatePostIndex } from './generate-post-index'

const files = {
  movieRatings: {
    csv: '/movies/movielens-ratings.csv',
    json: '/movies/movielens-ratings.json',
  },
  movieWishlist: {
    csv: '/movies/movielens-wishlist.csv',
    json: '/movies/movielens-wishlist.json',
  },
}

const ratings = await parseCsv(dataPath(files.movieRatings.csv))
const wishlist = await parseCsv(dataPath(files.movieWishlist.csv))
const blogPosts = await generatePostIndex()

// TODO: loop through the json files and merge it with new records instead of rewriting it
await writeJson(dataPath(files.movieRatings.json), ratings)
await writeJson(dataPath(files.movieWishlist.json), wishlist)
await writeText(dataPath('/posts-index.ts'), blogPosts)

console.log(`Indexed ${ratings.length} movieRatings`)
console.log(`Indexed ${wishlist.length} movieWishlists`)
console.log(`Indexed ${blogPosts.length} post chars`)

async function parseCsv(filePath: string) {
  const file = await fs.readFile(filePath, 'utf8')

  return parseCsvFile(file, {
    columns: true,
    skip_empty_lines: true,
  })
}

