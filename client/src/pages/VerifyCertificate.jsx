import { useParams } from 'react-router-dom';

const VerifyCertificate = () => {
  const { certificateID } = useParams();

  return (
    <div className='h-full overflow-y-hidden'>
      Your Certificate ID: {certificateID}
    </div>
  )
}

export default VerifyCertificate