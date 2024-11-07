import { createContext, useEffect, useState } from "react";
import { checkAuthentication } from "../Functions/Utils";

const AuthContext = createContext();
const AUTHENCTICATION_INTERVAL = 60 * 1000;

export const AuthContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleIsAuthenticated = () => {
    setIsAuthenticated(checkAuthentication());
  };

  useEffect(() => {
    handleIsAuthenticated();
    const intervalId = setInterval(handleIsAuthenticated, AUTHENCTICATION_INTERVAL);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;