import { useParams } from 'react-router-dom';
import useWindowHeight from '../utils/useWindowHeight';

const VerifyCertificate = () => {
  const { certificateID } = useParams();
  const { height, isReady } = useWindowHeight();

  return (
    <div className='overflow-hidden'
      style={{
        height: `${height}px`,
        opacity: isReady ? 1 : 0,
        transition: 'opacity 0.5s linear'
      }}
    >
      <div className='pt-[88px]'>
        Your Certificate ID: {certificateID}
      </div>
    </div>
  )
}

export default VerifyCertificate