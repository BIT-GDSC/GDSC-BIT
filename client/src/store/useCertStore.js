import { create } from 'zustand'
import crypto from 'crypto-js'

const SECRET_KEY = import.meta.env.VITE_SECRET_KEY

export const useCertStore = create((set) => ({
  certLoading: true,
  setCertLoading: (certLoading) => set({ certLoading: certLoading }),
  certData: {
    _id: '',
    fullName: '',
    verifyURL: '',
    verifyQR: '',
    skillBoostQR: '',
    certificate: '',
    message: '',
  },
  setCertData: (certData) => set({ certData: certData }),
  fetchCertData: async (certificateID) => {
    try {
      useCertStore.getState().setCertLoading(true)

      const CustomHeader = new Headers()
      CustomHeader.append('Content-Type', 'application/json')
      const config = {
        method: 'GET',
        headers: CustomHeader,
      }

      await fetch(
        `http://localhost:5000/api/cert/verify/${certificateID}`,
        config
      )
        .then((response) => response.json())
        .then((result) => {
          if (result.success === true) {
            const decryptedData = JSON.parse(
              crypto.AES.decrypt(result.data, SECRET_KEY).toString(
                crypto.enc.Utf8
              )
            )
            useCertStore.getState().setCertData({
              _id: decryptedData._id,
              fullName: decryptedData.fullName,
              verifyURL: decryptedData.verifyURL,
              verifyQR: decryptedData.verifyQR,
              skillBoostQR: decryptedData.skillBoostQR,
              certificate: decryptedData.certificate,
              message: '',
            })
          }

          if (result.success === false) {
            useCertStore.getState().setCertData({
              message: result.msg,
            })
          }
        })
        .finally(() => useCertStore.getState().setCertLoading(false))
    } catch (error) {
      console.log(error)
      useCertStore.getState().setCertData({
        message: 'Error. Try again after some time!',
      })
    }
  },
}))
