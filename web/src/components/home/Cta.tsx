import contacts from '@/src/data/contacts'
import styles from './Cta.module.css'

const email = contacts.find(contact => contact.label === 'Email')

/* Closing call-to-action band. */
export default function Cta() {
  return (
    <section className={`${styles.cta} home-section`}>
      <div className={`${styles['cta-inner']} reveal`}>
        <div className={styles['cta-text']}>
          <h2>Letar du efter en utvecklare som bryr sig om detaljerna?</h2>
          <p>Jag är öppen för nya uppdrag och roller. Skriv en rad så tar vi ett möte.</p>
        </div>
        <div className={styles['cta-actions']}>
          <a className="btn btn-primary" href="https://www.cal.eu/mervinbratic/" target="_blank" rel="noreferrer">
            <i className="pi pi-calendar" aria-hidden="true" /> Boka ett möte
          </a>
          <a className="btn btn-light" href={`mailto:${email?.link}`}>
            <i className="pi pi-envelope" aria-hidden="true" /> {email?.username}
          </a>
        </div>
      </div>
    </section>
  )
}
