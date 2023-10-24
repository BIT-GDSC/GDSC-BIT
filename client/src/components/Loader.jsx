import React from 'react'
import useWindowHeight from '../utils/useWindowHeight'

const Loader = () => {
    const { height, isReady } = useWindowHeight();

    return (
        <div style={{
            height: `${height}px`,
            opacity: isReady ? 1 : 0,
            transition: 'opacity 0.5s linear'
        }}>
            <div className='h-full flex items-center justify-center'>
                Loading...
            </div>
        </div>
    )
}

export default Loader