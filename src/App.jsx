import Layout from './components/Layout'
import Home from './components/Home'
import PageNotFound from './components/PageNotFound'
import Blog from './components/Blog'
import Activities from './components/Activities'
import Movies from './components/Movies'
import Books from './components/Books'
import Post from './components/blog/Post'
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <>
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
    </>
  )
}

export default App
