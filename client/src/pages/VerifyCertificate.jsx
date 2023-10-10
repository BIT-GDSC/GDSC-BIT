import { useParams } from 'react-router-dom';

const VerifyCertificate = () => {
  const { certificateID } = useParams();

  return (
    <div>
      Your Certificate ID: {certificateID}
    </div>
  )
}

export default VerifyCertificate