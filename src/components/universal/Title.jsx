import React from 'react'

function Title(props) {
  const { title, subTitle, priority = "subtitle" } = props
  let template;

  if (priority === "subtitle") {
    template = (
        <div>
          <span className="sub-title">
            {subTitle}
          </span>
          <h2 className="title">{title}</h2>
        </div>
    )
  }

  if (priority === "header") {
    template = (
      <div>
        <h2 className="title">{title}</h2>
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