import Image from 'next/image'
import contacts from '@/src/data/contacts'
import heroPortrait from '../../assets/profile-pic-cartoon.png'
import styles from './Hero.module.css'

const email = contacts.find(contact => contact.label === 'Email')

/* Hero — name, role, short pitch, CV + contact actions, portrait.
   The longer bio lives further down the page (see Background). */
export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className="reveal">
        <h1>
          Mervin Bratic<span className="accent">.</span>
        </h1>
        <div className={styles['hero-role']}>
          Fullstack-utvecklare · Stockholm
        </div>
        <p className={styles['hero-intro']}>
          Stark på e-handel och interna verktyg. Tidigare egenföretagare med tekniska lösningar för cirkulär ekonomi av
          hemelektronik.
        </p>
        <div className={styles['hero-cta']}>
          <a className="btn btn-primary" href="/assets/CV-Mervin-Bratic.pdf" target="_blank" rel="noreferrer">
            <i className="pi pi-download" aria-hidden="true" /> Ladda ned mitt CV
            <span className={styles['btn-sub']}>PDF · 0.2 MB</span>
          </a>
          <a className="btn btn-secondary" href={`mailto:${email?.link}`}>
            <i className="pi pi-envelope" aria-hidden="true" /> Kontakta mig
          </a>
        </div>
      </div>

      <div className={`${styles['hero-photo-wrap']} reveal`}>
        <span className={styles['hero-photo-frame']} />
        <div className={styles['hero-photo']}>
          <Image src={heroPortrait} alt="Porträtt av Mervin Bratic" priority />
        </div>
      </div>
    </section>
  )
}
