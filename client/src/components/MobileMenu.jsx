import { Link } from 'react-router-dom'
import { useAnimStore } from '../store/useAnimStore'
import { useEffect, useRef } from 'react'
export default function MobileMenu ({ menuLinks }) {
  const { mobileMenu, setMobileMenu } = useAnimStore()
  const menuRef = useRef(null)
  const linkRef = useRef(null)

  useEffect(() => {
    if (mobileMenu) {
      menuRef.current.style.display = 'block'
      menuRef.current.classList.add('active')
      linkRef.current.classList.add('active')
    } else {
      menuRef.current.classList.remove('active')
      linkRef.current.classList.remove('active')
      setTimeout(() => {
        menuRef.current.style.display = 'none'
      }, 1000)
    }
  }, [mobileMenu])

  return (
    <div
      style={{ display: 'none' }}
      ref={menuRef}
      className={`mobile-menu-container ${mobileMenu ? 'active' : 'normal'}`}
    >
      <div
        ref={linkRef}
        className={`mobile-menu-links ${mobileMenu ? 'active' : 'normal'}`}
      >
        {menuLinks.map(item => (
          <Link to={item.link} className='mobile-menu-link' key={item.id}>
            <span>{item.name}</span>
            <hr />
          </Link>
        ))}
        <button
          onClick={() => {
            setMobileMenu(false)
          }}
          className='mobile-menu-close-btn'
        >
          Close
        </button>
      </div>
    </div>
  )
}
