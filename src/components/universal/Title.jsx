import React from 'react'

function Title(props) {
  const { title, subTitle, priority = "subtitle", tag = "h2" } = props
  let template;

  const titleTag = tag === "h1" ? 
  <h1 className="title" style={{fontSize: "2rem"}}>{title}</h1> : 
  <h2 className="title">{title}</h2>

  if (priority === "subtitle") {
    template = (
        <div>
          <span className="sub-title">
            {subTitle}
          </span>
          {titleTag}
        </div>
    )
  }

  if (priority === "header") {
    template = (
      <div>
        {titleTag}
        <span className="sub-title">
          {subTitle}
        </span>
      </div>
    )
  }

  return (
    template
  )
}

export default Title