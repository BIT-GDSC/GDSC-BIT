import { useParams } from 'react-router-dom';
import useWindowHeight from '../utils/useWindowHeight';

const VerifyCertificate = () => {
  const { certificateID } = useParams();
  const { height, isReady } = useWindowHeight();

  return (
    <div
      style={{
        height: `${height}px`,
        opacity: isReady ? 1 : 0,
        transition: 'opacity 0.5s linear'
      }}
    >
      Your Certificate ID: {certificateID}
    </div>
  )
}

export default VerifyCertificate