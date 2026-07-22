const paradigms = {
  label: 'Paradigm',
  skills: [
    { name: 'Agentisk AI' },
    { name: 'Funktionell programmering' },
    { name: 'Minimalism' },
    { name: 'Komposition' },
    { name: 'Iterativ utveckling' },
  ],
}

const infrastructure = {
  label: 'Infrastruktur',
  skills: [
    { name: 'AWS', icon: 'fa-brands fa-aws' },
    { name: 'Cloudflare', icon: 'fa-brands fa-aws' },
    { name: 'Linux', icon: 'fa-brands fa-linux' },
    { name: 'Apache', icon: 'simple-icons:apache', iconify: true },
    { name: 'nginx', icon: 'simple-icons:nginx', iconify: true },
    { name: 'DNS & Domänhantering', icon: 'material-symbols:dns', iconify: true },
    { name: 'cPanel', icon: 'fa-brands fa-cpanel' },
  ],
}

const webdev = {
  label: 'Webbutveckling',
  skills: [
    { name: 'JavaScript', icon: 'fa-brands fa-js' },
    { name: 'TypeScript', icon: 'fa-brands fa-js' },
    { name: 'Vue' },
    { name: 'React' },
    { name: 'Nuxt', icon: 'simple-icons:nuxt', iconify: true },
    { name: 'Tailwind CSS', icon: 'mdi:tailwind', iconify: true },
    { name: 'Tanstack', icon: 'simple-icons:tanstack', iconify: true },
    { name: 'Hono' },
    { name: 'REST API', icon: 'dashicons:rest-api', iconify: true },
    { name: 'GraphQL', icon: 'fa-brands fa-js' },
    { name: 'Websocket', icon: 'fa-brands fa-js' },
    { name: 'bun', icon: 'simple-icons:bun', iconify: true },
    { name: 'Canvas', icon: 'fa-brands fa-js' },
    { name: 'WCAG' },
    { name: 'Wordpress', icon: 'fa-brands fa-wordpress' },
  ],
}

const db = {
  label: 'Datahantering',
  skills: [
    { name: 'SQL', icon: 'fa-solid fa-database' },
    { name: 'PostgreSQL' },
    { name: 'Drizzle ORM' },
    { name: 'Redis' },
    { name: 'Convex' },
    { name: 'MongoDB' },
    { name: 'PocketBase' },
  ],
}

const devops = {
  label: 'DevOps',
  skills: [
    { name: 'Git', icon: 'fa-brands fa-github' },
    { name: 'Docker' },
    { name: 'GitHub Actions', icon: 'fa-brands fa-github' },
    { name: 'Cloudflare Tunnels' },
  ],
}

const llm = {
  label: 'LLM',
  skills: [
    { name: 'MCP' },
    { name: 'OpenAI SDK' },
    { name: 'LangChain' },
    { name: 'RAG' },
    { name: 'Embedding' },
    { name: 'Ollama' },
  ],
}

const editors = {
  label: 'Kodredigerare',
  skills: [
    { name: 'VS Code' },
    { name: 'Zed' },
    { name: 'Claude CLI', icon: 'simple-icons:anthropic' },
    { name: 'Codex CLI' },
    { name: 'OpenCode' },
    { name: 'Ivy Tendril' },
  ],
}

export default [paradigms, devops, webdev, llm, editors, infrastructure, db]
