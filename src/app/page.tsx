import Hero from '@/src/components/home/Hero'
import Background from '@/src/components/home/Background'
import ProjectSlider from '@/src/components/home/ProjectSlider'
import Cta from '@/src/components/home/Cta'
import Bridge from '@/src/components/home/Bridge'
import Skills from '@/src/components/home/Skills'

/* Home — a Server Component. Only the project slider is interactive,
   so it's the single client island; everything else renders on the
   server for a fast first paint. */
export default function HomePage() {
  return (
    <main>
      <Hero />
      <Skills />
      <Background />
      <ProjectSlider />
      <Cta />
      <Bridge />
    </main>
  )
}