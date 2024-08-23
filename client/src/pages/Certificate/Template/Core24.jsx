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
  const appreciation = `is hereby awarded this Certificate of Completion for successfully serving as Google Developer Student Clubs core team member, ${certData.appreciation}.`
  const qrString = certData.verifyQR.replace('&format=png', '&format=svg')
  return (
    <>
      <div className='certificate-main-cont'>
        <img
          src='/certificates/core_24.svg'
          className='w-full h-full'
          alt='Certificate Template'
        />
        <p className='candidate-name-p name-core-member-24'>
          {certData.fullName}
        </p>
        <img src={qrString} className='qr-core-member-24' alt='Verify QR' />
        {/* Appreciation */}
        {certData.appreciation && (
          <p className='candidate-appreciation'>{appreciation}</p>
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
          document={
            <Core24PDF certData={certData} appreciation={appreciation} />
          }
          fileName={`${certData.fullName}.pdf`}
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
const Core24PDF = ({ certData, appreciation }) => {
  return (
    <Document>
      <Page size={[2500, 1406.25]} style={styles.page}>
        <View style={styles.section}>
          <Image source='/certificates/core_24.png' style={styles.certImage} />
          <Text style={styles.name}>{certData.fullName}</Text>
          <Text style={styles.appreciation}>{appreciation}</Text>
          <Image source={certData.verifyQR} style={styles.verify} />
        </View>
      </Page>
    </Document>
  )
}

// Font register for PDF
Font.register({
  family: 'Roboto',
  fonts: [
    {
      src: 'https://fonts.gstatic.com/s/roboto/v16/zN7GBFwfMP4uA6AR0HCoLQ.ttf'
    }
  ]
})
Font.register({
  family: 'Open sans',
  fonts: [
    {
      src: 'https://fonts.gstatic.com/s/opensans/v13/cJZKeOuBrn4kERxqtaUH3aCWcynf_cDxXwCLxiixG1c.ttf'
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
    fontSize: '96px',
    position: 'absolute',
    width: '100%',
    left: '10%',
    top: '38%',
    fontFamily: 'Roboto',
    color: '#f29900'
  },
  appreciation: {
    fontSize: '32px',
    position: 'absolute',
    fontFamily: 'Open sans',
    color: '#5f6367',
    width: '60%',
    left: '10%',
    top: '47%'
  },
  verify: {
    position: 'absolute',
    right: '221px',
    bottom: '200px',
    width: '284px',
    height: '284px',
    objectFit: 'contain',
    padding: '16px'
  }
})

export default Core24
