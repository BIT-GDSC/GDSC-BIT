import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import { navData } from '../utils/navbar'

export const Navbar = () => {
  return (
    <div className='Navbar-container'>
      <div className='Navbar-flex-container'>
        <div className='Navbar-logo'>
          <img src={logo} alt='logo' />
        </div>
        <div className='Navbar-links'>
          {navData.map((item) => (
            <Link to={item.link} className='Navbar-link' key={item.id}>
              <span>{item.name}</span>
              <div className='Navbar-link-highlight' />
            </Link>
          ))}
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