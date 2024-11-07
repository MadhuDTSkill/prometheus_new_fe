import React, { useState, useEffect } from 'react';
import LoadingIcon from '../../ui/LoadingIcon';

const LoadingHUD = () => {
    const [isLoading, setIsLoading] = useState(true);


    return (
        <div className="flex flex-col items-center justify-center flex-1">
            {
                isLoading && (
                    <>
                        <LoadingIcon className="text-4xl animate-spin" />
                        <p className="text-sm font-semibold p-3">Loading...</p>
                    </>
                )
            }
        </div>
    );
};

export default LoadingHUD;
