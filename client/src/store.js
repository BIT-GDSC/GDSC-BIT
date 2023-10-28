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
    authType: "sign-in", // Available auth types => sign-in, sign-up, otp-verify, new-user
    setAuthType: (authType) => set({ authType: authType }),
    user: null,
    setUser: (user) => set({ user: user }),
    verifyLoading: false,
    setVerifyLoading: (verifyLoading) => set({ verifyLoading: verifyLoading }),
    verifySuccess: false,
    setVerifySuccess: (verifySuccess) => set({ verifySuccess: verifySuccess }),
}));