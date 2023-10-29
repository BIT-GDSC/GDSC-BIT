import { create } from 'zustand';

export const useCertStore = create((set) => ({
    certData: {
        _id: "",
        fullName: "",
        verifyURL: "",
        verifyQR: "",
        skillBoostQR: "",
        certificate: "",
        message: ""
    },
    setCertData: (certData) => set({ certData: certData }),
}));