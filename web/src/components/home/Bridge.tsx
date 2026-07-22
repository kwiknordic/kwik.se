import Link from 'next/link'
import styles from './Bridge.module.css'
import { SectionHead } from './SectionHead'

const BRIDGES = [
  { href: '/aktiviteter', icon: 'pi pi-thumbtack', title: 'Aktiviteter', desc: 'Meetups, mässor och hackkvällar runt om i Stockholm.', go: 'Se vart jag varit' },
  { href: '/tips', icon: 'pi pi-verified', title: 'Tips', desc: 'Det som fastnat av det jag läst, sett och hört.', go: 'Bläddra i hyllan' },
  { href: '/galleri', icon: 'pi pi-eye', title: 'Ögonblick', desc: 'Något från resor, träffar, stan och skrivbordet.', go: 'Titta mellan raderna' },
  { href: '/blogg', icon: 'pi pi-pencil', title: 'Blogg', desc: 'Tankar om kod, bygge och allt däremellan.', go: 'Läs det senaste' },
]

export default function Bridge() {
  return (
    <section className="home-section" id="bridge">
      <SectionHead >
        <SectionHead.Heading>
          <span className="eyebrow">Vid sidan av koden</span>
          <SectionHead.Title>I mina spår</SectionHead.Title>
          <SectionHead.Description>Det jag tänker och gör i viloläge.</SectionHead.Description>
        </SectionHead.Heading>
      </SectionHead>
      <div className={`${styles['bridge-grid']} stagger`}>
        {BRIDGES.map((bridge) => (
          <div className={`${styles['bridge-card']} flex flex-col gap-4 rounded-lg p-6 relative`} key={bridge.title}>
            <div className='flex flex-row items-center gap-4'>
              <div className={`${styles['bridge-ic']} flex items-center justify-center w-11 h-11 rounded-lg`}>
                <i className={`${bridge.icon}`} aria-hidden="true" />
              </div>
              <h3 className='order-1'>{bridge.title}</h3>
            </div>
            <p className='flex-1'>{bridge.desc}</p>
            <Link href={bridge.href} className={`${styles.go} after:absolute after:inset-0`}>
              {bridge.go} <i className="pi pi-arrow-right" aria-hidden="true" />
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}
