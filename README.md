# Kwik.se

Skapat av Mervin Bratic

Live-demo: https://kwik.se

## Om

Personlig hemsida för att visa kompetensområden, projekt, intressen och kontaktinformation.

## Höjdpunkter – ny design (2026)

- Aktiviteter presenterade som en tidslinje med statistik över deltaganden, talare, platser och år i rörelse.
- Instapaper-integration som hämtar sparade artiklar till tipssektionen via ett eget API.
- Spara podcasts listas från en Opml-fil
- Blogg med sökning, språkfilter, lästid, paginering och stöd för både svenska och engelska inlägg.
- Shadcn komponenter för tabeller, sökfält, knappar och paginering.
- Byggd med Next.js
- Använder både TypeScript och CSS Modules (tailwind för snabba tillägg, modules för scopad specifik UI)

## Höjdpunkter – gammal design

- Eget koncept, design och komponenter, byggda med React (JSX) och CSS.
- Generella hjälpfunktioner under `utils` (massimport av bilder, strängomvandlare).
- Personlig information finns under samma tak i `data`-mappen.
- Responsiv (mobile-first) design.
- Använder `pointerEvents` för responsiv slider.
- Använder `useState` för att rendera rätt slidervy.
- Responsiva, absolutpositionerade SVG-bilder av en ritad karaktär för att mjuka upp designen.
- Använder Sveltia CMS för att skriva bloggen.
