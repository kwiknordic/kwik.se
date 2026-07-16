'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NAV_TABS, isActiveTab } from '../../lib/nav'
import contacts from '@/src/data/contacts'
import LangToggle from './LangToggle'


function SocialLinks() {
  return (
    <>
      {contacts.map(contact => (
        <a
          key={contact.label}
          href={contact.link}
          target={contact.label === 'Email' ? 'mailto' : '_blank'}
          rel="noreferrer"
          aria-label={contact.label}
        >
          <i className={contact.icon} aria-hidden="true" />
        </a>
      ))}
    </>
  )
}

export default function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [prevPathname, setPrevPathname] = useState(pathname)

  // Close the mobile menu when the route changes. Using the
  // "adjust during render" pattern avoids a setState-in-effect warning.
  if (prevPathname !== pathname) {
    setPrevPathname(pathname)
    setOpen(false)
  }

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 720) setOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <header className="k-header">
      <div className="k-header-inner">
        <Link className="k-logo" href="/">
          kwik<span className="dot">.</span>
        </Link>

        <nav className="k-nav">
          {NAV_TABS.map((t) => (
            <Link key={t.href} href={t.href} className={isActiveTab(t, pathname) ? 'active' : ''}>
              {t.label}
            </Link>
          ))}
        </nav>

        <div className="k-social">
          <SocialLinks />
        </div>

        <LangToggle hidden />

        <button
          className={'k-menu-btn' + (open ? ' open' : '')}
          onClick={() => setOpen((v) => !v)}
          aria-label="Meny"
          aria-expanded={open}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div className={'k-mobile-menu' + (open ? ' open' : '')}>
        <nav className="k-mobile-nav">
          {NAV_TABS.map((t) => (
            <Link key={t.href} href={t.href} className={isActiveTab(t, pathname) ? 'active' : ''}>
              <span>{t.label}</span>
              <i className="pi pi-arrow-right" aria-hidden="true" />
            </Link>
          ))}
        </nav>
        <div className="k-mobile-foot">
          <LangToggle hidden />
          <div className="k-mobile-social">
            <SocialLinks />
          </div>
        </div>
      </div>
    </header>
  )
}
