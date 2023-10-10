import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import useWindowHeight from '../utils/useWindowHeight';
import { Navbar } from './Navbar';

const Container = ({ children }) => {
    const location = useLocation();
    const { height } = useWindowHeight();

    const [verifyURL, setVerifyURL] = useState(false);
    useEffect(() => {
        if (location.pathname.includes('/cert/verify/')) {
            setVerifyURL(true);
        }
        else setVerifyURL(false);
    }, [location]);

    return (
        <div
            style={{
                height: `${verifyURL && `${height}px`}`
            }}
        >
            <Navbar />
            <div className='w-full h-[440px] fixed -z-10 top-0 left-0 right-0 bg-gradient-to-b from-[#FFBC39] to-[#FFF]' />
            <div className='pt-[88px]'>
                {children}
            </div>
        </div>
    )
}

export default Container;