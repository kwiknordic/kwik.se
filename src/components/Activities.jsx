import React from 'react'
import Header from './universal/Header'
import SchemaMarkup from './universal/SchemaMarkup'
import Title from './universal/Title'
import activities from '../data/activities'
import '../css/activities.css'

function Activities() {
  const sortedActivities = [...activities].sort((a, b) => new Date(b.date) - new Date(a.date))

  const ActivitiesSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
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

      <main id="activities" className="align-container-center">
        <div className="title-section" style={{ display: 'flex' }}>
          <Title title="Mina aktiviteter" tag="h1" subTitle={'🔥'.repeat(3)} priority="subtitle" />
        </div>

        <div className="container">
          {' '}
          {sortedActivities.map((activity) => (
            <div key={activity.eventId} className="activities-content">
              <h3 className="title">{activity.title}</h3>
              {activity.speakers.length > 0 && (
                <div className="activity-speakers">
                  <ul className="activity-speakar-list">
                    {activity.speakers.map((speaker) => (
                      <li key={speaker.name}>
                        <span className="speaker-name">🧑🏼‍💼 {speaker.name}</span>
                        <em>{speaker.position}</em>
                        <em>{speaker.employer}</em>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {activity.summary && (
                <div className="activity-summary">
                  <p>{activity.summary}</p>
                </div>
              )}
              {activity.at.length > 0 && (
                <div className="activity-footer">
                  <span>på {activity.at}</span>
                  <span>{activity.date}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </>
  )
}

export default Activities
