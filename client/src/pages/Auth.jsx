import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore, useRegisterStore, useLoginStore } from '../store/useAuthStore';
import useWindowHeight from '../utils/useWindowHeight';
import { toast } from 'sonner';

// Auth page component
const Auth = () => {
    const navigate = useNavigate();
    const { height, isReady } = useWindowHeight();
    const { setUser, setVerifyLoading, setVerifySuccess } = useAuthStore();
    const { authType, setAuthType } = useAuthStore();

    const urlParams = new URLSearchParams(window.location.search);
    const authenticationType = urlParams.get('type');
    const userDataString = urlParams.get('response');
    const token = urlParams.get('token');

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

    useEffect(() => {
        if (token) localStorage.setItem('token', token);
    }, [token]);

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
                            {authType === "sign-in" ? "Sign in"
                                : authType === "sign-up" ? "Create your account"
                                    : authType === "otp-verify" ? "Verify your account"
                                        : authType === "new-user" ? "Describe yourself"
                                            : ""
                            }
                        </p>
                        <p className='font-[400] text-[0.75rem] md:text-[1rem] text-[#000000a6] pt-[1px]'>to continue to GDSC Bengal Institute of Technology</p>
                    </div>

                    {authType === "sign-in" || authType === "sign-up" ? (
                        <>
                            <SocialAuth />

                            <div className='flex items-center'>
                                <div className='w-full h-[1px] bg-[#00000029]' />
                                <span className='font-[500] text-[0.8125rem] text-[#000000a6] px-[1rem]'>or</span>
                                <div className='w-full h-[1px] bg-[#00000029]' />
                            </div>

                            <ManualAuth />

                            <div className='flex justify-between'>
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
                                {authType === "sign-in" && (
                                    <button
                                        type='button'
                                        className='flex items-center justify-end font-[400] text-[0.8125rem] text-[#103fef] hover:underline'
                                        onClick={() => toast.error("Currently under maintainance!")}
                                    >
                                        Forgot Password
                                    </button>
                                )}
                            </div>
                        </>
                    ) : authType === "otp-verify" ? (
                        <OTPVerify />
                    ) : authType === "new-user" ? (
                        <NewUser />
                    ) : (
                        <div>Invalid authentication type</div>
                    )}
                </div>
            </div>
        </div>
    )
};

// Email, Password & Reset Password component
const ManualAuth = () => {
    const { authType, verifyLoading, registerLoading } = useAuthStore();
    const { userRegisterCredential } = useRegisterStore();
    const { userLogin } = useLoginStore();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleAuth = async (e) => {
        e.preventDefault();

        localStorage.removeItem("token");
        if (!email) return toast.error("Enter email to proceed!");
        if (!password) return toast.error("Enter password to proceed!");
        if (authType === "sign-up") {
            if (!confirmPassword) return toast.error("Retype your password to proceed!");
            if (password !== confirmPassword) return toast.error("Password doesn't match!");
            userRegisterCredential(email, password);
        }
        else if (authType === "sign-in") userLogin(email, password);
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
                disabled={registerLoading || verifyLoading}
                type='submit'
                className={`py-[0.625rem] px-[1.25rem] text-white ${registerLoading || verifyLoading ? "bg-[#FFBC39] cursor-not-allowed" : "bg-[#103FEF] hover:bg-[#FFBC39]"} duration-200 font-[600] text-[0.6875rem] rounded-[0.375rem]`}
            >
                {registerLoading || verifyLoading ? "VERIFYING" : "CONTINUE"}
            </button>
        </form>
    )
};

// OTP verification component
const OTPVerify = () => {
    const { registerSuccess, verifyOTP } = useAuthStore();
    const { userRegisterResendOTP, userRegisterVerifyOTP } = useRegisterStore();

    const [otp, setOtp] = useState(Array(5).fill(''));

    const handleChange = (target, idx) => {
        setOtp([...otp.slice(0, idx), target.value, ...otp.slice(idx + 1)]);
        const nextSibling = target.nextElementSibling;
        if (nextSibling && target.value) {
            nextSibling.focus();
        }
    };

    const handleKeyDown = (e, idx) => {
        if (e.key === "Backspace" && !otp[idx]) {
            const prevSibling = e.target.previousElementSibling;
            if (prevSibling) {
                prevSibling.focus();
            }
        }
    };

    const handleSubmitOTP = () => {
        const otpValue = otp.join('');
        if (otpValue.length < 5) return toast.error("Enter OTP to proceed!");

        userRegisterVerifyOTP(otpValue);
    };

    const handleResendOTP = () => {
        if (registerSuccess) userRegisterResendOTP();
        else toast.error("Session expired! Create you account again!", { duration: 7500 });
    };

    return (
        <div className='flex flex-col gap-[1.5rem]'>
            <div className='flex flex-col gap-[1rem]'>
                <div className="flex justify-center space-x-4">
                    {otp.map((num, idx) => (
                        <input
                            className="w-12 h-12 border-2 border-[#00000029] focus:outline-[#FFBC39] rounded-lg text-center text-lg"
                            type="text"
                            name={`otp${idx}`}
                            key={idx}
                            value={num}
                            onChange={(e) => handleChange(e.target, idx)}
                            onKeyDown={(e) => handleKeyDown(e, idx)}
                            maxLength={1}
                        />
                    ))}
                </div>
                <button
                    type='button'
                    className='font-[400] text-[0.8125rem] text-[#103fef] hover:underline'
                    onClick={handleResendOTP}
                >
                    Resend OTP
                </button>
            </div>
            <button
                type='button'
                disabled={verifyOTP}
                className={`py-[0.625rem] px-[1.25rem] text-white ${verifyOTP ? "bg-[#FFBC39] cursor-not-allowed" : "bg-[#103FEF] hover:bg-[#FFBC39]"} duration-200 font-[600] text-[0.6875rem] rounded-[0.375rem]`}
                onClick={handleSubmitOTP}
            >
                {verifyOTP ? "VERIFYING" : "VERIFY"}
            </button>
        </div>
    );
};

// User detail component
const NewUser = () => {
    const { user, registerDetail } = useAuthStore();
    const { userRegisterDetails } = useRegisterStore();

    const fileRef = useRef();
    const [image, setImage] = useState(user && user.avatar?.url ? user.avatar.url : "");
    const [imageFile, setImageFile] = useState(null);
    const [firstName, setFirstName] = useState(user && user?.firstName ? user.firstName : "");
    const [lastName, setLastName] = useState(user && user?.lastName ? user.lastName : "");

    const handleFileChange = (e) => {
        setImage(URL.createObjectURL(e.target.files[0]));
        setImageFile(e.target.files[0]);
        e.target.value = "";
    };

    const handleNewUser = (e) => {
        e.preventDefault();
        if (!firstName) return toast.error("First name is mandatory!");
        if (!lastName) return toast.error("Last name is mandatory!");

        userRegisterDetails({
            firstName,
            lastName,
            ...imageFile ? { imageFile: imageFile } : { imageFile: "" }
        });
    };

    return (
        <form className='flex flex-col gap-[1.5rem]' onSubmit={handleNewUser}>
            <div className='flex flex-col gap-[0.75rem]'>
                <div className='flex flex-col gap-[0.25rem] items-center'>
                    <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        multiple={false}
                        disabled={registerDetail}
                        onChange={handleFileChange}
                        ref={fileRef}
                    />
                    <div className='w-[80px] h-[80px] bg-white border rounded-full overflow-hidden'>
                        <img
                            src={image ? image : "/user.svg"}
                            className='w-full h-full object-contain'
                        />
                    </div>
                    <button
                        type='button'
                        className='w-fit font-[500] text-[0.8125rem] bg-slate-200 hover:bg-[#FFBC39] hover:text-white duration-200 py-[0.25rem] px-[0.5rem] rounded-lg'
                        onClick={() => fileRef.current.click()}
                    >
                        {image ? "Change" : "Upload"}
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
                className={`py-[0.625rem] px-[1.25rem] text-white ${registerDetail ? "bg-[#FFBC39] cursor-not-allowed" : "bg-[#103FEF] hover:bg-[#FFBC39]"} duration-200 font-[600] text-[0.6875rem] rounded-[0.375rem]`}
            >
                CREATE
            </button>
        </form>
    )
}

// Socials authentication component
const SocialAuth = () => {
    const isProduction = import.meta.env.MODE === 'production';

    const handleGoogleAuth = () => {
        localStorage.removeItem('token');
        const authUrl = isProduction
            ? 'https://gdsc-bit.vercel.app/auth/google'
            : import.meta.env.VITE_DEV_GOOGLE_AUTH_URL;
        window.location.href = authUrl;
    };

    const handleLinkedInAuth = () => {
        localStorage.removeItem('token');
        if (isProduction) {
            toast.error("Currently under maintainance!");
        }
        else {
            const authUrl = isProduction
                ? 'https://gdsc-bit.vercel.app/auth/linkedin'
                : import.meta.env.VITE_DEV_LINKEDIN_AUTH_URL;
            window.location.href = authUrl;
        }
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

// Refactored input
const InputBox = ({ id, type, value, setValue }) => {
    return (
        <input
            id={id}
            type={type}
            // required
            value={value}
            onChange={e => setValue(e.target.value)}
            className='py-[0.625rem] px-[1rem] border border-[#00000029] focus:outline-[#FFBC39] rounded-[0.375rem] font-[400] text-[0.8125rem]'
        />
    )
};

export default Auth