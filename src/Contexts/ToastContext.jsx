import { createContext, useState } from "react";

const ToastContext = createContext();

export const ToastContextProvider = ({ children }) => {

    const [toastMessage, setToastMessage] = useState('');


    return (
        <ToastContext.Provider
            value={{
                toastMessage,
                setToastMessage
            }}
        >
            {children}
        </ToastContext.Provider>
    );
};

export default ToastContext;