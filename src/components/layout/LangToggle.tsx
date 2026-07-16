'use client'

import { useEffect, useState } from 'react'

/* ============================================================
   Language toggle (SV / EN).

   LATENT FEATURE: the site is Swedish-only for now and i18n is not
   wired up yet, so this is hidden by default (`hidden` prop). The
   markup and styling are kept ready so a future dev can flip it on
   by rendering <LangToggle /> without `hidden` once translations
   exist. It remembers the choice in localStorage in the meantime.
   ============================================================ */
export default function LangToggle({ hidden = false }: { hidden?: boolean }) {
  const [lang, setLang] = useState<'sv' | 'en'>('sv')

  useEffect(() => {
    try {
      const saved = localStorage.getItem('kwik-lang')
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (saved === 'sv' || saved === 'en') setLang(saved)
    } catch {
      /* ignore unavailable storage */
    }
  }, [])

  const choose = (l: 'sv' | 'en') => {
    setLang(l)
    try {
      localStorage.setItem('kwik-lang', l)
    } catch {
      /* ignore */
    }
  }

  return (
    <div className="lang-toggle" role="group" aria-label="Språk / Language" hidden={hidden}>
      <i className="pi pi-globe lang-globe" aria-hidden="true" />
      <button className={'lang-opt' + (lang === 'sv' ? ' on' : '')} onClick={() => choose('sv')} aria-pressed={lang === 'sv'}>
        SV
      </button>
      <button className={'lang-opt' + (lang === 'en' ? ' on' : '')} onClick={() => choose('en')} aria-pressed={lang === 'en'}>
        EN
      </button>
    </div>
  )
}
