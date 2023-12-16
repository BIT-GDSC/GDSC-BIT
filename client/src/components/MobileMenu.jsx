import { Link } from 'react-router-dom'
import { useAnimStore } from '../store/useAnimStore'
import { useEffect, useRef, useState } from 'react'

export default function MobileMenu({ menuLinks }) {
  const { mobileMenu, setMobileMenu, closeMenu } = useAnimStore()
  const [animClass, setAnimClass] = useState('')
  const [width, setWidth] = useState(null)
  const menuRef = useRef(null)
  const linkRef = useRef(null)

  function handleCloseButton() {
    setAnimClass('normal')
    closeMenu()
    setMobileMenu(false)
  }
  useEffect(() => {
    const updateDimensions = () => {
      setWidth(window.innerWidth)
      if (width > 650) {
        handleCloseButton()
      }
    }
    window.addEventListener('resize', updateDimensions)
    return () => {
      window.removeEventListener('resize', updateDimensions)
    }
  }, [width])

  useEffect(() => {
    if (mobileMenu) setAnimClass('active')
    else setAnimClass('normal')
  }, [mobileMenu])

  return (
    <div ref={menuRef} className={`mobile-menu-container ${animClass}`}>
      <div ref={linkRef} className={`mobile-menu-links ${animClass}`}>
        {menuLinks.map(item => (
          <Link
            to={item.link}
            className='mobile-menu-link'
            key={item.id}
          >
            <span>{item.name}</span>
          </Link>
        ))}
        <button
          onClick={() => {
            handleCloseButton()
          }}
          className='mobile-menu-close-btn'
        >
          Close
        </button>
      </div>
    </div>
  )
}
