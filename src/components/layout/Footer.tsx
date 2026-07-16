import Link from 'next/link'
import { NAV_TABS } from '../../lib/nav'
import contacts from '@/src/data/contacts'

/* Server component — the footer is fully static. */
export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="k-footer">
      <div className="k-footer-inner">
        <div className="k-footer-top">
          <div>
            <div className="k-logo">
              kwik<span className="dot" style={{ color: 'var(--warm)' }}>.</span>
            </div>
            <p className="k-footer-blurb">
              Fullstack-utvecklare i Stockholm. Bygger e-handel och interna verktyg — och delar det jag läser, ser och
              lär mig på vägen.
            </p>
          </div>
          <div className="k-footer-cols">
            <div className="k-footer-col">
              <h5>Sidor</h5>
              {NAV_TABS.map((t) => (
                <Link key={t.href} href={t.href}>
                  {t.label}
                </Link>
              ))}
            </div>
            <div className="k-footer-col">
              <h5>Kontakt</h5>
              {contacts.map(contact => (
                <a href={contact.link} key={contact.label} target="_blank" rel="noreferrer">
                  {contact.label}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="k-footer-bottom">
          <span>© 2021-{year} Mervin Bratic</span>
          <span className="hand">byggd med omsorg i Stockholm</span>
        </div>
      </div>
    </footer>
  )
}
