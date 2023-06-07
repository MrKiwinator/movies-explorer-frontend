import React from "react";

const getWidth = () => window.innerWidth

export const useWindowResize = () => {

    let [width, setWidth] = React.useState(getWidth()); 

    React.useEffect(() => {
        let timeoutId = null;

        const resizeListener = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => setWidth(getWidth()), 500);
        };

        window.addEventListener('resize', resizeListener);    

        return () => {
            window.removeEventListener('resize', resizeListener);
        }
    }, [])

    return { width };
}