import { Navbar } from './Navbar';
import { useLocation } from 'react-router-dom';
import { Toaster } from 'sonner';

const Container = ({ children }) => {
    const location = useLocation();

    return (
        <>
            <Toaster
                richColors
                duration={5000}
                position='top-center'
            />
            <div>
                {location.pathname !== "/auth" && <Navbar />}
                <div className='w-full h-full fixed -z-10 top-0 left-0 right-0 bg-gradient-to-b from-[#FFBC39] to-[#FFF]' />
                <div>
                    {children}
                </div>
            </div>
        </>
    )
}

export default Container;