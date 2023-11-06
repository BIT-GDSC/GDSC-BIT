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
const GoogleCloudFacilitator = () => {
  const { certData } = useCertStore()

  return (
    <>
      <div className='relative w-[400px] h-[300px] md:w-[625px] md:h-[426px] lg:w-[950px] lg:h-[652px] border shadow flex flex-col items-center justify-center'>
        <img
          src='/cloudCertificateFacilitator.png'
          className='w-full h-full'
          alt='Certificate Template'
        />
        <p className='candidate-name absolute left-1/2 -translate-x-1/2 text-xl md:text-3xl lg:text-5xl text-gray-600 mt-5 md:mt-6 lg:mt-10'>
          {certData.fullName}
        </p>
        <img
          src={certData.verifyQR}
          className='absolute bottom-[0.55px] py-[1px] px-1 md:p-1 lg:p-2 right-[3.01525px] w-[34px] h-[50px] md:bottom-[11px] md:right-[6px] md:w-[51px] md:h-[52px] lg:bottom-[16px] lg:right-[4px] lg:w-[88px] lg:h-[80.8px] lg:rounded-[13px] object-contain'
          alt='Verify QR'
        />
      </div>
      <div className='flex flex-col gap-3 items-center'>
        <div className='flex items-center gap-3 flex-row sm:gap-5'>
          <a
            href={`https://twitter.com/intent/tweet?text=I%20just%20earned%20the%20${certData.certificate}%20Certificate!%20Check%20it%20out%20here:%20${certData.verifyURL}`}
            className='rounded-2xl w-[150px] h-[35px] bg-black hover:bg-white text-white hover:text-black duration-200 font-extrabold flex items-center justify-center'
          >
            Share on X
          </a>
          <div>
            <a
              rel='noreferrer'
              target='_blank'
              href={`https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${certData.certificate}&organizationId=97886448&issueYear=2023&issueMonth=10&certUrl=${certData.verifyURL}&certId=${certData._id}`}
              className='rounded-2xl w-[150px] h-[35px] bg-[#0072b1] hover:bg-white text-white hover:text-[#0072b1] duration-200 font-extrabold flex items-center justify-center'
            >
              Add to LinkedIn
            </a>
          </div>
        </div>
        <PDFDownloadLink
          document={<GoogleCloudFacilitatorPDF certData={certData} />}
          fileName='certificate.pdf'
        >
          {({ blob, url, loading, error }) => (
            <button
              disabled={loading}
              className='rounded-2xl w-[150px] h-[35px] bg-[#FFBC39] hover:bg-white text-white hover:text-[#FFBC39] duration-200 font-extrabold flex items-center justify-center'
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
const GoogleCloudFacilitatorPDF = ({ certData }) => (
  <Document>
    <Page size={[2500, 1704]} style={styles.page}>
      <View style={styles.section}>
        <Image
          source='/cloudCertificateFacilitator.png'
          style={styles.certImage}
        />
        <Text style={styles.name}>{certData.fullName}</Text>
        <Image source={certData.verifyQR} style={styles.verify} />
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

// Styles for PDF
const styles = StyleSheet.create({
  page: {
    width: 2500,
    height: 1704,
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
    top: '830px',
    fontSize: '130px',
    color: 'rgb(75 85 99 / 1)',
    textAlign: 'center',
    margin: 'auto',
    fontFamily: 'Island Moments'
  },
  verify: {
    position: 'absolute',
    right: '21px',
    bottom: '43px',
    width: '210px',
    height: '210px',
    objectFit: 'contain',
    padding: '16px'
  }
})

export default GoogleCloudFacilitator
