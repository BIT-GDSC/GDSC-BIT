import React from 'react'

export default function Events () {
  return (
    <div className='section event-section'>
      <div className='events-title-container section-title-container'>
        <h2 className='section-heading'>Events</h2>
      </div>
      {/* Toogler */}
      <div className='events-toggler'>
        <div>
          <p>Upcoming</p>
        </div>
        <div>
          <p>Live Now</p>
        </div>
        <div>
          <p>Past</p>
        </div>
      </div>
      {/* events cards container */}
      <div className='arrow-btn-container'>
        <div className='left-arrow-btn'></div>
        <div className='right-arrow-btn'></div>
      </div>
    </div>
  )
}
