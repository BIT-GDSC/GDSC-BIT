import { socialLinks } from '../utils/socials';

export const Socials = () => {
  return (
    <div className='socials-container'>
      <div className='socials-bg'>
        <img src="/socials-bg.png" alt='logo' />
      </div>
      <div className='socials-title-container'>
        <div className='socials-title'>
          <h1>Reach Us</h1>
          <p>with our socials</p>
        </div>
      </div>
      <div className='social-grid-container'>
        <div className='socials-grid-wrapper'>
          {socialLinks.map((social, index) => {
            return (
              <div className='socials-grid' key={index}>
                <a href={social.link} className='socials-grid-link'>
                  <div className='socials-grid-link-icon'>
                    <img src={social.icon} alt='logo' />
                  </div>
                  <div className='socials-grid-link-text'>{social.text}</div>
                </a>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}