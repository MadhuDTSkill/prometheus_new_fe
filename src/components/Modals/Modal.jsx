import React, { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import LoadingIcon from '../ui/LoadingIcon';

const Modal = ({ isOpen, onClose, canClose = true, children, isLoading }) => {
    useEffect(() => {
        if (!isOpen) {
            const timer = setTimeout(onClose, 300); // Match timeout to CSS transition duration
            return () => clearTimeout(timer); // Clean up timer on unmount
        }
    }, [isOpen, onClose]);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(onClose, 300); // Match this timeout with the CSS transition duration
    };

    return (
        <div className={`fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-sm ${isOpen ? 'z-40 opacity-100' : 'z-30 opacity-0 pointer-events-none'} transition-opacity duration-300`}>
            <div className={`relative w-full max-w-5xl p-6 rounded-lg shadow-lg transform ${isOpen ? 'translate-y-0' : 'translate-y-[-100px]'} transition-transform duration-1000`}>
                <div className="mt-4 flex flex-col cc px-0.5 py-[0.5px]">
                    <div className='flex-1 cc-target p-5'>
                        <div className='flex justify-between items-center px-2'>
                            <button>
                                {
                                    canClose &&
                                    <FaTimes onClick={handleClose} className="text-xl" />
                                }
                            </button>
                            {isLoading && <LoadingIcon />}
                        </div>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
