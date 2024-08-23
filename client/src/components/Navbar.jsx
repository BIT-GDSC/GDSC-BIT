import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useWindowDimension from '../utils/useWindowDimension'
import { navData } from '../utils/navbar'
import { useAuthStore, useLoginStore } from '../store/useAuthStore'
import { useAnimStore } from '../store/useAnimStore'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { toast } from 'sonner'
import MobileMenu from './MobileMenu'

export const Navbar = () => {
  const { width } = useWindowDimension()
  const { verifyLoading, verifySuccess, user } = useAuthStore()
  const { userLogout } = useLoginStore()
  const [timeoutID, setTimeoutId] = useState(null)
  const [menuAnimation, setMenuAnimation] = useState('')
  const [avatarAnimation, setAvatarAnimation] = useState('')
  const { mobileMenu, setMobileMenu, avatarMenu, setAvatarMenu } =
    useAnimStore()

  function handleMenuToggle () {
    if (timeoutID) clearTimeout(timeoutID)
    if (menuAnimation === 'active') {
      setMenuAnimation('')
      const id = setTimeout(() => {
        setMobileMenu(false)
      }, 400)
      setTimeoutId(id)
    } else {
      setMenuAnimation('active')
      setMobileMenu(true)
    }
  }

  function handleAuthAction (e) {
    const { name } = e.target
    if (name === 'signout') {
      userLogout()
      handleAvatarToggle()
    } else {
      toast.info('we are working on it.')
    }
  }
  function handleAvatarToggle (e) {
    if (width > 640 && user) {
      console.log('called avatar menu')
      if (timeoutID) clearTimeout(timeoutID)
      if (avatarAnimation === 'active') {
        setAvatarAnimation('')
        const id = setTimeout(() => {
          setAvatarMenu(false)
        }, 400)
        setTimeoutId(id)
      } else {
        setAvatarMenu(true)
        const id = setTimeout(() => {
          setAvatarAnimation('active')
        }, 1)
        setTimeoutId(id)
      }
    }
  }

  useEffect(() => {
    if (width > 640) {
      setMenuAnimation('')
      setAvatarAnimation('')
      setMobileMenu(false)
      setAvatarMenu(false)
    }
  }, [width])

  return (
    <div className='Navbar-container'>
      <div
        className={`navbar-inner-cont ${
          menuAnimation === 'active' ? 'expanded' : ''
        }`}
      >
        <div className='Navbar-flex-container'>
          <Link to='/' className='Navbar-logo'>
            <img src='/logo-crop.png' alt='logo' />
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
            {verifyLoading ? (
              <div className='relative w-[40px] h-[40px] rounded-full  overflow-hidden'>
                <Skeleton className='absolute -top-1 left-0 right-0 bottom-0 w-full h-full' />
              </div>
            ) : !user ? (
              <Link to='/auth' className='Navbar-signin-button'>
                Sign in
              </Link>
            ) : (
              user && (
                <div
                  className={`w-[40px] h-[40px] rounded-full border border-[#3c82f6] bg-white overflow-hidden ${
                    !mobileMenu ? 'cursor-pointer' : ''
                  }`}
                  onClick={() => handleAvatarToggle()}
                >
                  <img
                    src={user?.avatar?.url ? user.avatar.url : '/user.svg'}
                    className='w-full h-full object-contain'
                  />
                </div>
              )
            )}
            {/* Mobile Menu toggler */}

            <button
              className='Navbar-menu-toggler'
              onClick={() => handleMenuToggle()}
              title='Click to open menu'
            >
              <div className={`Navbar-menu-bar-container ${menuAnimation}`}>
                <div
                  className={`Navbar-menu-toggler-top arrow-bar ${menuAnimation}`}
                ></div>
                <div
                  className={`Navbar-menu-toggler-bottom ${menuAnimation} arrow-bar`}
                ></div>
              </div>
            </button>
          </div>
        </div>
        {/* If there is a user and clicked on profile img */}
        {avatarMenu && (
          <div className={`avatar-menu ${avatarAnimation}`}>
            <button name='signout' onClick={handleAuthAction}>
              Sign out
            </button>
            <div />
            <button name='profile' onClick={handleAuthAction}>
              Profile
            </button>
          </div>
        )}

        {/* Experiment with nav */}
        {mobileMenu && (
          <MobileMenu
            navData={navData}
            user={user}
            onAuthClick={handleAuthAction}
          />
        )}
      </div>
    </div>
  )
}
