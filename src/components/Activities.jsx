import React from 'react'
import Header from './universal/Header'
import SchemaMarkup from './universal/SchemaMarkup'
import Title from './universal/Title'
import activities from '../data/activities'
import { ReactComponent as Triangle } from '../assets/portfolio/triangle.svg'
import { ReactComponent as Circle } from '../assets/portfolio/circle.svg'
import { ReactComponent as Square } from '../assets/portfolio/square.svg'
import arrow from '../assets/down-arrow.png'

function Activities() {
  const sortedActivities = [...activities].sort((a, b) => b[date].localeCompare(a[date]))

  const ActivitiesSchema = {
    '@context': 'https://schema.org',
    '@type': 'Aktiviteter',
    name: 'Aktiviteter – Mervin Bratic',
    url: 'https://kwik.se/activities',
    inLanguage: 'sv-SE',
    author: {
      '@type': 'Person',
      name: 'Mervin Bratic',
      url: 'https://kwik.se',
    },
  }

  return (
    <>
      <SchemaMarkup schema={ActivitiesSchema} />
      <header id="header">
        <Header />
      </header>

      <main id="blog" className="align-container-center">
        <div className="title-section" style={{ display: 'flex' }}>
          <Title title="Aktiviteter" tag="h1" subTitle={''} priority="header" />
          <img className="arrow" src={arrow} alt="" style={{ paddingTop: '1rem' }} />
        </div>

        {sortedActivities.map((collection) => {
          const [year, month, monthName] = collection.at(0).split('-')
          const entries = collection
            .at(1)
            .sort((a, b) => (new Date(a.unmodifiedDate) < new Date(b.unmodifiedDate) ? 1 : -1))

          return (
            <React.Fragment key={`${year}-${month}`}>
              <div className="monthly-title-section title-section">
                <Title
                  title={`${monthName} ${year}`}
                  subTitle={[
                    <Circle key="circle" />,
                    <Square key="square" />,
                    <Triangle key="triangle" />,
                  ]}
                  priority="header"
                />
              </div>
              <Posts posts={entries} />
            </React.Fragment>
          )
        })}
      </main>
    </>
  )
}

export default Activities
