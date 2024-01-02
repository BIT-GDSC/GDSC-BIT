import { useState } from 'react'
import card1 from '/images/card1.jpg'
export default function Events () {
  const [active, setActive] = useState(0)
  return (
    <div className='section event-section'>
      <div className='events-title-container section-title-container'>
        <h2 className='section-heading'>Events</h2>
      </div>
      {/* Toogler */}
      <div className='events-toggler'>
        <button
          onClick={() => {
            setActive(0)
          }}
          className={active === 0 ? 'active' : ''}
        >
          <p>Upcoming</p>
        </button>
        <button
          onClick={() => {
            setActive(1)
          }}
          className={active === 1 ? 'active' : ''}
        >
          <p>Live Now</p>
        </button>
        <button
          onClick={() => {
            setActive(2)
          }}
          className={active === 2 ? 'active' : ''}
        >
          <p>Past</p>
        </button>
        <div className='toggle-activator'></div>
      </div>

      {/* event card */}
      <div className='event-cards-container'>
        <div className='event-center-container' id='upcoming'>
          <div
            className='event-card'
            style={{
              backgroundImage: `url(${card1})`
            }}
          >
            <div className='event-card-desc'>
              <div className='event-card-title'>
                PokePrompt: Intro to AI & ML
              </div>
              <div className='event-card-info'>
                <span>17/09/23</span>
                {' • '}
                <span>11 AM</span>
                {' • '}
                <span>GMEET</span>
              </div>
            </div>
          </div>
          {/* Trying out other cards */}
          <div
            className='event-card'
            style={{
              backgroundImage: `url(${card1})`
            }}
          >
            <div className='event-card-desc'>
              <div className='event-card-title'>
                PokePrompt: Intro to AI & ML
              </div>
              <div className='event-card-info'>
                <span>17/09/23</span>
                {' • '}
                <span>11 AM</span>
                {' • '}
                <span>GMEET</span>
              </div>
            </div>
          </div>
          <div
            className='event-card'
            style={{
              backgroundImage: `url(${card1})`
            }}
          >
            <div className='event-card-desc'>
              <div className='event-card-title'>
                PokePrompt: Intro to AI & ML
              </div>
              <div className='event-card-info'>
                <span>17/09/23</span>
                {' • '}
                <span>11 AM</span>
                {' • '}
                <span>GMEET</span>
              </div>
            </div>
          </div>
        </div>
        <div className='event-center-container' id='live'>
          <div
            className='event-card'
            style={{
              backgroundImage: `url(${card1})`
            }}
          >
            <div className='event-card-desc'>
              <div className='event-card-title'>
                PokePrompt: Intro to AI & ML
              </div>
              <div className='event-card-info'>
                <span>17/09/23</span>
                {' • '}
                <span>11 AM</span>
                {' • '}
                <span>GMEET</span>
              </div>
            </div>
          </div>
          {/* Trying out other cards */}
          <div
            className='event-card'
            style={{
              backgroundImage: `url(${card1})`
            }}
          >
            <div className='event-card-desc'>
              <div className='event-card-title'>
                PokePrompt: Intro to AI & ML
              </div>
              <div className='event-card-info'>
                <span>17/09/23</span>
                {' • '}
                <span>11 AM</span>
                {' • '}
                <span>GMEET</span>
              </div>
            </div>
          </div>
          <div
            className='event-card'
            style={{
              backgroundImage: `url(${card1})`
            }}
          >
            <div className='event-card-desc'>
              <div className='event-card-title'>
                PokePrompt: Intro to AI & ML
              </div>
              <div className='event-card-info'>
                <span>17/09/23</span>
                {' • '}
                <span>11 AM</span>
                {' • '}
                <span>GMEET</span>
              </div>
            </div>
          </div>
        </div>
        <div className='event-center-container' id='past'>
          <div
            className='event-card'
            style={{
              backgroundImage: `url(${card1})`
            }}
          >
            <div className='event-card-desc'>
              <div className='event-card-title'>
                PokePrompt: Intro to AI & ML
              </div>
              <div className='event-card-info'>
                <span>17/09/23</span>
                {' • '}
                <span>11 AM</span>
                {' • '}
                <span>GMEET</span>
              </div>
            </div>
          </div>
          {/* Trying out other cards */}
          <div
            className='event-card'
            style={{
              backgroundImage: `url(${card1})`
            }}
          >
            <div className='event-card-desc'>
              <div className='event-card-title'>
                PokePrompt: Intro to AI & ML
              </div>
              <div className='event-card-info'>
                <span>17/09/23</span>
                {' • '}
                <span>11 AM</span>
                {' • '}
                <span>GMEET</span>
              </div>
            </div>
          </div>
          <div
            className='event-card'
            style={{
              backgroundImage: `url(${card1})`
            }}
          >
            <div className='event-card-desc'>
              <div className='event-card-title'>
                PokePrompt: Intro to AI & ML
              </div>
              <div className='event-card-info'>
                <span>17/09/23</span>
                {' • '}
                <span>11 AM</span>
                {' • '}
                <span>GMEET</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* event card arrows */}
      <div className='event-arrow-btn-container'>
        <button className='event-left-arrow-btn'>
          <ion-icon size='large' name='chevron-back-outline'></ion-icon>
        </button>
        <button className='event-right-arrow-btn'>
          <ion-icon size='large' name='chevron-forward-outline'></ion-icon>
        </button>
      </div>
    </div>
  )
}
