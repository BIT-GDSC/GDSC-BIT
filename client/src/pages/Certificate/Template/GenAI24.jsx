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
const  GenAI24 = () => {
  const { certData } = useCertStore()
  console.log("request arrived at component.")
  return (
    <>
      <div className='relative w-[512px] h-[288px] md:w-[720px] md:h-[405px] lg:w-[1080px] lg:h-[607px] drop-shadow-md flex flex-col items-center justify-center'>
        <img
          src='/genai_24_cert_tmp.png'
          className='w-full h-full'
          alt='Certificate Template'
        />
        <p className='candidate-name-gen-ai-24 absolute left-1/2 -translate-x-1/2 text-xl md:text-3xl lg:text-5xl mb-5 md:mb-5 lg:mb-8'>
          {certData.fullName}
        </p>
        <img
          src={certData.verifyQR}
          className='absolute bottom-[1px] py-[1px] px-1 md:p-1 lg:p-2 left-[339px] w-[40px] h-[50px] md:bottom-[11px] md:left-[479px] md:w-[51px] md:h-[52px] lg:bottom-[16px] lg:left-[713px] lg:w-[88px] lg:h-[80.8px] lg:rounded-[13px] object-contain'
          alt='Verify QR'
        />
        <img
          src={certData.skillBoostQR}
          className='absolute bottom-[1px] py-[1px] px-1 md:p-1 lg:p-2 left-[454px] w-[40px] h-[50px] md:bottom-[11px] md:left-[642px] md:w-[51px] md:h-[52px] lg:bottom-[16px] lg:left-[957px] lg:w-[88px] lg:h-[80.8px] lg:rounded-[13px] object-contain'
          alt='Skill Boost QR'
        />
      </div>
      <div className='flex flex-col gap-3 items-center'>
        <div className='flex items-center gap-3 flex-row sm:gap-5'>
          <a
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
        <Image source={certData.skillBoostQR} style={styles.skill} />
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

export default GenAI24
