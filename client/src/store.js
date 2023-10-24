import { create } from 'zustand'

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

export const useAuthStore = create((set) => ({
    user: null,
    setUser: (user) => set({ user: user }),
    verifyLoading: false,
    setVerifyLoading: (verifyLoading) => set({ verifyLoading: verifyLoading }),
    verifySuccess: false,
    setVerifySuccess: (verifySuccess) => set({ verifySuccess: verifySuccess }),
}));