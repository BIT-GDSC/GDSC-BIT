import { useEffect, useState } from 'react';

const useWindowHeight = () => {
    const [height, setHeight] = useState(undefined);

    useEffect(() => {
        const handleResize = () => {
            setHeight(window.innerHeight);
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return { height };
};

export default useWindowHeight;