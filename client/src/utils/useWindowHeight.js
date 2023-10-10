import { useEffect, useState } from 'react';

const useWindowHeight = () => {
    const [height, setHeight] = useState(undefined);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setHeight(window.innerHeight - 88);
            setIsReady(true);
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return { height, isReady };
};

export default useWindowHeight;