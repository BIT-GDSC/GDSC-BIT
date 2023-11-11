import { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  useAuthStore,
  useRegisterStore,
  useLoginStore,
  useForgotStore
} from '../store/useAuthStore'
import useWindowHeight from '../utils/useWindowHeight'
import { toast } from 'sonner'
import useSocialAuth from '../utils/useSocialAuth'

// Auth page component
const Auth = () => {
  const { isReady } = useWindowHeight()
  const { authType, setAuthType } = useAuthStore()

  useSocialAuth();

  return (
    <div
      style={{
        overflow: 'auto',
        minHeight: '100vh',
        opacity: isReady ? 1 : 0,
        transition: 'opacity 0.5s linear'
      }}
      className='flex items-center justify-center'
    >
      <div className='h-full flex items-center justify-center py-4'>
        <div className='w-[95vw] sm:w-[28rem] px-[2rem] pt-[1rem] pb-[2rem] flex flex-col gap-[1.5rem] bg-slate-50 border rounded-[1rem]'>
          <div>
            <div className='w-full flex justify-center sm:pb-[1rem]'>
              <Link to='/'>
                <img
                  src='/logo.png'
                  className='w-[100px] h-[70px] object-contain'
                />
              </Link>
            </div>
            <p className='font-[600] text-[1.1rem] sm:text-[1.25rem]'>
              {authType === 'sign-in'
                ? 'Sign in'
                : authType === 'sign-up'
                  ? 'Create your account'
                  : authType === 'otp-verify'
                    ? 'Verify your account'
                    : authType === 'new-user'
                      ? 'Describe yourself'
                      : authType === 'forgot-password-email'
                        ? "Enter your email"
                        : authType === 'forgot-password-otp'
                          ? "Enter OTP"
                          : authType === 'forgot-password-reset'
                            ? "Create new password"
                            : ""}
            </p>
            <p className='font-[400] text-[0.75rem] sm:text-[1rem] text-[#000000a6] pt-[1px]'>
              {authType === 'forgot-password-email' || authType === 'forgot-password-otp'
                ? "to verify your GDSC BIT account"
                : authType === 'forgot-password-reset'
                  ? "to keep your GDSC BIT account safe"
                  : "to continue to GDSC Bengal Institute of Technology"}
            </p>
          </div>

          {authType === 'sign-in' || authType === 'sign-up' ? (
            <>
              <SocialAuth />

              <div className='flex items-center'>
                <div className='w-full h-[1px] bg-[#00000029]' />
                <span className='font-[500] text-[0.8125rem] text-[#000000a6] px-[1rem]'>
                  or
                </span>
                <div className='w-full h-[1px] bg-[#00000029]' />
              </div>

              <ManualAuth />

              <div className='flex justify-between'>
                <div className='flex items-center gap-[0.25rem] font-[400] text-[0.8125rem]'>
                  <p className='text-[#000000a6]'>
                    {authType === 'sign-in'
                      ? 'New here'
                      : 'Already have account'}
                    ?
                  </p>
                  <button
                    className='text-[#3c82f6] hover:underline'
                    onClick={() =>
                      setAuthType(
                        authType === 'sign-in' ? 'sign-up' : 'sign-in'
                      )
                    }
                  >
                    {authType === 'sign-in' ? 'Create account' : 'Login'}
                  </button>
                </div>
                {authType === 'sign-in' && (
                  <button
                    type='button'
                    className='flex items-center justify-end font-[400] text-[0.8125rem] text-[#3c82f6] hover:underline'
                    onClick={() => setAuthType("forgot-password-email")}
                  >
                    Forgot Password
                  </button>
                )}
              </div>
            </>
          ) : authType === 'otp-verify' ? (
            <OTPVerify />
          ) : authType === 'new-user' ? (
            <NewUser />
          ) : authType === 'forgot-password-email' ? (
            <ForgotPasswordEmail />
          ) : authType === 'forgot-password-otp' ? (
            <ForgotPasswordOTP />
          ) : authType === 'forgot-password-reset' ? (
            <ForgotPasswordReset />
          ) : (
            <div>Invalid authentication type</div>
          )}
        </div>
      </div>
    </div>
  )
}

// Socials authentication component
const SocialAuth = () => {
  const isProduction = import.meta.env.MODE === 'production'

  const handleGoogleAuth = () => {
    localStorage.removeItem('login_token')
    const authUrl = isProduction
      ? 'https://gdsc-bit.vercel.app/api/auth/google'
      : import.meta.env.VITE_DEV_GOOGLE_AUTH_URL
    window.location.href = authUrl
  }

  const handleTwitterAuth = () => {
    localStorage.removeItem('login_token')
    const authUrl = isProduction
      ? 'https://gdsc-bit.vercel.app/api/auth/twitter'
      : import.meta.env.VITE_DEV_TWITTER_AUTH_URL
    window.location.href = authUrl
  }

  const handleLinkedInAuth = () => {
    localStorage.removeItem('login_token')
    if (isProduction) {
      toast.error('Currently under maintainance!')
    } else {
      const authUrl = isProduction
        ? 'https://gdsc-bit.vercel.app/api/auth/linkedin'
        : import.meta.env.VITE_DEV_LINKEDIN_AUTH_URL
      window.location.href = authUrl
    }
  }

  return (
    <div className='flex flex-col gap-[0.5rem]'>
      <button
        onClick={handleGoogleAuth}
        className='hover:bg-slate-100 duration-200 border border-[#00000014] py-[0.625rem] px-[1.25rem] flex gap-[1rem] rounded-[0.375rem]'
      >
        <img src='/google-small.svg' className='w-[1.25rem] h-auto' />
        <span className='font-[400] text-[0.8125rem]'>
          Continue with Google
        </span>
      </button>
      <button
        onClick={handleTwitterAuth}
        className='hover:bg-slate-100 duration-200 border border-[#00000014] py-[0.625rem] px-[1.25rem] flex gap-[1rem] rounded-[0.375rem]'
      >
        <img src='/twitter-small.svg' className='w-[1.25rem] h-auto' />
        <span className='font-[400] text-[0.8125rem]'>
          Continue with Twitter
        </span>
      </button>
      {/* <button
        onClick={handleLinkedInAuth}
        className='hover:bg-slate-100 duration-200 border border-[#00000014] py-[0.625rem] px-[1.25rem] flex gap-[1rem] rounded-[0.375rem]'
      >
        <img src='/linkedin-small.svg' className='w-[1.25rem] h-auto' />
        <span className='font-[400] text-[0.8125rem]'>
          Continue with LinkedIn
        </span>
      </button> */}
    </div>
  )
}

// Email, Password & Reset Password component
const ManualAuth = () => {
  const navigate = useNavigate();
  const { authType, verifyLoading, registerLoading } = useAuthStore()
  const { userRegisterCredential } = useRegisterStore()
  const { userLogin } = useLoginStore()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleAuth = async e => {
    e.preventDefault()

    localStorage.removeItem('login_token')
    if (!email) return toast.error('Enter email to proceed!')

    if (authType === 'sign-up') {
      userRegisterCredential(email, password)
    }
    else if (authType === 'sign-in') {
      if (!password) return toast.error('Enter password to proceed!')
      userLogin(email, password, navigate)
    }
  }

  return (
    <form className='flex flex-col gap-[1rem]' onSubmit={handleAuth}>
      <div className='flex flex-col gap-[0.5rem]'>
        <div className='flex flex-col gap-[0.25rem]'>
          <label htmlFor='email' className='font-[500] text-[0.8125rem]'>
            Email Address
          </label>
          <InputBox id='email' type='email' value={email} setValue={setEmail} />
        </div>
        {authType === 'sign-in' && (
          <div className='flex flex-col gap-[0.25rem]'>
            <label htmlFor='password' className='font-[500] text-[0.8125rem]'>
              Password
            </label>
            <InputBox
              id='password'
              type='password'
              value={password}
              setValue={setPassword}
            />
          </div>)}
      </div>
      <button
        disabled={registerLoading || verifyLoading}
        type='submit'
        className={`py-[0.625rem] px-[1.25rem] text-white ${registerLoading || verifyLoading
          ? 'bg-[#FFBC39] cursor-not-allowed'
          : 'bg-[#103FEF] hover:bg-[#FFBC39]'
          } duration-200 font-[600] text-[0.6875rem] rounded-[0.375rem]`}
      >
        {registerLoading || verifyLoading ? 'VERIFYING' : 'CONTINUE'}
      </button>
    </form>
  )
}

// OTP verification component
const OTPVerify = () => {
  const { registerSuccess, verifyOTP } = useAuthStore()
  const { userRegisterResendOTP, userRegisterVerifyOTP } = useRegisterStore()

  const [otp, setOtp] = useState(Array(5).fill(''))

  const handleChange = (target, idx) => {
    setOtp([...otp.slice(0, idx), target.value, ...otp.slice(idx + 1)])
    const nextSibling = target.nextElementSibling
    if (nextSibling && target.value) {
      nextSibling.focus()
    }
  }

  const handleKeyDown = (e, idx) => {
    if (e.key === 'Backspace' && !otp[idx]) {
      const prevSibling = e.target.previousElementSibling
      if (prevSibling) {
        prevSibling.focus()
      }
    }
  }

  const handleSubmitOTP = () => {
    const otpValue = otp.join('')
    if (otpValue.length < 5) return toast.error('Enter OTP to proceed!')

    userRegisterVerifyOTP(otpValue)
  }

  const handleResendOTP = () => {
    if (registerSuccess) userRegisterResendOTP()
    else
      toast.error('Session expired! Create you account again!', {
        duration: 7500
      })
  }

  return (
    <div className='flex flex-col gap-[1.5rem]'>
      <div className='flex flex-col gap-[1rem]'>
        <div className='flex justify-center space-x-4'>
          {otp.map((num, idx) => (
            <input
              className='w-12 h-12 border-2 border-[#00000029] focus:outline-[#FFBC39] rounded-lg text-center text-lg'
              type='text'
              name={`otp${idx}`}
              key={idx}
              value={num}
              onChange={e => handleChange(e.target, idx)}
              onKeyDown={e => handleKeyDown(e, idx)}
              maxLength={1}
            />
          ))}
        </div>
        <div className='flex justify-center'>
          <button
            type='button'
            className='font-[400] text-[0.8125rem] text-[#3c82f6] hover:underline'
            onClick={handleResendOTP}
          >
            Resend OTP
          </button>
        </div>
      </div>
      <button
        type='button'
        disabled={verifyOTP}
        className={`py-[0.625rem] px-[1.25rem] text-white ${verifyOTP
          ? 'bg-[#FFBC39] cursor-not-allowed'
          : 'bg-[#103FEF] hover:bg-[#FFBC39]'
          } duration-200 font-[600] text-[0.6875rem] rounded-[0.375rem]`}
        onClick={handleSubmitOTP}
      >
        {verifyOTP ? 'VERIFYING' : 'VERIFY'}
      </button>
    </div>
  )
}

// User detail component
const NewUser = () => {
  const navigate = useNavigate();
  const { verifySuccess, user, registerDetail } = useAuthStore()
  const { userRegisterDetails } = useRegisterStore()

  const fileRef = useRef()
  const [image, setImage] = useState(
    user && user.avatar?.url ? user.avatar.url : ''
  )
  const [imageFile, setImageFile] = useState(null)
  const [firstName, setFirstName] = useState(
    user && user?.firstName ? user.firstName : ''
  )
  const [lastName, setLastName] = useState(
    user && user?.lastName ? user.lastName : ''
  )
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleFileChange = e => {
    setImage(URL.createObjectURL(e.target.files[0]))
    setImageFile(e.target.files[0])
    e.target.value = ''
  }

  const handleNewUser = e => {
    e.preventDefault()
    if (!firstName) return toast.error('First name is mandatory!')
    if (!lastName) return toast.error('Last name is mandatory!')
    if (!password) return toast.error('Password is mandatory!')
    if (!confirmPassword) return toast.error('Retype your password to proceed!')
    if (password !== confirmPassword) return toast.error("Password doesn't match!")

    userRegisterDetails({
      firstName,
      lastName,
      password,
      ...(imageFile ? { imageFile: imageFile } : { imageFile: '' }),
      ...(verifySuccess && user ? { shallRedirect: true } : { shallRedirect: false }),
      navigate
    })
  }

  return (
    <form className='flex flex-col gap-[1.5rem]' onSubmit={handleNewUser}>
      <div className='flex flex-col gap-[0.75rem]'>
        <div className='flex flex-col gap-[0.25rem] items-center'>
          <input
            type='file'
            className='hidden'
            accept='image/*'
            multiple={false}
            disabled={registerDetail}
            onChange={handleFileChange}
            ref={fileRef}
          />
          <div className='w-[80px] h-[80px] bg-white border rounded-full overflow-hidden'>
            <img
              src={image ? image : '/user.svg'}
              className='w-full h-full object-contain'
            />
          </div>
          <button
            type='button'
            className='w-fit font-[500] text-[0.8125rem] bg-slate-200 hover:bg-[#FFBC39] hover:text-white duration-200 py-[0.25rem] px-[0.5rem] rounded-lg'
            onClick={() => fileRef.current.click()}
          >
            {image ? 'Change' : 'Upload'}
          </button>
        </div>
        <div className='flex flex-col gap-[0.25rem]'>
          <label htmlFor='first-name' className='font-[500] text-[0.8125rem]'>
            First Name
          </label>
          <InputBox
            id='first-name'
            type='text'
            value={firstName}
            setValue={setFirstName}
          />
        </div>
        <div className='flex flex-col gap-[0.25rem]'>
          <label htmlFor='last-name' className='font-[500] text-[0.8125rem]'>
            Last Name
          </label>
          <InputBox
            id='last-name'
            type='text'
            value={lastName}
            setValue={setLastName}
          />
        </div>
        <div className='flex flex-col gap-[0.25rem]'>
          <label htmlFor='set-password' className='font-[500] text-[0.8125rem]'>
            Set Password
          </label>
          <InputBox
            id='set-password'
            type='password'
            value={password}
            setValue={setPassword}
          />
        </div>
        <div className='flex flex-col gap-[0.25rem]'>
          <label htmlFor='password' className='font-[500] text-[0.8125rem]'>
            Confirm Password
          </label>
          <InputBox
            id='confirm-password'
            type='password'
            value={confirmPassword}
            setValue={setConfirmPassword}
          />
        </div>
      </div>
      <button
        type='submit'
        disabled={registerDetail}
        className={`py-[0.625rem] px-[1.25rem] text-white ${registerDetail
          ? 'bg-[#FFBC39] cursor-not-allowed'
          : 'bg-[#103FEF] hover:bg-[#FFBC39]'
          } duration-200 font-[600] text-[0.6875rem] rounded-[0.375rem]`}
      >
        {registerDetail ? 'CREATING...' : 'CREATE'}
      </button>
    </form>
  )
}

// Forgot password email component
const ForgotPasswordEmail = () => {
  const { setAuthType, emailVerifyLoading } = useAuthStore();
  const { emailVerify } = useForgotStore();
  const [email, setEmail] = useState("");

  const handleForgotEmail = (e) => {
    e.preventDefault();
    if (!email) return toast.error("Enter your GDSC BIT's account email!")

    emailVerify(email);
  }

  return (
    <>
      <form className='flex flex-col gap-[1rem]' onSubmit={handleForgotEmail}>
        <div className='flex flex-col gap-[0.5rem]'>
          <div className='flex flex-col gap-[0.25rem]'>
            <label htmlFor='email' className='font-[500] text-[0.8125rem]'>
              Email Address
            </label>
            <InputBox id='email' type='email' value={email} setValue={setEmail} />
          </div>
        </div>
        <button
          disabled={emailVerifyLoading}
          type='submit'
          className={`py-[0.625rem] px-[1.25rem] text-white ${emailVerifyLoading
            ? 'bg-[#FFBC39] cursor-not-allowed'
            : 'bg-[#103FEF] hover:bg-[#FFBC39]'
            } duration-200 font-[600] text-[0.6875rem] rounded-[0.375rem]`}
        >
          {emailVerifyLoading ? 'VERIFYING' : 'CONTINUE'}
        </button>
        <div className='flex justify-center'>
          <button
            type='button'
            className='font-[400] text-[0.8125rem] text-[#3c82f6] hover:underline'
            onClick={() => setAuthType("sign-in")}
          >
            Back to Login
          </button>
        </div>
      </form>
    </>
  )
}

// Forgot password otp component
const ForgotPasswordOTP = () => {
  const { verifyOTP, resendOTP, otpVerify } = useForgotStore();

  const [otp, setOtp] = useState(Array(5).fill(''))

  const handleChange = (target, idx) => {
    setOtp([...otp.slice(0, idx), target.value, ...otp.slice(idx + 1)])
    const nextSibling = target.nextElementSibling
    if (nextSibling && target.value) {
      nextSibling.focus()
    }
  }

  const handleKeyDown = (e, idx) => {
    if (e.key === 'Backspace' && !otp[idx]) {
      const prevSibling = e.target.previousElementSibling
      if (prevSibling) {
        prevSibling.focus()
      }
    }
  }

  const handleSubmitOTP = () => {
    const otpValue = otp.join('')
    if (otpValue.length < 5) return toast.error('Enter OTP to proceed!')

    otpVerify(otpValue);
  }

  const handleResendOTP = () => {
    resendOTP();
  }

  return (
    <div className='flex flex-col gap-[1.5rem]'>
      <div className='flex flex-col gap-[1rem]'>
        <div className='flex justify-center space-x-4'>
          {otp.map((num, idx) => (
            <input
              className='w-12 h-12 border-2 border-[#00000029] focus:outline-[#FFBC39] rounded-lg text-center text-lg'
              type='text'
              name={`otp${idx}`}
              key={idx}
              value={num}
              onChange={e => handleChange(e.target, idx)}
              onKeyDown={e => handleKeyDown(e, idx)}
              maxLength={1}
            />
          ))}
        </div>
        <div className='flex justify-center'>
          <button
            type='button'
            className='font-[400] text-[0.8125rem] text-[#103fef] hover:underline'
            onClick={handleResendOTP}
          >
            Resend OTP
          </button>
        </div>
      </div>
      <button
        type='button'
        disabled={verifyOTP}
        className={`py-[0.625rem] px-[1.25rem] text-white ${verifyOTP
          ? 'bg-[#FFBC39] cursor-not-allowed'
          : 'bg-[#103FEF] hover:bg-[#FFBC39]'
          } duration-200 font-[600] text-[0.6875rem] rounded-[0.375rem]`}
        onClick={handleSubmitOTP}
      >
        {verifyOTP ? 'VERIFYING' : 'VERIFY'}
      </button>
    </div>
  )
}

// Forgot password reset component
const ForgotPasswordReset = () => {
  const { resetPasswordLoading, resetPassword } = useForgotStore();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleResetPassword = (e) => {
    e.preventDefault();
    if (!password) return toast.error('Enter new password!')
    if (!confirmPassword) return toast.error('Retype your password to proceed!')
    if (password !== confirmPassword) return toast.error("Password doesn't match!")

    resetPassword(password);
  }

  return (
    <form className='flex flex-col gap-[1rem]' onSubmit={handleResetPassword}>
      <div className='flex flex-col gap-[0.5rem]'>
        <div className='flex flex-col gap-[0.25rem]'>
          <label htmlFor='new-password' className='font-[500] text-[0.8125rem]'>
            New Password
          </label>
          <InputBox
            id='new-password'
            type='password'
            value={password}
            setValue={setPassword}
          />
        </div>
        <div className='flex flex-col gap-[0.25rem]'>
          <label htmlFor='password' className='font-[500] text-[0.8125rem]'>
            Confirm Password
          </label>
          <InputBox
            id='confirm-password'
            type='password'
            value={confirmPassword}
            setValue={setConfirmPassword}
          />
        </div>
      </div>
      <button
        disabled={resetPasswordLoading}
        type='submit'
        className={`py-[0.625rem] px-[1.25rem] text-white ${resetPasswordLoading
          ? 'bg-[#FFBC39] cursor-not-allowed'
          : 'bg-[#103FEF] hover:bg-[#FFBC39]'
          } duration-200 font-[600] text-[0.6875rem] rounded-[0.375rem]`}
      >
        {resetPasswordLoading ? 'VERIFYING' : 'CONTINUE'}
      </button>
    </form>
  )
}

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
}

export default Auth
