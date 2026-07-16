'use client'

import { useState } from 'react'
import styles from './ShareBar.module.css'

/* Share buttons for a blog post. Reads the live URL at click time so
   it always shares the page the reader is on (LinkedIn / X / email /
   copy-link). */
export default function ShareBar({ title, lang }: { title: string; lang: 'sv' | 'en' }) {
  const [copied, setCopied] = useState(false)
  const t = (sv: string, en: string) => (lang === 'sv' ? sv : en)
  const url = () => (typeof window !== 'undefined' ? window.location.href.split('#')[0] : '')

  const open = (href: string) => window.open(href, '_blank', 'noopener')
  const shareLinkedIn = () => open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url())}`)
  const shareX = () => open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url())}`)
  const shareMail = () => {
    window.location.href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(title + ' — ' + url())}`
  }
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url())
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <div className={styles['share-pills']}>
      <button className={styles['share-icon']} onClick={shareLinkedIn} aria-label={t('Dela på LinkedIn', 'Share on LinkedIn')} title="LinkedIn">
        <i className="pi pi-linkedin" aria-hidden="true" />
      </button>
      <button className={styles['share-icon']} onClick={shareX} aria-label={t('Dela på X', 'Share on X')} title="X">
        <i className="pi pi-twitter" aria-hidden="true" />
      </button>
      <button className={styles['share-icon']} onClick={shareMail} aria-label={t('Dela via mejl', 'Share via email')} title={t('Mejl', 'Email')}>
        <i className="pi pi-envelope" aria-hidden="true" />
      </button>
      <button
        className={styles['share-icon'] + (copied ? ' ' + styles.copied : '')}
        onClick={copyLink}
        aria-label={t('Kopiera länk', 'Copy link')}
        title={t('Kopiera länk', 'Copy link')}
      >
        <i className={copied ? 'pi pi-check' : 'pi pi-link'} aria-hidden="true" />
      </button>
    </div>
  )
}
