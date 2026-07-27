/* ============================================================
   Tiny, dependency-free Markdown → HTML renderer.

   The blog post bodies (src/data/posts/*.json) use a small, known
   subset of Markdown, so a focused server-side renderer keeps us
   free of a runtime markdown dependency and lets posts render fully
   on the server. Supported: ## ### #### headings, **bold**,
   _italic_ / *italic*, `inline code`, ```fenced code```, -/* bullet
   lists, 1. ordered lists, > blockquotes, --- rules, [links](url),
   and paragraphs.

   Everything is HTML-escaped first, so raw tags written in a post
   (e.g. `<style scoped>`) render as literal text.
   ============================================================ */

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/** Inline formatting on already-escaped text. Code spans are left untouched. */
function inline(escaped: string): string {
  return escaped
    .split(/(`[^`]+`)/g)
    .map((part) => {
      if (part.length >= 2 && part.startsWith('`') && part.endsWith('`')) {
        return `<code>${part.slice(1, -1)}</code>`
      }
      return part
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>')
        .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
        .replace(/(^|[^*])\*([^*]+)\*/g, '$1<em>$2</em>')
        .replace(/_([^_]+)_/g, '<em>$1</em>')
    })
    .join('')
}

const BLOCK_START = /^(#{2,4}\s|```|>|\s*[-*]\s|\s*\d+\.\s|---+\s*$)/

export function renderMarkdown(md: string): string {
  const lines = md.replace(/\r\n/g, '\n').split('\n')
  const out: string[] = []
  let codeBlockId = 0
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    // fenced code block ``` ```
    if (/^```/.test(line.trim())) {
      const lang = line.trim().slice(3).trim() || 'plaintext'
      const code: string[] = []
      i++
      while (i < lines.length && !/^```/.test(lines[i].trim())) {
        code.push(lines[i])
        i++
      }
      i++ // closing fence
      const id = `cb-${codeBlockId++}`
      out.push(
        `<div class="code-wrap"><div class="code-header">` +
          `<span class="code-lang">${escapeHtml(lang)}</span>` +
          `<button class="code-copy" type="button" data-target="${id}">kopiera</button>` +
          `</div><pre id="${id}"><code>${escapeHtml(code.join('\n'))}</code></pre></div>`,
      )
      continue
    }

    // heading ## ### ####
    const heading = line.match(/^(#{2,4})\s+(.*)$/)
    if (heading) {
      const level = heading[1].length
      out.push(`<h${level}>${inline(escapeHtml(heading[2].trim()))}</h${level}>`)
      i++
      continue
    }

    // horizontal rule
    if (/^---+\s*$/.test(line)) {
      out.push('<hr/>')
      i++
      continue
    }

    // blockquote
    if (/^>\s?/.test(line)) {
      const quote: string[] = []
      while (i < lines.length && /^>\s?/.test(lines[i])) {
        quote.push(lines[i].replace(/^>\s?/, ''))
        i++
      }
      out.push(`<blockquote><p>${inline(escapeHtml(quote.join(' ')))}</p></blockquote>`)
      continue
    }

    // unordered list
    if (/^\s*[-*]\s+/.test(line)) {
      const items: string[] = []
      while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*[-*]\s+/, ''))
        i++
      }
      out.push('<ul>' + items.map((it) => `<li>${inline(escapeHtml(it))}</li>`).join('') + '</ul>')
      continue
    }

    // ordered list
    if (/^\s*\d+\.\s+/.test(line)) {
      const items: string[] = []
      while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*\d+\.\s+/, ''))
        i++
      }
      out.push('<ol>' + items.map((it) => `<li>${inline(escapeHtml(it))}</li>`).join('') + '</ol>')
      continue
    }

    // blank line
    if (line.trim() === '') {
      i++
      continue
    }

    // paragraph (gather lines until a blank line or the next block)
    const para = [line]
    i++
    while (i < lines.length && lines[i].trim() !== '' && !BLOCK_START.test(lines[i])) {
      para.push(lines[i])
      i++
    }
    out.push(`<p>${inline(escapeHtml(para.join(' ')))}</p>`)
  }

  return out.join('\n')
}
