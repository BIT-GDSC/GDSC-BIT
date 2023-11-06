import { create } from 'zustand';
import { toast } from 'sonner';

export const useAuthStore = create((set) => ({
    user: null,
    setUser: (user) => set({ user: user }),
    verifyLoading: false,
    setVerifyLoading: (verifyLoading) => set({ verifyLoading: verifyLoading }),
    verifySuccess: false,
    setVerifySuccess: (verifySuccess) => set({ verifySuccess: verifySuccess }),
    authType: "sign-in", // Available auth types => sign-in, sign-up, otp-verify, new-user, forgot-password-email, forgot-password-otp, forgot-password-reset
    setAuthType: (authType) => set({ authType: authType }),
    registerLoading: false,
    setRegisterLoading: (registerLoading) => set({ registerLoading: registerLoading }),
    registerSuccess: false,
    setRegisterSuccess: (registerSuccess) => set({ registerSuccess: registerSuccess }),
    verifyOTP: false,
    setVerifyOTP: (verifyOTP) => set({ verifyOTP: verifyOTP }),
    registerDetail: false,
    setRegisterDetail: (registerDetail) => set({ registerDetail: registerDetail }),
    emailVerifyLoading: false,
    setEmailVerifyLoading: (emailVerifyLoading) => set({ emailVerifyLoading: emailVerifyLoading })
}));

export const useRegisterStore = create(() => ({
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
            toast.loading('Sending OTP...');

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
                    if (result.success === false) toast.error(result.msg, { duration: 7500 });
                })
                .finally(() => toast.dismiss())
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
    },
    userRegisterDetails: async ({ firstName, lastName, imageFile, shallRedirect, navigate }) => {
        try {
            useAuthStore.getState().setRegisterDetail(true);
            const formData = new FormData();
            formData.append('firstName', firstName);
            formData.append('lastName', lastName);
            if (imageFile) formData.append('file', imageFile);

            const CustomHeader = new Headers();
            CustomHeader.append("token", localStorage.getItem("token"));
            const config = {
                method: 'POST',
                headers: CustomHeader,
                body: formData
            };

            fetch(`/api/register-details`, config)
                .then((response) => response.json())
                .then((result) => {
                    if (result.success === true) {
                        toast.success(result.msg, { duration: 7500 });
                        useAuthStore.getState().setAuthType("sign-in");
                        if (shallRedirect) navigate("/");
                    }
                    if (result.success === false) toast.error(result.msg, { duration: 7500 });
                })
                .finally(() => useAuthStore.getState().setRegisterDetail(false))
        }
        catch (error) {
            toast.error("Something went wrong... Try again later!");
        }
    }
}));

export const useLoginStore = create(() => ({
    userLogin: async (email, password, navigate) => {
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
                        navigate("/");
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
    },
    loadUser: async () => {
        if (localStorage.getItem("token") === null || localStorage.getItem("token") === "") return;
        try {
            useAuthStore.getState().setVerifyLoading(true);
            useAuthStore.getState().setVerifySuccess(false);
            const CustomHeader = new Headers();
            CustomHeader.append("token", localStorage.getItem("token"));
            const config = {
                method: 'GET',
                headers: CustomHeader
            }
            await fetch(`/api/load-user`, config)
                .then(response => response.json())
                .then(result => {
                    if (result.success === true) {
                        useAuthStore.getState().setUser(result.user);
                        useAuthStore.getState().setVerifyLoading(false);
                        useAuthStore.getState().setVerifySuccess(true);
                    }

                    if (result.success === false) {
                        localStorage.removeItem("token");
                        useAuthStore.getState().setVerifyLoading(false);
                        useAuthStore.getState().setVerifySuccess(false);
                    }
                })
        }
        catch (error) {
            localStorage.removeItem("token");
        }
    }
}));

export const useForgotStore = create((set) => ({
    email: "",
    emailVerify: async (email) => {
        try {
            set({ email: email });
            useAuthStore.getState().setEmailVerifyLoading(true);
            const CustomHeader = new Headers();
            CustomHeader.append('Content-Type', 'application/json')
            const config = {
                method: 'POST',
                headers: CustomHeader,
                body: JSON.stringify({ email })
            }
            await fetch(`/api/forgot-email-verify`, config)
                .then(response => response.json())
                .then(result => {
                    if (result.success === true) {
                        toast.success(result.msg, { duration: 7500 });
                        useAuthStore.getState().setAuthType("forgot-password-otp");
                    }

                    if (result.success === false) {
                        toast.error(result.msg, { duration: 7500 });
                    }
                })
                .finally(() => useAuthStore.getState().setEmailVerifyLoading(false))
        }
        catch (error) {
            toast.error("Something went wrong... Try again later!");
        }
    },
    resendOTP: async () => {
        try {
            const email = useForgotStore.getState().email;
            if (!email) return toast.error("No email found... Try again!", { duration: 7500 });
            toast.loading('Sending OTP...');

            const CustomHeader = new Headers();
            CustomHeader.append('Content-Type', 'application/json')
            const config = {
                method: 'POST',
                headers: CustomHeader,
                body: JSON.stringify({ email: email })
            }

            fetch(`/api/forgot-resend-otp`, config)
                .then((response) => response.json())
                .then((result) => {
                    if (result.success === true) toast.success(result.msg, { duration: 7500 });
                    if (result.success === false) toast.error(result.msg, { duration: 7500 });
                })
                .finally(() => toast.dismiss())
        }
        catch (error) {
            toast.error("Something went wrong... Try again later!");
        }
    },
    otpVerify: async (otp) => {
        try {

        }
        catch (error) {
            toast.error("Something went wrong... Try again later!");
        }
    },
    resetPassword: async (password) => {
        try {

        }
        catch (error) {
            toast.error("Something went wrong... Try again later!");
        }
    }
}));