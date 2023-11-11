import { Link } from 'react-router-dom'
import { navData } from '../utils/navbar'
import { useAuthStore } from '../store/useAuthStore'
import { useAnimStore } from '../store/useAnimStore'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export const Navbar = () => {
  const { verifyLoading, verifySuccess, user } = useAuthStore()
  const { mobileMenu, setMobileMenu, closeMenu, openMenu, toggleDisable } =
    useAnimStore()
  function handleToggle () {
    if (mobileMenu) {
      closeMenu()
    } else {
      openMenu()
    }
    setMobileMenu(!mobileMenu)
  }
  return (
    <div className='Navbar-container'>
      <div className='Navbar-flex-container'>
        <Link to='/' className='Navbar-logo'>
          <img src='/logo.png' alt='logo' />
        </Link>
        <div className='Navbar-links'>
          {navData.map(item => (
            <Link to={item.link} className='Navbar-link' key={item.id}>
              <span>{item.name}</span>
              <div className='Navbar-link-highlight' />
            </Link>
          ))}
        </div>
        <div className='Navbar-auth'>
          {!verifyLoading && !verifySuccess ? (
            <Link to='/auth' className='Navbar-signin-button'>
              Sign in
            </Link>
          ) : !verifyLoading && verifySuccess ? (
            <div className='w-[40px] h-[40px] rounded-full border border-[#3c82f6] bg-white overflow-hidden'>
              <img
                src={user?.avatar?.url ? user.avatar.url : '/user.svg'}
                className='w-full h-full object-contain'
              />
            </div>
          ) : (
            <div className='relative w-[50px] h-[50px] rounded-full  overflow-hidden'>
              <Skeleton className='absolute -top-1 left-0 right-0 bottom-0 w-full h-full' />
            </div>
          )}
          {/* Mobile Menu toggler */}
          <button
            disabled={toggleDisable}
            className='Navbar-menu-toggler'
            onClick={() => handleToggle()}
          >
            <div
              className={`Navbar-menu-bar-container ${mobileMenu && 'active'}`}
            >
              <div
                className={`Navbar-menu-toggler-top arrow-bar ${
                  mobileMenu && 'active'
                }`}
              ></div>
              <div
                className={`Navbar-menu-toggler-bottom ${
                  mobileMenu && 'active'
                } arrow-bar`}
              ></div>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}
