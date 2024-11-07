import { createContext } from "react";

const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
    return (
        <GlobalContext.Provider value={{}}>
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalContext;