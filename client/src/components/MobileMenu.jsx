import { Link } from 'react-router-dom'

export default function MobileMenu ({ user, onAuthClick, navData }) {
  return (
    <ul className='mobile-links-container'>
      <div className='mobile-view-control'>
        {navData.map((item, index) => (
          <li key={index}>
            <Link to={item.link} className='Navbar-link' key={item.id}>
              <span>{item.name}</span>
              <div className='Navbar-link-highlight' />
            </Link>
          </li>
        ))}
      </div>

      {/* Show it if user is signed in */}
      {user && (
        <div className='mobile-profile-control'>
          <div className='mobile-profile-vr'></div>
          <div className='mobile-avatar-option'>
            <button name='signout' onClick={onAuthClick}>
              Sign out
            </button>
            <div />
            <button name='profile' onClick={onAuthClick}>
              Profile
            </button>
          </div>
        </div>
      )}
    </ul>
  )
}
