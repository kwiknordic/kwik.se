import Hero from '@/src/components/home/Hero'
import Background from '@/src/components/home/Background'
import ProjectSlider from '@/src/components/home/ProjectSlider'
import Cta from '@/src/components/home/Cta'
import Bridge from '@/src/components/home/Bridge'
import Skills from '@/src/components/home/Skills'
import StructuredData from '@/src/components/seo/StructuredData'

/* Home — a Server Component. Only the project slider is interactive,
   so it's the single client island; everything else renders on the
   server for a fast first paint. */
export default function HomePage() {
  return (
    <main>
      <StructuredData
        id="kwik-profil"
        data={{
          '@context': 'https://schema.org',
          '@type': 'ProfilePage',
          name: 'Mervin Bratic – fullstack-utvecklare',
          url: 'https://kwik.se',
          inLanguage: 'sv-SE',
          mainEntity: {
            '@type': 'Person',
            name: 'Mervin Bratic',
            url: 'https://kwik.se',
            jobTitle: 'Fullstack-utvecklare',
            address: { '@type': 'PostalAddress', addressLocality: 'Stockholm', addressCountry: 'SE' },
            knowsAbout: ['TypeScript', 'Next.js', 'AWS', 'SQL', 'e-handel', 'interna verktyg'],
          },
        }}
      />
      <Hero />
      <Skills />
      <Background />
      <ProjectSlider />
      <Cta />
      <Bridge />
    </main>
  )
}
