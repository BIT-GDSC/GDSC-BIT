import logo from '../assets/logo.png'
export const Navbar = () => {
  return (
    <div className='Navbar-container'>
      <div className='Navbar-flex-container'>
        <div className='Navbar-logo'>
          <img src={logo} alt='logo' />
        </div>
        <div className='Navbar-links'>
          <div className='Navbar-link'>
            <span>Events</span>
            <div className='Navbar-link-highlight' />
          </div>
          <div className='Navbar-link'>
            <span>Team</span>
            <div className='Navbar-link-highlight' />
          </div>
          <div className='Navbar-link'>
            <span>Projects</span>
            <div className='Navbar-link-highlight' />
          </div>
          <div className='Navbar-link'>
            <span>Specials</span>
            <div className='Navbar-link-highlight' />
          </div>
          <div className='Navbar-link'>
            <span>Archive</span>
            <div className='Navbar-link-highlight' />
          </div>
        </div>
        <div className='Navbar-signin'>Sign in</div>
        <div className='Navbar-menu-toggler'>
          <div className='Navbar-menu-toggler-top'></div>
          <div className='Navbar-menu-toggler-bottom'></div>
        </div>
      </div>
    </div>
  )
}
