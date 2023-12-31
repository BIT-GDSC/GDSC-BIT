export default function Footer() {
  return (
    <div className='footer-section'>
      <div className='section'>
        <div className='section-title-container'>
          <h1 id='main-join-btn' className='section-heading'>
            Stay Updated
          </h1>
        </div>

        <div className='join-now-btn-container'>
          <button
            onClick={() => {
              window.open('https://gdsc.community.dev/bengal-institute-of-technology/')
            }}
            id='join-now-btn'
          >
            JOIN NOW
          </button>
        </div>
      </div>
      {/* <div className='footer-logo-container'>
        <div className='footer-chapter-name'>
          <div className='gdsc-logo-text'>
            <img src='/gdsc_original.png' alt='logo' height={100} width={70} />
            <span id='main-footer-gdsc'>Google Developer Student Clubs</span>
          </div>

          <span id='main-footer-chapter-name'>
            Bengal Institute of Technology
          </span>
        </div>
      </div> */}
      <div className="px-4 sm:py-[5px] sm:px-[50px] flex flex-col sm:flex-row items-center gap-2">
        <img
          src="/gdsc_original.png"
          className="w-[66.67px] h-[32.27px] "
        />
        <div className="chapter">
          <p>Google Developer Student Clubs</p>
          <p>Bengal Institute of Technology</p>
        </div>
      </div>
      <div className='footer-color-strip'>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}
