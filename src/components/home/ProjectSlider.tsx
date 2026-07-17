'use client'

import { useState } from 'react'
import { Carousel, CarouselButton, CarouselContent, CarouselItem } from '@/src/components/ui/carousel'
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle } from '@/src/components/ui/dialog'
import { projects } from '../../data/projects'
import styles from './ProjectSlider.module.css'
import { SectionHead } from './SectionHead'

export default function ProjectSlider() {
  const [screenshot, setScreenshot] = useState<{ src: string; name: string } | null>(null)

  return (
    <section id="projects" className="home-section">
      <Carousel className={styles['proj-carousel']}>
        <SectionHead>
          <SectionHead.Heading>
            <span className="eyebrow">Hobbyprojekt</span>
            <SectionHead.Title>Saker jag kodat</SectionHead.Title>
          </SectionHead.Heading>
          <div className='flex gap-3 flex-1 justify-end'>
            <CarouselButton direction="prev" aria-label="Föregående">
              <i className="pi pi-chevron-left" aria-hidden="true" />
            </CarouselButton>
            <CarouselButton direction="next" aria-label="Nästa">
              <i className="pi pi-chevron-right" aria-hidden="true" />
            </CarouselButton>
          </div>
        </SectionHead>
        <CarouselContent className={styles['proj-carousel-content']}>
          {projects.map(({ name, summary, tools, github, demo, screenshot }) => (
            <CarouselItem className={styles['proj-carousel-item']} key={name}>
              <article className={styles['proj-slide']}>
                <div className={styles['proj-slide-body']}>
                  <h3>{name}</h3>
                  <em className={styles['proj-built']}>Byggd med {tools}.</em>
                  <div className={styles['proj-summary']}>
                    {summary.map((summary, index) => <p key={index}>{summary}</p>)}
                  </div>
                  <div className={styles['proj-links']}>
                    {demo && (
                      <a className={styles['proj-link']} href={demo} target="_blank" rel="noreferrer">
                        <i className="pi pi-external-link" aria-hidden="true" /> Live-demo
                      </a>
                    )}
                    {github && <a className={styles['proj-link']} href={github} target="_blank" rel="noreferrer">
                      <i className="pi pi-github" aria-hidden="true" /> GitHub
                    </a>}
                    {screenshot && (
                      <button
                        className={`${styles['proj-link']} ${styles['proj-link-shot']}`}
                        onClick={() => setScreenshot({ src: screenshot.src, name: name })}
                      >
                        <i className="pi pi-image" aria-hidden="true" /> Skärmbild
                      </button>
                    )}
                  </div>
                </div>
              </article>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <Dialog open={screenshot !== null} onOpenChange={(open) => !open && setScreenshot(null)}>
        <DialogContent className={styles['proj-dialog-content']}>
          <DialogHeader>
            <DialogTitle>{screenshot?.name}</DialogTitle>
            <DialogClose className={styles['proj-dialog-close']} aria-label="Stäng">
              <i className="pi pi-times" aria-hidden="true" />
            </DialogClose>
          </DialogHeader>
          {screenshot && (
            <figure className={styles['proj-dialog-figure']}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={screenshot.src} alt={`Skärmbild av ${screenshot.name}`} />
            </figure>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
