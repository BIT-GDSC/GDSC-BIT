import { home_bg } from '../assets';

export const Main = () => {
  return (
    <>
      <div className='Main-content'>
        <div className='Main-content-bg pt-[88px]'>
          <img src={home_bg} alt='background' />
        </div>
      </div>
      <div className='Main-cloud-bg'></div>
    </>
  )
}