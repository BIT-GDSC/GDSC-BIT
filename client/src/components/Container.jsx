import { Navbar } from './Navbar'
import { useLocation } from 'react-router-dom'
import { Toaster } from 'sonner'
import MobileMenu from './MobileMenu'
import AvatarMenu from './AvatarMenu'
import { useAnimStore } from '../store/useAnimStore'
import { navData } from '../utils/navbar'

const Container = ({ children }) => {
  const location = useLocation()
  const { menuPopup, avatarPopup } = useAnimStore()

  return (
    <>
      <Toaster className='hidden sm:block' richColors duration={5000} position='top-center' />
      <Toaster className='block sm:hidden' richColors duration={5000} position='bottom-center' />
      <div className='global-container'>
        {location.pathname !== '/auth' && <Navbar />}
        <div className='w-full h-full fixed -z-10 top-0 left-0 right-0 bg-gradient-to-b from-[#FFBC39] to-[#FFF]' />
        <div>{children}</div>
        {/* {menuPopup && <MobileMenu menuLinks={navData} />}
        {avatarPopup && <AvatarMenu />} */}
      </div>
    </>
  )
}

export default Container
