import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Page, Text, View, Document, Image, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
import useWindowHeight from '../utils/useWindowHeight';
import { useCertStore } from '../store';
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const MyDocument = ({ certData }) => (
  <Document>
    <Page size={[2500, 1704]} style={styles.page}>
      <View style={styles.section}>
        <Image source='/cloudCertificate.png' style={styles.certImage} />
        <Text style={styles.name}>{certData.fullName}</Text>
        <Image source={certData.verifyQR} style={styles.verify} />
        <Image source={certData.skillBoostQR} style={styles.skill} />
      </View>
    </Page>
  </Document>
);

const CertificateImage = () => {
  const { certData } = useCertStore();

  return (
    <div className='relative w-[400px] h-[300px] md:w-[625px] md:h-[426px] lg:w-[950px] lg:h-[652px] border shadow flex flex-col items-center justify-center'>
      <img src='/cloudCertificate.png' className='w-full h-full' alt="Certificate Template" />
      <p className='absolute left-1/2 -translate-x-1/2 text-xl md:text-3xl lg:text-5xl text-gray-600 mt-5 md:mt-6 lg:mt-10'>
        {certData.fullName}
      </p>
      <img
        src={certData.verifyQR}
        className='absolute bottom-[4px] right-[49px] md:bottom-[11px] md:right-[76px] lg:bottom-[16px] lg:right-[110px] w-[32px] h-[45px] md:w-[51px] md:h-[52px] lg:w-[88px] lg:h-[80.8px] lg:rounded-[13px] object-contain'
        alt='Verify QR'
      />
      <img
        src={certData.skillBoostQR}
        className='absolute bottom-[4px] right-[7px] md:bottom-[11px] md:right-[11px] lg:bottom-[16px] lg:right-[11px] w-[32px] h-[45px] md:w-[51px] md:h-[52px] lg:w-[88px] lg:h-[80.8px] lg:rounded-[13px] object-contain'
        alt='Skill Boost QR'
      />
    </div>
  )
}

const VerifyCertificate = () => {
  const { certificateID } = useParams();
  const { height, isReady } = useWindowHeight();

  const [certLoading, setCertLoading] = useState(true);
  const { certData, setCertData } = useCertStore();

  useEffect(() => {
    const fetchCertData = async () => {
      try {
        setCertLoading(true);

        const CustomHeader = new Headers();
        CustomHeader.append("Content-Type", "application/json");
        const config = {
          method: "GET",
          headers: CustomHeader
        };

        fetch(`/api/cert/verify/${certificateID}`, config)
          .then((response) => response.json())
          .then((result) => {
            if (result.success === true) {
              setCertData({
                fullName: result.data.fullName,
                verifyQR: result.data.verifyQR,
                skillBoostQR: result.data.skillBoostQR,
                message: ""
              });
              setCertLoading(false);
            }

            if (result.success === false) {
              setCertData({
                ...certData,
                message: result.msg
              });
              setCertLoading(false);
            }
          });
      }
      catch (error) {
        setCertData({
          ...certData,
          message: "Error. Try again after some time!"
        });
      }
    };

    if (certificateID) fetchCertData();
  }, [certificateID]);

  return (
    <div className='overflow-hidden'
      style={{
        height: `${height}px`,
        opacity: isReady ? 1 : 0,
        transition: 'opacity 0.5s linear'
      }}
    >
      <div className='h-full pt-[88px] flex flex-col gap-5 items-center justify-center'>
        {certLoading ? (
          <div className='relative w-[400px] h-[300px] md:w-[625px] md:h-[426px] lg:w-[950px] lg:h-[652px] border rounded'>
            <Skeleton baseColor='#fff' highlightColor='#ffc657' className='absolute -top-[4px] left-0 w-full h-full' />
            <p className='absolute top-0 left-0 w-full h-full flex items-center justify-center z-50 text-[#4A90F4] text-xl font-extrabold'>
              Validating...
            </p>
          </div>
        ) : (
          certData.message ? (
            <div className='relative bg-white w-[400px] h-[300px] md:w-[625px] md:h-[426px] lg:w-[950px] lg:h-[652px] border rounded text-xl font-extrabold'>
              <p className='absolute top-0 left-0 w-full h-full flex items-center justify-center z-50 text-[#4A90F4] text-xl font-extrabold'>
                {certData.message}
              </p>
            </div>
          ) : (
            <>
              <CertificateImage />
              <PDFDownloadLink document={<MyDocument certData={certData} />} fileName="certificate.pdf">
                {({ blob, url, loading, error }) => (
                  <div className='w-[110px] h-[35px] bg-[#FFBC39] hover:bg-[#4A90F4] hover:rounded-xl duration-200 text-white font-extrabold flex items-center justify-center'>
                    {loading ? 'Generating...' : 'Download'}
                  </div>
                )}
              </PDFDownloadLink >
            </>
          )
        )}
      </div>
    </div>
  );
}

const styles = StyleSheet.create({
  page: {
    width: 2500,
    height: 1704,
    position: "relative"
  },
  section: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  certImage: {
    width: "100%",
    height: "100%",
  },
  name: {
    position: "absolute",
    left: 0,
    right: 0,
    top: "850px",
    fontSize: "96px",
    color: "rgb(75 85 99 / 1)",
    textAlign: "center",
    margin: "auto",
  },
  verify: {
    position: "absolute",
    right: "301px",
    bottom: "43px",
    width: "210px",
    height: "210px",
    objectFit: "contain",
    borderRadius: "30px"
  },
  skill: {
    position: "absolute",
    right: "41px",
    bottom: "43px",
    width: "210px",
    height: "210px",
    objectFit: "contain",
    borderRadius: "30px"
  }
});

export default VerifyCertificate