import { create } from 'zustand'

export const useCertStore = create((set) => ({
    certData: {
        fullName: "",
        verifyQR: "",
        skillBoostQR: "",
        message: ""
    },
    setCertData: (certData) => set({ certData: certData }),
}))