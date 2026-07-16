import type { Metadata } from 'next'
import {
  Bricolage_Grotesque,
  Hanken_Grotesk,
  Newsreader,
  JetBrains_Mono,
  Patrick_Hand,
  Inter,
} from 'next/font/google'
import { cn } from '@/src/lib/utils'
import './globals.css'
import 'primeicons/primeicons.css'
import '../assets/fontawesome/css/all.min.css'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })
const bricolage = Bricolage_Grotesque({ subsets: ['latin'], variable: '--font-bricolage', display: 'swap' })
const hanken = Hanken_Grotesk({ subsets: ['latin'], variable: '--font-hanken', display: 'swap' })
const newsreader = Newsreader({ subsets: ['latin'], style: ['normal', 'italic'], variable: '--font-newsreader', display: 'swap' })
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains', display: 'swap' })
const patrick = Patrick_Hand({ subsets: ['latin'], weight: '400', variable: '--font-patrick', display: 'swap' })

const fontVars = [bricolage, hanken, newsreader, jetbrains, patrick].map((font) => font.variable).join(' ')

export const metadata: Metadata = {
  title: {
    default: 'Kwik @ Mervin Bratic | Fullstack-utvecklare | TypeScript, Next.js',
    template: '%s · Kwik @ Mervin Bratic',
  },
  description:
    'Fullstack-utvecklare med fokus på TypeScript, Next.js, AWS, SQL Databas | Stark på ehandel och interna verktyg (dashboards) | Nyfiken & Anpassningsbar',
  icons: {
    icon: '/favicon/favicon-32x32.png',
    shortcut: '/favicon/favicon.ico',
    apple: '/favicon/apple-touch-icon.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sv" className={cn(fontVars, 'font-sans', inter.variable)}>
      <body>
        <div className="app-bg">
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  )
}
