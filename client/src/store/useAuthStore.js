import { create } from 'zustand';
import { toast } from 'sonner';

export const useAuthStore = create((set) => ({
    authType: "sign-in", // Available auth types => sign-in, sign-up, otp-verify, new-user
    setAuthType: (authType) => set({ authType: authType }),
    user: null,
    setUser: (user) => set({ user: user }),
    verifyLoading: false,
    setVerifyLoading: (verifyLoading) => set({ verifyLoading: verifyLoading }),
    verifySuccess: false,
    setVerifySuccess: (verifySuccess) => set({ verifySuccess: verifySuccess }),
    registerLoading: false,
    setRegisterLoading: (registerLoading) => set({ registerLoading: registerLoading }),
    registerSuccess: false,
    setRegisterSuccess: (registerSuccess) => set({ registerSuccess: registerSuccess }),
    verifyOTP: false,
    setVerifyOTP: (verifyOTP) => set({ verifyOTP: verifyOTP })
}));

export const useRegisterStore = create((set) => ({
    userRegisterCredential: async (email, password) => {
        try {
            useAuthStore.getState().setRegisterLoading(true);
            useAuthStore.getState().setRegisterSuccess(false);
            const CustomHeader = new Headers();
            CustomHeader.append('Content-Type', 'application/json')
            const config = {
                method: 'POST',
                headers: CustomHeader,
                body: JSON.stringify({
                    email,
                    password
                })
            }
            await fetch(`/api/register-credential`, config)
                .then(response => response.json())
                .then(result => {
                    if (result.success === true) {
                        localStorage.setItem("token", result.token);
                        useAuthStore.getState().setUser(result.user);
                        useAuthStore.getState().setRegisterSuccess(true);
                        useAuthStore.getState().setAuthType("otp-verify");
                        toast.success(result.msg, { duration: 7500 });
                    }

                    if (result.success === false) {
                        useAuthStore.getState().setRegisterSuccess(false);
                        toast.error(result.msg, { duration: 7500 });
                    }
                })
                .finally(() => {
                    useAuthStore.getState().setRegisterLoading(false);
                })
        }
        catch (error) {
            toast.error("Something went wrong... Try again later!");
        }
    },
    userRegisterResendOTP: async () => {
        try {
            const CustomHeader = new Headers();
            CustomHeader.append("token", localStorage.getItem("token"));
            const config = {
                method: 'GET',
                headers: CustomHeader,
            }

            fetch(`/api/register-resend-otp`, config)
                .then((response) => response.json())
                .then((result) => {
                    if (result.success === true) toast.success(result.msg, { duration: 7500 });
                    if (result.success === false) toast.error("Something went wrong... Try again later!", { duration: 7500 });
                })
        }
        catch (error) {
            toast.error("Something went wrong... Try again later!");
        }
    },
    userRegisterVerifyOTP: async (otp) => {
        try {
            useAuthStore.getState().setVerifyOTP(true);
            const CustomHeader = new Headers();
            CustomHeader.append("token", localStorage.getItem("token"));
            CustomHeader.append("otp", otp);
            const config = {
                method: 'GET',
                headers: CustomHeader,
            }

            fetch(`/api/register-verify-otp`, config)
                .then((response) => response.json())
                .then((result) => {
                    if (result.success === true) {
                        toast.success(result.msg, { duration: 7500 });
                        useAuthStore.getState().setAuthType("new-user");
                    }
                    if (result.success === false) toast.error(result.msg, { duration: 7500 });
                })
                .finally(() => useAuthStore.getState().setVerifyOTP(false));
        }
        catch (error) {
            toast.error("Something went wrong... Try again later!");
        }
    }
}));

export const useLoginStore = create((set) => ({
    userLogin: async (email, password) => {
        try {
            useAuthStore.getState().setVerifyLoading(true);
            useAuthStore.getState().setVerifySuccess(false);
            const CustomHeader = new Headers();
            CustomHeader.append('Content-Type', 'application/json')
            const config = {
                method: 'POST',
                headers: CustomHeader,
                body: JSON.stringify({
                    email,
                    password
                })
            }
            await fetch(`/api/login`, config)
                .then(response => response.json())
                .then(result => {
                    if (result.success === true) {
                        toast.success(result.msg, { duration: 7500 });
                        localStorage.setItem("token", result.token);
                        useAuthStore.getState().setUser(result.user);
                        useAuthStore.getState().setVerifyLoading(false);
                        useAuthStore.getState().setVerifySuccess(true);
                    }

                    if (result.success === false) {
                        toast.error(result.msg, { duration: 7500 });
                        useAuthStore.getState().setVerifyLoading(false);
                        useAuthStore.getState().setVerifySuccess(false);
                    }
                })
        }
        catch (error) {
            toast.error("Something went wrong... Try again later!");
        }
    }
}));