'use client'

import { useEffect, useState } from 'react'

/* Reading-experience enhancements for a blog post:
   1. a top reading-progress bar tied to scroll position, and
   2. "copy" buttons on code blocks (wired by event delegation since
      the code HTML is server-rendered via dangerouslySetInnerHTML). */
export default function PostEnhancements() {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement
      const max = el.scrollHeight - el.clientHeight
      setWidth(max > 0 ? (window.scrollY / max) * 100 : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const btn = (e.target as HTMLElement).closest('.code-copy') as HTMLElement | null
      if (!btn) return
      const id = btn.getAttribute('data-target')
      const pre = id ? document.getElementById(id) : null
      if (!pre) return
      navigator.clipboard
        .writeText(pre.textContent || '')
        .then(() => {
          const original = btn.textContent
          btn.textContent = '✓ kopierat'
          btn.classList.add('copied')
          setTimeout(() => {
            btn.textContent = original
            btn.classList.remove('copied')
          }, 2000)
        })
        .catch(() => {
          /* clipboard unavailable */
        })
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  return <div id="progress" style={{ width: `${width}%` }} />
}
