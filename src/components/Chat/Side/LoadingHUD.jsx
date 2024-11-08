import React, { useState, useEffect, useContext } from 'react';
import LoadingIcon from '../../ui/LoadingIcon';
import ChatResponseContext from '../../../Contexts/ChatResponseContext';

const LoadingHUD = () => {

    const { isLatestMessageLoading } = useContext(ChatResponseContext)


    return (
        <div className="flex flex-col items-center justify-center flex-1">
            {
                isLatestMessageLoading && (
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
