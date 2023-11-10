import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

const useSocialAuth = () => {
    const navigate = useNavigate()

    const { setUser, setVerifyLoading, setVerifySuccess } = useAuthStore()
    const { setAuthType } = useAuthStore()

    const urlParams = new URLSearchParams(window.location.search)

    const authenticationType = urlParams.get('type')
    const userDataString = urlParams.get('response')
    const registerToken = urlParams.get('registerToken')
    const loginToken = urlParams.get('loginToken')

    useEffect(() => {
        if (userDataString) {
            const userData = JSON.parse(userDataString)
            setUser(userData)
            setVerifyLoading(false)
            setVerifySuccess(true)
        }
    }, [userDataString])

    useEffect(() => {
        if (authenticationType !== '') {
            if (authenticationType === 'login') {
                navigate('/')
            }
            if (authenticationType === 'register') {
                setAuthType('new-user')
            }
        }
    }, [authenticationType])

    useEffect(() => {
        if (registerToken) localStorage.setItem('register_token', registerToken);
    }, [registerToken]);
    useEffect(() => {
        if (loginToken) localStorage.setItem('login_token', loginToken);
    }, [loginToken]);
};

export default useSocialAuth;