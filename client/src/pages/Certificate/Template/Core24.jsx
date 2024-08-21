import { useCertStore } from '../../../store/useCertStore'
import {
  Page,
  Text,
  View,
  Document,
  Image,
  StyleSheet,
  Font,
  PDFDownloadLink
} from '@react-pdf/renderer'

// IMAGE Template
const Core24 = () => {
  const { certData } = useCertStore()
  console.log(certData)
  return (
    <>
      <div className='certificate-main-cont'>
        <img
          src='/certificates/core_24.svg'
          className='w-full h-full'
          alt='Certificate Template'
        />
        <p className='candidate-name-p name-core-member-24'>{certData.fullName}</p>
        <img
          src={certData.verifyQR}
          className='qr-core-member-24'
          alt='Verify QR'
        />
        {/* Appreciation */}
        {certData.appreciation && (
          <p className='candidate-appreciation'>
            is hereby awarded this Certificate of Completion for successfully
            serving as Google Developer Student Clubs core team member,{' '}
            {certData.appreciation}
          </p>
        )}
      </div>
      <div className='flex flex-col py-12 gap-3 items-center'>
        <div className='flex items-center flex-wrap justify-center gap-3 flex-row sm:gap-5'>
          <a
            target='_blank'
            href={`https://twitter.com/intent/tweet?text=I%20just%20earned%20the%20${certData.certificate}%20Certificate!%20Check%20it%20out%20here:%20${certData.verifyURL}`}
            className='rounded-2xl w-[150px] h-[35px] bg-black hover:bg-white hover:border-gray-300 hover:border-2 text-white hover:text-black duration-200 font-extrabold flex items-center justify-center'
          >
            Share on X
          </a>
          <div>
            <a
              rel='noreferrer'
              target='_blank'
              href={`https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${certData.certificate}&organizationId=97886448&issueYear=2023&issueMonth=10&certUrl=${certData.verifyURL}&certId=${certData._id}`}
              className='rounded-2xl hover:border-gray-300 hover:border-2 w-[150px] h-[35px] bg-[#0072b1] hover:bg-white text-white hover:text-[#0072b1] duration-200 font-extrabold flex items-center justify-center'
            >
              Add to LinkedIn
            </a>
          </div>
        </div>
        <PDFDownloadLink
          document={<GenAI24PDF certData={certData} />}
          fileName='certificate.pdf'
        >
          {({ blob, url, loading, error }) => (
            <button
              disabled={loading}
              className='rounded-2xl hover:border-gray-300 hover:border-2 w-[150px] h-[35px] bg-[#FFBC39] hover:bg-white text-white hover:text-[#FFBC39] duration-200 font-extrabold flex items-center justify-center'
            >
              {loading ? 'Wait...' : 'Download'}
            </button>
          )}
        </PDFDownloadLink>
      </div>
    </>
  )
}

// PDF Template
const GenAI24PDF = ({ certData }) => (
  <Document>
    <Page size={[2500, 1406.25]} style={styles.page}>
      <View style={styles.section}>
        <Image source='/genai_24_cert_tmp.png' style={styles.certImage} />
        <Text style={styles.name}>{certData.fullName}</Text>
        <Image source={certData.verifyQR} style={styles.verify} />
        {/* <Image source={certData.skillBoostQR} style={styles.skill} /> */}
      </View>
    </Page>
  </Document>
)

// Font register for PDF
Font.register({
  family: 'Island Moments',
  fonts: [
    {
      src: '/fonts/IslandMoments-Regular.ttf'
    }
  ]
})
Font.register({
  family: 'Caveat',
  fonts: [
    {
      src: '/fonts/Caveat-VariableFont_wght.ttf'
    }
  ]
})

// Styles for PDF
const styles = StyleSheet.create({
  page: {
    width: 2160,
    height: 1215,
    position: 'relative'
  },
  section: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  certImage: {
    width: '100%',
    height: '100%'
  },
  name: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: '570px',
    fontSize: '130px',
    color: '#D9D9D9',
    textAlign: 'center',
    margin: 'auto',
    fontFamily: 'Caveat'
  },
  verify: {
    position: 'absolute',
    right: '640px',
    bottom: '43px',
    width: '210px',
    height: '210px',
    objectFit: 'contain',
    padding: '16px'
  },
  skill: {
    position: 'absolute',
    right: '75px',
    bottom: '43px',
    width: '210px',
    height: '210px',
    objectFit: 'contain',
    padding: '16px'
  }
})

export default Core24
