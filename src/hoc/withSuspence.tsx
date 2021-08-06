import React from 'react';
import Preloader from "../components/common/Pleloader/Preloader";


export const withSuspence = (Component: any) => {
    return (props: any) => {
        return (
            <React.Suspense fallback={<Preloader/>}>
                <Component {...props}/>
            </React.Suspense>)
    }
}