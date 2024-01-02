import { create } from 'zustand';
import { toast } from 'sonner';
import crypto from 'crypto-js';

const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;

export const useAuthStore = create(set => ({
  user: null,
  setUser: user => set({ user: user }),
  verifyLoading: false,
  setVerifyLoading: verifyLoading => set({ verifyLoading: verifyLoading }),
  verifySuccess: false,
  setVerifySuccess: verifySuccess => set({ verifySuccess: verifySuccess }),
  authType: 'sign-in', // Available auth types => sign-in, sign-up, otp-verify, new-user, forgot-password-email, forgot-password-otp, forgot-password-reset
  setAuthType: authType => set({ authType: authType }),
  registerLoading: false,
  setRegisterLoading: registerLoading =>
    set({ registerLoading: registerLoading }),
  registerSuccess: false,
  setRegisterSuccess: registerSuccess =>
    set({ registerSuccess: registerSuccess }),
  verifyOTP: false,
  setVerifyOTP: verifyOTP => set({ verifyOTP: verifyOTP }),
  registerDetail: false,
  setRegisterDetail: registerDetail => set({ registerDetail: registerDetail }),
  emailVerifyLoading: false,
  setEmailVerifyLoading: emailVerifyLoading =>
    set({ emailVerifyLoading: emailVerifyLoading })
}))

export const useRegisterStore = create(() => ({
  userRegisterCredential: async email => {
    try {
      useAuthStore.getState().setRegisterLoading(true)
      useAuthStore.getState().setRegisterSuccess(false)
      const CustomHeader = new Headers()
      CustomHeader.append('Content-Type', 'application/json')
      const config = {
        method: 'POST',
        headers: CustomHeader,
        body: JSON.stringify({ email })
      }
      await fetch(`/api/register-credential`, config)
        .then(response => response.json())
        .then(result => {
          if (result.success === true) {
            toast.success(result.msg, { duration: 7500 })
            localStorage.setItem('register_token', result.registerToken)
            useAuthStore.getState().setRegisterSuccess(true)
            useAuthStore.getState().setAuthType('otp-verify')
          }

          if (result.success === false) {
            useAuthStore.getState().setRegisterSuccess(false)
            toast.error(result.msg, { duration: 7500 })
          }
        })
        .finally(() => {
          useAuthStore.getState().setRegisterLoading(false)
        })
    } catch (error) {
      toast.error('Something went wrong... Try again later!')
    }
  },
  userRegisterResendOTP: async () => {
    try {
      toast.loading('Sending OTP...')

      const CustomHeader = new Headers()
      CustomHeader.append(
        'register_token',
        localStorage.getItem('register_token')
      )
      const config = {
        method: 'GET',
        headers: CustomHeader
      }

      fetch(`/api/register-resend-otp`, config)
        .then(response => response.json())
        .then(result => {
          if (result.success === true)
            toast.success(result.msg, { duration: 7500 })
          if (result.success === false)
            toast.error(result.msg, { duration: 7500 })
        })
        .finally(() => toast.dismiss())
    } catch (error) {
      toast.error('Something went wrong... Try again later!')
    }
  },
  userRegisterVerifyOTP: async otp => {
    try {
      useAuthStore.getState().setVerifyOTP(true)
      const CustomHeader = new Headers()
      CustomHeader.append(
        'register_token',
        localStorage.getItem('register_token')
      )
      CustomHeader.append('otp', otp)
      const config = {
        method: 'GET',
        headers: CustomHeader
      }

      fetch(`/api/register-verify-otp`, config)
        .then(response => response.json())
        .then(result => {
          if (result.success === true) {
            toast.success(result.msg, { duration: 7500 })
            useAuthStore.getState().setAuthType('new-user')
          }
          if (result.success === false)
            toast.error(result.msg, { duration: 7500 })
        })
        .finally(() => useAuthStore.getState().setVerifyOTP(false))
    } catch (error) {
      toast.error('Something went wrong... Try again later!')
    }
  },
  userRegisterDetails: async ({
    firstName,
    lastName,
    password,
    imageFile,
    shallRedirect,
    navigate
  }) => {
    try {
      useAuthStore.getState().setRegisterDetail(true)
      const formData = new FormData()
      formData.append('firstName', firstName)
      formData.append('lastName', lastName)
      formData.append('password', password)
      if (imageFile) formData.append('file', imageFile)

      const CustomHeader = new Headers()
      CustomHeader.append(
        'register_token',
        localStorage.getItem('register_token')
      )
      const config = {
        method: 'POST',
        headers: CustomHeader,
        body: formData
      }

            fetch(`/api/register-details`, config)
                .then((response) => response.json())
                .then((result) => {
                    if (result.success === true) {
                        toast.success(result.msg, { duration: 7500 });
                        localStorage.setItem("login_token", result.loginToken);
                        if (shallRedirect) navigate("/");
                    }
                    if (result.success === false) toast.error(result.msg, { duration: 7500 });
                })
                .finally(() => {
                    localStorage.removeItem("register_token");
                    useAuthStore.getState().setRegisterDetail(false);
                })
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
            const CustomHeader = new Headers();
            CustomHeader.append('Content-Type', 'application/json')
            const config = {
                method: 'POST',
                headers: CustomHeader,
                body: JSON.stringify({ email, password })
            }
            await fetch(`/api/login`, config)
                .then(response => response.json())
                .then(result => {
                    if (result.success === true) {
                        toast.success(result.msg, { duration: 7500 });
                        localStorage.setItem("login_token", result.loginToken);
                        navigate("/");
                    }

                    if (result.success === false) {
                        toast.error(result.msg, { duration: 7500 });
                        useAuthStore.getState().setVerifyLoading(false);
                    }
                })
        }
        catch (error) {
            useAuthStore.getState().setVerifyLoading(false);
            toast.error("Something went wrong... Try again later!");
        }
    },
    loadUser: async () => {
        if (localStorage.getItem("login_token") === null || localStorage.getItem("login_token") === "") return;
        try {
            useAuthStore.getState().setVerifyLoading(true);
            const CustomHeader = new Headers();
            CustomHeader.append('Content-Type', 'application/json');
            CustomHeader.append("login_token", localStorage.getItem("login_token"));
            const config = {
                method: 'GET',
                headers: CustomHeader
            }
            await fetch(`/api/load-user`, config)
                .then(response => response.json())
                .then(result => {
                    if (result.success === true) {
                        const decryptedData = JSON.parse(
                            crypto.AES.decrypt(result.data, SECRET_KEY).toString(
                                crypto.enc.Utf8
                            )
                        );
                        useAuthStore.getState().setUser(decryptedData.user);
                        useAuthStore.getState().setVerifyLoading(false);
                        useAuthStore.getState().setVerifySuccess(true);
                    }

          if (result.success === false) {
            localStorage.removeItem('login_token')
            useAuthStore.getState().setVerifyLoading(false)
            useAuthStore.getState().setVerifySuccess(false)
          }
        })
    } catch (error) {
      localStorage.removeItem('login_token')
      useAuthStore.getState().setVerifyLoading(false)
      useAuthStore.getState().setVerifySuccess(false)
    }
  }
}))

export const useForgotStore = create(set => ({
  email: '',
  verifyOTP: false,
  resetPasswordLoading: false,
  emailVerify: async email => {
    try {
      set({ email: email })
      useAuthStore.getState().setEmailVerifyLoading(true)
      const CustomHeader = new Headers()
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
            toast.success(result.msg, { duration: 7500 })
            useAuthStore.getState().setAuthType('forgot-password-otp')
          }

          if (result.success === false) {
            toast.error(result.msg, { duration: 7500 })
          }
        })
        .finally(() => useAuthStore.getState().setEmailVerifyLoading(false))
    } catch (error) {
      toast.error('Something went wrong... Try again later!')
    }
  },
  resendOTP: async () => {
    try {
      const email = useForgotStore.getState().email
      if (!email)
        return toast.error('No email found... Try again!', { duration: 7500 })
      toast.loading('Sending OTP...')

      const CustomHeader = new Headers()
      CustomHeader.append('Content-Type', 'application/json')
      const config = {
        method: 'POST',
        headers: CustomHeader,
        body: JSON.stringify({ email: email })
      }

      fetch(`/api/forgot-resend-otp`, config)
        .then(response => response.json())
        .then(result => {
          if (result.success === true)
            toast.success(result.msg, { duration: 7500 })
          if (result.success === false)
            toast.error(result.msg, { duration: 7500 })
        })
        .finally(() => toast.dismiss())
    } catch (error) {
      toast.error('Something went wrong... Try again later!')
    }
  },
  otpVerify: async otp => {
    try {
      const email = useForgotStore.getState().email
      if (!email)
        return toast.error('No email found... Try again!', { duration: 7500 })

      set({ verifyOTP: true })
      const CustomHeader = new Headers()
      CustomHeader.append('otp', otp)
      CustomHeader.append('email', email)
      const config = {
        method: 'GET',
        headers: CustomHeader
      }

      fetch(`/api/forgot-otp-verify`, config)
        .then(response => response.json())
        .then(result => {
          if (result.success === true) {
            toast.success(result.msg, { duration: 7500 })
            localStorage.setItem('forgot_token', result.forgotToken)
            useAuthStore.getState().setAuthType('forgot-password-reset')
          }
          if (result.success === false)
            toast.error(result.msg, { duration: 7500 })
        })
        .finally(() => set({ verifyOTP: false }))
    } catch (error) {
      toast.error('Something went wrong... Try again later!')
    }
  },
  resetPassword: async password => {
    try {
      set({ resetPasswordLoading: true })
      const CustomHeader = new Headers()
      CustomHeader.append('Content-Type', 'application/json')
      CustomHeader.append('forgot_token', localStorage.getItem('forgot_token'))
      const config = {
        method: 'POST',
        headers: CustomHeader,
        body: JSON.stringify({ password })
      }
      await fetch(`/api/forgot-reset-password`, config)
        .then(response => response.json())
        .then(result => {
          if (result.success === true) {
            toast.success(result.msg, { duration: 7500 })
            useAuthStore.getState().setAuthType('sign-in')
          }

          if (result.success === false) {
            toast.success(result.msg, { duration: 7500 })
          }
        })
        .finally(() => {
          localStorage.removeItem('forgot_token')
          set({ resetPasswordLoading: false })
        })
    } catch (error) {
      toast.error('Something went wrong... Try again later!')
    }
  }
}))
