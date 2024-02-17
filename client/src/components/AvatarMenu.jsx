import { Link } from 'react-router-dom'
import { useAnimStore } from '../store/useAnimStore'
import { useEffect, useRef, useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'

export default function AvatarMenu() {
  const { avatarMenu, setAvatarMenu, closeAvatar } = useAnimStore()
  const { setUser, setVerifySuccess } = useAuthStore();
  const [animClass, setAnimClass] = useState('')
  const menuRef = useRef(null)
  const linkRef = useRef(null)

  function handleLogoutButton() {
    setUser(null);
    setVerifySuccess(false);
    localStorage.removeItem('login_token');
    setAnimClass('normal')
    closeAvatar()
    setAvatarMenu(false)
  }

  useEffect(() => {
    if (avatarMenu) setAnimClass('active')
    else setAnimClass('normal')
  }, [avatarMenu])

  return (
    <div ref={menuRef} className={`mobile-menu-container ${animClass}`}>
      <div ref={linkRef} className={`mobile-menu-links ${animClass}`}>
        <Link className='mobile-menu-link'>
          Profile
        </Link>
        <button
          onClick={handleLogoutButton}
          className='mobile-menu-close-btn'
        >
          Logout
        </button>
      </div>
    </div>
  )
}
