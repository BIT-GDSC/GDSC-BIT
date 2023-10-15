import { Navbar } from './Navbar';

const Container = ({ children }) => {
    return (
        <div>
            <Navbar />
            <div className='w-full h-full fixed -z-10 top-0 left-0 right-0 bg-gradient-to-b from-[#FFBC39] to-[#FFF]' />
            <div>
                {children}
            </div>
        </div>
    )
}

export default Container;