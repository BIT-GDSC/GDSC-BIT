import { home_bg, home_cloud } from '../assets'

export const Main = () => {
  return (
    <div className='Main-content-container'>
      <div className='Main-content'>
        <div className='Main-content-bg'>
          <img src={home_bg} alt='background' />
        </div>
      </div>
      <div className='Main-cloud-bg'>
      </div>
    </div>
  )
}
