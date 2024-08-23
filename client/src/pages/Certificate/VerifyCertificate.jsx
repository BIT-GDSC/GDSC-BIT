import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useCertStore } from '../../store/useCertStore'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import GoogleCloud from './Template/GoogleCloud'
import GenAI24 from './Template/GenAI24'
import GoogleCloudFacilitator from './Template/GoogleCloudFacilitator'
import Core24 from './Template/Core24'

// Main Component
const VerifyCertificate = () => {
  const { certificateID } = useParams()
  const { certLoading, certData, fetchCertData } = useCertStore()
  useEffect(() => {
    if (certificateID) fetchCertData(certificateID)
  }, [certificateID])
  return (
    // <div
    //   className='flex items-center justify-center overflow-scroll md:overflow-auto'
    //   style={{ minHeight: '100svh' }}
    // >
    <div className='cert-main-container'>
      <div className='cert-aspect-box'>
        {/* <div className='h-full px-6 pb-12 md:pt-[100px] flex flex-col gap-5 items-center justify-center'> */}
        <div className='cert-aspect-centering'>
          {certLoading ? (
            // Fetching Certificate
            <>
              <div className='relative w-[400px] h-[300px] md:w-[625px] md:h-[426px] lg:w-[950px] lg:h-[652px] border rounded'>
                <Skeleton className='absolute -z-10 -top-[4px] left-0 w-full h-full' />
                <div className='absolute top-0 left-0 w-full h-full flex items-center justify-center z-50 text-xl font-extrabold'>
                  <div className='w-[97.5px]'>Validating</div>
                  <div className='w-[20px] loader-dot' />
                </div>
              </div>
              <div className='flex flex-col gap-3 items-center'>
                <div className='flex items-center gap-3 flex-row sm:gap-5'>
                  <div className='rounded-2xl overflow-hidden w-[150px] h-[35px]'>
                    <Skeleton className='w-full p-4 h-full' />
                  </div>
                  <div className='rounded-2xl overflow-hidden w-[150px] h-[35px]'>
                    <Skeleton className='w-full p-4 h-full' />
                  </div>
                </div>
                <div className='rounded-2xl overflow-hidden w-[150px] h-[35px]'>
                  <Skeleton className='w-full p-4 h-full' />
                </div>
              </div>
            </>
          ) : certData.message ? (
            // Error fetching Certificate
            <div className='relative bg-white w-[400px] h-[300px] md:w-[625px] md:h-[426px] lg:w-[950px] lg:h-[652px] border rounded text-xl font-extrabold'>
              <p className='absolute top-0 left-0 w-full h-full flex items-center justify-center z-50 text-[#4A90F4] text-xl font-extrabold'>
                {certData.message}
              </p>
            </div>
          ) : certData.certificate === 'Google Cloud Study Jam' ? (
            <GoogleCloud />
          ) : certData.certificate === 'Google Gen AI Study Jam 2024' ? (
            <GenAI24 />
          ) : certData.certificate === 'Core Team 24' ? (
            <Core24 />
          ) : (
            certData.certificate === 'Google Cloud Study Jam Facilitator' && (
              <GoogleCloudFacilitator />
            )
          )}
        </div>
      </div>
    </div>
  )
}

export default VerifyCertificate
