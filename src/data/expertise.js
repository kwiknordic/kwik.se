const paradigms = ["Funktionell programmering", "Minimalism", "Komposition", "Iterativ utveckling"]

const tools = [
  { name: "Github",
    icon: "fa-brands fa-github"
  },
  { name: "VS Code",
    icon: "fa-solid fa-code"
  },
  { name: "npm",
    icon: "fa-brands fa-npm"
  },
  { name: "cPanel",
    icon: "fa-brands fa-cpanel"
  },
  { name: "Bootstrap",
    icon: "fa-brands fa-bootstrap"
  },
  { name: "Canvas",
    icon: "fa-brands fa-js"
  },
  { name: "CRUD & RESTful API",
    icon: null,
  },
  { name: "Swagger",
  icon: null
  },
  { name: "Wordpress",
  icon: "fa-brands fa-wordpress"
  },
  { name: "Linux",
  icon: "fa-brands fa-linux"
  },
  { name: "Apache",
  icon: null
  },
  { name: "nginx",
  icon: null
  },
  { name: "mySQL",
  icon: null
  },
  { name: "DNS & Domänhantering",
  icon: null
  },
]

function codeContent() {
  const less = "\u003C"
  const greater = "\u003E"
  const leftCurly = "\u007B"
  const rightCurly = "\u007D"

  const html = [
    {
      string: `${less}div `,
      css: "c-r"
    },
    {
      string: `class`,
      css: "c-y"
    },
    {
      string: `=`,
      css: "c-w"
    },
    {
      string: `"expertise"`,
      css: "c-g"
    },
    {
      string: `${greater}${less}/div${greater}`,
      css: "c-r"
    },
  ]

  const css = [
    {
      string: `.expertise ${leftCurly}`,
      css: "c-y",
      newLine: true
    },
    {
      string: `display: `,
      css: "c-b indent-space",
    },
    {
      string: `grid;`,
      css: "c-g",
      newLine: true
    },
    {
      string: `${rightCurly}`,
      css: "c-y"
    },
  ]

  const js = [
    {
      string: `const expertise`,
      css: "c-b"
    },
    {
      string: ` = `,
      css: null
    },
    {
      string: `["HTML", "CSS", "JavaScript", ...others]`,
      css: "c-y"
    },
  ]

  const node = [
    {
      string: `import `,
      css: "c-p"
    },
    {
      string: `express `,
      css: "c-b"
    },
    {
      string: `from `,
      css: "c-p"
    },
    {
      string: `"express"`,
      css: "c-p",
      newLine: true
    },
    {
      string: ``,
      css: "null",
      newLine: true
    },
    {
      string: `app.use`,
      css: "c-b",
    },
    {
      string: `(express.static('public'))`,
      css: "c-y",
    },
  ]

  const react = [
    {
      string: `<>`,
      css: "c-c",
      newLine: true
    },
    {
      string: `<Expertise />`,
      css: "c-g indent-space",
      newLine: true
    },
    {
      string: `</>`,
      css: "c-c",
    },
  ]

  const mongo = [
    {
      string: `const`,
      css: "c-b",
    },
    {
      string: ` = `,
      css: null,
    },
    {
      string: `await `,
      css: "c-p",
    },
    {
      string: `Expertise`,
      css: "c-g",
    },
    {
      string: `.find()`,
      css: "c-y",
    },
  ]

  return {
    html,
    css,
    js,
    node,
    react,
    mongo
  }

}

export {
  tools,
  paradigms,
  codeContent,
}