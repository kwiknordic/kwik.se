import { lazy, Suspense } from 'react'
import Layout from './components/Layout'
import { Route, Routes } from 'react-router-dom'

const Home = lazy(() => import('./components/Home'))
const PageNotFound = lazy(() => import('./components/PageNotFound'))
const Blog = lazy(() => import('./components/Blog'))
const Activities = lazy(() => import('./components/Activities'))
const Movies = lazy(() => import('./components/Movies'))
const Books = lazy(() => import('./components/Books'))
const Post = lazy(() => import('./components/blog/Post'))

function App() {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="blog">
            <Route index element={<Blog />} />
            <Route path=":slug" element={<Post />} />
          </Route>
          <Route path="activities" element={<Activities />} />
          <Route path="books" element={<Books />} />
          <Route path="movies" element={<Movies />} />
          <Route path="*" element={<PageNotFound status={404} />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App
