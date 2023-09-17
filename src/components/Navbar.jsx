import logo from '../assets/logo.png'
export const Navbar = () => {
  return (
    <div className='Navbar-container'>
      <div className='Navbar-flex-container'>
        <div className='Navbar-logo'>
          <img src={logo} alt='logo' />
        </div>
        <div className='Navbar-links'>
          <div className='Navbar-link'>Events</div>
          <div className='Navbar-link'>Team</div>
          <div className='Navbar-link'>Projects</div>
          <div className='Navbar-link'>Specials</div>
          <div className='Navbar-link'>Archive</div>
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
