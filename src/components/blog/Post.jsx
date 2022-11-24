import React from 'react'
import { useParams } from "react-router-dom"

function Post() {
  let { slug } = useParams()

  return (
    <div>Post {slug}</div>
  )
}

export default Post