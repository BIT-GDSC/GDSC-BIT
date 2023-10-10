import React from 'react';
import { useParams } from 'react-router-dom';
import { Page, Text, View, Document, Image, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
import useWindowHeight from '../utils/useWindowHeight';

const styles = StyleSheet.create({
  page: {
    width: 600,
    height: 200
  },
  section: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  }
});

const MyDocument = ({ certificateID }) => (
  <Document>
    <Page size={[900, 500]} style={styles.page}>
      <View style={styles.section}>
        <Image source='/gdsc_logo.png' style={{ width: 50, height: 24 }} />
        <Text>Your Certificate ID: {certificateID}</Text>
      </View>
    </Page>
  </Document>
);

const CertificateImage = ({ certificateID }) => {
  return (
    <div className='w-[95%] h-[300px] md:w-[700px] md:h-[400px] lg:w-[900px] lg:h-[500px] bg-white border shadow flex flex-col items-center justify-center'>
      <img src='/gdsc_logo.png' className='w-[50px] h-[24px]' alt="logo" />
      <p>Your Certificate ID: {certificateID}</p>
    </div>
  )
}

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
      <div className='h-full pt-[88px] flex flex-col gap-5 items-center justify-center'>
        <CertificateImage certificateID={certificateID} />
        <PDFDownloadLink document={< MyDocument certificateID={certificateID} />} fileName="certificate.pdf">
          {({ blob, url, loading, error }) => (
            <div className='w-[110px] h-[35px] bg-[#FFBC39] hover:bg-[#4A90F4] hover:rounded-xl duration-200 text-white font-extrabold flex items-center justify-center'>
              {loading ? 'Generating...' : 'Download'}
            </div>
          )}
        </PDFDownloadLink >
      </div>
    </div>
  );
}

export default VerifyCertificate