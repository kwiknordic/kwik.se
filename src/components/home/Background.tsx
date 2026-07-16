import { synopsis, interests, languages, softSkills } from '@/src/data/about'
import contacts from '@/src/data/contacts'
import styles from './Background.module.css'
import { SectionHead } from './SectionHead';

const collection = [interests, languages, softSkills]
type Interest = { name: string; icon?: string }

export default function Background() {
  return (
    <section className="home-section" id="background">
      <SectionHead>
        <SectionHead.Heading>
          <span className="eyebrow">Min bakgrund</span>
          <SectionHead.Title>Lite om mig</SectionHead.Title>
        </SectionHead.Heading>
      </SectionHead>

      <div className={`${styles['about-grid']} stagger`}>
        <div className={styles['about-bio']} style={{ gridArea: 'bio' }}>
          {synopsis.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        <div className={styles['about-contact']} style={{ gridArea: 'contact' }}>
          <h4>Kontaktuppgifter</h4>
          <ul>
            {contacts.map(contact => (
              <li key={contact.label}>
                <span className={styles['about-contact-ic']}>
                  <i className={contact.icon} aria-hidden="true" />
                </span>
                <a href={contact.link} target={contact.link.startsWith('mailto') ? undefined : '_blank'} rel="noreferrer">
                  {contact.username}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles['about-tags']} style={{ gridArea: 'tags' }}>
          {collection.map(tag => (
            <div className={styles['tag-group']} key={tag.label} style={{ gridArea: tag.slug }}>
              <h4>{tag.label}</h4>
              <ul className={styles['tag-list']}>
                {tag.skills.map((skill: Interest) => (
                  <li key={skill.name} className={`${styles.tag} ${styles[`tag-${tag.slug}`]}`}>
                    {skill.icon ? <i className={skill.icon} aria-hidden="true" /> : null}
                    {skill.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
