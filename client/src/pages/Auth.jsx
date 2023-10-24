import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store';
import useWindowHeight from '../utils/useWindowHeight';
import { toast } from 'sonner';

const Auth = () => {
    const navigate = useNavigate();
    const { height, isReady } = useWindowHeight();
    const { setUser, setVerifyLoading, setVerifySuccess } = useAuthStore();
    const [authType, setAuthType] = useState("sign-in");

    const urlParams = new URLSearchParams(window.location.search);
    const authenticationType = urlParams.get('type');
    const userDataString = urlParams.get('response');

    useEffect(() => {
        if (userDataString) {
            const userData = JSON.parse(userDataString);
            setUser(userData);
            setVerifyLoading(false);
            setVerifySuccess(true);
        }
    }, [userDataString]);

    useEffect(() => {
        if (authenticationType !== '') {
            if (authenticationType === 'login') {
                const prevPath = localStorage.getItem('prevPath');
                if (prevPath) {
                    navigate(prevPath);
                    localStorage.removeItem('prevPath');
                }
                else navigate("/test");
            }
            if (authenticationType === 'register') {
                setAuthType("new-user");
            }
        }
    }, [authenticationType]);

    return (
        <div
            style={{
                height: `${height}px`,
                opacity: isReady ? 1 : 0,
                transition: 'opacity 0.5s linear'
            }}
        >
            <div className='h-full flex items-center justify-center'>
                <div className='w-[95%] md:w-[28rem] px-[2rem] pt-[1rem] pb-[2rem] flex flex-col gap-[1.5rem] bg-slate-50 border rounded-[1rem]'>
                    <div>
                        <div className='w-full flex justify-center md:pb-[1rem]'>
                            <img
                                src='/logo.png'
                                className='w-[100px] h-[70px] object-contain'
                            />
                        </div>
                        <p className='font-[600] text-[1.1rem] md:text-[1.25rem]'>
                            {authType === "sign-in" ? "Sign in" : "Create your account"}
                        </p>
                        <p className='font-[400] text-[0.75rem] md:text-[1rem] text-[#000000a6] pt-[1px]'>to continue to GDSC Bengal Institute of Technology</p>
                    </div>

                    {authType !== "new-user" ? (
                        <>
                            <SocialAuth />

                            <div className='flex items-center'>
                                <div className='w-full h-[1px] bg-[#00000029]' />
                                <span className='font-[500] text-[0.8125rem] text-[#000000a6] px-[1rem]'>or</span>
                                <div className='w-full h-[1px] bg-[#00000029]' />
                            </div>

                            <ManualAuth
                                authType={authType}
                            />
                        </>
                    ) : (
                        <NewUser />
                    )}

                    <div className='flex items-center gap-[0.25rem] font-[400] text-[0.8125rem]'>
                        <p className='text-[#000000a6]'>
                            {authType === "sign-in" ? "New here" : "Already have account"}?
                        </p>
                        <button
                            className='text-[#103fef] hover:underline'
                            onClick={() => setAuthType(authType === "sign-in" ? "sign-up" : "sign-in")}
                        >
                            {authType === "sign-in" ? "Create account" : "Login"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
};

const ManualAuth = ({ authType }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleAuth = (e) => {
        e.preventDefault();
        console.log({ email, password });

        toast.error("Currently under maintainance!");
    }

    return (
        <form className='flex flex-col gap-[1rem]' onSubmit={handleAuth}>
            <div className='flex flex-col gap-[0.5rem]'>
                <div className='flex flex-col gap-[0.25rem]'>
                    <label htmlFor='email' className='font-[500] text-[0.8125rem]'>
                        Email Address
                    </label>
                    <InputBox
                        id="email"
                        type="email"
                        value={email}
                        setValue={setEmail}
                    />
                </div>
                <div className='flex flex-col gap-[0.25rem]'>
                    <label htmlFor='password' className='font-[500] text-[0.8125rem]'>
                        Password
                    </label>
                    <InputBox
                        id="password"
                        type="password"
                        value={password}
                        setValue={setPassword}
                    />
                </div>
                {authType === "sign-up" && (
                    <div className='flex flex-col gap-[0.25rem]'>
                        <label htmlFor='confirm-password' className='font-[500] text-[0.8125rem]'>
                            Confirm Password
                        </label>
                        <InputBox
                            id="confirm-password"
                            type="password"
                            value={confirmPassword}
                            setValue={setConfirmPassword}
                        />
                    </div>
                )}
            </div>
            <button
                type='submit'
                className='py-[0.625rem] px-[1.25rem] bg-[#103FEF] text-white hover:bg-[#FFBC39] duration-200 font-[600] text-[0.6875rem] rounded-[0.375rem]'
            >
                CONTINUE
            </button>
        </form>
    )
};

const NewUser = () => {
    const { user } = useAuthStore();

    const [avatar, setAvatar] = useState(user.avatar.url || "/user.svg");
    const [firstName, setFirstName] = useState(user.firstName || "");
    const [lastName, setLastName] = useState(user.lastName || "");

    const handleNewUser = (e) => {
        e.preventDefault();
        console.log({ firstName, lastName });

        toast.error("Currently under maintainance!");
    }

    return (
        <form className='flex flex-col gap-[1.5rem]' onSubmit={handleNewUser}>
            <div className='flex flex-col gap-[0.75rem]'>
                <div className='flex flex-col gap-[0.25rem] items-center'>
                    <div className='w-[80px] h-[80px] bg-white border rounded-full overflow-hidden'>
                        <img
                            src={avatar}
                            className='w-full h-full object-contain'
                        />
                    </div>
                    <button
                        type='button'
                        className='w-fit font-[500] text-[0.8125rem] bg-slate-200 hover:bg-[#FFBC39] hover:text-white duration-200 py-[0.25rem] px-[0.5rem] rounded-lg'
                    >
                        Upload
                    </button>
                </div>
                <div className='flex flex-col gap-[0.25rem]'>
                    <label htmlFor='first-name' className='font-[500] text-[0.8125rem]'>
                        First Name
                    </label>
                    <InputBox
                        id="first-name"
                        type="text"
                        value={firstName}
                        setValue={setFirstName}
                    />
                </div>
                <div className='flex flex-col gap-[0.25rem]'>
                    <label htmlFor='last-name' className='font-[500] text-[0.8125rem]'>
                        Last Name
                    </label>
                    <InputBox
                        id="last-name"
                        type="text"
                        value={lastName}
                        setValue={setLastName}
                    />
                </div>
            </div>
            <button
                type='submit'
                className='py-[0.625rem] px-[1.25rem] bg-[#103FEF] text-white hover:bg-[#FFBC39] duration-200 font-[600] text-[0.6875rem] rounded-[0.375rem]'
            >
                CREATE
            </button>
        </form>
    )
}

const SocialAuth = () => {
    const isProduction = import.meta.env.MODE === 'production';

    const handleGoogleAuth = () => {
        const authUrl = isProduction
            ? "https://gdsc-bit.vercel.app/auth/google"
            : import.meta.env.VITE_DEV_GOOGLE_AUTH_URL;
        window.location.href = authUrl;
    };

    const handleLinkedInAuth = () => {
        const authUrl = isProduction
            ? "https://gdsc-bit.vercel.app/auth/linkedin"
            : import.meta.env.VITE_DEV_LINKEDIN_AUTH_URL;
        window.location.href = authUrl;
    };

    return (
        <div className='flex flex-col gap-[0.5rem]'>
            <button
                onClick={handleGoogleAuth}
                className='hover:bg-slate-100 duration-200 border border-[#00000014] py-[0.625rem] px-[1.25rem] flex gap-[1rem] rounded-[0.375rem]'
            >
                <img src='/google-small.svg' className='w-[1.25rem] h-auto' />
                <span className='font-[400] text-[0.8125rem]'>Continue with Google</span>
            </button>
            <button
                onClick={handleLinkedInAuth}
                className='hover:bg-slate-100 duration-200 border border-[#00000014] py-[0.625rem] px-[1.25rem] flex gap-[1rem] rounded-[0.375rem]'
            >
                <img src='/linkedin-small.svg' className='w-[1.25rem] h-auto' />
                <span className='font-[400] text-[0.8125rem]'>Continue with LinkedIn</span>
            </button>
        </div>
    );
};

const InputBox = ({ id, type, value, setValue }) => {
    return (
        <input
            id={id}
            type={type}
            required
            value={value}
            onChange={e => setValue(e.target.value)}
            className='py-[0.625rem] px-[1rem] border border-[#00000029] rounded-[0.375rem] font-[400] text-[0.8125rem]'
        />
    )
};

export default Auth