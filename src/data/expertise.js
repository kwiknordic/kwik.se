const paradigms = [
  'Agentisk AI',
  'Funktionell programmering',
  'Minimalism',
  'Komposition',
  'Iterativ utveckling',
]

const tools = [
  { name: 'JavaScript', icon: 'fa-brands fa-js' },
  { name: 'Nuxt', icon: 'simple-icons:nuxt', iconify: true },
  { name: 'Claude Code', icon: 'simple-icons:anthropic', iconify: true },
  { name: 'Git', icon: 'fa-brands fa-github' },
  { name: 'SQL', icon: 'fa-solid fa-database' },
  { name: 'Drizzle ORM', icon: 'simple-icons:drizzle', iconify: true },
  { name: 'Tailwind CSS', icon: 'mdi:tailwind', iconify: true },
  { name: 'VS Code', icon: 'fa-solid fa-code' },
  { name: 'pnpm', icon: 'simple-icons:pnpm', iconify: true },
  { name: 'bun', icon: 'simple-icons:bun', iconify: true },
  { name: 'Tanstack', icon: 'simple-icons:tanstack', iconify: true },
  { name: 'CRUD & RESTful API', icon: 'dashicons:rest-api', iconify: true },
  { name: 'AWS', icon: 'fa-brands fa-aws' },
  { name: 'Linux', icon: 'fa-brands fa-linux' },
  { name: 'Apache', icon: 'simple-icons:apache', iconify: true },
  { name: 'nginx', icon: 'simple-icons:nginx', iconify: true },
  { name: 'DNS & Domänhantering', icon: 'material-symbols:dns', iconify: true },
  { name: 'Canvas', icon: 'fa-brands fa-js' },
  { name: 'Wordpress', icon: 'fa-brands fa-wordpress' },
  { name: 'cPanel', icon: 'fa-brands fa-cpanel' },
]

function codeContent() {
  const less = '\u003C'
  const greater = '\u003E'
  const leftCurly = '\u007B'
  const rightCurly = '\u007D'

  const ts = [
    {
      string: `const expertise`,
      css: 'c-b',
    },
    {
      string: `: string[]`,
      css: 'c-g',
    },
    {
      string: ` = `,
      css: null,
    },
    {
      string: `["HTML", "CSS", "JavaScript", ...others]`,
      css: 'c-y',
    },
  ]

  const react = [
    {
      string: `<>`,
      css: 'c-c',
      newLine: true,
    },
    {
      string: `<Expertise />`,
      css: 'c-g indent-space',
      newLine: true,
    },
    {
      string: `</>`,
      css: 'c-c',
    },
  ]

  const mongo = [
    {
      string: `const Mervin`,
      css: 'c-b',
    },
    {
      string: ` = `,
      css: null,
    },
    {
      string: `await `,
      css: 'c-p',
    },
    {
      string: `Expertise`,
      css: 'c-g',
    },
    {
      string: `.find()`,
      css: 'c-y',
    },
  ]

  return {
    ts,
    react,
    mongo,
  }
}

export { tools, paradigms, codeContent }
